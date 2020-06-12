const express = require('express')
const bscrypt = require('bcryptjs')
const User = require('../models/auth');
const authConfig = require('../config/auth.json')
const jwt = require('jsonwebtoken')
const Token = require('../models/token')
const authentication = require('../middleware/authentication')

function generateToken(params = {}) {
    return token = jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,

    })
}
module.exports = {
    async register(req, res) {
        const { email } = req.body
        try {
            if (await User.findOne({ email }))
                return res.send({ error:'Usuário já existe' })
            const user = await User.create(req.body)
            user.password = undefined
            return res.send({
                user: user,
                token: generateToken({ id: user.id })
            });
        } catch (error) {
            return res.status(400);
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email }).select('+password')
            if (!user) {
                res.status(400).send({ error: 'Usuario não existe' })
            }
            if (!await bscrypt.compare(password, user.password)) {
                return res.status(400).send({ error: 'Senha invalida' })
            }
            user.password = undefined
            res.send({
                user: user,
                token: generateToken({ id: user.id })
            })
        } catch (err) {
            return res.status(400);
        }
    },

    async logout(req, res) {
        try {
            const token = await authentication(req.headers.authorization);
            if (typeof token == 'object') {
                return res.send(token)
            }
            const registro = await Token.create({ token })
            return res.status(201).json({ registro })

        }
        catch (error) {
            console.log(error)
            return res.status(400);
        }
    }
}