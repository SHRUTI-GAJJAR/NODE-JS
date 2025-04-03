
const express = require('express');
const router = express.Router();
const Menu = require('./../models/menu');

//MenueItems:

//Save data
router.post('/', async (req, resp) => {
    try {
        const data = req.body;

        const menuItem = new Menu(data);

        const response = await menuItem.save();
        console.log('Data Saved Successfully'.cyan, response);
        resp.status(200).json(response);
    } catch (err) {
        console.log(err);
        resp.status(500).json({ error: 'Internal Server error' });
    }
});

//Read data
router.get('/', async (req, resp) => {
    try {
        const data = await Menu.find();
        console.log('Data Fatched'.rainbow);
        resp.status(200).json(data);

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

        const response = await Menu.findByIdAndUpdate(personId, updateData, {
            new: true,
            runValidators: true,
        })

        if (!response) {
            return resp.status(404).json({ error: 'Menu not found' });
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

        const response = await Menu.findByIdAndDelete(personId);

        if (!response) {
            return resp.status(404).json({ error: 'Menu not found' });
        }
        console.log('Data Deleted'.red);
        resp.status(200).json({message: 'Menu Delete Successfully'});

    }catch(err){
        console.log(err);
        resp.status(500).json({error:'Internal server error'});
    }
})


module.exports = router;