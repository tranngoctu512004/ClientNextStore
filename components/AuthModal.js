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
import Loading from "@/components/loading";
import Modal from "./modal";
import PropTypes from "prop-types";
// Define the form schema using Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const registerSchema = z
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

export default function AuthModal({ onClose }) {
  const { toast } = useToast();
  const { setSessionToken } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [showModal] = useState(true);

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleLogin(values) {
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
      const resultnextsever = await fetch(
        `${window.location.origin}/api/auth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const responseFromBackend = await resultnextsever.json();
      setSessionToken(responseFromBackend.payload.token);
      setLoading(false);
      toast({
        title: "Success",
        description: "Đăng nhập thành công",
        status: "success",
      });
      onClose();
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      });
      setLoading(false);
    }
  }

  async function handleRegister(values) {
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
    <Modal show={showModal} onClose={onClose}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <Form {...loginForm}>
            {loading && <Loading />}
            <form
              onSubmit={loginForm.handleSubmit(handleLogin)}
              className="space-y-6"
            >
              <FormField
                control={loginForm.control}
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
                control={loginForm.control}
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
            </form>
          </Form>
        </div>

        <div className="md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <Form {...registerForm}>
            {loading && <Loading />}
            <form
              onSubmit={registerForm.handleSubmit(handleRegister)}
              className="space-y-4"
            >
              <FormField
                control={registerForm.control}
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
                control={registerForm.control}
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
                control={registerForm.control}
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
                control={registerForm.control}
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
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
AuthModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
