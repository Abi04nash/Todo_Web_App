import express from "express";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todo.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// All CURD Operation done.



router.route("/").post(isAuthenticated, createTodo).get( isAuthenticated,getAllTodos);
router.route("/:todoId").put(isAuthenticated, updateTodo).delete(isAuthenticated, deleteTodo);
// router.route("/:todoId").delete(deleteTodo);

export default router;   