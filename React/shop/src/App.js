/* eslint-disable */
import React, {useContext, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Data from './data.js';

import { Link, Route, Switch } from 'react-router-dom';
import Detail from './Detail.js';
import Cart from './Cart.js';
import axios from 'axios';

export let 재고context = React.createContext();

function App() {

  let [shoes, setShoes] = useState(Data);
  let [재고, 재고변경] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand><Link to="/">ShoeShop</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
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

      <Switch>
        <Route exact path="/">
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

            <재고context.Provider value={재고}>
            <div className="row">
              {
                shoes.map( (a, i)=>{
                  return (<Card shoesData={a} idx={i} key={i} />)
                })
              }
            </div>
            </재고context.Provider>
            <button className="btn btn-primary" onClick={()=>{
              // 로딩중 UI 띄움

              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result)=>{
                // 로딩중 UI 안보이게 처리

                console.log('성공했어요');
                console.log(result.data);
                setShoes([...shoes, ...result.data]);
              })
              .catch(()=>{
                // 로딩중 UI 안보이게 처리

                console.log('실패했어요');
              });
            }}>더보기</button>
          </div>
        </Route>

        <Route path="/detail/:id">
          <재고context.Provider value={재고}>

          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>

          </재고context.Provider>
        </Route>

        {/* <Route path="/:id">
          id를 보여주세요
        </Route> */}

        <Route path="/cart">
          <Cart></Cart>
        </Route>

      </Switch>

    </div>
  );
}

function Card(props){

  let 재고 = useContext(재고context);

  return (
    <div className="col-md-4">
      <img src={"https://codingapple1.github.io/shop/shoes"+ (props.idx+1) +".jpg"} width="100%" />
      <h4>{props.shoesData.title}</h4>
      <p>{props.shoesData.content}</p>
      <p>{props.shoesData.price}</p>
      <p>{재고[props.shoesData.id]}</p>
      <Test/>
    </div>
  );
}

function Test(){
  let 재고 = useContext(재고context);
  return(
    <p>재고: {재고} </p>
  )
}

export default App;
