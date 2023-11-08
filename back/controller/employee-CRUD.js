import { db } from "../CreateServer.js";
import bcrypt from 'bcryptjs';

export const createEmployee = (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const query = "INSERT INTO `garage`.`employee` (`name`, `fam_name`, `birth`, `adress`, `zipcode`, `phone`, `social_security`, `gender`, `picture`, `updated`, `pay`, `grade`, `email`,  `password`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.fam_name,
        req.body.birth,
        req.body.adress,
        req.body.zipcode,
        req.body.phone,
        req.body.social_security,
        req.body.gender,
        req.body.picture,
        req.body.updated,
        req.body.pay,
        req.body.grade,
        req.body.email,
        hash
    ]
    db.query(query, [values], (err, data) => {
        if (err) return res.status(400).json(err)
        return res.status(200).json("New employee registered !")
    })
}

export const updateEmployee = (req, res) => {
    const id = req.params.id;
    const query = "UPDATE `garage`.`employee` SET`name` = ?, `fam_name` = ?, `birth` = ?, `adress` = ?, `zipcode` = ?, `phone` = ?, `social_security` = ?, `gender` = ?, `picture` = ?, `updated` = ?, `pay` = ?, `grade` = ?, `email` = ? WHERE idemployee = ? "
    const values = [
        req.body.name,
        req.body.fam_name,
        req.body.birth,
        req.body.adress,
        req.body.zipcode,
        req.body.phone,
        req.body.social_security,
        req.body.gender,
        req.body.picture,
        req.body.updated,
        req.body.pay,
        req.body.grade,
        req.body.email,
        id
    ]
    db.query(query, [...values], (err, data) => {
        if (err) return res.status(400).json(err)
        return res.status(200).json("Employee updated!")
    })
}

export const updateToAdmin = (req, res) => {
    const id = req.params.id;
    const query = "UPDATE `garage`.`employee` SET `grade` = 'admin' WHERE idemployee = ?";
    db.query(query, id, (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json("Employee new grade : Admin !");
    })
}

export const displayForAdmin = (req, res) => {
    const query = "SELECT * FROM `garage`.`employee`";
    db.query(query, (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
};

export const displayForEmployee = (req, res) => {
    const query = "SELECT name, fam_name, phone, picture, gender FROM `garage`.`employee` WHERE `grade` <> 'admin' AND `status` = 'employed'"
    db.query(query, (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
};

export const displayEmployee = (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM `garage`.`employee` WHERE idemployee = ?"
    db.query(query, id, (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    })
};

export const updatePasswordOnly = (req, res) => {
    const id = req.params.id;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const query = "UPDATE `garage`.`employee` SET `password` = ? WHERE idemployee= ?"
    db.query(query, [hash, id], (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json("Password updated");
    })
}