import { z } from "zod";

const schemaLesson003 = z.array(z.string()).min(3).max(5);

export default schemaLesson003;