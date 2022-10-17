const TOKEN_KEY = "laksdjf;klasjd;lfjwqeiofjsdvk;lajoeifjqr9230u4i0$U*()%U*(!@#$)(ISD()Fui9283";

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token;
};

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};
