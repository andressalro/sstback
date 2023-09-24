import { z } from "zod";

const dnaArraySchema = z.array(z.string().length(1).regex(/[A-Z]/));

export const dnaBodySchema = z.object({
  dna: z
    .array(dnaArraySchema)
    .nonempty()
    .refine(
      (arr) => {
        const length = arr[0].length;
        return arr.every((subArr) => subArr.length === length);
      },
      {
        message: "All matrices must have the same length.",
        path: ["dna"],
      }
    )
    .refine((arr) => arr.length >= 3 && arr[0].length >= 3, {
      message: "The matrix must be at least 3x3.",
      path: ["dna"],
    })
    .refine((arr) => arr.length <= 2000 && arr[0].length <= 2000, {
      message: "The matrix must be at most 2000x2000.",
      path: ["dna"],
    }),
});
