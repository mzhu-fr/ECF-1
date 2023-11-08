import { db } from "../CreateServer.js"

export const getCarReview = (req, res) => {
    const id = req.params.id;
    const query = "SELECT acc_name, review, note, avatar FROM `garage`.`reviews` LEFT JOIN `garage`.`user` ON `garage`.`user`.iduser = `garage`.`reviews`.iduser WHERE idcars = ?";
    db.query(query, id, (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    })
}

export const getUserReviews = (req, res) => {
    const id = req.params.id;
    const query = "SELECT review as comment, note, `garage`.`cars`.name, `garage`.`cars`.idcars FROM `garage`.`reviews`LEFT JOIN `garage`.`cars` ON `garage`.`cars`.idcars = `garage`.`reviews`.idcars WHERE iduser = ? ";
    db.query(query, id, (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    })
}

export const userPostReview = (req, res) => {
    const id = req.params.id;
    const values = [
        req.body.review,
        req.body.note,
        req.body.iduser,
        id
    ]
    const query = "INSERT INTO `garage`.`reviews` (`review`, `note`, `iduser`, `idcars`) VALUES (?)";
    db.query(query, [values], (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json("Review successfully posted !");
    })
}

export const userUpdateReview = (req, res) => {
    const id = req.params.id;
    const values = [
        req.body.review,
        req.body.note,
        id,
        req.body.idcars
    ];
    const query = "UPDATE `garage`.`reviews` SET `review`= ?, `note`= ? WHERE iduser = ? AND idcars = ?";
    db.query(query, [...values], (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json("Review successfully updated !");
    })
}

export const userDeleteReview = (req, res) => {
    const query = "DELETE FROM `garage`.`reviews` WHERE (idcars = ?) AND (iduser = ?)"
    db.query(query, [req.body.idcars, req.body.iduser], (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json("Review successfully deleted !");
    })
}

export const getUserCarReview = (req, res) => {
    const query = "SELECT * FROM `garage`.`reviews` WHERE iduser = ? AND idcars = ?"
    db.query(query, [req.params.iduser, req.params.idcars], (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    })
}