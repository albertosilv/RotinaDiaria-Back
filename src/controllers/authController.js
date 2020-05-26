const express = require('express')
const bscrypt = require('bcryptjs')
const User = require('../models/auth');
const authConfig = require('../config/auth.json')
const jwt = require('jsonwebtoken')

function generateToken( params = {}){
    return token = jwt.sign(params,authConfig.secret,{
        expiresIn:86400,

    })
}
module.exports = {
    async register(req, res) {
        const { email } = req.body
        try {
            if (await User.findOne({ email }))
                return res.status(400).send({ error: 'User already exists' })
            const user = await User.create(req.body)
            user.password = undefined
            return res.send({
                user,
                token: generateToken({id:user.id})
            });
        } catch (error) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    },
    async AuthenticatorResponse(req, res) {
        const { email, password } = req.body
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            res.status(400).send({ error: 'User not found' })
        }
        if (!await bscrypt.compare(password, user.password)){
            return res.status(400).send({error:'Invalid password'})
        }
        user.password = undefined
        res.send({
            user,
            token: generateToken({id:user.id})
        })
    }
}