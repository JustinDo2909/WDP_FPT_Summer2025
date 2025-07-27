"use client";

import GoogleButton from "@/components/Auth/GoogleButton";
import { useLoginMutation } from "@/process/api/apiAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await login(data).unwrap();
      if (response.user?.role === "ADMIN") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
      alert("Login failed. Please check your credentials.");
      console.error("error", error);
    }
  };

  return (
    <div className="w-full py-10 min-h-[85vh] bg-[#f1f1f1]">
      <h1 className="text-4xl font-semibold text-black text-center">Login</h1>
      <p className="text-center text-lg font-medium py-3 text-[#00000099]">
        Home . Login
      </p>

      <div className="w-full flex justify-center">
        <div className="md:w-[480px] p-8 bg-white shadow rounded-lg">
          <h3 className="text-3xl font-semibold text-center mb-2">
            Login to CosmePlay
          </h3>
          <p className="text-center text-gray-500 mb-4">
            Dont have and account?{" "}
            <Link href={"/signup"} className="text-blue-500">
              Sign up
            </Link>
          </p>

          <GoogleButton />
          <div className="flex items-center my-5 text-gray-400 text-sm gap-3">
            <div className="flex-1 border-t border-gray-300" />
            <span className="">or Sign in with Email</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 outline-0 rounded mb-1"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm ">
                {String(errors.email.message)}
              </p>
            )}

            <label className="block text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={"password"}
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-300 outline-0 rounded mb-1"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              {errors.password && (
                <p className="text-red-500 text-sm ">
                  {String(errors.password.message)}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center my-4">
              <label className="flex items-center text-gray-600">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>

              <Link href={"/forgot-password"} className="text-blue-500 text-sm">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-lg cursor-pointer bg-black text-white py-2 rounded-lg"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
