const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Users = sequelize.define("users", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

(async () => {
    await sequelize.sync({ force: false });
})();

module.exports = Users;
