import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class Header extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" className="navbar">
                <Navbar.Brand href="/">MEWS</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/graph">Network Graph</Nav.Link>
                </Nav>
            </Navbar>

        );
    }
}
export default Header;