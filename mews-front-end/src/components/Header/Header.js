import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

class Header extends React.Component {
    /*   constructor() {
           super();
   
           this.state = {
               search: null,
           };
       }*/

    render() {
        return (
            <Navbar bg="dark" variant="dark" className="navbar">
                <Navbar.Brand href="/">MEWS</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/reverse">Network Graph</Nav.Link>
                </Nav>
            </Navbar>

        );
    }
}



export default Header;