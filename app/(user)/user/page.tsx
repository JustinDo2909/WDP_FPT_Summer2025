"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/CustomButton"; // Assuming you have a custom Button component
import { useUser } from "@/hooks/useUser";

// A reusable component for each form row to keep the layout consistent.
const FormField = ({
  label,
  children,
  description,
}: {
  label: string;
  children: React.ReactNode;
  description?: string;
}) => (
  <div className="flex flex-col sm:flex-row border-b py-4 sm:items-center">
    <label className="w-full mb-2 sm:mb-0 sm:w-48 text-gray-500 text-sm shrink-0">
      {label}
    </label>
    <div className="flex-1">
      {children}
      {description && (
        <p className="text-xs text-gray-400 mt-2">{description}</p>
      )}
    </div>
  </div>
);

export default function UserProfilePage() {
  const { user } = useUser();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save the form data
    // console.log("Saving data...", { name, gender });
    alert("Profile Saved!");
  };

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setPhone(user.phone)
    }
  },[user])

  return (
    <div className="w-full mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-500 mt-1">
          Manage your profile information to secure your account
        </p>
      </div>

      <form onSubmit={handleSave}>
        {/* <FormField label="Username" description="Username can only be changed once.">
          <input
            type="text"
            value="g0qnr_l2bu"
            disabled
            className="w-full max-w-sm bg-gray-100 border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 cursor-not-allowed"
          />
        </FormField> */}

        <FormField label="Name">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full max-w-sm border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </FormField>

        <FormField label="Email">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full max-w-sm border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </FormField>



        <FormField label="Phone">
          <input
            type="text"
            value={phone}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full max-w-sm border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </FormField>


       

        <FormField label="Gender">
          <div className="flex items-center gap-6 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="Male"
                className="w-4 h-4 text-primary focus:ring-primary"
              />
              Male
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="Female"
                className="w-4 h-4 text-primary focus:ring-primary"
              />
              Female
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="Other"
                className="w-4 h-4 text-primary focus:ring-primary"
              />
              Other
            </label>
          </div>
        </FormField>

        <FormField label="Date of Birth">
          <div className="flex items-center justify-start sm:justify-between max-w-sm">
            <span className="text-sm text-gray-800">**/**/2002</span>
            <a
              href="#"
              className="text-primary font-medium hover:underline text-sm ml-4"
            >
              Change
            </a>
          </div>
                  </FormField>


        <div className="mt-8 flex justify-start space-x-4">
          {/* You can use your custom Button or a standard button */}
          <button
            type="submit"
            className="bg-primary text-white font-bold py-2 px-12 rounded-md hover:bg-primary/90 transition-colors"
          >
            Save
          </button>
          <Button variant="outline" label="Reset password" />
        </div>
      </form>
    </div>
  );
}
