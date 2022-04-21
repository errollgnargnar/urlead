import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

export default function DeleteLead({id, setIsDeleting, getData}) { 

    const [userPin, setUserPin] = useState('');
    const [status, setStatus] = useState(null);

    const deletePin = id.slice(0,4)

    const style = {
        position: "absolute", /* or absolute */
        margin: "auto",
        top: "50%",
        backgroundColor: "red",
        padding: "1%"
    }

    const validateAndDelete = async (pin) => {

        if(pin === deletePin) {
            try {
                const response = await fetch(`/api/dellead/${id}`);

                const resData = await response.text();
                setTimeout(() => {
                    getData();
                    setIsDeleting(false);
    
                }, 3000)
                setStatus(resData);

            } catch (err){
                console.log(err);
            }
        } else {
            setStatus('Invalid Pin');
            setTimeout(() => {
                setStatus('');
            }, 3000)
            console.log('invalid pin');
        }
    }

    return (
        <div style={style}>
        <Alert variant="danger" onClose={() => setIsDeleting(false)} dismissible>
            <Alert.Heading>Whoa hold up there!</Alert.Heading>
            <p>
                You are about to delete this lead. <br/>
                If you are sure you want to do this then type the 4 digits below and press confirm (Case sensitive).
            </p>
            <div>
                {deletePin}
            </div>
            <div>
                {status}
            </div>
            <Form.Control type="text" placeholder={deletePin} value={userPin} onChange={(e) => setUserPin(e.target.value) } />
            <Button variant="danger" onClick={() => validateAndDelete(userPin)}>Confirm</Button>
        </Alert>
        </div>
    )
}