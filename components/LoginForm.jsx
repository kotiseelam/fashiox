"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      // Redirect to the home page with products after login
      router.replace("/home");
    } catch (error) {
      console.log(error);
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="absolute top-5 left-5 text-3xl font-bold text-blue-600">Fashiox</div>
      <div className="shadow-xl p-10 rounded-lg border-t-4 border-blue-500 max-w-md w-full">
        <h1 className="text-2xl font-bold my-6">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-lg"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-lg"
          />
          <button className="bg-blue-600 text-white font-bold cursor-pointer px-8 py-3 rounded-lg hover:bg-blue-700 text-lg">
            Login
          </button>

          {error && (
            <div className="bg-red-500 text-white text-sm py-2 px-4 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Dont have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
