export type User = {
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  idRole: number;
  roleDescription: string;
  status: "A" | "I";
};

export const DEFAULT_USER: User = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  idRole: 0,
  roleDescription: "",
  status: "I"
};
