#!/usr/bin/env node
import minimist from 'minimist';
import roll from './lib/a03-zuntue/lib/roll.js';
import express from 'express';

const args = minimist(process.argv.slice(2))
const port = args.port > 0 && args.port < 65536 ? args.port : 5000

let app = express()
//app.use(express.json()) // necessary if going to accept data in json form
app.use(express.urlencoded({extended: true}))  // necessary if going to accept data in url form
app.get('/app/', (req, res) => {
    res.send("200 OK"); // default status is 200
})

// Can't get it to accept json data for some reason
// app.get('/app/roll/', (req, res) => {
//     console.log("app.get('/app/roll/'")
//     console.log(req)
//     console.log(req.body)
//     console.log(req.query.sides)
//     console.log(req.body.sides);
//     console.log(req.body.dice);
//     console.log(req.body.rolls);
//     res.setHeader('Content-Type', 'application/json')
//     res.send(roll(6, 2, 1));
// });
// app.post('/app/roll/', (req, res) => {
//     console.log("app.post('/app/roll/'")
//     console.log(req)
//     console.log(req.body)
//     console.log(req.query.sides)
//     console.log(req.body.sides);
//     console.log(req.body.dice);
//     console.log(req.body.rolls);
//     const s = parseInt(req.body.sides) > 0 ? parseInt(req.body.sides) : 6;
//     const d = parseInt(req.body.dice) > 0 ? parseInt(req.body.dice) : 2;
//     const r = parseInt(req.body.rolls) > 0 ? parseInt(req.body.rolls) : 1;
//     res.setHeader('Content-Type', 'application/json')
//     res.send(roll(s, d, r));
// })

app.get('/app/roll/', (req, res) => {
    // console.log("app.get('/app/roll/'")
    const s = parseInt(req.query.sides) > 0 ? parseInt(req.query.sides) : 6;
    const d = parseInt(req.query.dice) > 0 ? parseInt(req.query.dice) : 2;
    const r = parseInt(req.query.rolls) > 0 ? parseInt(req.query.rolls) : 1;
    res.setHeader('Content-Type', 'application/json')
    res.send(roll(s, d, r));
})
app.get('/app/roll/:sides/', (req, res) => {
    // console.log("app.get('/app/roll/:sides/'")
    const s = parseInt(req.params.sides);
    res.setHeader('Content-Type', 'application/json')
    res.send(roll(s, 2, 1));
})

app.get('/app/roll/:sides/:dice/', (req, res) => {
    const s = parseInt(req.params.sides);
    const d = parseInt(req.params.dice);
    res.setHeader('Content-Type', 'application/json')
    res.send(roll(s, d, 1));
})

app.get('/app/roll/:sides/:dice/:rolls/', (req, res) => {
    const s = parseInt(req.params.sides);
    const d = parseInt(req.params.dice);
    const r = parseInt(req.params.rolls);
    res.setHeader('Content-Type', 'application/json')
    res.send(roll(s, d, r));
})
app.use((req, res) => { // must have been an invalid request
    res.status(404).send("404 NOT FOUND")
})

app.listen(port)