import createUserSchema from "@schemas/user/createUser.schema";

describe("Validação do createUserSchema", () => {
  it("deve validar um objeto válido", () => {
    const validData = { name: "João", email: "joao@example.com" };
    const result = createUserSchema.safeParse(validData);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });

  it("deve falhar quando o 'name' tem menos de 2 caracteres", () => {
    const invalidData = { name: "A", email: "joao@example.com" };
    const result = createUserSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("Mínimo 2 caracteres");
      expect(result.error.errors[0].path).toEqual(["name"]);
    }
  });

  it("deve falhar quando o e-mail não é válido", () => {
    const invalidData = { name: "João", email: "email-invalido" };
    const result = createUserSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("E-mail inválido");
      expect(result.error.errors[0].path).toEqual(["email"]);
    }
  });

  it("deve falhar quando o name está vazio", () => {
    const invalidData = { name: " ", email: "joao@example.com" };
    const result = createUserSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("Mínimo 2 caracteres");
      expect(result.error.errors[0].path).toEqual(["name"]);
    }
  });

  it("deve falhar quando o e-mail está vazio", () => {
    const invalidData = { name: "João", email: "" };
    const result = createUserSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("E-mail inválido");
      expect(result.error.errors[0].path).toEqual(["email"]);
    }
  });
});
