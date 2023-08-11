require("dotenv").config();
const OTP = require("../models/otpModel");
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const otpGenerator = require("otp-generator");

const twoStepVerification = (user) => {
  const otp = otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
  });

  const otpInfo = new OTP({
    user_id: user._id.toString(),
    otp: otp,
  });

  otpInfo
    .save()
    .then((savedOTP) => {
      console.log("OTP almacenado correctamente:", savedOTP);

      // Envío de mensaje OTP
      client.messages
        .create({
          body: `Tu código de verificación es: ${otp}`,
          from: "+17753642159",
          to: user.phoneNumber.toString(),
        })
        .then((message) => console.log("Mensaje enviado:", message.sid))
        .catch((error) => console.error("Error sending OTP:", error));
    })
    .catch((error) => {
      console.error("Error al guardar el OTP:", error);
    });
};

module.exports = { twoStepVerification };
