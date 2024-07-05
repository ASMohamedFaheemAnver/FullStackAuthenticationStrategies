"use client";

import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import * as z from "zod";
import { resetSchema } from "@/schemas";
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
import { reset } from "@/actions/reset";
import { useState, useTransition } from "react";

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
    mode: "all",
  });

  const onSubmit = (values: z.infer<typeof resetSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      try {
        const response = await reset(values);
        setSuccess(response?.success);
        setError(response?.error);
      } catch (e) {
        console.log({ e });
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="space-y-2">
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
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
