const Sequelize = require("sequelize");
const sequelize = require("../database/database");


const Game = sequelize.define("game", {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
});

(async () => {
    await sequelize.sync({ force: false });
})();
module.exports = Game;
