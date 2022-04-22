const e = require("express");
const { MongoClient, MONGO_CLIENT_EVENTS, ObjectId } = require("mongodb");
const uri             = "mongodb+srv://username:mitsucks@cluster0.jcxqq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let db                = null;
let leads             = null;
 
// connect to mongo
MongoClient.connect(uri, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('aws');
    leads  = db.collection('canvleads')
});

const allLeads = async (user, qtype, disp) => {
    const options = {
        // sort returned documents in ascending order by title (A->Z)
        sort: { dateAdded: 1 }
    };

    const cursor = await leads.find({[qtype]: {$regex: disp}, lo: user}, options);
    // print a message if no documents were found
    if ((leads.countDocuments) === 0) {
      console.log("No documents found!");
    }
    // replace console.dir with your callback to access individual elements

    return cursor;
}

const createLead = async (disp = 'interested', name, address, city, state, zipcode, phone, email, lo, rep, notes = 'hardness:5, chlorine:2', dateAdded = Date()) => {
    const doc = {
        disp, name, address, city, state, zipcode, phone, email, lo, rep, notes, dateAdded
    }
    const result = await leads.insertOne(doc);
    return ( new Promise((resolve, reject) => { 
        if (result) {
            resolve(`Lead was inserted with the _id: ${result.insertedId} at ${dateAdded}`);
        } else {
            reject('Lead was not accepted by database');
        }
    }));
}

const delLead = async(id) => {
    const query = { _id: ObjectId(id) };
    const result = await leads.deleteOne(query);

    return new Promise ((resolve, reject) => {
        if (result.deletedCount === 1) {
            resolve('Successfully deleted the lead'); 
        } else {
            reject('Did not find requested id - not your fault probably...');
        }
    })
}

const editLead = async (id, disp, name, address, city, state, zipcode, phone, email, lo, rep, notes) => {
    //create a filter for a lead to update
    const filter = { _id: ObjectId(id) };

    //this option instructs the method to create a doc if no match is found
    const options = { upsert: true };

    //create a doc that sets the plot of the movie
    const updateDoc = {
        $set: {
             disp, name, address, city, state, zipcode, phone, email, lo, rep, notes, dateAdded: Date()
        }
    };

    const result = await leads.updateOne(filter, updateDoc);
    return (new Promise((resolve, reject) => {
        if (result) {
            console.log(filter);
            resolve(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
        } else {
            reject(`Lead was not edited due to server error`);
        }
    }))
}
module.exports = {createLead, allLeads, editLead, delLead}


