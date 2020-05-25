const express = require('express')
const bscrypt = require('bcryptjs')
const User = require('../models/user');
const jwt = require('jsonwebtoken')

module.exports = {

    async register(req, res) {

        const { email } = req.body

        try {

            if (await User.findOne({ email }))

                return res.status(400).send({ error: 'User already exists' })

            const user = await User.create(req.body)

            user.password = undefined

            return res.status(201).send({ user });

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
        res.send({user})
    }
}