const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const { userPatchVerified } = require("./userController.js");

function verifyEmailToken(req, res) {
  try {
    const decoded = jwt.verify(req.query.token, secretKey);
    const user = { verified: true };
    // Llama a la función userPatchVerified para actualizar el usuario en la base de datos
    userPatchVerified(decoded.id_user, user, (err, updatedUser) => {
      if (err) {
        console.error("Error al actualizar el usuario:", err);
        res.status(500).json({ error: "Error al actualizar el usuario" });
      } else {
        res.status(200).json({ message: "Usuario verificado correctamente" });
      }
    });
    
    return decoded.id_user;
  } catch (error) {
    return null; // Retorna null si el token no es válido
  }
}

module.exports = { verifyEmailToken };
