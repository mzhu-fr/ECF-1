import { db } from "../CreateServer.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";

export const register = (req, res) => {

    // CHECK IF USER ALREADY EXIST ONCE
    const check = "SELECT * FROM `garage`.`user` WHERE email=?"
    db.query(check, req.body.email, (err, data) => {
        if (err) return (res.status(400).json(err))
        if (data.length) {
            return res.status(400).json("Email already in use. Try another one.")
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const query = "INSERT INTO `garage`.`user` (`acc_name`, `email`, `name`, `fam_name`, `avatar`, `password`) VALUES (?)";
        const values = [
            req.body.acc_name,
            req.body.email,
            req.body.name,
            req.body.fam_name,
            req.body.avatar,
            hash
        ]
        db.query(query, [values], (err, data) => {
            if (err) return res.status(400).json(err)
            return (res.status(200).json("You registered succesfully."))
        })
    })

}

export const login = (req, res) => {
    const query = "SELECT * FROM `garage`.`user` WHERE email = ?"
    db.query(query, [req.body.email], (err, data) => {

        if (err) return (res.status(400).json(err));
        if (data.length === 0) return res.status(400).json("Unkwown user, please register.");

        // COMPARE PASSWORD
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if (!isPasswordCorrect) return res.status(400).json("Wrong email or password, please retry.");

        const { password, ...other } = data[0]
        const token = jwt.sign({ id: data[0].iduser }, "jwtkey");
        res.cookie("login_token", token, {
            httpOnly: true
        }).status(200).json(other)
    })
}

export const adminConnect = (req, res) => {
    const query = "SELECT * FROM `garage`.`employee` WHERE email = ?"
    db.query(query, req.body.email, (err, data) => {
        if (err) return res.status(400).json(err)
        if (data.length === 0) return res.status(400).json("Unknown user.")
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if (!isPasswordCorrect) return res.status(400).json("Wrong email or password, please retry.");

        const { password, ...other } = data[0]
        const token = jwt.sign({ id: data[0].iduser }, "jwtkey");
        res.cookie("login_token", token, {
            httpOnly: true
        }).status(200).json(other)
    })
}

export const adminRegister = (req, res) => {
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

export const logout = (req, res) => {
    res.clearCookie("login_token", {
        sameSite: "none",
        secure: true,

    }).status(200).json("Disconnected.")
}