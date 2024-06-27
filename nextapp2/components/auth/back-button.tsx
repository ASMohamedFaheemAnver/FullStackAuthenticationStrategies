"use client";

import Link from "next/link";
import { Button } from "../ui/button";

type Props = {
  href: string;
  label: string;
};

const BackButton = ({ href, label }: Props) => {
  return (
    <Button
      variant={"link"}
      className="font-normal w-full"
      size={"sm"}
      asChild
      type="button"
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
