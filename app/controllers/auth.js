const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateToken } = require('../helpers/generateToken');

const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            where: { email }
        });

        //Verify is user is active
        if (!user.status) {
            return response.status(400).json({
                msg: 'invalid email or password - status'
            })
        }

        //Verify if password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                msg: 'invalid email or password'
            });
        }

        //Create JWT
        const token = await generateToken(user.id);

        res.status(200).json({
            ok: 1,
            data: {
                token,
                id: user.id,
                name: user.name,
                email: user.email,
            }
        })


    } catch (error) {
        res.status(500).json({
            msg: 'invalid email or password'
        });
    }
}

const register = async (req, res) => {
    const { email, password } = req.body

    const user = await User.create({ email, password: await bcrypt.hash(password, 10) })

    res.status(201).json({
        ok: 1,
        data: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    })
}

module.exports = {
    login,
    register
}