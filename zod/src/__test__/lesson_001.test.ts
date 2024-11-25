import schemaLesson001 from "../lesson_001";

describe(" Validação de string", () => {
  it("deve validar uma string válida", () => {
    const result = schemaLesson001.safeParse("String válida");
    expect(result.success).toBe(true);
  });

  it("deve falhar para string maior que 25 caracteres", () => {
    const result = schemaLesson001.safeParse("String maior que 25 caracteres");
    expect(result.success).toBe(false);
  });

  it("deve falhar para string vazia", () => {
    const result = schemaLesson001.safeParse("   ");
    expect(result.success).toBe(false);
  });

});
