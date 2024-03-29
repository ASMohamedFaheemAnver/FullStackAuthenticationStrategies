import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { User, UserSchema } from './schemas/user.schema';
import config from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import {
  EnvKeys,
  FilePaths,
  PassportAuthStrategies,
} from './constants/strings';
import { CommonNumbers } from './constants/numbers';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-strategy';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import * as admin from 'firebase-admin';
import { FirebaseStrategy } from './strategies/firebase-strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot(config.dbUri),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [
        JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            secret: config.get<string>(EnvKeys.JWT_SECRET),
            signOptions: {
              expiresIn: CommonNumbers.jwtExpiresIn,
            },
          }),
        }),
      ],
      inject: [JwtService],
      useFactory: async (jwtService: JwtService) => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          playground: process.env.NODE_ENV !== 'prod',
          installSubscriptionHandlers: true,
          context: ({ extra, connectionParams, ...reset }) => {
            if (connectionParams || extra) {
              return {
                req: {
                  headers: {
                    Authorization:
                      connectionParams?.headers?.Authorization?.split(' ')[1],
                  },
                },
              };
            } else {
              return reset;
            }
          },
          subscriptions: {
            'graphql-ws': {
              // onConnect: async (context) => {
              //   const token =
              //     context?.connectionParams?.headers?.['Authorization'].split(
              //       ' ',
              //     )[1];
              //   // Decoding all auth provider tokens as expected
              //   const wsPayload = jwtService.decode(token);
              //   context.extra['user'] = wsPayload;
              // },
            },
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // We can only import PassportModule.
    PassportModule.register({
      defaultStrategy: PassportAuthStrategies.jwt,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(EnvKeys.JWT_SECRET),
        signOptions: {
          expiresIn: CommonNumbers.jwtExpiresIn,
        },
      }),
    }),
    FirebaseAdminModule.forRootAsync({
      useFactory: () => ({
        credential: admin.credential.cert(require(FilePaths.firebaseAdminKey)),
      }),
    }),
  ],
  controllers: [],
  providers: [AppResolver, AppService, JwtStrategy, FirebaseStrategy],
})
export class AppModule {}
