"use client";

import GoogleButton from "@/components/Auth/GoogleButton";
import {
  useRegisterMutation,
  useVerifyOtpMutation,
} from "@/process/api/apiAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignUpPage = () => {
  const [canResend, setCanResend] = useState(true);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showOtp, setShowOtp] = useState(false);
  const [userData, setUserData] = useState<FormData | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();

  const [signup, { isLoading }] = useRegisterMutation();
  const [verifyOtp, { isLoading: verifyOtpLoading }] = useVerifyOtpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const startResendTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0; // Reset timer
        }
        return prev - 1;
      });
    }, 1000);
  };

  const onSubmit = async (data: FormData) => {
    await signup(data)
      .unwrap()
      .then(() => {
        setUserData(data);
        setShowOtp(true);
        setCanResend(false);
        setTimer(60);
        startResendTimer();
      })
      .catch((error) => console.log("Signup failed:", error));
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const resendOtp = async () => {
    if (userData) {
      await signup(userData);
    }
  };

  const verifyOtpHandler = async () => {
    if (!userData) return;
    await verifyOtp({ ...userData, otp: otp.join("") })
      .unwrap()
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.log("OTP verification failed:", error);
      });
  };

  return (
    <div className="w-full py-10 min-h-[85vh] bg-[#f1f1f1]">
      <h1 className="text-4xl font-semibold text-black text-center">SignUp</h1>
      <p className="text-center text-lg font-medium py-3 text-[#00000099]">
        Home . SignUp
      </p>

      <div className="w-full flex justify-center">
        <div className="md:w-[480px] p-8 bg-white shadow rounded-lg">
          <h3 className="text-3xl font-semibold text-center mb-2">
            SignUp to CosmePlay
          </h3>
          <p className="text-center text-gray-500 mb-4">
            Already have an account?{" "}
            <Link href={"/login"} className="text-blue-500">
              Login
            </Link>
          </p>

          <GoogleButton />
          <div className="flex items-center my-5 text-gray-400 text-sm gap-3">
            <div className="flex-1 border-t border-gray-300" />
            <span className="">or Sign up with Email</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>

          {!showOtp ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-2 border border-gray-300 outline-0 rounded mb-1"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm ">
                  {String(errors.name.message)}
                </p>
              )}
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-lg  mt-4 bg-black text-white py-2 rounded-lg"
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
          ) : (
            <div className="">
              <h3 className="text-xl font-semibold text-center mb-4">
                Enter OTP
              </h3>
              <div className="flex justify-center gap-6">
                {otp?.map((digit, index) => (
                  <input
                    type="text"
                    key={index}
                    ref={(el) => {
                      if (el) inputRefs.current[index] = el;
                    }}
                    maxLength={1}
                    className="w-12 h-12 text-center border border-gray-300 outline-none rounded"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  />
                ))}
              </div>
              <button
                className="w-full mt-4 text-lg cursor-pointer bg-blue-500 text-white py-2 rounded"
                onClick={verifyOtpHandler}
                disabled={verifyOtpLoading}
              >
                {verifyOtpLoading ? "Verifying..." : "Verify OTP"}
              </button>

              <p className="text-center text-sm mt-4">
                {canResend ? (
                  <button
                    onClick={resendOtp}
                    className="text-blue-500 cursor-pointer"
                  >
                    Resend OTP
                  </button>
                ) : (
                  `Resend OTP in ${timer}s`
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
