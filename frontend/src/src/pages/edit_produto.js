import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import authHeader from "./auth.header";


class EditProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campProdutoId: 0,
      campCor: "",
      campTamanho: "",
      campPreco: "",
      campDescricao: "",
      campImagem: "",
    };
  }

  componentDidMount() {
    
    axios
      .get(
        "http://localhost:5000/api/v1/produto/" + this.props.match.params.id,
        { headers: authHeader() }
      )
      .then((res) => {
        if (res.data.success) {
          var dados = res.data.data[0];
          this.setState({
            campProdutoId: dados.id,
            campCor: dados.cor,
            campTamanho: dados.tamanho,
            campPreco: dados.preco,
            campDescricao: dados.descricao,
            campImagem: dados.imagem,
          });
        } else {
          alert("Ocorreu um erro. Tente novamente mais tarde.");
        }
      })
      .catch((error) => {
        alert("Erro no servidor. [" + error + "]");
      });
  }

  sendUpdate() {
    const datapost = {
      id: this.state.campProdutoId,
      cor: this.state.campCor,
      tamanho: this.state.campTamanho,
      preco: this.state.campPreco,
      descricao: this.state.campDescricao,
      imagem: this.state.campImagem,
    };
    axios
      .put(
        "http://localhost:5000/api/v1/produto/" + this.state.campProdutoId,
        datapost, { headers: authHeader() }
      )
      .then((res) => {
        if (res.data.success === true) {
          alert(res.data.message);
        } else {
          alert("Error");
        }
      })
      .catch((error) => {
        alert("Erro [" + error + "]");
      });
  }

  render() {
    return (
      <form>
        <div className="form-group row py-2">
          <label htmlFor="id" className="col-md-1 text-end fwbold">
            id:
          </label>
          <div className="form-group col-md-11">
            <input
              type="text"
              readOnly="readOnly"
              id="id"
              name="id"
              className="form-control"
              value={this.state.campProdutoId}
            />
          </div>
        </div>
        <div className="form-group row py-2">
          <label htmlFor="inputCor" className="col-md-1 text-end fwbold">
            Cor:
          </label>
          <div className="form-group col-md-11">
            <input
              type="text"
              id="cor"
              name="inputcor"
              className="formcontrol"
              value={this.state.campCor}
              onChange={(value) =>
                this.setState({ campCor: value.target.value })
              }
            />
          </div>
        </div>
        <div className="form-group row py-2">
          <label htmlFor="inputTamanho" className="col-md-1 text-end fwbold">
            Tamanho:{" "}
          </label>
          <div className="form-group col-md-11">
            <input
              type="text"
              id="tamanho"
              name="inputTamanho"
              className="form-control"
              value={this.state.campTamanho}
              onChange={(value) =>
                this.setState({ campTamanho: value.target.value })
              }
            />
          </div>
        </div>
        <div className="form-group row py-2">
          <label htmlFor="inputPreco" className="col-md-1 text-end fwbold">
            Preço:{" "}
          </label>
          <div className="form-group col-md-11">
            <input
              type="number"
              id="preco"
              name="inputPreco"
              className="form-control"
              value={this.state.campPreco}
              onChange={(value) =>
                this.setState({ campPreco: value.target.value })
              }
            />
          </div>
        </div>

        <div className="form-group row py-2">
          <label htmlFor="inputDescricao" className="col-md-1 text-end fwbold">
            Descrição:{" "}
          </label>
          <div className="form-group col-md-11">
            <input
              type="text"
              id="descricao"
              name="inputDescricao"
              className="form-control"
              value={this.state.campDescricao}
              onChange={(value) =>
                this.setState({ campDescricao: value.target.value })
              }
            />
          </div>
        </div>

        <div className="form-group row py-2">
          <label htmlFor="inputImagem" className="col-md-1 text-end fwbold">
            Imagem:{" "}
          </label>
          <div className="form-group col-md-11">
            <input
              type="text"
              id="imagem"
              name="inputImagem"
              className="form-control"
              value={this.state.campImagem}
              onChange={(value) =>
                this.setState({ campImagem: value.target.value })
              }
            />
          </div>
        </div>

        <div className="form-group py-2 text-center">
          <button type="submit" class="btn btn-primary"
            onClick={() => this.sendUpdate()}>Atualizar Produto</button>
        </div>
      </form>
    );
  }
}

export default EditProduto;
