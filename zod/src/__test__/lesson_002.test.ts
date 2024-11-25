import schemaLesson002 from "../lesson_002";


describe("Validação de Objeto", () => {
  it("deve validar um objeto válido", () => {
    const result = schemaLesson002.safeParse({ nome: "João", idade: 20, email:"valido@email.com", apelido: "Jão"});
    expect(result.success).toBe(true);
  });

  it("deve validar um objeto válido (sem apelido)", () => {
    const result = schemaLesson002.safeParse({ nome: "João", idade: 20, email:"valido@email.com"});
    expect(result.success).toBe(true);
  });

  it("deve falhar para idade menor que 18", () => {
    const result = schemaLesson002.safeParse({ nome: "João", idade: 17, email:"valido@email.com", apelido: "Jão" });
    expect(result.success).toBe(false);
  });

  it("deve falhar para email inválido", () => {
    const result = schemaLesson002.safeParse({ nome: "João", idade: 20, email:"validoemail.com", apelido: "Jão"});
    expect(result.success).toBe(false);
  });

  it("deve falhar para apelido inválido", () => {
    const result = schemaLesson002.safeParse({ nome: "João", idade: 20, email:"valido@email.com", apelido: "J"});
    expect(result.success).toBe(false);
  });

  it("deve falhar para apelido inválido", () => {
    const result = schemaLesson002.safeParse({ nome: "João", idade: 20, email:"valido@email.com", apelido: "J  "});
    expect(result.success).toBe(false);
  });

});