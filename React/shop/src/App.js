/* eslint-disable */
import {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Data from './data.js';

function App() {

  let [shoes, changeShoes] = useState(Data);
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="jumbotron background">
        <h1 className="display-4">20% Season Off</h1>
        <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        {/* <hr class="my-4"/> */}
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
        </p>
      </div>
      <div className="container">
        <div className="row">

          {
            shoes.map( (a, i)=>{
              return (<ShoesInfo shoesData={a} idx={i} key={i} />)
            })
          }

        </div>
      </div>
    </div>
  );
}

function ShoesInfo(props){
  return (
    <div className="col-md-4">
      <img src={"https://codingapple1.github.io/shop/shoes"+ (props.idx+1) +".jpg"} width="100%" />
      <h4>{props.shoesData.title}</h4>
      <p>{props.shoesData.content}</p>
      <p>{props.shoesData.price}</p>
    </div>
  );
}

export default App;
