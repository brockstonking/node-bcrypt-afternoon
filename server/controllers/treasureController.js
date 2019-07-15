module.exports = {
    dragonTreasure: async (req, res, next) => {
        const dbInstance = req.app.get('db');

        const dragonTreasure = await dbInstance.get_dragon_treasure([1])
        return res.status(200).send(dragonTreasure)
    },
    getUserTreasure: async (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { id } = req.session.user;

        const userTreasure = await dbInstance.get_user_treasure([id])
        return res.status(200).send(userTreasure)
    },
    addUserTreasure: async (req, res, next) => {
        const dbInstance = req.app.get('db');

        const { treasureURL } = req.body
        const { id } = req.session.user

        const userTreasure = await dbInstance.add_user_treasure([treasureURL, id])
        res.status(200).send(userTreasure)
    }
}