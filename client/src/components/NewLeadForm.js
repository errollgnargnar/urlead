import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

export default function NewLeadForm({getData, setIsAdding, user}) {

    const [status, setStatus]   = useState(null);
    const [disp, setDisp]       = useState('Interested');
    const [name, setName]       = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity]       = useState('');
    const [state, setState]     = useState('');
    const [zipcode, setZipcode] = useState('');
    const [phone, setPhone]     = useState('');
    const [email, setEmail]     = useState('');
    const [lo, setLo]           = useState(user);
    const [notes, setNotes]     = useState('hardness:12, chlorine: 2');

    const submitLead = async (e) => {
        e.preventDefault();
        console.log('submitting...');
        try {
            const response = await fetch(`http://localhost:5000/api/create/${disp}/${name}/${address}/${city}/${state}/${zipcode}/${phone}/${email}/${user}/${notes}`);
            const data = await response.text();
            if (data) {
                setDisp(''); setName(''); setAddress(''); setCity(''); setZipcode(''); setPhone(''); setEmail(''); setLo(''); setNotes('');
            }
            console.log(data);
            setStatus('Lead Submitted!');
            setTimeout(() => {
                setIsAdding(false);
            }, 3000);
            getData();
        } catch (error) {
            console.log("error:" + error);
            setStatus(`Oops! It's me, not you...Couldn't connect to server.`);
            setTimeout(() => {
                setStatus(null);
            }, 3000);
        }
    }

    return (
        <Form onSubmit={submitLead} action="#">
            <Form.Select value={disp} onChange={(e) => setDisp(e.target.value)}>
                <option>Interested</option>
                <option>Closed Lost</option>
                <option>Closed Won</option>
            </Form.Select>
            <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control type="text" placeholder="Homeowner Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <Form.Control type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                <div style={{display:"flex"}}>
                    <Form.Control type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} style={{width:"45%"}} required/>
                    <Form.Control type="text" placeholder="State" value={state} style={{width:"25%"}} onChange={(e)=>setState(e.target.value)} />
                    <Form.Control type="text" placeholder="Zipcode" value={zipcode} onChange={(e) => setZipcode(e.target.value)} style={{width:"30%"}} required/>
                </div>
                <Form.Control type="text" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                <Form.Control type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Form.Control type="text" placeholder="Lead Owner" defaultValue={lo} disabled/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button><br/>
            {status}
        </Form>
    )
}