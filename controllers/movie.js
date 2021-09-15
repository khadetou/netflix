import Movie from "@/models/Movie";
import asyncHandler from "@/middlewares/asyncHandler";

//@Desc create a movie
//@route Post/api/movie
//@Protect user is admin

export const createMovie = asyncHandler(async (req, res) => {
  const {
    title,
    desc,
    img,
    imgTitle,
    imgSm,
    trailler,
    video,
    year,
    limit,
    genre,
    isSeries,
  } = req.body;

  const movie = {};
  if (title) movie.title = title;
  if (desc) movie.desc = desc;
  if (img) movie.img = img;
  if (genre) movie.genre = genre;
  if (imgTitle) movie.imgTitle = imgTitle;
  if (imgSm) movie.imgSm = imgSm;
  if (trailler) movie.trailler = trailler;
  if (video) movie.video = video;
  if (year) movie.year = year;
  if (limit) movie.limit = limit;
  if (isSeries) movie.isSeries = isSeries;

  const savedMovie = await Movie.create(movie);
  res.json(savedMovie);
});

//@Desc Get all movie
//@route Get/api/movie/:id
//@Protect user is admin
export const getAllMovie = asyncHandler(async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

//@Desc Get all movie
//@route Get/api/movie
//@Protect user is admin
export const getAllMovie = asyncHandler(async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

//@Desc get Movie
//@Route get/api/movie

export const getMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.user._id);
  if (!movie) {
    res.status(404);
    throw Error("No Movie with that id was found");
  }
  res.status(200).json(movie);
});

//@Desc update a movie
//@route Put/api/movie/:id
//@Protect user is admin

export const updateMovie = asyncHandler(async (req, res) => {
  const { id } = req.query;
  let movie = await Movie.findById(id);

  const {
    title,
    desc,
    img,
    imgTitle,
    imgSm,
    trailler,
    video,
    year,
    limit,
    genre,
    isSeries,
  } = req.body;

  if (movie) {
    (movie.title = title || movie.title),
      (movie.img = img || movie.img),
      (movie.imgSm = imgSm || movie.imgSm),
      (movie.desc = desc || movie.desc),
      (movie.imgTitle = imgTitle || movie.imgTitle),
      (movie.trailler = trailler || movie.trailler),
      (movie.video = video || movie.video),
      (movie.year = year || movie.year),
      (movie.limit = limit || movie.limit),
      (movie.genre = genre || movie.genre),
      (movie.isSeries = isSeries || movie.isSeries);
  } else {
    res.status(404);
    throw Error("No Movie with that id was found");
  }

  const updatedMovie = await movie.save();
  res.json(updatedMovie);
});

//@Desc delete a movie
//@route delete/api/movie/:id
//@Protect user is admin

export const deletMovie = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const movie = await Movie.findById(id);
  if (!movie) {
    res.status(404);
    throw Error("Movie not found");
  }

  await movie.remove();
  res.json({ message: "Movie removed successfully!" });
});

//@Desc get random Movie
//@route Get/api/random
//@Access private
export const getRandomMovie = asyncHandler(async (req, res) => {
  const { type } = req.query;
  let movie;
  if (type === "series") {
    movie = await Movie.aggregate([
      {
        $match: { isSeries: true },
      },
      {
        $sample: { size: 1 },
      },
    ]);
  } else {
    movie = await Movie.aggregate([
      {
        $match: { isSeries: false },
      },
      {
        $sample: { size: 1 },
      },
    ]);
  }

  res.json(movie);
});
