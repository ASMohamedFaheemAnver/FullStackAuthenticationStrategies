"use client";

import { logout } from "@/actions/signout";

interface LogoutButtonProps {
  children: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout();
  };
  return (
    <button type="submit" onClick={onClick} className="cursor=pointer">
      {children}
    </button>
  );
};
