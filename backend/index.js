const { response } = require('express');
const express = require('express'); 
const app     = express();
const dal     = require('./dal');
 
//enable CORS.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

//set endpoints
app.get('/', (req, res) => {
    res.send('Home page'); 
});

app.get('/api/allleads/:qtype/:disp/:lo', (req, res) => {
    let chunk = []
    dal.allLeads(req.params.lo, req.params.qtype.toLowerCase(),req.params.disp.toLowerCase())
       .then(response => response.forEach(element => {
           chunk.push(element)
       }))
       .then(() => res.send(chunk));
});
 
//create lead
app.get('/api/create/:disp/:name/:address/:city/:state/:zipcode/:phone/:email/:lo/:rep/:notes', (req,res) => {
    const disp = req.params.disp.toLowerCase();
    const name = req.params.name.toLowerCase();
    const address = req.params.address.toLowerCase();
    const city = req.params.city.toLowerCase();
    const state = req.params.state.toLowerCase();
    const zipcode = req.params.zipcode;
    const phone = req.params.phone;
    const email = req.params.email.toLowerCase();
    const lo = req.params.lo.toLowerCase();
    const rep = req.params.rep.toLowerCase(); 
    const notes = req.params.notes.toLowerCase();

    dal.createLead(disp, name, address, city, state, zipcode, phone, email, lo, rep, notes)
      .then(response => console.log(response))
      .then(() => res.send('lead successfully added'))
      .catch((error) => console.log(error));
}); 

//delete lead
app.get('/api/dellead/:id', (req, res) => {
    const id = req.params.id;

    dal.delLead(id)
        .then(response => res.send(response));
})

//edit lead
app.get('/api/editlead/:idE/:dispE/:nameE/:addressE/:cityE/:stateE/:zipcodeE/:phoneE/:emailE/:lo/:repE/:notesE', (req, res) => {
    const idE = req.params.idE;
    const dispE = req.params.dispE.toLowerCase(); 
    const nameE = req.params.nameE.toLowerCase(); 
    const addressE = req.params.addressE.toLowerCase();
    const cityE = req.params.cityE.toLowerCase(); 
    const stateE = req.params.stateE.toLowerCase();
    const zipcodeE = req.params.zipcodeE;    
    const phoneE = req.params.phoneE; 
    const emailE = req.params.emailE.toLowerCase(); 
    const lo = req.params.lo.toLowerCase();
    const repE = req.params.repE.toLowerCase();
    const notesE = req.params.notesE.toLowerCase();

    dal.editLead(idE, dispE,nameE,addressE, cityE, stateE,zipcodeE,phoneE,emailE,lo, repE,notesE)
        .then(response => console.log(response))
        .then(() => res.send('lead successfully edited'))
        .catch(err => console.log(err));
});

//set port for heroku and local
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`listening on Port: ${PORT}`)     
});  