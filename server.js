const express = require('express') // import express framworki
const app=express();

const port =5000;

app.use(express.json());


// ma the first GET route
app.get('/',(req,res)=>{
    res.send("severver is learning")
});

//GET: return all students
app.get('/students',(req,res)=>{

const students = [
    {id:1, name:'eric',gender:'male',course:'computer science',level:3},
    {id:2, name:'aimable',gender:'male',course:'computer science',level:3},
   {id:3, name:'Rachel',gender:'female',course:'IT',level:2},
    {id:4, name:'Trust',gender:'male',course:'computer science',level:4},
    {id:5, name:'angel',gender:'female',course:'software engineering',level:4},

]
    res.json(students)
});


app.get('/students/3',(req,res)=>{
    res.json({
        id:3,
        name:'aimable',
        course :'mathematics'
    });
});


// START tHE SERVER
app.listen(port, ()=>
{
    console.log(`Server running at http://localhost:${port}`)
}
)

