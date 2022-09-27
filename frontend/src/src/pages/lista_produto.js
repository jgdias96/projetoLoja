import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import authHeader from "./auth.header";
import { Link } from "react-router-dom";
import authService from "./auth.service";

class ListaProdutos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListaProdutos: [],
    };
  }

  
  sendDelete(_id) {
    axios
      .delete("http://localhost:5000/api/v1/produto/" + _id, { headers: authHeader() })
      .then((res) => {
        if (res.data.success) {   
          alert("Produto removido com sucesso.");
          this.props.history.push("/lista_produto");
            window.location.reload();
        }
        
      })
      .catch((error) => {
        alert("Error 325 ");
      });
  }
  
  compra(id) {
    const dados = {
      id_utilizador: authService.getCurrentUser().idUtilizador,
      id_produto: id,
      quantidade: 0
  };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/v1/produto", { headers: authHeader() })
      .then((res) => {
        if (res.data.success) {
          this.setState({ ListaProdutos: res.data.data });
        } else {
          console.log("Ocorreu um erro.");
        }
      })
      .catch((error) => {
        console.log("Ocorreu um erro. [Error Message: " + error.message + "]");
      });
  }

  preencheDados() {
    return this.state.ListaProdutos.map((data, index) => {
      return (
        <tr key={index}>
          <td>{data.id}</td>
          <td>{data.nome}</td>
          <td>{data.cor}</td>
          <td>{data.tamanho}</td>
          <td>{data.preco}</td>
          <td>{data.descricao}</td>
          <td>{data.imagem}</td>
          <td>
            <Link
              to={{
                pathname: "/edit/" + data.id,
                state: {
                  id: data.id,
                },
              }}
            >
              <button className="btn btn-outline-info"> Edit </button>
            </Link>
          </td>
          <td>
            <input type="hidden" id="id" name="id" value={data.id} />
            <div className="form-row justify-content-center">
              <button
                class="btn btn-outline-danger"
                onClick={() => this.sendDelete(data.id)}
              >
                Apagar
              </button>
            </div>
            <form action={"http://localhost:5000/api/v1/compra"} method="post">
              <input
                type="hidden"
                id="id_produto"
                name="id_produto"
                value={data.id}
              />
              <input
                type="number"
                id="quantidade"
                name="quantidade"
                className="form-control"
              />
              <div className="form-row justify-content-center">
                <button type="submit" className="btn btn-success" 
                onClick={() => this.compra(data.id)}>
                  Comprar
                </button>
              </div>
            </form>
          </td>
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
            <th>Nome</th>
            <th>cor</th>
            <th>tamanho</th>
            <th>preco</th>
            <th>descricao</th>
            <th>imagem</th>
            <th colSpan="2">&nbsp;</th>
          </tr>
        </thead>

        <tbody>{this.preencheDados()}</tbody>
      </table>
    );
  }
}

export default ListaProdutos;
