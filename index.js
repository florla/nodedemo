// const fs = require('fs');

// const file = fs.readFileSync('example.txt','utf8');

// console.log(file);

const express = require('express');
// import express from 'express';
const app = express();

app.use(express.json());

let students = [
    {
        studentId: 1,
        firstName: 'Issei',
        lastName: 'Pendragon',
        gpa: 4
    }
];

app.get('/students', function (req, res) {
    return res.json(students);
});

app.get('/students/:studentId', function (req, res) {
    const studentIdStr = req.params.studentId;
    const studentId = +studentIdStr;
    const student = students.find(s => s.studentId === studentId);
    if(!student){
        return res.sendStatus(404);
    }
    return res.json(student);
});

app.post('/students', function (req, res){
   const { firstName, lastName, gpa} = req.body;
   if (!firstName || typeof firstName != 'string' || !lastName || typeof lastName != 'string' || !gpa || typeof gpa != 'number' || gpa < 0 || gpa > 4 ) {
    return res.sendStatus(400);
   }
   const newStudent = {
    studentId: Math.random()* 1000,
    firstName,
    lastName,
    gpa
   }
   students.push(newStudent)
   return res.json(newStudent);
})

app.put('/students/:studentId', function (req,res){
     const { firstName, lastName, gpa} = req.body;
   if (!firstName || typeof firstName != 'string' || !lastName || typeof lastName != 'string' || !gpa || typeof gpa != 'number' || gpa < 0 || gpa > 4 ) {
    return res.sendStatus(400);
   }
   const existingStudent = students.find(s=> s.studentId === +req.paramas.studentId);
   if(!existingStudent){
    return res.sendStatus(404);
   }
   existingStudent.firstName = firstName
   existingStudent.lastName = lastName
   existingStudent.gpa = gpa
   return res.sendStatus(204);
})

app.delete('/students/:studentId', function (req,res){
    const existingStudent = students.find(s=> s.studentId === studentId);
    if(!existingStudent){
        return res.sendStatus(404);
       }
    students = students.filter(s=> s.studentId !== studentId)
    return res.json(existingStudent);
});

app.listen(8080, () => {
    console.log('listing on port 8080')
});

