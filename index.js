import "dotenv/config";
import express from "express";
import cors from "cors";
import testRoute from "./routes/routes.js";
import listinRoute from "./routes/listinRoutes.js";
import diarioLibreRoute from "./routes/diarioLibre.js";
import nacionalRoute from "./routes/nacional.js";
import nuevoDiarioRoute from "./routes/nuevoDiario.js";
import remolachaRoute from "./routes/remolacha.js";
import hoyRoute from "./routes/hoy.js";
import healthRoute from "./routes/health.js";

const app = express();

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
