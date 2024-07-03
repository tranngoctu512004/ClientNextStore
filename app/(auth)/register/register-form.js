"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import envConfig from "@/config";
import Link from "next/link";
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";

// Define the form schema using Zod
const formSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords must match",
      });
    }
  });

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      const res = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
        {
          body: JSON.stringify(values),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const payload = await res.json();
      if (!res.ok) {
        throw payload;
      }
      setLoading(false);
      toast({
        title: "Success",
        description: "Đăng ký thành công",
        status: "success",
      });
      router.push("/login");
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",
        description: error.error || "An unexpected error occurred",
        status: "error",
      });
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      {loading && <Loading />}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-4/6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
                  className="transition duration-200 ease-in-out focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="transition duration-200 ease-in-out focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="transition duration-200 ease-in-out focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  className="transition duration-200 ease-in-out focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="!mt-6 w-full bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
          type="submit"
        >
          Submit
        </Button>

        <p className="mt-4 text-center text-gray-600">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </form>
    </Form>
  );
}
