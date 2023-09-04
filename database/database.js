const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("gamesApi", "root", "12345", {
    host: "localhost",
    dialect: "mysql",
    timezone: "+02:00",
});

module.exports = sequelize;
