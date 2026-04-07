require("dotenv").config()
const express = require("express")
const app = express()

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const bodyParser = require('body-parser')

const db = require("./models");

app.use(express.json());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const eggsRoutes = require("./routes/eggs");
const indexRouter = require("./routes/index");
const authRoutes = require("./routes/auth");

app.use("/eggs", eggsRoutes);
app.use("/", indexRouter);
app.use("/", authRoutes);


const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(PORT, () => console.log("Server running on port " + PORT));
});

module.exports = app;