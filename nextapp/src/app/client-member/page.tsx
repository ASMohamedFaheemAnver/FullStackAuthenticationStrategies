"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const MemberClient = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client-member");
    },
  });

  return (
    <div>
      <h1>MemberClient client session!</h1>
      <p>{session?.user.email}</p>
      <p>{session?.user.role}</p>
    </div>
  );
};

export default MemberClient;
