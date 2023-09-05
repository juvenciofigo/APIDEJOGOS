const express = require("express");
var router = express.Router();
const Game = require("../models/Game");
const validateGameFields = require("../validate");
const { Auth, JWTSECRET } = require("../auth");

var HATEOAS;

router.get("/games", Auth, (req, res) => {
     HATEOAS = [
                {
                    href: "http://localhost:45678/game/",
                    method: "GET",
                    rel: "See All Games",
                },
                {
                    href: "http://localhost:45678/game/'id'",
                    method: "GET",
                    rel: "See one Games",
                },
                ,
                {
                    href: "http://localhost:45678/game/",
                    method: "POST",
                    rel: "Save a game",
                },
                ,
                {
                    href: "http://localhost:45678/game/'id'",
                    method: "DELETE",
                    rel: "Delete a game",
                },
                {
                    href: "http://localhost:45678/game/edit/'id'",
                    method: "PUT",
                    rel: "Update a game",
                },
            ];
    Game.findAll()
        .then((games) => {
           
            res.status(200).json({ games: games, HATEOAS });
        })
        .catch((err) => {
            return res.sendStatus(400);
        });
});

// Show one game
router.get("/game/:id", Auth, (req, res) => {
    var id = req.params.id;
    HATEOAS = [
        {
            href: "http://localhost:45678/game/",
            method: "GET",
            rel: "See All Games",
        },
        {
            href: `http://localhost:45678/game/${id}`,
            method: "GET",
            rel: "See one Games",
        },
        ,
        {
            href: `http://localhost:45678/game/${id}`,
            method: "POST",
            rel: "Save a game",
        },
        ,
        {
            href: `http://localhost:45678/game/${id}`,
            method: "DELETE",
            rel: "Delete a game",
        },
        {
            href: `http://localhost:45678/game/edit/${id}`,
            method: "PUT",
            rel: "Update a game",
        },
    ];

    if (isNaN(id)) {
        return res.sendStatus(400);
    } else {
        id = parseInt(id);
        var game = Game.findByPk(id).then((game) => {
            if (game != undefined) {
                res.status(200).json({game, HATEOAS});
            } else {
                res.sendStatus(404);
            }
        });
    }
});

//Create game
router.post("/game", Auth, (req, res) => {
    const { title, year, price } = req.body;
    

    if (validateGameFields(title, year, price)) {
        Game.create({
            title,
            price,
            year,
        });
        res.status(200).json("Salvo");
    } else {
        res.status(400).send("Dados do jogo inválidos");
    }
});

// Delete a game
router.delete("/game/:id", Auth, async (req, res) => {
    var id = req.params.id;

    if (isNaN(id)) {
        return res.sendStatus(400);
    } else {
        id = parseInt(id);
        game = await Game.findByPk(id);
        if (!game) {
            return res.status(404).send("Jogo não encontrado");
        } else {
            await Game.destroy({ where: { id: id } }).then(() => {
                res.status(200).json("Apagado");
            });
        }
    }
});

// Update the game
router.put("/game/edit/:id", Auth, async (req, res) => {
    // console.log(req);
    try {
        var id = parseInt(req.params.id);

        if (id === undefined || isNaN(id)) {
            return res.status(400).send("Dados do jogo inválidos");
        }

        const game = await Game.findByPk(id);

        if (!game) {
            return res.status(400).send("Dados do jogo inválidos");
        }

        const { title, year, price } = req.body;

        if (!validateGameFields(title, year, price)) {
            return res.status(400).send("Dados do jogo inválidos");
        } else {
            await Game.update({ title, year, price }, { where: { id: id } });
            res.status(200).json("Atualizado");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Ocorreu um erro interno");
    }
});

module.exports = router;
