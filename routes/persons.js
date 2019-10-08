const express = require('express')
const router = express.Router()
const Person = require('../models/person')

//Getting all
router.get('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        console.log('getting')
        const persons = await Person.find()
        res.json(persons)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Getting one by id
router.get('/:id', getPerson ,async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        console.log('getting by id')
        const person = await Person.findById(req.params.id)
        res.json(person)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Creating one
router.post('/', async (req, res) => {

    res.header('Access-Control-Allow-Origin', "*");
       
    const person = new Person({
        userId: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const newPerson = await person.save()
        res.status(201).json(newPerson)
    } catch (error) {
        res.status(400).json({message: err.message})        
    }
})

//Updating one
router.patch('/:id', getPerson, async (req, res) => {

    res.header('Access-Control-Allow-Origin', "*");

    if(req.body.userId != null){
        res.person.userId = req.body.userId
    }
    if(req.body.firstName != null){
        res.person.firstName = req.body.firstName
    }
    if(req.body.lastName != null){
        res.person.lastName = req.body.lastName
    }
    if(req.body.dateOfBirth != null){
        res.person.dateOfBirth = req.body.dateOfBirth
    }
    if(req.body.gender != null){
        res.person.gender = req.body.gender
    }
    if(req.body.email != null){
        res.person.email = req.body.email
    }    
    if(req.body.password != null){
        res.person.password = req.body.password
    }

    try {
        const updatedPerson = await res.person.save()
        res.status(201).json(updatedPerson)
    } catch (err) {
        res.status(400).json({ message : err.message })
    }

})

async function getPerson(req, res, next) {
    let person;
    try {
        res.header('Access-Control-Allow-Origin', '*');
        
        person = await Person.findById(req.params.id)
        if(person == null){
            return res.status(404).json({ message : 'Cannot find person'})
        }
    } catch (err) {
        return res.status(500).json({ message : err.message })
    }

    res.person = person
    next()
}


module.exports = router