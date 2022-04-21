import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BasicButton from './Button';
import Button from "react-bootstrap/Button";

export default function Form({title, setPassword, setEmail, handleAction}) {
    
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
                    {title} Form
                </h3>
            </div>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="email" label="Enter the Email" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>
                <TextField id="password" label="Enter the Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
            </Box>

            <BasicButton title={title} handleAction={handleAction} />{' '}<br/>
            <Button href="/forgotpassword">Forgot Password</Button>
        </div>
    );
}
