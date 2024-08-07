require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const testRoute = require("./routes/routes");
const listinRoute = require("./routes/listinRoutes");
const diarioLibreRoute = require("./routes/diarioLibre");
const nacionalRoute = require("./routes/nacional");
const nuevoDiarioRoute = require("./routes/nuevoDiario");
const remolachaRoute = require("./routes/remolacha");
const hoyRoute = require("./routes/hoy");
const healthRoute = require("./routes/health");
app.use(cors());
app.use("/api/", testRoute);
app.use("/api/listin", listinRoute);
app.use("/api/diarioLibre", diarioLibreRoute);
app.use("/api/nacional", nacionalRoute);
app.use("/api/nuevoDiario", nuevoDiarioRoute);
app.use("/api/remolacha", remolachaRoute);
app.use("/api/hoy", hoyRoute);
app.use("/api/health", healthRoute);
app.listen(process.env.PORT, () =>
  console.log(`Server on port: ${process.env.PORT}`)
);
