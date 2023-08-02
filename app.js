require("dotenv/config");
require("./db");
const express = require("express");

const app = express();
const { isAuthenticated } = require("./middlewares/jwt.middleware"); // <== IMPORT
require("./config")(app);

// 👇 Start handling routes here
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const projectRouter = require("./routes/project.routes");
app.use("/api", isAuthenticated, projectRouter);  

const taskRouter = require("./routes/task.routes");
app.use("/api", isAuthenticated, taskRouter);            // <== UPDATE

const authRouter = require("./routes/auth.routes");       //  <== IMPORT
app.use("/auth", authRouter);       


require("./error-handling")(app);

module.exports = app;
