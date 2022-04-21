import Button from "react-bootstrap/Button"

export default function HomePage() {
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
            <h3>URLead</h3><br/>
            <div>
            <Button variant="primary" href="/login">Login</Button>{' '}
            <Button variant="secondary" href="/register">Register</Button>{' '}
            </div>
        </div>
    )
}