const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const secretKey = process.env.SECRET_KEY;
const { twoStepVerification } = require("../controllers/twilioController");

/**
 * Genera un token JWT basado en la información del usuario proporcionada.
 *
 * @param {Object} userData - Información del usuario que se utilizará para generar el token.
 * @returns {string} - Token JWT generado.
 */
function generateJWTToken(userData) {
  const { email, role, _id, name } = userData;

  // Definir la duración del token
  const expiresIn = "1d";

  // Crear el token con la fecha de expiración
  return jwt.sign({ email, role, id_user: _id, name }, secretKey, {
    expiresIn,
  });
}

/**
 * Autentica a un usuario mediante su correo electrónico y contraseña.
 *
 * @param {*} req - Objeto de solicitud de Express que contiene los datos de usuario a autenticar.
 * @param {*} res - Objeto de respuesta de Express.
 * @returns {JSON} - Respuesta JSON que contiene el token JWT y la información del usuario.
 */
async function authenticate(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const isPasswordValid = user.password === password;
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Verificar si el usuario está verificado
    if (!user.verified) {
      return res.status(401).json({ error: "Usuario no verificado" });
    }

    const token = generateJWTToken(user);

    if (user.twoStepVerification) {
      twoStepVerification(user);
    }

    return res.json({
      token,
      userRole: user.role,
      userId: user._id,
      userName: user.name,
      twoStep: user.twoStepVerification
    });
  } catch (error) {
    console.error("Error al autenticar el usuario:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = { authenticate };
