const bcrypt = require('bcryptjs');


module.exports = {
    register: async (req, res, next) => {
        const { username, password, isAdmin } = req.body;
        const dbInstance = req.app.get('db');

        await dbInstance.get_user([username])
        .then (async results => {
            const existingUser = results[0];

            if (existingUser) {
                res.status(409).send('Username taken');
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                
                await dbInstance.register_user([isAdmin, username, hash])
                .then( registeredUser => {
                    const user = registeredUser[0];
                    req.session.user = {
                        isAdmin: user.is_admin,
                        id: user.id,
                        username: user.username
                    }

                    res.status(201).send(req.session.user)
                })
            }
        })
    },
    login: async (req, res, next) => {
        const { username, password } = req.body;
        const dbInstance = req.app.get('db');

        await dbInstance.get_user([username])
        .then( foundUser => {
            const user = foundUser[0];

            if (!user) {
                res.status(401).send('User not found. Please register as a new user before logging in.')
            } else {
                const isAuthenticated = bcrypt.compareSync(password, user.hash);

                if (!isAuthenticated) {
                    res.status(403).send('Incorrect password');
                } else {
                    req.session.user = {
                        isAdmin: user.is_admin,
                        id: user.id,
                        username: user.username
                    }

                    res.status(200).send(req.session.user);
                }
            }
        })
    }
}