import React, { useEffect, useRef, useState } from "react";
import Menu from "../components/Menu";
import Sidebar from "../components/Sidebar";
import styles from "../styles/veiculo.module.css";
import axios from "axios";
import Pagination from "../components/Pagination";
import SelectorPages from "../components/SelectorPages";

const Veiculos = () => {

  const [veiculo, setVeiculo] = useState({
    nome: "",
    placa: "",
    ano: "",
    valorDiaria: ""
  })

  const [veiculos, setVeiculos] = useState([])
  const [atualizar, setAtualizar] = useState();

  //Paginação
  const [itensPerPage, setItensPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(0)

  //Paginação
  /*const pages = Math.ceil(itens.length / itensPerPage)*/
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  /*const currentItens = itens.slice(startIndex, endIndex)*/

  const containerForm = useRef();
  const containerSidebar = useRef();
  const containerLateral = useRef();

  function abrir() {
    containerForm.current.style.display = "block";
    containerSidebar.current.style.filter = "alpha(opacity=10";
    containerSidebar.current.style.opacity = "0.1";
    containerLateral.current.style.filter = "alpha(opacity=10";
    containerLateral.current.style.opacity = "0.1";
  }

  function fechar() {
    containerForm.current.style.display = "none";
    containerSidebar.current.style.filter = "alpha(opacity=0)";
    containerSidebar.current.style.opacity = "1";
    containerLateral.current.style.filter = "alpha(opacity=10";
    containerLateral.current.style.opacity = "1";
    limpar()
  }

  useEffect(() => {
    buscarTodos();
  }, [atualizar])


  function buscarTodos() {
    axios.get("http://localhost:8080/api/veiculo/").then((result) => {
        setVeiculos(result.data);
    })
  }

  function handleChange(e) {
    setVeiculo({ ...veiculo, [e.target.name]: e.target.value });
  }

  function limpar() {
    setVeiculo({
      nome: "",
      placa: "",
      ano: "",
      valorDiaria: ""
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(veiculo)
    if (veiculo.id === undefined) {
      axios.post("http://localhost:8080/api/veiculo/", veiculo)
        .then((result) => {
          setVeiculo(result)
        })
    } else {
      axios.put("http://localhost:8080/api/veiculo/", veiculo)
      .then((result) => {
        setVeiculo(result)
      })
    }
    limpar();
    fechar()
  }

  return (
    <div className={styles.container_geral}>
      {/* Container do Formulário dinâmico */}
      <div ref={containerForm} className={styles.container_geral_form}>
        <div className={styles.info_form}>
          <h3>Adicionar Novo Veículo</h3>
          <button onClick={() => fechar()} className={styles.btn_fechar}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.label}>
            <label>Nome</label>
            <input type="text" name="nome" onChange={handleChange} value={veiculo.nome || ''} required />
          </div>
          <div className={styles.label}>
            <label>Placa</label>
            <input type="text" name="placa" onChange={handleChange} value={veiculo.placa || ''} required />
          </div>
          <div className={styles.label}>
            <label>Ano</label>
            <input type="text" name="ano" onChange={handleChange} value={veiculo.ano || ''} required />
          </div>
          <div className={styles.label}>
            <label>Valor da Diária</label>
            <input type="text" name="valorDiaria" onChange={handleChange} value={veiculo.valorDiaria || ''} required />
          </div>
          {
            veiculo.id && <input className={styles.btn_submit} type="submit" value="Cadastar" />
          }

          {
            veiculo.id === undefined && <input className={styles.btn_submit} type="submit" value="Cadastar" />
          }
          
        </form>
      </div>

      <div ref={containerSidebar} className={styles.container_sidebar}>
        <Sidebar />
      </div>

      <div ref={containerLateral} className={styles.container_lateral}>
        <div className={styles.menu}>
          <Menu />
        </div>

        <div className={styles.container_acoes}>
          <div className={styles.container_adcionar}>
            <button onClick={() => abrir()} className={styles.btn_add}>
              <span>+</span>Novo Veículo
            </button>
            {/*<SelectorPages itensPerPage={itensPerPage} setItensPerPage={setItensPerPage} />*/}
          </div>

          <div className={styles.container_table}>
            <table>
              <thead>
                <tr className="thead">
                  <th scope="col">Nome</th>
                  <th scope="col">Ano</th>
                  <th scope="col">Placa</th>
                  <th scope="col">Disponibilidade</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Name">Fiat Mobi</td>
                  <td data-label="Title">2018</td>
                  <td data-label="Website">QQA-2452</td>
                  <td data-label="Role">Disponível</td>
                  <td data-label="Role">Botão</td>
                </tr>
                <tr>
                  <td scope="row" data-label="Name">
                    Lindsay Walton
                  </td>
                  <td data-label="Title">Designer</td>
                  <td data-label="Website">lindawalton.com</td>
                  <td data-label="Role">Member</td>
                  <td data-label="Role">Admin</td>
                </tr>
                <tr>
                  <td scope="row" data-label="Name">
                    Tom Cook
                  </td>
                  <td data-label="Title">Marketer</td>
                  <td data-label="Website">tom.in</td>
                  <td data-label="Role">Admin</td>
                  <td data-label="Role">Admin</td>
                </tr>
                <tr>
                  <td scope="row" data-label="Name">
                    Floyd Miles
                  </td>
                  <td data-label="Title">Principal Designer</td>
                  <td data-label="Website">floydmiles.com</td>
                  <td data-label="Role">Member</td>
                  <td data-label="Role">Admin</td>
                </tr>
                <tr>
                  <td scope="row" data-label="Name">
                    Floyd Miles
                  </td>
                  <td data-label="Title">Principal Designer</td>
                  <td data-label="Website">floydmiles.com</td>
                  <td data-label="Role">Member</td>
                  <td data-label="Role">Admin</td>
                </tr>
              </tbody>
            </table>
            {/*<Pagination pages={pages} setCurrentPage={setCurrentPage} />*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Veiculos;
