import { z } from "zod";

const schemaLesson001 = z.string().trim().min(1).max(25);

export default schemaLesson001;