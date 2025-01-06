import schema from "@schemas/task/updateTask.schema";

const idTest = 'V1StGXR8_Z5jdHi6B-myT';

describe("Validação do Schema: updateTask", () => {
  it("Deve validar um objeto válido", () => {
    const validData = {
      id: idTest,
      title: "Título Válido",
      description: "Descrição válida",
    };
    
    const result = schema.safeParse(validData);

    expect(result.success).toBe(true);
  });

  it("Deve falhar se id for um id inválido", () => {
    const invalidData = {
      id: "curto",
      title: "Título Válido",
      description: "Descrição válida",
    };

    const result = schema.safeParse(invalidData);
    
    expect(result.success).toBe(false);
    if(!result.success){
      expect(result.error.errors[0].message).toBe("ID inválido")
    }
  });

  it("Deve falhar para um título vazio", () => {
    const invalidData = {
      id: idTest,
      title: "",
      description: "Descrição válida",
    };
    
    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if(!result.success){
      expect(result.error.errors[0].message).toBe("Mínimo 1 caractere");
    }
  }); 
});