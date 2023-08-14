require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const sgMail = require("@sendgrid/mail");

const sendEmailVerification = async (user) => {
  const verificationToken = generateJWTToken(user);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: user.email,
    from: "dvegasa@est.utn.ac.cr", // Change to your verified sender
    subject: "Verificación de email AI Prompts Library",
    text: `Estimado usuario haga click en el siguiente link para verificar su usuario: http://localhost:3001/api/email/verification?token=${verificationToken}`,
    html: `<p>Estimado usuario haga click en el siguiente link para verificar su usuario: http://localhost:3000/email?token=${verificationToken}</p>`,
  };
  console.log("Email enviado")
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

/**
 * Genera un token JWT basado en la información del usuario proporcionada.
 *
 * @param {Object} userData - Información del usuario que se utilizará para generar el token.
 * @returns {string} - Token JWT generado.
 */
function generateJWTToken(userData) {
  const { _id } = userData;

  // Definir la duración del token
  const expiresIn = "1d";

  // Crear el token con la fecha de expiración
  return jwt.sign({ id_user: _id }, secretKey, {
    expiresIn,
  });
}

module.exports = { sendEmailVerification };
