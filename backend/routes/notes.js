const express = require('express')
const router = express.Router()
const fetchuser  = require('../middleware/fetchuser')
const Note  = require('../models/Notes')
const { body , validationResult } = require('express-validator')


router.get("/fetchAllNotes",fetchuser,async (req,res)=>{
   const notes = await Note.find({user: req.user.id })
   res.json(notes) 
})

router.post("/addNote",fetchuser,[
    body('title','Title must be atleast 2 characters').isLength({min: 2}),
    body('description','Enter a valid Description name').isLength({min: 5})],
    async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })};
    // const{ title,description,tag } = req.body
    // const note = new Note({ title, description, tag, user: req.user.id })
    // const savedNotes = await note.save()
    const savedNotes = await Note.create({
        title:  req.body.title,
        description: req.body.description,
        tag:  req.body.tag,
        date: req.body.date,
        user: req.user.id
    })
    res.json(savedNotes)
})


router.put("/updateNote/:id",fetchuser,
async (req,res)=>{
    const {title,description,tag} = req.body

    const newNote = {}
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    let note =  await Note.findById(req.params.id)

    if(!note){ return res.status(404).send("Not Found")}
    if(note.user.toString() !== req.user.id){ return res.status(404).send("Error Not Allowed")}

    note = await Note.findByIdAndUpdate(req.params.id,{$set : newNote},{new:true})
    res.json(note)

})


router.delete("/deleteNote/:id",fetchuser,
async (req,res)=>{
    let note =  await Note.findById(req.params.id)

    if(!note){ return res.status(404).send("Note not found")}

    if(note.user.toString() !== req.user.id){ return res.status(404).send("Error Not Allowed")}

    note = await Note.findByIdAndDelete(req.params.id)
    res.send({note,"Succes":"This Note has been Deleted"})
})


module.exports = router 