const { Configuration, OpenAIApi } = require("openai");

// Configura la API key de OpenAI usando la clave almacenada en la variable de entorno OPENAI_KEY
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

/**
 * Ejecuta la solicitud de completar texto (createCompletion) a través de la API de OpenAI.
 *
 * @param {*} req - Objeto de solicitud de Express.
 * @param {*} res - Objeto de respuesta de Express.
 */
const executeCompletionsPrompt = async (req, res) => {
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: req.body.model,
    prompt: req.body.prompt,
    temperature: req.body.temperature,
  });

  if (response) {
    res.status(201); // CREATED
    res.json(response.data);
  } else {
    res.status(422);
    res.json({
      message: "Hubo un error al ejecutar el método de Open AI",
    });
  }
};

/**
 * Ejecuta la solicitud de edición de texto (createEdit) a través de la API de OpenAI.
 *
 * @param {*} req - Objeto de solicitud de Express.
 * @param {*} res - Objeto de respuesta de Express.
 */
const executeEditPromt = async (req, res) => {
  const openai = new OpenAIApi(configuration);
  const response = await openai.createEdit({
    model: req.body.model,
    input: req.body.input,
    instruction: req.body.instruction,
  });

  if (response) {
    res.status(201); // CREATED
    res.json(response.data);
  } else {
    res.status(422);
    res.json({
      message: "Hubo un error al ejecutar el método de Open AI",
    });
  }
};

/**
 * Crea una imagen mediante la API de OpenAI.
 *
 * @param {*} req - Objeto de solicitud de Express.
 * @param {*} res - Objeto de respuesta de Express.
 */
const createImage = async (req, res) => {
  const { OpenAIApi } = require("openai");
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: req.body.prompt,
    n: req.body.quantity,
    size: req.body.size,
  });

  if (response) {
    res.status(201); // CREATED
    res.json(response.data);
  } else {
    res.status(422);
    res.json({
      message: "Hubo un error al ejecutar el método de Open AI",
    });
  }
};

module.exports = {
  executeCompletionsPrompt,
  executeEditPromt,
  createImage,
};
