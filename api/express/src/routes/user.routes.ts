import { Router } from "express";

import userController from "@controllers/user.controller";
import validate from "@middlewares/validade.middleware";
import paginationSchema from "@schemas/common/pagination.schema";
import createUserSchema from "@schemas/user/createUser.schema";
import updateUserSchema from "@schemas/user/updateUser.schema";

const userRoutes = Router();

userRoutes.get("/", validate(paginationSchema, "query"), userController.getAll.bind(userController));

userRoutes.get("/:id", userController.getById.bind(userController));

userRoutes.post("/", validate(createUserSchema, "body"), userController.create.bind(userController));

userRoutes.put("/:id", validate(updateUserSchema, "body"), userController.update.bind(userController));

userRoutes.delete("/:id", userController.delete.bind(userController));

export default userRoutes;
