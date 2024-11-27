import schemaLesson006 from "../lesson_006";


describe("Validação do schemaLesson006", () => {
  it("deve retornar erro para nível pleno com menos de 2 anos de experiência", () => {
    const result = schemaLesson006.safeParse({
      nome: "Maria",
      email: "maria@exemplo.com",
      linguagemDeProgramacaoPrincipal: "JS",
      nivel: "pleno",
      experienciaEmAnos: 1,
      tecnologias: ["JavaScript"],
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Nível pleno requer pelo menos 2 anos de experiência"
      );
    }
  });

  it("deve retornar erro para nível senior com menos de 5 anos de experiência e tecnologias insuficientes", () => {
    const result = schemaLesson006.safeParse({
      nome: "João",
      email: "joao@exemplo.com",
      linguagemDeProgramacaoPrincipal: "Python",
      nivel: "senior",
      experienciaEmAnos: 3,
      tecnologias: ["Python"],
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Nível senior requer pelo menos 5 anos de experiência e 2 tecnologias"
      );
    }
  });

  it("deve passar para um senior com mais de 5 anos de experiência e com pelo menos duas tecnologias", () => {
    const result = schemaLesson006.safeParse({
      nome: "Carlos",
      email: "carlos@exemplo.com",
      linguagemDeProgramacaoPrincipal: "Java",
      nivel: "senior",
      experienciaEmAnos: 6,
      tecnologias: ["Java", "Spring Boot"],
    });

    expect(result.success).toBe(true);
  });

  it("deve passar para um pleno com mais de 2 anos de experiência", () => {
    const result = schemaLesson006.safeParse({
      nome: "Roberta",
      email: "roberta@exemplo.com",
      linguagemDeProgramacaoPrincipal: "js",
      nivel: "pleno",
      experienciaEmAnos: 6,
      tecnologias: ["Typescript"],
    });

    expect(result.success).toBe(true);
  });

  it("deve passar para um junior sem tempo de experiência ", () => {
    const result = schemaLesson006.safeParse({
      nome: "Roberta",
      email: "roberta@exemplo.com",
      linguagemDeProgramacaoPrincipal: "js",
      nivel: "junior",
      experienciaEmAnos: 0,
      tecnologias: [],
    });

    expect(result.success).toBe(true);
  });
});
