import updateUserSchema from "@schemas/user/updateUser.schema";

const idTest = 'V1StGXR8_Z5jdHi6B-myT';

describe("Validação do updateUserSchema", () => {

  it("Deve validar um input válido", () => {
    const validInput = {
      id: idTest,
      name: "John",
      email: "john@example.com",
    };
      
    const result = updateUserSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });
  
  it("Deve falhar se id for menor que 1", () => {
    const invalidInput = {
      id: 'asd',
      name: "John",
      email: "john@example.com",
    };

    const result = updateUserSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("ID inválido");
  });

    it("Deve falhar se id não for um nanoid inteiro", () => {
     const invalidInput = {
        id: 'not-a-nanoid',
        name: "John",
        email: "john@example.com",
      };

      const result = updateUserSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("Deve falhar se id for ausente", () => {
        const invalidInput = {
            name: "John",
            email: "john@example.com",
        };

      const result = updateUserSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  

  
  it("Deve falhar se name tiver menos de 2 caracteres", () => {
      const invalidInput = {
        id: idTest,
        name: "j",
        email: "john@example.com",
      };

    const result = updateUserSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("Mínimo 2 caracteres");
  });

  it("Deve falhar se name for apenas espaços", () => {
    const invalidInput = {
      id: idTest,   
      name: "  ",
      email: "john@example.com",
    };
    const result = updateUserSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("Mínimo 2 caracteres");
  });

  it("Deve falhar se name for ausente", () => {
      const invalidInput = {
        id: idTest,
        email: "john@example.com",
      };

      const result = updateUserSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
  });
  

  it("Deve falhar se email não for um formato válido", () => {
    const invalidInput = {
      id: idTest,
      name: "John",
      email: "invalid-email",
    };
    
    const result = updateUserSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("E-mail inválido");
  });

  it("Deve falhar se email for ausente", () => {
    const invalidInput = {
      id: idTest,
      name: "John",
    };
      
    const result = updateUserSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });
  
});
