import List from "@/models/List";
import asyncHandler from "@/middlewares/asyncHandler";
import APIFeatures from "@/utils/ApiFeatures";

//@Desc create a list
//@route Post/api/list
//@Protect user is admin

export const createList = asyncHandler(async (req, res) => {
  const { title, type, genre, content } = req.body;

  const lists = {};
  if (title) lists.title = title;
  if (type) lists.type = type;
  if (genre) lists.genre = genre;
  if (content) lists.content = content;

  const savedList = await List.create(lists);
  res.json(savedList);
});

//@Desc delete a list
//@route delete/api/list/:id
//@Protect user is admin

export const deletList = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const list = await List.findById(id);
  if (!list) {
    res.status(404);
    throw Error("List not found");
  }

  await list.remove();
  res.json({ message: "List removed successfully!" });
});

//@Desc get list
//@route Get/api/list
//@Access public

export const getList = asyncHandler(async (req, res) => {
  const { type, genre } = req.query;
  let list = [];
  if (type) {
    if (genre) {
      list = await List.aggregate([
        {
          $sample: { size: 10 },
        },
        {
          $match: { type, genre },
        },
      ]);
    } else {
      list = await List.aggregate([
        {
          $sample: { size: 10 },
        },
        {
          $match: { type },
        },
      ]);
    }
  } else {
    list = await List.aggregate([
      {
        $sample: { size: 10 },
      },
    ]);
  }

  res.json(list);
});
