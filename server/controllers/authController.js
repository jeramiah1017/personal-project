const bcrypt  = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const {email, username, password, bio} = req.body
        const found = await db.find_user([email])
        if (+found[0].count !== 0) {
            return res.status(409).send ({message: 'Email already in use'})
        }
        const user_id = await db.add_user({username, email, bio})
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        db.add_hash({user_id: user_id[0].user_id, hash})
        req.session.user = {user_id: user_id[0].user_id, email, username, bio}
        res.status(202).send({message: 'Logged In', user: req.session.user})
    },
    login: async (req, res) => {
        console.log('db')
        const  db = req.app.get('db')
        const {email, password} = req.body
        const found = await db.find_user([email])
        if (+found[0].count === 0) {
            return res.status(401).send({message: 'An account with that  email does not exist'})
        }
        const foundUser = await db.find_hash([email])
        // console.log(foundUser)
        const {hash, user_id, username, bio} = foundUser[0]
        const  result = bcrypt.compareSync(password, hash)
        if (!result) {
            console.log('password')
            return res.status(401).send({message: 'Password Incorrect'})
        }
        req.session.user = {user_id, email, username, bio}
        res.status(200).send({message: "Logged in", user:req.session.user})
    }
}