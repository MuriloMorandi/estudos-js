import { z } from "zod";

const schemaLesson005 = z.object({
  username: z.string().trim().min(1).max(25),
  role: z.enum(["admin", "user", "guest"]),
});

export default schemaLesson005;