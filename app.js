const express = require("express");
const app = express();
const cors = require("cors");
const games = require("./routers/routerGames");
const users = require("./routers/routerUsers");
const sequelize = require("./database/database");
const bodyParser = require("body-parser");



(async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.log("Falha na conexão!", error);
    }
})();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", games);
app.use("/", users);
app.listen(45678, () => {
    console.log("API listening on port");
});
