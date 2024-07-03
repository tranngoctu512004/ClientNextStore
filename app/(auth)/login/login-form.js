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
import { useAppContext } from "@/app/AppProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";

// Define the form schema using Zod
const formSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { setSessionToken } = useAppContext();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    try {
      const res = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
        {
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        },
      );
      const payload = await res.json();
      const data = {
        status: res.status,
        payload,
      };

      if (!res.ok) {
        throw new Error(data.payload.error || "Login failed");
      }
      setLoading(false);
      toast({
        title: "Success",
        description: "Đăng nhập thành công",
        status: "success",
      });
      const resultnextsever = await fetch("api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseFromBackend = await resultnextsever.json();
      setSessionToken(responseFromBackend.payload.token);
      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      });
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      {loading && <Loading />}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-4/6">
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
                  className=" transition duration-200 ease-in-out focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
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

        <Button
          className="!mt-6 w-full bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
          type="submit"
        >
          Submit
        </Button>

        <p className="mt-4 text-center text-gray-600">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="text-indigo-600 hover:underline">
            Đăng ký
          </Link>
        </p>
      </form>
    </Form>
  );
}
