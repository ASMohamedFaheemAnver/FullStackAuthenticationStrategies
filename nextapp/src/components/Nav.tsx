"use client";
import { options } from "@/app/api/auth/[...nextauth]/options";
// import { getServerSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";

const Nav = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4 flex-wrap gap-3">
        <div>My site</div>
        <div className="flex gap-4">
          <Link href={"/"}>Home</Link>
          <Link href={"/create-user"}>Create user</Link>
          <Link href={"/client-member"}>Client member</Link>
          <Link href={"/member"}>Member</Link>
          <Link href={"/public"}>Public</Link>
          {session ? (
            <Link href={"/api/auth/signout?callbackUrl=/"}>Logout</Link>
          ) : (
            <Link href={"/api/auth/signin"}>Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
