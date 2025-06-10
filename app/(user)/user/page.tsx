'use client'

import React, { useState } from "react";
import UserLayout from "../../../components/UserPage/UserLayout";
import Button from "@/components/CustomButton";

export default function UserPage() {
  // Initial user data
  const [form, setForm] = useState({
    name: "quan",
    email: "quansieuquay2013@gmail.com",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditing(true);

  const handleSave = () => {
    // Save logic here
    setEditing(false);
  };

  const handleResetPassword = () => {
    // Reset password logic here
    alert("Password reset link sent to your email.");
  };

  return (
    <UserLayout>
      <div className="flex-1 mx-auto bg-white p-8 rounded shadow">
        <h2 className="text-xl font-bold mb-6">My Profile</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              className="w-full text-sm border rounded px-3 py-2"
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full text-sm  border rounded px-3 py-2"
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
          <div className="flex gap-2 mt-6">
            {!editing ? (
              <Button type="button" onClick={handleEdit} label={"Edit"}>
                
              </Button>
            ) : (
              <Button type="submit">Save</Button>
            )}
            <Button type="button" variant="outline" onClick={handleResetPassword} label={"Reset Password"}>
            </Button>
          </div>
        </form>
      </div>
    </UserLayout>
  );
}
