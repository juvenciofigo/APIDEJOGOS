const express = require("express");
const bcrypt = require("bcrypt");
var router = express.Router();
var jwt = require("jsonwebtoken");

const { Auth, JWTSECRET } = require("../auth");

const User = require("../models/Users");

//Create user
router.post("/user", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const validade = await User.findOne({ where: { email: email } });
        if (validade) {
           return res.status(409).json("Email sendo usado");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Erro interno do servidor");
    }

    const saltRounds = 10;

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({
            name,
            password: hashedPassword,
            email,
        });

        res.status(200).json("Salvo");
    } catch (error) {
        console.error(error);
        res.status(500).json("Erro interno do servidor");
    }
});

// Endpoint para login
router.post("/authentication", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json("Usuário não encontrado");
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            var token = await jwt.sign({ id: user.id, email: user.email }, JWTSECRET, { expiresIn: "48h" });

            return res.json({ token: token});
        } else {
            // Senha incorreta
            return res.status(401).json("Credenciais inválidas");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("Erro interno do servidor");
    }
});

module.exports = router;
