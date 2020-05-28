const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')
const express = require('express')
const Token = require('../models/token');
const authentication = require('./authentication')

module.exports = async (req, res, next,rota = {}) => {
    const token = await authentication(req.headers.authorization);
    if(typeof token == 'object'){
        return res.status(401).send(token)
    }
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ Error: 'Token invalid' })
        }
        req.userId = decoded.id
        return next()
    })
}