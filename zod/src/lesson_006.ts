import { z } from "zod";

const schemaLesson006 = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  linguagemDeProgramacaoPrincipal: z.string().min(2),
  nivel: z.enum(['junior', 'pleno', 'senior']),
  experienciaEmAnos: z.number().min(0).max(30),
  tecnologias: z.array(z.string()),
})
  .refine(
    (data) => data.nivel !== "pleno" ||
      (data.experienciaEmAnos >= 2 && data.tecnologias.length >= 1),
    {
      message: "Nível pleno requer pelo menos 2 anos de experiência",
      path: ["experienciaEmAnos"],
    }
  )
  .refine(
    (data) =>
      data.nivel !== "senior" ||
      (data.experienciaEmAnos >= 5 && data.tecnologias.length >= 2),
    {
      message: "Nível senior requer pelo menos 5 anos de experiência e 2 tecnologias",
      path: ["experienciaEmAnos", "tecnologias"],
    }
  );

export default schemaLesson006;