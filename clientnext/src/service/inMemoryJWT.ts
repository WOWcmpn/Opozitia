const inMemoryJWTService = () => {
  let inMemoryJWT = "";

  const getToken = () => inMemoryJWT;

  const setToken = (token: string) => {
    inMemoryJWT = token;
  };

  return { getToken, setToken };
};

export default inMemoryJWTService();
