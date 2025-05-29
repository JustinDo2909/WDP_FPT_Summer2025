"use client";

import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyForgotPasswordOtpMutation,
} from "@/process/api/apiAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const ForgotPasswordPage = () => {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [canResend, setCanResend] = useState(true);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();

  const [forgotPassword, { isLoading: requestOtpLoading }] =
    useForgotPasswordMutation();

  const [verifyOtp, { isLoading: verifyOtpLoading }] =
    useVerifyForgotPasswordOtpMutation();

  const [resetPassword, { isLoading: resetPasswordLoading }] =
    useResetPasswordMutation();

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
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmitEmail = async ({ email }: { email: string }) => {
    await forgotPassword({ email })
      .unwrap()
      .then(() => {
        setUserEmail(email);
        setStep("otp");
        setCanResend(false);
        setTimer(60);
        startResendTimer();
      })
      .catch((error) => {
        console.log("Forgot password failed:", error);
      });
  };

  const verifyOtpHandler = async () => {
    if (!userEmail) return;
    await verifyOtp({ email: userEmail, otp: otp.join("") })
      .unwrap()
      .then(() => {
        setStep("reset");
      })
      .catch((error) => {
        console.log("OTP verification failed:", error);
      });
  };

  const onSubmitPassword = async ({ password }: { password: string }) => {
    await resetPassword({ email: userEmail!, newPassword: password })
      .unwrap()
      .then(() => {
        setStep("email");
        router.push("/login");
      })
      .catch((error) => {
        console.log("Reset password failed:", error);
      });
  };

  return (
    <div className="w-full py-10 min-h-[85vh] bg-[#f1f1f1]">
      <h1 className="text-4xl font-semibold text-black text-center">
        Forgot Password
      </h1>
      <p className="text-center text-lg font-medium py-3 text-[#00000099]">
        Home . ForgotPassword
      </p>

      <div className="w-full flex justify-center">
        <div className="md:w-[480px] p-8 bg-white shadow rounded-lg">
          {step === "email" && (
            <>
              <h3 className="text-3xl font-semibold text-center mb-2">
                Login to CosmePlay
              </h3>
              <p className="text-center text-gray-500 mb-4">
                Go back to?{" "}
                <Link href={"/login"} className="text-blue-500">
                  Login
                </Link>
              </p>

              <form onSubmit={handleSubmit(onSubmitEmail)}>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 outline-0 rounded mb-1"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm ">
                    {String(errors.email.message)}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={requestOtpLoading}
                  className="w-full text-lg cursor-pointer mt-4 bg-black text-white py-2 rounded-lg"
                >
                  {requestOtpLoading ? "Sending OTP ..." : "Submit"}
                </button>
              </form>
            </>
          )}

          {step === "otp" && (
            <>
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
                    onClick={() => onSubmitEmail({ email: userEmail! })}
                    className="text-blue-500 cursor-pointer"
                  >
                    Resend OTP
                  </button>
                ) : (
                  `Resend OTP in ${timer}s`
                )}
              </p>
            </>
          )}

          {step === "reset" && (
            <>
              <h3 className="text-xl font-semibold text-center mb-4">
                Reset Password
              </h3>

              <form onSubmit={handleSubmit(onSubmitPassword)}>
                <label className="block text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
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

                <button
                  type="submit"
                  disabled={resetPasswordLoading}
                  className="w-full mt-4 text-lg bg-black text-white py-2 rounded-lg"
                >
                  {resetPasswordLoading ? "Resetting ..." : "Reset Password"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
