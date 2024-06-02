const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getWorkouts = async (req, res, next) => {
    //#swagger.tags=['Workouts']
    try {
        const result = await mongodb.getDb().db('cse341-project2').collection('workouts').find({userId: req.params.userId});
        result.toArray().then((list) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(list);
        });
    } catch (err) {
        next(err);
    }
};
const getWorkout = async (req, res, next) => {
    //#swagger.tags=['Workouts']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid ID to search for a workout.');
        }
        const id = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db('cse341-project2').collection('workouts').find({_id: id});
        const list = await result.toArray();
        if (list.length == 0) {
            throw createError(404, `Workout with id: ${result.insertedId} not found.`);
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list[0]);
    } catch (err) {
        next(err);
    }
};
const addWorkout = async (req, res, next) => {
    //#swagger.tags=['Workouts']
    try {
        const newWorkout = {
            userId: req.body.userId,
            date: req.body.date,
            duration: req.body.duration,
            type: req.body.type,
            caloriesBurned: req.body.caloriesBurned
        };
        const result = await mongodb.getDb().db('cse341-project2').collection('workouts').insertOne(newWorkout);
        
        if (result.acknowledged) {
            console.log(`New Workout created with the following id: ${result.insertedId}`);
            res.status(201).json(result);
        } else {
            res.status(500).json(result.error || 'Workout creation failed');
        }
    } catch (err) {
        next(err);
    }
};
const editWorkout = async (req, res, next) => {
    //#swagger.tags=['Workouts']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid ID to search for a workout.');
        }
        const id = new ObjectId(req.params.id);
        const Workout = {
            userId: req.body.userId,
            date: req.body.date,
            duration: req.body.duration,
            type: req.body.type,
            caloriesBurned: req.body.caloriesBurned
        };
        const result = await mongodb.getDb().db('cse341-project2').collection('workouts').replaceOne({_id: id}, Workout);
        const list = await result.toArray();
        if (list.length == 0) {
            throw createError(404, `Workout with id: ${result.insertedId} not found.`);
        }
        if (result.modifiedCount > 0) {
            console.log(`Workout updated with the following id: ${result.insertedId}`);
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Something goes wrong');
        }
    } catch (err) {
        next(err);
    }
};
const deleteWorkout = async (req, res, next) => {
    //#swagger.tags=['Workouts']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid ID to search for a workout.');
        }
        const preresult = await mongodb.getDb().db('cse341-project2').collection('workouts').find({_id: req.params.id});
        const list = await preresult.toArray();
        if (list.length == 0) {
            throw createError(404, `Workout with id: ${req.params.id} not found.`);
        }
        const id = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db('cse341-project2').collection('workouts').deleteOne({_id: id});
        if (result.deletedCount > 0) {
            console.log(`Workout deleted with the following id: ${id}`);
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Something goes wrong');
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { getWorkouts, getWorkout, addWorkout, editWorkout, deleteWorkout };



