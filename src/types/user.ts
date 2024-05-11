import { Role } from "./role";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
}
