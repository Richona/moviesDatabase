const db = require("../database/models");

module.exports = {
  list: (req, res) => {
    db.Movie.findAll()
      .then((movies) => res.render("moviesList", { movies }))
      .catch((error) => console.log(error));
  },
  new: (req, res) => {
    db.Movie.findAll({
      order: [["release_date", "DESC"]],
    })
      .then((movies) => res.render("newestMovies", { movies }))
      .catch((error) => console.log(error));
  },
  recommended: (req, res) => {
    db.Movie.findAll({
      order: [["release_date", "DESC"]],
      limit: 5
    })
      .then((movies) => res.render("recommendedMovies", { movies }))
      .catch((error) => console.log(error));
  },
  detail: (req, res) => {
    db.Movie.findByPk(req.params.id)
      .then((movie) => res.render("moviesDetail", { movie }))
      .catch((error) => console.log(error));
  },
};
