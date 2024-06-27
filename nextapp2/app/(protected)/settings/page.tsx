import { auth } from "@/auth";
import React from "react";

type Props = {};

const Settings = async ({}: Props) => {
  const session = await auth();

  return <div>{JSON.stringify(session)}</div>;
};

export default Settings;
