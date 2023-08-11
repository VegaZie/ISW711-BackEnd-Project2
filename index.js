const express = require("express");
require("dotenv").config();
const app = express();

// conexión de base de datos
const mongoose = require("mongoose");
const db = mongoose.connect(process.env.MONGO_DATABASE_URL);
const secretKey = process.env.SECRET_KEY;
const User = require("./models/userModel");

const jwt = require("jsonwebtoken");
const {
  userPost,
  userGet,
  userPatch,
  userDelete,
} = require("./controllers/userController.js");

const { authenticate } = require("./controllers/sessionController.js");

const {
  promtDelete,
  promtGet,
  promtPatch,
  promtPost,
} = require("./controllers/promtController.js");

const {
  createImage,
  executeCompletionsPrompt,
  executeEditPromt,
} = require("./controllers/openAiController.js");

const { verifyOTP } = require("./controllers/twoStepVerification");

const { verifyEmailToken } = require("./controllers/emailVerification");

// analizador sintáctico del cuerpo de la solicitud (necesario para los métodos POST y PUT)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
app.use(
  cors({
    domains: "*",
    methods: "*",
  })
);

// Session
app.post("/api/authenticate", authenticate);

// Creación de usuario (no protegido por JWT)
app.post("/api/user", userPost);

// Veficación del OTP para la verificación en dos pasos (No protegido por JWT)
app.post("/api/otp/verification", verifyOTP);

//Verificación del correo de un nuevo usuario (No protegido por JWT)
app.post("/api/email/verification", verifyEmailToken);

/**
 * Middleware para verificar el token JWT en las rutas protegidas.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {function} next - Función para continuar con el siguiente middleware o ruta.
 */
app.use(function (req, res, next) {
  // Verificar si el token de autorización se encuentra en las cabeceras de la solicitud
  if (req.headers["authorization"]) {
    // Extraer el token del encabezado "Authorization"
    const authToken = req.headers["authorization"].split(" ")[1];

    try {
      // Verificar y decodificar el token utilizando la clave secreta
      jwt.verify(authToken, secretKey, (err, decodedToken) => {
        if (err || !decodedToken) {
          // Si hay un error o el token no es válido, enviar una respuesta de error de "Unauthorized"
          res.status(401);
          res.json({
            error: "Unauthorized",
          });
        } else {
          // Si el token es válido, continuar con el siguiente middleware o ruta
          next();
        }
      });
    } catch (e) {
      // Si ocurre un error durante la verificación del token, enviar una respuesta de error de "Unauthorized"
      res.status(401);
      res.send({
        error: "Unauthorized",
      });
    }
  } else {
    // Si no se proporciona un token de autorización, enviar una respuesta de error de "Unauthorized"
    res.status(401);
    res.send({
      error: "Unauthorized",
    });
  }
});

//Rutas de usuario (protegidas por JWT)
app.get("/api/user", userGet);
app.patch("/api/user", userPatch);
app.delete("/api/user", userDelete);

// Rutas Promt (protegidas por JWT)
app.post("/api/promt", promtPost);
app.get("/api/promt", promtGet);
app.patch("/api/promt", promtPatch);
app.delete("/api/promt", promtDelete);

// Rutas de ejución de Promt (protegidas por JWT)
app.post("/api/promt/execute/edit", executeEditPromt);
app.post("/api/promt/execute/completions", executeCompletionsPrompt);
app.post("/api/promt/execute/images", createImage);

app.listen(3001, () => console.log(`Listening on port 3001!`));
