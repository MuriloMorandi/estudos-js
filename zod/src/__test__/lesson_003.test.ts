import schemaLesson003 from "../lesson_003";

describe("Validação de array", () => {
  it("deve aceitar arrays com tamanho entre 3 e 5", () => {
    expect(schemaLesson003.safeParse(["a", "b", "c"]).success).toBe(true);
  });

  it("deve rejeitar arrays menores que 3", () => {
    expect(schemaLesson003.safeParse(["a"]).success).toBe(false);
  });

  it("deve rejeitar arrays maior 5", () => {
    expect(schemaLesson003.safeParse(["a", "b", "c", "d", "e", "f"]).success).toBe(false);
  });

  it("deve rejeitar arrays com elementos inválidos", () => {
    expect(schemaLesson003.safeParse(["a", 1, "c"]).success).toBe(false);
  });

});
