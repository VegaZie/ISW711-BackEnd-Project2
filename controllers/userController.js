const User = require("../models/userModel");

/**
 * Crea un nuevo usuario.
 *
 * @param {*} req - Objeto de solicitud de Express que contiene los datos del usuario a crear.
 * @param {*} res - Objeto de respuesta de Express.
 */
const userPost = async (req, res) => {
  let user = new User(req.body);
  await user
    .save()
    .then((user) => {
      res.status(201); // CREATED
      res.header({
        location: `/api/users/?id=${user.id}`,
      });
      res.json(user);
    })
    .catch((err) => {
      res.status(422);
      console.error("Error al guardar el usuario:", err);
      res.json({
        error: "Hubo un error al guardar el usuario",
      });
    });
};

/**
 * Obtiene todos los usuarios o uno específico.
 *
 * @param {*} req - Objeto de solicitud de Express que puede contener un correo electrónico para buscar un usuario específico.
 * @param {*} res - Objeto de respuesta de Express.
 */
const userGet = (req, res) => {
  // Si se requiere un usuario específico
  let email = req.query.email;
  if (req.query && email) {
    User.findOne({ email })
      .populate("users")
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(404);
        console.error("Error al buscar el usuario:", err);
        res.json({ error: "El usuario no existe" });
      });
  } else {
    // Obtener todos los usuarios
    User.find()
      .populate("users")
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(422);
        console.error("Error al obtener los usuarios:", err);
        res.json({ error: err });
      });
  }
};

/**
 * Actualiza un usuario existente.
 *
 * @param {*} req - Objeto de solicitud de Express que contiene los datos del usuario a actualizar.
 * @param {*} res - Objeto de respuesta de Express.
 */
const userPatch = (req, res) => {
  if (req.query && req.query.id) {
    User.findByIdAndUpdate(req.query.id, req.body, function (err, user) {
      if (err) {
        res.status(404);
        console.error("Error al buscar el usuario:", err);
        res.json({ error: "El usuario no existe" });
      } else {
        res.status(200); // OK
        res.json(user);
      }
    });
  }
};

/**
 * Elimina un usuario existente.
 *
 * @param {*} req - Objeto de solicitud de Express que contiene el ID del usuario a eliminar.
 * @param {*} res - Objeto de respuesta de Express.
 */
const userDelete = (req, res) => {
  if (req.query && req.query.id) {
    User.findByIdAndDelete(req.query.id, function (err) {
      if (err) {
        res.status(404);
        console.error("Error al buscar el usuario:", err);
        res.json({ error: "El usuario no existe" });
      }
      if (err) {
        res.status(422);
        console.error("Error al eliminar el usuario:", err);
        res.json({
          error: "Hubo un error al eliminar el usuario",
        });
      }
      res.status(204); // NO CONTENT
      res.json({});
    });
  } else {
    res.status(404);
    res.json({ error: "El usuario no existe" });
  }
};

module.exports = {
  userPost,
  userGet,
  userPatch,
  userDelete,
};
