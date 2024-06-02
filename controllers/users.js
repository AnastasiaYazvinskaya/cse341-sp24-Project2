const mongodb = require('../data/database');
const createError = require('http-errors');
const ObjectId = require('mongodb').ObjectId;

const getUsers = async (req, res, next) => {
    //#swagger.tags=['Users']
    try{
        const result = await mongodb.getDb().db('cse341-project2').collection('users').find();
        result.toArray().then((list) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(list);
        });
    } catch (error) {
        next(error);
    }
};
const getUser = async (req, res, next) => {
    //#swagger.tags=['Users']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid ID to search for a user.');
        }
        const id = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db('cse341-project2').collection('users').find({_id: id});
        const list = await result.toArray();
        if (list.length == 0) {
            throw createError(404, `User with id: ${result.insertedId} not found.`);
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list[0]);
    } catch (err) {
        next(err);
    }
};
const addUser = async (req, res, next) => {
    //#swagger.tags=['Users']
    try {
        const newUsers = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        const result = await mongodb.getDb().db('cse341-project2').collection('users').insertOne(newUsers);
        
        if (result.acknowledged) {
            console.log(`New Users created with the following id: ${result.insertedId}`);
            res.status(201).json(result);
        } else {
            res.status(500).json(result.error || 'Users creation failed');
        }
    } catch (err) {
        next(err);
    }
};
const editUser = async (req, res, next) => {
    //#swagger.tags=['Users']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid ID to search for a user.');
        }
        const id = new ObjectId(req.params.id);
        const Users = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        const result = await mongodb.getDb().db('cse341-project2').collection('users').replaceOne({_id: id}, Users);
        const list = await result.toArray();
        if (list.length == 0) {
            throw createError(404, `User with id: ${result.insertedId} not found.`);
        }
        if (result.modifiedCount > 0) {
            console.log(`Users updated with the following id: ${result.insertedId}`);
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Something goes wrong');
        }
    } catch (err) {
        next(err);
    }
};
const deleteUser = async (req, res, next) => {
    //#swagger.tags=['Users']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid ID to search for a user.');
        }
        const preresult = await mongodb.getDb().db('cse341-project2').collection('users').find({_id: req.params.id});
        const list = await preresult.toArray();
        if (list.length == 0) {
            throw createError(404, `User with id: ${req.params.id} not found.`);
        }
        const id = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db('cse341-project2').collection('users').deleteOne({_id: id});
        if (result.deletedCount > 0) {
            console.log(`Users deleted with the following id: ${id}`);
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Something goes wrong');
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { getUsers, getUser, addUser, editUser, deleteUser };



