const moment = require("moment");
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
  add: function (req, res) {
    db.Genre.findAll({
      order: ["name"]
    })
      .then(genres => res.render("moviesAdd",{
        genres
      }))
      .catch(error => console.log(error))
  },
  create: function (req, res) {
    // TODO
    const {title, release_date, rating, awards, genre_id, length} = req.body;
    db.Movie.create({
      ...req.body,
      title: title.trim(),
    })
      .then(movie => {
        return res.redirect("/movies/detail/" + movie.id)
      })
      .catch(error => console.log(error))
  },
  edit: function (req, res) {
    let genres = db.Genre.findAll({
      order:["name"]
    });
    let movie = db.Movie.findByPk(req.params.id)

    Promise.all([genres, movie])
      .then(([genres, movie]) => {
        res.render("moviesEdit",{
          genres,
          Movie: movie,
          moment: moment
        })
      })
      .catch(error => console.log(error))
  },
  update: function (req, res) {
    db.Movie.update({
      ...req.body,
      title: req.body.title.trim()
    },{
      where: {id: req.params.id}
    })
      .then(response =>{
        return res.redirect("/movies/detail/"+ req.params.id)
      })
      .catch(error => console.log(error))
  },
  delete: function (req, res) {
    db.Movie.findByPk(req.params.id)
      .then(movie => res.render("moviesDelete", {
        Movie:movie
      }))
      .catch(error => console.log(error))
  },
  destroy: function (req, res) {
    db.Movie.destroy({
      where:{
        id:req.params.id
      }
    })
      .then(result => {
        return res.redirect("/movies")
      })
      .catch(error => console.log(error))
  }

};
