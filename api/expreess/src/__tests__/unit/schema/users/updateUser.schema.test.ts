import updateUserSchema from "@schemas/user/updateUser.schema";


describe("Validação do updateUserSchema", () => {
  

  it("Deve validar um input válido", () => {
    const validInput = {
        id: 1,
        name: "John",
        email: "john@example.com",
    };
      
    const result = updateUserSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  
    it("Deve falhar se id for menor que 1", () => {
        const invalidInput = {
            id: 0,
            name: "John",
            email: "john@example.com",
        };
    
        const result = updateUserSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
        expect(result.error?.errors[0].message).toBe("ID inválido");
    });

    it("Deve falhar se id não for um número inteiro", () => {
     const invalidInput = {
            id: 1.5,
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
          id:1,
            name: "j",
            email: "john@example.com",
        };

      const result = updateUserSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
      expect(result.error?.errors[0].message).toBe("Mínimo 2 caracteres");
    });

    it("Deve falhar se name for apenas espaços", () => {
     const invalidInput = {
         id: 1,   
         name: "  ",
        email: "john@example.com",
        };
      const result = updateUserSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
      expect(result.error?.errors[0].message).toBe("Mínimo 2 caracteres");
    });

    it("Deve falhar se name for ausente", () => {
        const invalidInput = {
            id: 1,
            email: "john@example.com",
        };

        const result = updateUserSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
    });
  

  describe("Campo email", () => {
      it("Deve falhar se email não for um formato válido", () => {
        const invalidInput = {
            id: 1,
            name: "John",
            email: "invalid-email",
        };
        
        const result = updateUserSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
        expect(result.error?.errors[0].message).toBe("E-mail inválido");
    });

      it("Deve falhar se email for ausente", () => {
        const invalidInput = {
            id: 1,
            name: "John",
        };
          
        const result = updateUserSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
    });
  });
});
