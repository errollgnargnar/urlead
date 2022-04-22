import { useEffect, useState } from 'react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Map from "./Map";
import Form from 'react-bootstrap/Form';
import { FcDeleteDatabase } from "react-icons/fc";
import DeleteLead from './DeleteLead';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';

import { google, outlook, office365, yahoo, ics } from "calendar-link";

export default function DetView({viewDetails, name, phone, address, zipcode, disp, notes, latGeo, lngGeo, handleDVoff, handleDVon, city, state, email, id, getData, user, rep}) {

    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    // Set event as an object
    const event = {
        title: `Follow-Up with ${name}, phone: ${phone}`,
        description: `${notes}`,
        start: new Date(),
        duration: [1, "hour"],
        location: `${address}, ${city} ${state} ${zipcode}`
    };

    const gCalEvent = () => {
        return google(event);
    }

    console.log(typeof gCalEvent());

    const gotoCalendar = () => {
        console.log(gCalEvent());
    }

    function NonEdit() {
        return (
            <div>

                {!viewDetails ? (
                    <Card style={{ width: '18rem' }}>
                        <Card.Header>Quick View</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Phone: {phone}</ListGroup.Item>
                            <ListGroup.Item>Address: {address}</ListGroup.Item>
                            <ListGroup.Item>Zip: {zipcode}</ListGroup.Item>
                        </ListGroup>
                    </Card>) : null}

                {viewDetails ? (
                    <>
                    <div className="detailed-view">
                        <ListGroup variant="flush">
                            <ListGroup.Item>Name: <strong>{name}</strong></ListGroup.Item>
                            <ListGroup.Item>Phone: <strong>{phone}</strong></ListGroup.Item>
                            <ListGroup.Item>Email: <strong>{email}</strong></ListGroup.Item>
                            <ListGroup.Item>Address: <strong>{address} {city}, {state} {zipcode}</strong></ListGroup.Item>
                            <ListGroup.Item>Status: <strong>{disp}</strong></ListGroup.Item>
                            <ListGroupItem>Notes: <strong>{notes}</strong></ListGroupItem>
                            <ListGroupItem>Rep: <strong>{rep}</strong></ListGroupItem>
                            <ListGroupItem><small>id: <code>{id}</code></small></ListGroupItem>
                            <ListGroupItem><Button href={gCalEvent()} target="_blank">Add Follow UP Date</Button></ListGroupItem>
                        </ListGroup>

                        <Map latGeo={latGeo} lngGeo={lngGeo} />
                    </div>
                    </>
                ) : null}
            </div>
        )
    }

    function IsEdit() {

    const [idE, setId]           = useState(id);
    const [dispE, setDisp]       = useState(disp);
    const [nameE, setName]       = useState(name);
    const [addressE, setAddress] = useState(address);
    const [cityE, setCity]       = useState(city);
    const [stateE, setState]     = useState(state);
    const [zipcodeE, setZipcode] = useState(zipcode);
    const [phoneE, setPhone]     = useState(phone);
    const [emailE, setEmail]     = useState(email);
    const [lo, setLo]            = useState(user);
    const [repE, setRepE]        = useState(rep);
    const [notesE, setNotes]     = useState(notes);
    const [status, setStatus]    = useState('');  

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setStatus('Submitting Changes');
        console.log('Submitting Changes');
        try {
            const response = await fetch(`/api/editlead/${idE}/${dispE}/${nameE}/${addressE}/${cityE}/${stateE}/${zipcodeE}/${phoneE}/${emailE}/${lo}/${repE}/${notesE}`);
            const data = await response.text();

            setTimeout(() => {
                getData();
                setIsEditing(false);

            }, 3000)
            setStatus('Lead Edited Successfully');

            console.log(data);
        } catch(err) {
            console.log(err);
            setStatus(err);
        }
    }

        return (
        <Form onSubmit={handleEditSubmit}>
            <Form.Select value={dispE} onChange={(e) => setDisp(e.target.value)}>
                <option>Interested</option>
                <option>Closed Lost</option>
                <option>Closed Won</option>
            </Form.Select>
            <Form.Group className="mb-3" controlId="formBasic">
                <div>{idE}</div>
                <Form.Control type="text" placeholder="Homeowner Name" value={nameE} onChange={(e) => setName(e.target.value)} required />
                <Form.Control type="text" placeholder="Address" value={addressE} onChange={(e) => setAddress(e.target.value)} required/>
                <div style={{display:"flex"}}>
                    <Form.Control type="text" placeholder="City" value={cityE} onChange={(e) => setCity(e.target.value)} style={{width:"45%"}} required/>
                    <Form.Control type="text" placeholder="State" value={stateE} style={{width:"15%"}} onChange={(e)=>setState(e.target.value)} />
                    <Form.Control type="text" placeholder="Zipcode" value={zipcodeE} onChange={(e) => setZipcode(e.target.value)} style={{width:"25%"}} required/>
                </div>
                <Form.Control type="text" placeholder="Phone number" value={phoneE} onChange={(e) => setPhone(e.target.value)} required/>
                <Form.Control type="text" placeholder="Email" value={emailE} onChange={(e) => setEmail(e.target.value)} />
                <Form.Control type="text" placeholder="Lead Owner" defaultValue={lo} required disabled/>
                <Form.Control type="text" placeholder="Rep" value={repE} onChange={(e) => setRepE(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" rows={3} value={notesE} onChange={(e) => setNotes(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button><br/>
            {status}
        </Form>
        )
    }

    return (
        <>
        {!isEditing ? <NonEdit /> : <IsEdit /> } <br/>

        {!viewDetails ? <Button onClick={() => {
            handleDVon();
        }}>View Details</Button> : <div style={{display: "flex", justifyContent:"space-evenly"}}><Button onClick={() => setIsEditing(!isEditing)}>Edit</Button><span> </span><Button onClick={() => {
            handleDVoff();
        }}>Hide Details</Button><span> </span><FcDeleteDatabase  onClick={()=>setIsDeleting(!isDeleting)}/></div>}

        {isDeleting ? <DeleteLead id={id} setIsDeleting={setIsDeleting} getData={getData}/> : null}
        </>
    )
}