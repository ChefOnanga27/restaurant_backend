import express from 'express';
import { createComment, deleteComment } from '../controllers/commentControllers.js';
import authMiddleware from '../middlewares/authMiddlewares.js';
const router = express.Router();

router.post('/', authMiddleware, createComment);
router.delete('/:id', authMiddleware, deleteComment);

export default router;
