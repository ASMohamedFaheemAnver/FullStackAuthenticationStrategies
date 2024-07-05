"use client";

import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import * as z from "zod";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      try {
        const response = await login(values);
        setSuccess(response?.success);
        setError(response?.error);
        if (response?.twoFactor) setShowTwoFactor(true);
      } catch (e) {
        console.log({ e });
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="space-y-2">
            {!showTwoFactor ? (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            value={field.value}
                            onChange={field.onChange}
                            type="email"
                            placeholder="example@gmail.com"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            value={field.value}
                            onChange={field.onChange}
                            type="password"
                            placeholder="********"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                        <Button
                          size={"sm"}
                          variant={"link"}
                          asChild
                          className="px-0 font-normal"
                        >
                          <Link href={"/auth/reset"}>Forgot password?</Link>
                        </Button>
                      </FormItem>
                    );
                  }}
                />
              </>
            ) : (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Two factor code</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="123456"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
