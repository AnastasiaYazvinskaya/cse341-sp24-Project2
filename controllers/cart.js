const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getItems = async (req, res, next) => {
    //#swagger.tags=['Cart']
    const result = await mongodb.getDb().db('cse341').collection('cart').find();
    result.toArray().then((list) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    });
};
const getItem = async (req, res, next) => {
    //#swagger.tags=['Cart']
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341').collection('cart').find({_id: id});
    result.toArray().then((list) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list[0]);
    });
};
const addItem = async (req, res, next) => {
    //#swagger.tags=['Cart']
    const newItem = {
        itemName: req.body.name,
        price: req.body.price,
        amount: req.body.amount,
        itemDescription: req.body.description
    };
    const result = await mongodb.getDb().db('cse341').collection('cart').insertOne(newItem);
    
    if (result.acknowledged) {
        console.log(`New Item created with the following id: ${result.insertedId}`);
        res.status(201).json(result);
    } else {
        res.status(500).json(result.error || 'Item creation failed');
    }
};
const editItem = async (req, res, next) => {
    //#swagger.tags=['Cart']
    const id = new ObjectId(req.params.id);
    const item = {
        itemName: req.body.name,
        price: req.body.price,
        amount: req.body.amount,
        itemDescription: req.body.description
    };
    const result = await mongodb.getDb().db('cse341').collection('cart').replaceOne({_id: id}, item);
    if (result.modifiedCount > 0) {
        console.log(`Item updated with the following id: ${result.insertedId}`);
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Something goes wrong');
    }
};
const deleteItem = async (req, res, next) => {
    //#swagger.tags=['Cart']
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341').collection('cart').deleteOne({_id: id});
    if (result.deletedCount > 0) {
        console.log(`Item deleted with the following id: ${id}`);
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Something goes wrong');
    }
};

module.exports = { getItems, getItem, addItem, editItem, deleteItem };



