import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { useEffect, useState } from "react";

import Box from '@mui/material/Box';
import Button from "react-bootstrap/Button";
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";


export default function ForgotPassword({auth}) {

    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const sendReset = (email) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
                setStatus('Password reset email sent!');
                setEmail('');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }


    const style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh"
    }

    return (
        <div style={style}>
            <div className="heading-container">
                <h3>
                    Forgot Password
                </h3>
                <div>
                    {status} <br/>
                    Return to <a href="/login">Login</a><br/>
                </div>
            </div>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="email" label="Enter the Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
            </Box>

            <Button onClick={() => {
                sendReset(email)
            }}>Forgot Password</Button>
        </div>
    )
}