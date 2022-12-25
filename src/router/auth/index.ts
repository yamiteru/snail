import { t } from "@app";
import { code } from "./code";
import { login } from "./login";
import { register } from "./register";

export const auth = t.router({
  register,
  code,
  login,
});
