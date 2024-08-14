export const checkHealth = async (req, res, next) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: "ok",
    timesTamp: Date.now(),
  };

  try {
    console.log("wake up", { healthCheck });

    res.status(200).send(healthCheck);
  } catch (error) {
    healthCheck.message = error.message;
    res.status(503).send(healthCheck);
  }
};

//module.exports = { checkHealth };
