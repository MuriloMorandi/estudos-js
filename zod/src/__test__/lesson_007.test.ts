import schemaLesson007 from "../lesson_007";

describe("Validação aninhada", () => {
  it("Deve passar para um objeto valido ", () => {
    const obj = {
      nome: {
        id: "550e8400-e29b-41d4-a716-446655440000", // UUID válido
        nome: "Roselita",
      },
      enderecos: [
        {
          rua: "Rua A",
          numero: 123,
          bairro: "Bairro B",
          cidade: "Cidade C",
          cep: "12345-678",
        },
      ],
    };

    expect(schemaLesson007.safeParse(obj).success).toBe(true);
  });

  it("Deve falhar para um UUID inválido", () => {
    const obj = {
      nome: {
        id: "1234", // UUID inválido
        nome: "Exemplo Nome",
      },
      enderecos: [
        {
          rua: "Rua A",
          numero: 123,
          bairro: "Bairro B",
          cidade: "Cidade C",
          cep: "12345-678",
        },
      ],
    };

    expect(schemaLesson007.safeParse(obj).success).toBe(false);
  });

  it("Deve falhar para CEP inválido", () => {
    const invalidData = {
      nome: {
        id: "550e8400-e29b-41d4-a716-446655440000",
        nome: "Exemplo Nome",
      },
      enderecos: [
        {
          rua: "Rua A",
          numero: 123,
          bairro: "Bairro B",
          cidade: "Cidade C",
          cep: "123456-78", // CEP inválido
        },
      ],
    };

    expect(schemaLesson007.safeParse(invalidData).success).toBe(false);
  });

  it("Deve falhar para número negativo do endereço", () => {
    const invalidData = {
      nome: {
        id: "550e8400-e29b-41d4-a716-446655440000",
        nome: "Exemplo Nome",
      },
      enderecos: [
        {
          rua: "Rua A",
          numero: -5, // Número inválido
          bairro: "Bairro B",
          cidade: "Cidade C",
          cep: "12345-678",
        },
      ],
    };

    expect(schemaLesson007.safeParse(invalidData).success).toBe(false);
  });
  
});



