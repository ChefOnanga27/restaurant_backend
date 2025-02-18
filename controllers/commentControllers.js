import Comment from '../models/Comment.js';

export const createComment = async (req, res) => {
  const { content, recipeId } = req.body;
  const comment = await Comment.create({ content, recipeId, userId: req.user.id });
  res.status(201).json(comment);
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  await Comment.destroy({ where: { id } });
  res.json({ message: "Commentaire supprimé" });
};
