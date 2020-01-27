const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const courses = [
    {id:1 ,name: 'course1'},
    {id:2 ,name: 'course2'},
    {id:3 ,name: 'course3'}
]

app.get('/',(req,res) => {
    res.send('Hello World!!!')
})

app.get('/api/courses',(req,res) =>{
    res.send([1,2,3,4])
})

app.get('/api/courses/:id',(req,res) =>{
    // res.send(req.params.id)
    const course = courses.find( c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course with the given id was not found')
    res.send(course)
})

// app.get('/api/posts/:year/:month',(req,res)=>{
//     res.send(req.query)
//     res.send(req.params)
// })

app.post('/api/courses',(req,res)=>{
    //====input validation using joi
    const {error} = validateCourse(req.body) //result.error
    if(error){
        // 400 bad request
        res.send(400).send(error.details[0].message)
        return
    }
    const course = {
        id: courses.length+1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find( c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course with the given id was not found')

    // const result = validateCourse(req.body)
    const {error} = validateCourse(req.body) //result.error
    if(error){
        // 400 bad request
        res.send(400).send(error.details[0].message)
        return
    }
     course.name = req.body.name
     res.send(course)
})

app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find( c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course with the given id was not found')
    
    const index = courses.indexOf(course)
    courses.splice(index,1)

    res.send(course)
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course,schema)
}

const port = process.env.PORT || 3000; // getting environment variable
app.listen(port,()=>console.log(`Listening on port ${port}...`))