import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import authHeader from "./auth.header";

class CreateProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campCor: "",
      campTamanho: "",
      campPreco: "",
      campDescricao: "",
      campImagem: "",
    };
  }

  sendSave() {
   
     if (this.state.campCor === "") {
      alert("É necessário indicar o nome do aluno!");
    } else if (this.state.campTamanho === "") {
      alert("É necessário preencher uma morada válida.");
    } else if (this.state.campPreco === "") {
      alert("É necessário identificar um contacto válido.");
    } else if (this.state.campDescricao === "") {
      alert("É necessário identificar um contacto válido.");
    } else if (this.state.campImagem === "") {
      alert("É necessário identificar um contacto válido.");
    } else {
      const datapost = {
        cor: this.state.campCor,
        tamanho: this.state.campTamanho,
        preco: this.state.campPreco,
        descricao: this.state.campDescricao,
        imagem: this.state.campImagem,
      };

      axios
        .post("http://localhost:5000/api/v1/produto", datapost, {
          headers: authHeader(),
        })
        .then((response) => {
          if (response.data.success === true) {
            alert(response.data.message);
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          alert("Ocorreu um erro. Tente novamente mais tarde. [" + error + "]");
        });
    }
  }

  render() {
    let userId = 0;
    return (
      <form>
        <div className="form-group row py-2">
          <label htmlFor="id" className="col-md-1 text-end fw-bold">
            #:{" "}
          </label>
          <div className="form-group col-md-11">
            <input
              type="text"
              readOnly="readOnly"
              id="id"
              name="id"
              value={userId}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row py-2">
          <label htmlFor="inputcor" className="col-md-1 text-end fwbold">
            Cor:{" "}
          </label>
          <div className="form-group col-md-11">
            <input
              type="text"
              id="cor"
              name="inputCor"
              className="form-control"
              placeholder="Indique a cor do produto"
              value={this.state.campCor}
              onChange={(value) =>
                this.setState({ campCor: value.target.value })
              }
            />
          </div>
        </div>
        <div className="form-group row py-2">
          <label htmlFor="inputTamanho" className="col-md-1 text-end fwbold">
            Tamnaho:{" "}
          </label>
          <div className="form-group col-md-11">
            <input
              type="text"
              id="tamanho"
              name="inputTamanho"
              className="form-control"
              placeholder="Indique o tamanho do produto"
              value={this.state.campTamanho}
              onChange={(value) =>
                this.setState({ campTamanho: value.target.value })
              }
            />
          </div>
        </div>
        <div className="form-group row py-2">
          <label htmlFor="inputPreco" className="col-md-1 text-end fwbold">
            Preco:{" "}
          </label>
          <div className="form-group col-md-11">
            <input
              type="number"
              id="preco"
              name="inputPreco"
              className="form-control"
              placeholder="Indique o preço do produto"
              value={this.state.campPreco}
              onChange={(value) =>
                this.setState({ campPreco: value.target.value })
              }
            />
          </div>
        </div>
        <div className="form-group row py-2">
          <label htmlFor="inputDescricao" className="col-md-1 text-end fwbold">
            Descricao:{" "}
          </label>
          <div className="form-group col-md-11">
            <input
              type="text"
              id="descricao"
              name="inputDescricao"
              className="form-control"
              placeholder="Indique a descrição do produto"
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
              type="url"
              id="imagem"
              name="inputImagem"
              className="form-control"
              placeholder="Insira URL  da imagem"
              value={this.state.campImagem}
              onChange={(value) =>
                this.setState({ campImagem: value.target.value })
              }
            />
          </div>
        </div>
        {/* seletor de exemplificação */}
      
        <div className="form-group py-2 text-center">
          <button
            type="submit"
            className="btn btn-lg btn-primary"
            onClick={() => this.sendSave()}
          >
            Criar Produto
          </button>
        </div>
      </form>
    );
  }
}

export default CreateProduto;
