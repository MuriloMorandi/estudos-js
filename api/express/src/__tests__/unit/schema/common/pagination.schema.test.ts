import paginationSchema from '@schemas/common/pagination.schema';

describe("Schema de paginação", () => {
  it("deve validar um objeto de paginação válido", () => {
    const validInput = {
      perPage: "10",
      page: "1",
      sortBy: "name",
      sortDesc: "true",
    };

    const result = paginationSchema.safeParse(validInput);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({
        perPage: 10,
        page: 1,
        sortBy: "name",
        sortDesc: true,
      });
    }
  });

  it("deve falhar quando perPage não for um inteiro positivo", () => {
    const invalidInput = {
      perPage: "-5",
      page: "1",
      sortBy: "name",
      sortDesc: "true",
    };

    const result = paginationSchema.safeParse(invalidInput);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "O número de itens por página deve ser maior que 0."
      );
    }
  });

  it("deve falhar quando pagina não for um inteiro positivo", () => {
    const invalidInput = {
      perPage: "10",
      page: "-2",
      sortBy: "name",
      sortDesc: "true",
    };

    const result = paginationSchema.safeParse(invalidInput);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "O número da página deve ser maior que 0."
      );
    }
  });

  it("deve falhar quando sortBy tiver menos de 2 caracteres", () => {
    const invalidInput = {
      perPage: "10",
      page: "1",
      sortBy: "a",
      sortDesc: "true",
    };

    const result = paginationSchema.safeParse(invalidInput);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "O valor de 'sortBy' deve conter pelo menos 2 caracteres, indicando a coluna que vai ser ordernada."
      );
    }
  });

  it("deve falhar quando sortDesc não for 'true' ou 'false'", () => {
    const invalidInput = {
      perPage: "10",
      page: "1",
      sortBy: "name",
      sortDesc: "invalid",
    };

    const result = paginationSchema.safeParse(invalidInput);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "O valor de 'sortDesc' deve ser 'true' ou 'false', indicando se a ordenação é descendente."
      );
    }
  });

  it("deve remover espaços extras em sortBy", () => {
    const input = {
      perPage: "10",
      page: "1",
      sortBy: "   name   ",
      sortDesc: "true",
    };

    const result = paginationSchema.safeParse(input);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.sortBy).toBe("name");
    }
  });

  it("deve transformar a string sortDesc em um Boolean", () => {
    const input = {
      perPage: "10",
      page: "1",
      sortBy: "   name   ",
      sortDesc: "true",
    };

    const result = paginationSchema.safeParse(input);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.sortDesc).toBe(true);
    }
  });
});