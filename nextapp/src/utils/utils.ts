export const isBrowser = () => {
  return typeof window !== "undefined";
};

export const getErrorFromAxiosError = (e: any) => {
  const error = e?.response?.data?.message || "something went wrong";
  return `${error[0].toUpperCase()}${error.slice(1)}`;
};
