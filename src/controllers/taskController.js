const express = require('express')

const Task = require('../models/task')

module.exports = {

    async create(req, res) {
        const { prioridade } = req.body
        try {

            if (prioridade.toLowerCase() == 'alta' || prioridade.toLowerCase()  == 'baixa') {

                const task = await Task.create(req.body)
                return res.status(201).json({ task });

            }
            else{

                return res.status(400).send({ error: 'Registration failed, priority not found' })

            }


        } catch (erro) {

            return res.status(400).send({ error: 'Registration failed' });
        }

    },
    async onetasks(req, res) {

        const { id } = req.params;

        try {

            const task = await Task.findById(id);

            return res.status(200).send(task);

        } catch (error) {

            return res.status(404).json(error);
        }
    },

    async alltasks(req, res) {

        try {

            const tasks = await Task.find({});

            const highPriority = tasks.filter(e => {

                return e.prioridade.toLowerCase() == 'alta'
            })

            console.log(highPriority)
            const lowPriority = tasks.filter( e =>{

                return e.prioridade.toLowerCase()== 'baixa'

            })

            const tasksSorted = highPriority.concat(lowPriority)

            return res.status(200).json(tasksSorted);

        } catch (error) {

            return res.status(400).json({ error });
        }
    },

    async update(req, res) {

        const { id } = req.params;

        try {
            const task = await Task.findByIdAndUpdate(id, { $set: req.body });

            return res.status(200).json(task);

        } catch (error) {

            return res.status(400).json({ error });

        }
    },
    async delete(req, res) {

        const { id } = req.params;

        try {

            await Task.findByIdAndRemove(id);

            return res.send('Deleted Sucess');

        } catch (error) {

            return res.status(400).json({ error });

        }
    },
}