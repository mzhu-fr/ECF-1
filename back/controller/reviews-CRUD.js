import { db } from "../CreateServer.js"

export const getCarReview = (req, res) => {
    const id = req.params.id
    const query = "SELECT acc_name, review, note, avatar FROM `garage`.`reviews` LEFT JOIN `garage`.`user` ON `garage`.`user`.iduser = `garage`.`reviews`.iduser WHERE idcars = ?"
    db.query(query, id, (err, data) => {
        if (err) return res.status(400).json(err)
        return res.status(200).json(data)
    })
}