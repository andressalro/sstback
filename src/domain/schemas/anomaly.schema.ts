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
    ),
});
