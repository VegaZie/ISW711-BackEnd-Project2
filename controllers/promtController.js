require("dotenv").config();
const Promt = require("../models/promtModel");

/**
 * Crea un nuevo registro de promt en la base de datos.
 *
 * @param {*} req - Objeto de solicitud de Express.
 * @param {*} res - Objeto de respuesta de Express.
 */
const promtPost = async (req, res) => {
  let promt = new Promt(req.body);
  await promt
    .save()
    .then((promt) => {
      res.status(201); // CREATED
      res.header({
        location: `/api/promt/?id=${promt.id}`,
      });
      res.json(promt);
    })
    .catch((err) => {
      res.status(422);
      res.json({
        error: "Hubo un error al guardar el promt",
      });
    });
};

/**
 * Obtiene todos los registros de promt almacenados en la base de datos.
 * También puede obtener un solo registro si se proporciona un ID específico en la consulta.
 *
 * @param {*} req - Objeto de solicitud de Express.
 * @param {*} res - Objeto de respuesta de Express.
 */
const promtGet = (req, res) => {
  // Si se requiere un promt específico
  let userID = req.query.userID;
  if (req.query && userID) {
    Promt.find({ userID })
      .then((promt) => {
        res.json(promt);
      })
      .catch((err) => {
        res.status(404);
        res.json({ error: "El promt no existe" });
      });
  }
};

/**
 * Actualiza un registro de promt en la base de datos.
 *
 * @param {*} req - Objeto de solicitud de Express.
 * @param {*} res - Objeto de respuesta de Express.
 */
const promtPatch = (req, res) => {
  if (req.query && req.query.id) {
    Promt.findByIdAndUpdate(req.query.id, req.body, function (err, promt) {
      if (err) {
        res.status(404);
        res.json({ error: "El promt no existe" });
      } else {
        res.status(200); // OK
        res.json(promt);
      }
    });
  }
};

/**
 * Elimina un registro de promt de la base de datos.
 *
 * @param {*} req - Objeto de solicitud de Express.
 * @param {*} res - Objeto de respuesta de Express.
 */
const promtDelete = (req, res) => {
  if (req.query && req.query.id) {
    Promt.findByIdAndDelete(req.query.id, function (err) {
      if (err) {
        res.status(404);
        res.json({ error: "El promt no existe" });
      }
      if (err) {
        res.status(422);
        res.json({
          error: "Hubo un error al eliminar el promt",
        });
      }
      res.status(204); // No Content
      res.json({});
    });
  } else {
    res.status(404);
    res.json({ error: "El promt no existe" });
  }
};

module.exports = {
  promtPost,
  promtGet,
  promtPatch,
  promtDelete,
};
