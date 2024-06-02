const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getMeals = async (req, res, next) => {
    //#swagger.tags=['Meals']
    try {
        const result = await mongodb.getDb().db('cse341-project2').collection('meals').find({userId: req.params.userId});
        result.toArray().then((list) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(list);
        });
    } catch (error) {
        next(error);
    }
};
const getMeal = async (req, res, next) => {
    //#swagger.tags=['Meals']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid ID to search for a meal.');
        }
        const id = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db('cse341-project2').collection('meals').find({_id: id});
        const list = await result.toArray();
        if (list.length == 0) {
            throw createError(404, `Meal with id: ${result.insertedId} not found.`);
        }
        result.toArray().then((list) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(list[0]);
        });
    } catch (err) {
        next(err);
    }
};
const addMeal = async (req, res, next) => {
    //#swagger.tags=['Meals']
    try {
        const newMeal = {
            userId: req.body.userId,
            date: req.body.date,
            time: req.body.time,
            mealType: req.body.mealType,
            description: req.body.description,
            notes: req.body.notes,
            caloriesIntake: req.body.caloriesIntake
        };
        const result = await mongodb.getDb().db('cse341-project2').collection('meals').insertOne(newMeal);
        
        if (result.acknowledged) {
            console.log(`New Meal created with the following id: ${result.insertedId}`);
            res.status(201).json(result);
        } else {
            res.status(500).json(result.error || 'Meal creation failed');
        }
    }catch (err) {
        next(err);
    }
};
const editMeal = async (req, res, next) => {
    //#swagger.tags=['Meals']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid ID to search for a meal.');
        }
        const id = new ObjectId(req.params.id);
        const Meal = {
            userId: req.body.userId,
            date: req.body.date,
            time: req.body.time,
            mealType: req.body.mealType,
            description: req.body.description,
            notes: req.body.notes,
            caloriesIntake: req.body.caloriesIntake
        };
        const result = await mongodb.getDb().db('cse341-project2').collection('meals').replaceOne({_id: id}, Meal);
        const list = await result.toArray();
        if (list.length == 0) {
            throw createError(404, `Meal with id: ${result.insertedId} not found.`);
        }
        if (result.modifiedCount > 0) {
            console.log(`Meal updated with the following id: ${result.insertedId}`);
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Something goes wrong');
        }
    } catch (err) {
        next(err);
    }
};
const deleteMeal = async (req, res, next) => {
    //#swagger.tags=['Meals']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid ID to search for a meal.');
        }
        const preresult = await mongodb.getDb().db('cse341-project2').collection('meals').find({_id: req.params.id});
        const list = await preresult.toArray();
        if (list.length == 0) {
            throw createError(404, `Meal with id: ${req.params.id} not found.`);
        }
        const id = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db('cse341-project2').collection('meals').deleteOne({_id: id});
        if (result.deletedCount > 0) {
            console.log(`Meal deleted with the following id: ${id}`);
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Something goes wrong');
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { getMeals, getMeal, addMeal, editMeal, deleteMeal };



