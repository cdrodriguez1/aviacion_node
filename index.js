// 1. IMPORTS -> NPM; MODULOS PROPIOS
const express = require("express");
require("dotenv").config();
const aerolineaRouter = require("./api/aerolineas/aerolinea.router");
const aeronaveRouter = require("./api/aeronaves/aeronave.router");
const tripulacionRouter = require("./api/tripulacion/tripulacion.router");
const userRouter = require("./api/user/user.routes");
const fileRouter = require("./api/file/file.router"); //<-----F I L E
const { connectMongo } = require("./utils/db");
const {
  notFoundHandler,
  errorHandler,
} = require("./api/middleware/error.middleware");
const swaggerUi = require("swagger-ui-express"); //<--- importar swagger
const swaggerDocs = require("./api-docs/swagger"); //<--- importar swagger

// 2. CONFIGURACION

// utilizar formato json, va a permitir cierto de conexiones

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
connectMongo();

// 3. ENDPOINTS

//configuración swagger
app.use(
  "/swagger-ui",
  express.static(require("swagger-ui-dist").getAbsoluteFSPath())
);
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocs);
});
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, { customCssUrl: CSS_URL })
);

//app.get(ruta del endpoint, controlador)
app.get("/", (req, res) => {
  res.json({ message: "El servidor está funcionando" });
});

app.use("/aerolineas", aerolineaRouter);
app.use("/aeronaves", aeronaveRouter);
app.use("/tripulacion", tripulacionRouter);
app.use("/user", userRouter);
app.use("/file", fileRouter); //<-----F I L E

// 4. MANEJO EXCEPCIONES / ERRORES

app.use(notFoundHandler);
app.use(errorHandler);

// 5. ACTIVAR

app.listen(PORT, () => {
  console.log(`El servidor se ha iniciado en el puerto: ${PORT}`);
});
