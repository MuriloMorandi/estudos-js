import schemaLesson005 from "../lesson_005";



describe("Validação de enums", () => {
  it("deve aceitar valores válidos do enum", () => {
    expect(schemaLesson005.safeParse({
      username: "muriloMorais",
      role: "admin"
    }).success).toBe(true);
  });

  it("deve rejeitar valores inválidos", () => {
    expect(schemaLesson005.safeParse({
      username: "muriloMorais",
      role: "invalid"
    }).success).toBe(false);
  });
  
});