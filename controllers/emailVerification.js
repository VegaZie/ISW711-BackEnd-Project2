const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const { userPatchVerified } = require("./userController.js");

function verifyEmailToken(req, res) {
  try {
    jwt.verify(req.query.token, secretKey, (err, decodedToken) => {
      if (err || !decodedToken) {
        res.status(404).json({ error: "El token enviado es invalido" });
      } else {
        const user = { verified: true };
        userPatchVerified(decodedToken.id_user, user, (err, updatedUser) => {
          if (err) {
            console.error("Error al actualizar el usuario:", err);
            res.status(404).json({ error: "Error al verificar el email" });
          } else {
            res
              .status(200)
              .json({ message: "Usuario verificado correctamente" });
          }
        });
      }
    });
  } catch (error) {
    return null; // Retorna null si el token no es válido
  }
}

module.exports = { verifyEmailToken };
