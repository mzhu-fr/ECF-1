import { db } from "../CreateServer.js";
import bcrypt from 'bcryptjs';

export const getUsers = (req, res) => {
    const query = "SELECT * FROM `garage`.`user`";
    db.query(query, (err, data) => {
        if (err) return res.status(400).json(err)
        return res.status(200).json(data)
    });
}

export const getUser = (req, res) => {
    const query = "SELECT * FROM `garage`.`user` WHERE iduser = ? ";
    const id = req.params.id;
    db.query(query, id, (err, data) => {
        if (err) return res.status(400).json(err)
        return res.status(200).json(data[0])
    });
}

export const deleteUser = (req, res) => {
    const query = "DELETE FROM `garage`.`user` WHERE iduser=?";
    const id = req.params.id;
    db.query(query, id, (err, data) => {
        if (err) return res.status(400).json(err)
        return res.status(200).json("User DELETED")
    });
}

export const updateUser = (req, res) => {
    const query = "UPDATE `garage`.`user` SET `acc_name` = ?, `email` = ?, `name` = ?, `fam_name` = ?, `avatar` = ? WHERE iduser = ?";
    const id = req.params.id;
    const values = [
        req.body.acc_name,
        req.body.email,
        req.body.name,
        req.body.fam_name,
        req.body.avatar,
        id
    ];
    db.query(query, [...values], (err, data) => {
        if (err) return res.status(400).json(err)
        return res.status(200).json(data)
    });
}

export const updateUserPassword = (req, res) => {
    const query = "UPDATE `garage`.`user` SET `password`= ? WHERE iduser = ?"
    const id = req.params.id;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    db.query(query, [hash, id], (err, data) => {
        if (err) return res.status(400).json(err)
        return res.status(200).json("Password successfully updated")
    })
}