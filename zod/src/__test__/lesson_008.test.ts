import schemaLesson008 from "../lesson_008";


describe("Combinação de esquemas", () => {
  it("deve validar um objeto válido", () => {
    const obj = {
      username: "João123",
      nome: "João Silva",
      role: "admin",
    };

    expect(schemaLesson008.safeParse(obj).success).toBe(true);
  });

  it("deve falhar para um objeto com 'username' inválido", () => {
    const invalidData = {
      username: "J", // menor que 2 caracteres
      nome: "João Silva",
      role: "user",
    };

    expect(schemaLesson008.safeParse(invalidData).success).toBe(false);    
  });

  it("deve falhar para um objeto com 'role' inválido", () => {
    const invalidData = {
      username: "Maria123",
      nome: "Maria",
      role: "superadmin", // valor inválido
    };

    expect(schemaLesson008.safeParse(invalidData).success).toBe(false);
  });

  it("deve falhar para um objeto com 'nome' inválido", () => {
    const invalidData = {
      username: "João123",
      nome: 12345, // não é string
      role: "admin",
    };

    expect(schemaLesson008.safeParse(invalidData).success).toBe(false);
  });

  it("deve falhar para um objeto com campos faltando", () => {
    const invalidData = {
      username: "João123",
      role: "admin",
    };

    expect(schemaLesson008.safeParse(invalidData).success).toBe(false);
  });
});
