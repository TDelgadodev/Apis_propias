const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': async (req, res) => {
        try {
            const movies = await db.Movie.findAll({include:['genre']});
            return res.status(200).json({
                ok : true,
                data : movies,
                meta : {
                    status : 200,
                    total : movies.length
                },
            }) 

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg : error.message
            })
        }
        
    },
    'detail': async (req, res) => {

            try {
                const {id} = req.params
                const movie = await db.Movie.findByPk(req.params.id,{
                    include : ['genre']
                })
                return res.status(200).json({
                    ok : true,
                    data : movie,
                    meta : {
                        status : 200,
                        total : 1,
                        url : `/api/movies/${id}`
                    }
                })
                
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    msg : error.message
                })
            }
    },
    store: async function (req,res) {
    try {
       const movie = await  Movies.create({
               title: req.body.title,
               rating: req.body.rating,
               awards: req.body.awards,
               release_date: req.body.release_date,
               length: req.body.length,
               genre_id: req.body.genre_id
           })
           return res.status(200).json({
            ok : true,
            data : movie,
            meta : {
                status : 200,
                total : 1,
                url: `/api/movies/${movie.id}`
            }
           })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg : error.message
        })
       } 
    },
     update: async function (req,res) {

        try {
            let movieId = req.params.id;
        const movie = await Movies.update({...req.body},
            {
                where: {id: movieId}
            })
            return res.status(200).json({
                ok : true,
                data : movie,
                meta : {
                    status : 200,
                    total : 1,
                    url: `/api/movies/${movieId}`
                }
               })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg : error.message
            })
        }
    },
    destroy: async function (req,res) {
        try {
            let movieId = req.params.id;
            const movie = await Movies.destroy({where: {id: movieId}, force: true}) // force: true es para asegurar que se ejecute la acción 
            return res.status(200).json({
                ok : true,
                data : movie,
                meta : {
                    status : 200,
                    total : 1,
                    url: `/api/movies`
                }
               })
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg : error.message
            })
        }
    }
}

module.exports = moviesController;