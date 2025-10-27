"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await login(email, password);

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-violet-700 mb-6 text-center">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-violet-400 px-3 py-2 rounded focus:ring-2 focus:ring-violet-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-violet-400 px-3 py-2 rounded focus:ring-2 focus:ring-violet-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700"
          >
            {loading ? "Logging in ..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
