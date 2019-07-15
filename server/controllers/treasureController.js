module.exports = {
    dragonTreasure: async (req, res, next) => {
        const dbInstance = req.app.get('db');

        dbInstance.get_dragon_treasure([1])
        .then( results => {
            this.status(200).send('ok')
        })
    }
}