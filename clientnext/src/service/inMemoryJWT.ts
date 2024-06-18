const inMemoryJWTService = () => {
  let inMemoryJWT: string | null = null;

  const getToken = () => inMemoryJWT;

  const setToken = (token: string) => {
    inMemoryJWT = token;
  };

  return { getToken, setToken };
};

export default inMemoryJWTService();
