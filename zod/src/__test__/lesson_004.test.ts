import schemaLesson004 from "../lesson_004";


describe("Validação de array de Objetos", () => {
  it("deve validar um objeto válido", () => {
    const result = schemaLesson004.safeParse({
      nome: "Codigo Limpo",
      preco: 21.99,
      quantidade: 2,
      categoria: ["Tech"],
    });
    expect(result.success).toBe(true);
  });

  it("deve falhar para preco meno que zero", () => {
    const result = schemaLesson004.safeParse({
      nome: "Codigo Limpo",
      preco: -1.50,
      quantidade: 2,
      categoria: ["Tech", "Livros"],
    });
    expect(result.success).toBe(false);
  });

  it("deve falhar para quantidade menor que zero", () => {
    const result = schemaLesson004.safeParse({
      nome: "Codigo Limpo",
      preco: 21.99,
      quantidade: -1,
      categoria: ["Tech"],
    });
    expect(result.success).toBe(false);
  });
    
  it("deve falhar para categoria vazia", () => {
    const result = schemaLesson004.safeParse({
      nome: "Codigo Limpo",
      preco: 21.99,
      quantidade: 2,
      categoria: [],
    });
    expect(result.success).toBe(false);
  });

  it
});
