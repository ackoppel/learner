export const getApiRequestHeaders = (token: string | null) => {
  return {
    Authorization: !!token ? `Bearer ${token}` : undefined,
    "Content-type": "application/json",
  };
};
