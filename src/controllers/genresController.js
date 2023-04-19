const db = require("../database/models");
const { getAllGenres, createGenre } = require("../services/genresServices");


module.exports = {
  list: async (req, res) => {
    try {
      const genres = await getAllGenres()
      return res.status(200).json({
        ok : true,
        data : genres,
        meta : {
            status : 200,
            total : genres.length
        },
      })

    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok : false,
        error : {
          status : error.status || 500,
          message : error.message || 'Ups,hubo un error'
        }
      })
    }
  },
  detail: async (req, res) => {

    try {
      const {id} = req.params;

      const genre = await db.Genre.findByPk(req.params.id)
      return res.status(200).json({
        ok : true,
        data : genre,
        meta : {
            status : 200,
            total : 1,
            url : '/api/genres/' + id,
        },
      })  

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg : error.message
      })
    }

  },

  
  store : async (req,res) =>{
    try {
      
    } catch (error) {
      
    }
    createGenre
  },
  update : async (req,res) =>{

  },
  destroy : async (req,res) =>{

  },
};
