import { db } from "../CreateServer.js";

export const getCars = (req, res) => {
    const query = "SELECT * FROM `garage`.`cars`";
    db.query(query, (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
};

export const getCar = (req, res) => {
    const query = "SELECT * FROM `garage`.`cars` WHERE idcars = ?";
    const id = req.params.id;
    db.query(query, id, (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data[0]);
    });
};

export const deleteCar = (req, res) => {
    const query = "DELETE FROM `garage`.`cars` WHERE idcars = ?";
    const id = req.params.id;
    db.query(query, id, (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json("Car deleted.");
    });
};

export const updateCar = (req, res) => {
    const id = req.params.id;
    const values = [
        req.body.name,
        req.body.brand,
        req.body.model,
        req.body.year,
        req.body.price,
        req.body.description,
        req.body.secondhand,
        req.body.km,
        req.body.co2,
        req.body.fuel,
        req.body.transmission,

        id
    ];

    const query = "UPDATE `garage`.`cars` SET `name` = ?, `brand` = ?, `model` = ?, `year` = ?, `price` = ?, `description` = ?, `secondhand` = ?, `km` = ?, `co2` = ?, `fuel` = ?, `transmission` = ? WHERE idcars = ?"
    db.query(query, [...values], (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json("Car updated.");
    })
};

export const createCar = (req, res) => {
    const values = [
        req.body.name,
        req.body.brand,
        req.body.model,
        req.body.year,
        req.body.price,
        req.body.description,
        req.body.secondhand,
        req.body.km,
        req.body.co2,
        req.body.fuel,
        req.body.transmission,
        req.body.type,
        req.body.color,
        req.body.nb_places,
        req.body.DIN_power
    ];
    const query = "INSERT INTO `garage`.`cars` (`name` , `brand` , `model` , `year` , `price` , `description` , `secondhand` , `km` , `co2` , `fuel` , `transmission` , `type` , `color` , `nb_places` , `DIN_power`) VALUES (?) ";
    db.query(query, [values], (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(201).json("New car added !")
    });
};