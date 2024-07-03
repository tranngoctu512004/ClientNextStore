import React from "react";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Đăng nhập</h1>
        <div className="flex justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
