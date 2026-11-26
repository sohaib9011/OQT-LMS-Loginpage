"use client";

import { useState } from "react";
import { loginApi } from "@/app/lib/login";
import toast from "react-hot-toast";
import encryptPassword from "@/app/lib/crypto";

export default function LoginCard() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const box =
    "mb-6 flex h-[54px] items-center gap-3 rounded-xl border border-neutral-300 px-4 focus-within:border-teal-600";
  const input =
    "flex-1 bg-transparent text-base text-neutral-900 outline-none placeholder:text-neutral-700";

  const handleLogin = async () => {
    if (loading) return; // double request sa bachna ka lay ha.
    // Secret key environment variable se li.
    const secretKey = process.env.NEXT_PUBLIC_PASSWORD_SECRET_KEY;
    // Password ko encrypt kiya.
    const encryptedPassword = encryptPassword({
      password: password,
      secretKey: secretKey,
    });
    // Agar encryption nahi hui to function stop.
    if (!encryptedPassword) {
      console.log("Secret key missing");
      return;
    }
    // Loading shuru, ab button par spinner aur "Logging in..." dikhega
    setLoading(true);
    // try/catch isliye lagaya taake net slow ya band hone par error handle ho sake.
    try {
      // Encrypted password API ko send kiya.
      const data = await loginApi(username, encryptedPassword);
      // const data = await loginApi(username, password); // logapi sa user password call ker raha ha
      toast.success(data.message);
    } catch (error) {
      // Net issue ya server error aaye to ye error toast dikhayega
      toast.error("Someting wrong check you internet");
    } finally {
      // NEW: Success ho ya error, har halat me loading band ho jayegi
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 mt-8 flex w-full flex-col rounded-[26px] bg-white px-6 pb-8 pt-9 shadow-xl md:max-w-[460px] md:px-9 md:pb-10 md:pt-11">
      <h1 className="text-center text-[30px] font-bold text-neutral-900 md:text-[38px]">
        Welcome Back!
      </h1>
      <p className="mb-9 mt-4 text-center text-base text-neutral-900 md:text-lg">
        Login to continue your learning journey
      </p>

      <div className={box}>
        <img src="/user.png" alt="" className="h-6 w-6" />
        <input
          type="text"
          name="login-user"
          placeholder="Enter your username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={input}
        />
      </div>

      <div className={box}>
        <img src="/lock.png" alt="" className="h-6 w-6" />
        <input
          type={show ? "text" : "password"}
          name="login-pass"
          placeholder="Enter your password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={input}
        />
        {/*type="button" add kiya taake ye button form submit na kare */}
        <button type="button" onClick={() => setShow(!show)}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
            <circle cx="12" cy="12" r="3" />
            {show && <path d="M3 3l18 18" />}
          </svg>
        </button>
      </div>

      <a
        href="#"
        className="-mt-3 self-end text-sm text-teal-600 hover:underline"
      >
        Forgot password?
      </a>

      {/* onClick={handleLogin} add kiya, click par API call hogi */}
      {/* disabled={loading} add kiya taake loading ke dauran button dobara click na ho */}
      <button
        onClick={handleLogin}
        disabled={loading}
        className="mt-8 flex h-[56px] items-center justify-center gap-3 rounded-full bg-gradient-to-b from-[#19b8b0] to-[#0a8f8c] text-[24px] font-bold text-white shadow-md hover:brightness-105 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
      >
        {/*loading true ho to spinner + "Logging in..." dikhao, warna normal "Login" text */}
        {loading ? (
          <>
            <span className="h-6 w-6 animate-spin rounded-full border-[3px] border-white/40 border-t-white" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </button>
    </div>
  );
}
