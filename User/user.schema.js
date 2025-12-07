const z = require("zod");

const RegisterUserData = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginUserData = z.object({
  username: z.string(),
  password: z.string(),
});

module.exports = {
  RegisterUserData,
  LoginUserData,
};
