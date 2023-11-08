import { db } from "../CreateServer.js";
import bcrypt from 'bcryptjs';

export const createEmployee = (req, res) => {

    const check = "SELECT * FROM `garage`.`employee` WHERE email=?"
    db.query(check, req.body.email, (err, data) => {
        if (err) return (res.status(400).json(err))
        if (data.length) {
            return res.status(400).json("Email already in use. Try another one.")
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const query = "INSERT INTO `garage`.`employee` (`name`, `fam_name`, `birth`, `adress`, `zipcode`, `phone`, `social_security`, `gender`, `picture`, `updated`, `pay`, `email`,  `password`) VALUES (?)"
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
            req.body.email,
            hash
        ]
        db.query(query, [values], (err, data) => {
            if (err) return res.status(400).json(err)
            return res.status(200).json("New employee registered !")
        })
    })
}

export const updateEmployee = (req, res) => {
    const id = req.params.id;
    const query = "UPDATE `garage`.`employee` SET `name` = ?, `fam_name` = ?, `birth` = ?, `adress` = ?, `zipcode` = ?, `phone` = ?, `social_security` = ?, `gender` =?, `updated` = ?, `pay` = ?, `email` = ? WHERE idemployee = ? "
    const values = [
        req.body.name,
        req.body.fam_name,
        req.body.birth,
        req.body.adress,
        req.body.zipcode,
        req.body.phone,
        req.body.social_security,
        req.body.gender,
        req.body.updated,
        req.body.pay,
        req.body.email,
        id
    ]
    // console.log(req.body.name)
    db.query(query, [...values], (err, data) => {
        if (err) return res.status(400).json(err)
        return res.status(200).json(data)
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