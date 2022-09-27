import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import authService from "./auth.service";

class CreateUtilizador extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
   
  }




  render(){
    return (
      <form action="http://localhost:5000/register" method="post">
        <div className="form-row justify-content-center">
          
          <div className="form-group col-md-6">
            <label for="user">Nome: </label>
            <input type="text" id="nome" name="nome" className="form-control" placeholder="Escreva o seu nome"/>
          </div>
          <div className="form-group col-md-6">
            <label for="user">Email </label>
            <input type="email" id="email" name="email" className="form-control" placeholder="Introduza o seu email"/>
          </div>
          <div className="form-group col-md-6">
            <label for="user">password: </label>
            <input type="password" id="password" name="password" className="form-control" placeholder="Introduzir password"/>
          </div>
          <button type="submit" className="btn btn-primary">Criar Utilizador</button>
        </div>
      </form>
    )
  }

}

export default CreateUtilizador;