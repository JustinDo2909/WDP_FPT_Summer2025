"use client";

import CustomTable from "@/components/CustomTable";
import { StatsCard } from "@/components/admin/StatsCard";
import { formatDate } from "@/components/admin/Customer/seg/utils";
import {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} from "@/process/api/apiUser";
import type { User } from "@/types/user";
import { useState } from "react";
import { Area, RText, Yard, Core, Container } from "@/lib/by/Div";
import { Edit, Users, Mail, Calendar } from "lucide-react";

export default function CustomersPage() {
  const { data: users = [], isLoading } = useGetAllUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAddUser = () => {
    setEditingUser(null);
    setIsAddModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmitUser = async (userData: {
    id?: string;
    name: string;
    email: string;
    role?: string;
  }) => {
    try {
      if (editingUser && userData.id) {
        const updateData: {
          id: string;
          name: string;
          email: string;
        } = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
        };

        await updateUser(updateData).unwrap();
      } else {
        await createUser({
          name: userData.name,
          email: userData.email,
          password: "defaultPassword123", // Temporary default password for new users
          role: userData.role as "USER" | "ADMIN" | "STAFF",
        }).unwrap();
      }
      setIsAddModalOpen(false);
      setEditingUser(null);
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Error saving user. Please try again.");
    }
  };

  const handleExportUsers = () => {
    const headers = ["User ID", "Name", "Email", "Role", "Created At"];
    const csvContent = [
      headers.join(","),
      ...users.map((user) =>
        [
          user.id,
          `"${user.name}"`,
          user.email,
          user.role,
          new Date(user.createdAt).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalUsers = users.length;
  const recentSignups = users.filter(
    (u) =>
      new Date(u.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  ).length;

  const columns = [
    {
      key: "id" as keyof User,
      label: "User ID",
      sortable: true,
      render: (user: User) => (
        <RText className="font-mono text-sm font-medium text-blue-600">
          {user.id}
        </RText>
      ),
    },
    {
      key: "name" as keyof User,
      label: "User",
      sortable: true,
      render: (user: User) => (
        <Area className="flex items-center">
          <Yard className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
            {user.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .toUpperCase()}
          </Yard>
          <Yard>
            <RText className="font-medium text-gray-900">{user.name}</RText>
            <RText className="text-sm text-gray-500">{user.email}</RText>
          </Yard>
        </Area>
      ),
    },

    {
      key: "createdAt" as keyof User,
      label: "Created",
      sortable: true,
      render: (user: User) => (
        <RText className="text-sm text-gray-900">
          {formatDate(user.createdAt)}
        </RText>
      ),
    },
    {
      key: "updatedAt" as keyof User,
      label: "Updated",
      sortable: true,
      render: (user: User) => (
        <RText className="text-sm text-gray-900">
          {formatDate(user.updatedAt)}
        </RText>
      ),
    },
    {
      key: "actions" as keyof User,
      label: "Actions",
      render: (user: User) => (
        <Area className="flex items-center space-x-1">
          <button
            onClick={() => handleEditUser(user)}
            className="text-green-600 hover:text-green-800 p-1 hover:bg-green-50 rounded transition-colors"
            title="Edit User"
          >
            <Edit className="w-4 h-4" />
          </button>
        </Area>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Core className="flex flex-col h-full bg-gray-50">
        <header className="flex h-16 items-center justify-between border-b bg-white px-4">
          <RText className="text-lg font-semibold text-gray-700">
            User Management
          </RText>
        </header>
        <Container className="flex-1 overflow-auto p-6 space-y-6">
          <RText>Loading...</RText>
        </Container>
      </Core>
    );
  }

  return (
    <Core className="flex flex-col h-full bg-gray-50">
      {/* Page Header */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-4">
        <RText className="text-lg font-semibold text-gray-700">
          User Management
        </RText>
      </header>

      <Container className="flex-1 overflow-auto p-6 space-y-6">
        <Area>
          <RText className="text-gray-600">
            Manage user accounts and information
          </RText>
        </Area>

        {/* Main Stats Cards */}
        <Area className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatsCard
            title="Total Users"
            value={totalUsers}
            icon={Users}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-50"
          />
          <StatsCard
            title="Active Users"
            value={totalUsers}
            icon={Mail}
            iconColor="text-green-600"
            iconBgColor="bg-green-50"
            valueColor="text-green-600"
          />
          <StatsCard
            title="Recent Signups"
            value={recentSignups}
            icon={Calendar}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-50"
            valueColor="text-purple-600"
          />
        </Area>

        {/* Users Table */}
        <CustomTable
          data={users}
          columns={columns}
          onAddItem={handleAddUser}
          onExport={handleExportUsers}
          headerTitle="All Users"
          description="Manage user accounts and information"
          showExport={true}
          showBulkActions={false}
          itemsPerPage={15}
        />
      </Container>

      {/* Add/Edit User Modal */}
      {isAddModalOpen && (
        <Core className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <Container className="bg-white rounded-lg p-6 w-full max-w-md">
            <RText className="text-lg font-semibold mb-4">
              {editingUser ? "Edit User" : "Add User"}
            </RText>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                handleSubmitUser({
                  id: editingUser?.id,
                  name: formData.get("name") as string,
                  email: formData.get("email") as string,
                  role: formData.get("role") as string,
                });
              }}
            >
              <Area className="space-y-4">
                <Yard>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    name="name"
                    type="text"
                    defaultValue={editingUser?.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </Yard>
                <Yard>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    defaultValue={editingUser?.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </Yard>
                {!editingUser && (
                  <Yard>
                    <label className="block text-sm font-medium mb-1">
                      Role
                    </label>
                    <select
                      name="role"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      defaultValue="USER"
                      required
                    >
                      <option value="USER">User</option>
                      <option value="ADMIN">Admin</option>
                      <option value="STAFF">Staff</option>
                    </select>
                  </Yard>
                )}
              </Area>
              <Area className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={handleCloseAddModal}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingUser ? "Update" : "Create"}
                </button>
              </Area>
            </form>
          </Container>
        </Core>
      )}
    </Core>
  );
}
