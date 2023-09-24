import { dnaBodySchema } from "../src/domain/schemas/anomaly.schema"; // Asegúrate de importar el esquema correctamente

describe("dnaBodySchema", () => {
  it("should validate a correct 3x3 matrix", () => {
    const validData = {
      dna: [
        ["A", "T", "C"],
        ["G", "A", "T"],
        ["C", "T", "A"],
      ],
    };

    const result = dnaBodySchema.safeParse(validData);

    expect(result.success).toBe(true);
  });

  it("should invalidate a matrix with different lengths", () => {
    const invalidData = {
      dna: [
        ["A", "T"],
        ["G", "A", "T"],
        ["C", "T", "A"],
      ],
    };

    const result = dnaBodySchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error?.issues[0].message).toBe(
        "All matrices must have the same length."
      );
    } else {
      fail("Should not be successful");
    }
  });

  it("should invalidate a matrix smaller than 3x3", () => {
    const invalidData = {
      dna: [
        ["A", "T"],
        ["G", "A"],
      ],
    };

    const result = dnaBodySchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error?.issues[0].message).toBe(
        "The matrix must be at least 3x3."
      );
    } else {
      fail("Should not be successful");
    }
  });

  it("should invalidate a matrix larger than 2000x2000", () => {
    const largeArray = new Array(2001).fill("A");
    const invalidData = {
      dna: new Array(2001).fill(largeArray),
    };

    const result = dnaBodySchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error?.issues[0].message).toBe(
        "The matrix must be at most 2000x2000."
      );
    } else {
      fail("Should not be successful");
    }
  });
});
