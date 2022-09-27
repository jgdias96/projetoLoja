import "rsuite/dist/styles/rsuite-dark.css";

import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import authHeader from "./auth.header";




class ListaCompras extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListaCompras: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/api/v1/compra", { headers: authHeader() }
      )
      .then((res) => {
        if (res.data.success) {
          this.setState({ ListaCompras: res.data.data });
        } else {
          console.log("Ocorreu um erro.");
        }
      })
      .catch((error) => {
        console.log("Ocorreu um erro. [Error Message: " + error.message + "]");
      });
  }

  preencheDados() {
    return this.state.ListaCompras.map((data, index) => {
      return (
        <tr key={index}>
          <td>{data.id}</td>
          <td>{data.id_utilizador}</td>
          <td>{data.id_produto}</td>
          <td>{data.quantidade}</td>
          
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Utilizador</th>
            <th>Produto</th>
            <th>quantidade</th>
            <th colSpan="2">&nbsp;</th>
          </tr>
        </thead>

        <tbody>{this.preencheDados()}</tbody>
      </table>
    );
  }
}

export default ListaCompras;