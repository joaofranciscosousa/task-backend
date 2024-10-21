import { z } from "zod";

const createTaskSchema = z.object({
  description: z
    .string({
      message: "Descrição deve ser string", // corrigir
    })
    .min(1, { message: "Descrição não pode ser vazio" }),
  estimateAt: z.coerce.date({
    message: "Data de estimativa deve ser do tipo data",
  }),
});

export { createTaskSchema };
