const db = require("../models");
const Table = db.table;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

    Table.create(req.body)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send({ msg: err.message}));
}

exports.findAll = (req, res) => {
    Table.findAll()
        .then(data => res.status(200).send(data))
        .catch(err => {
            console.log({ msg: err.message })
        })
}

exports.findOne = (req, res) => {

}

exports.update = (req, res) => {

}

exports.delete = (req, res) => {

}