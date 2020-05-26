const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')
const express = require('express')
const Token = require('../models/token');


module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ error: ' No token provided' })
    }
    const parts = authHeader.split(' ')
    if (!parts === 2) {
        return res.status(401).send({ error: 'Token error' })
    }
    const [scheme, token] = parts
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token malformated' })
    }
    if (await Token.findOne({ token }))
        return res.status(400).send({ error: 'Token already exists' })
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ Error: 'Token invalid' })
        }
        req.userId = decoded.id
        return next()
    })
}