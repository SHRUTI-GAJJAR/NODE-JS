
const express = require('express');
const router = express.Router();
const Person = require('./../models/Persons');

//Person Information:

//Save data:
router.post('/', async (req, resp) => {
    try {
        const data = req.body;

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('Data Saved Successfully'.cyan, response);
        resp.status(200).json(response);
    } catch (err) {
        console.log(err);
        resp.status(500).json({ error: 'Internal Server error' });
    }
});

//Read data:
router.get('/', async (req, resp) => {
    try {
        const data = await Person.find();
        console.log('Data Fatched'.rainbow);
        resp.status(200).json(data);

    } catch (err) {
        console.log(err);
        resp.status(500).json({ error: 'Internal Server error' });
    }
})

//Read data: end-point by work:

router.get('/:workType', async (req, resp) => {
    try {
        const workType = req.params.workType;

        if (workType == 'barista' || workType == 'manager' || workType == 'waiter' ||
            workType == 'food_delivery' || workType == 'cleaning') {

            const response = await Person.find({ work: workType });
            console.log('Data Fatched.....'.yellow, response);
            resp.status(200).json(response);

        } else {
            resp.status(404).json({ error: 'Invalid work type' });
        }

    } catch (err) {
        console.log(err);
        resp.status(500).json({ error: 'Internal Server error' });
    }
})

//Update Data:
router.put('/:id', async (req, resp) => {
    try {
        const personId = req.params.id;
        const updateData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updateData, {
            new: true,
            runValidators: true,
        })

        if (!response) {
            return resp.status(404).json({ error: 'Person not found' });
        }
        console.log('data updated'.blue);
        resp.status(200).json(response);

    } catch (err) {
        console.log(err);
        resp.status(500).json({ error: 'Internal Server error' });
    }
})

//Delete Data:
router.delete('/:id', async (req,resp)=>{
    try{
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            return resp.status(404).json({ error: 'Person not found' });
        }
        console.log('Data Deleted'.red);
        resp.status(200).json({message: 'Person Delete Successfully'});

    }catch(err){
        console.log(err);
        resp.status(500).json({error:'Internal server error'});
    }
})

module.exports = router;