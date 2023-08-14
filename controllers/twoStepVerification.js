const OTPModel = require("../models/otpModel"); // Asegúrate de ajustar la ruta al modelo OTP

const verifyOTP = async (req, res) => {
  const { otp } = req.body;

  try {
    const otpDocument = await OTPModel.findOne({ otp });
    console.log(otpDocument);
    if (!otpDocument) {
      return res.status(400).json({ message: "OTP inválido" });
    }

    const now = new Date();
    const expirationTime = new Date(otpDocument.date);
    expirationTime.setMinutes(expirationTime.getMinutes() + 30); // Suponiendo que el OTP dura 30 minutos

    if (now > expirationTime) {
      return res.status(404).json({ message: "OTP vencido" });
    }

    return res.status(200).json({ message: "OTP válido" });
  } catch (error) {
    console.error("Error al verificar OTP:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = { verifyOTP };
