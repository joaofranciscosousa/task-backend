import { z } from "zod";

const createUserSchema = z.object({
  password: z
    .string({
      message: "Senha deve ser string", // corrigir
    })
    .min(1, { message: "Senha não pode ser vazio" }),
  email: z
    .string({
      message: "E-mail deve ser string", // corrigir
    })
    .min(1, { message: "E-mail não pode ser vazio" }),
  name: z
    .string({
      message: "Nome deve ser string", // corrigir
    })
    .min(1, { message: "Nome não pode ser vazio" }),
});

const loginUserSchema = z.object({
  password: z
    .string({
      message: "Senha deve ser string", // corrigir
    })
    .min(1, { message: "Senha não pode ser vazio" }),
  email: z
    .string({
      message: "E-mail deve ser string", // corrigir
    })
    .min(1, { message: "E-mail não pode ser vazio" }),
});

export { createUserSchema, loginUserSchema };
