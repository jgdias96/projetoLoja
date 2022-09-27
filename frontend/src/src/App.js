import "rsuite/dist/styles/rsuite-dark.css";
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Card from "@bit/thirosue.react-tutorial.card";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import AuthService from "./pages/auth.service";
import Login from "./pages/login";
import { Navbar } from "rsuite";
import ListaProdutos from "./pages/lista_produto";
import Edit from "./pages/edit_produto";
import Create from "./pages/create_produto";
import "rsuite/lib/styles/index.less";
import {
  Dropdown,
  Icon,
  Nav,
  Row,
  Col,
  Grid,
  Item,
  Footer,
  Container,
} from "rsuite";
import ListaCompras from "./pages/compra";
import CreateUtilizador from "./pages/create_utilizador";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = { currentUser: undefined };
    }
   
    logOut() {
      AuthService.logout();
      }
     

    render() {
      const { currentUser } = this.state;
  
  return (
    <Router>
      <div className="App">
        <Navbar>
          <Navbar.Body>
            <Nav>
              <Link to="/">
                <Nav.Item icon={<Icon icon="home" />}>Home</Nav.Item>
              </Link>
              <Link to="/lista_produto">
                <Nav.Item>Produtos</Nav.Item>
              </Link>
              <Link to="/compra">
                <Nav.Item>Compras</Nav.Item>
              </Link>
              <Link to="/create_produto">
                <Nav.Item>Criar Produto</Nav.Item>
              </Link>
            </Nav>
            <Nav pullRight>
            <Link to="/create_utilizador">
                <Nav.Item>Registar</Nav.Item>
              </Link>
                <Nav.Item onClick={this.logOut} >logOut</Nav.Item>
            <Link to="/login">
              <Nav.Item icon={<Icon icon="user" />}></Nav.Item>
            </Link>
            </Nav>
          </Navbar.Body>
        </Navbar>

        <Route path="/lista_produto" exact component={ListaProdutos} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="/create_produto" component={Create} />
        <Route path="/compra" component={ListaCompras} />
        <Route path="/login" component={Login} />
        <Route path="/create_utilizador" component={CreateUtilizador} />
        

        <br></br>

        <div className="show-container"></div>
        
      </div>
    </Router>
  );}
}

export default App;
