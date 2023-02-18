import React, { useEffect, useRef, useState } from "react";
import Menu from "../components/Menu";
import Sidebar from "../components/Sidebar";
import styles from "../styles/veiculo.module.css";
import axios from "axios";
import Pagination from "../components/Pagination";
import SelectorPages from "../components/SelectorPages";
import { AiOutlineCheck } from 'react-icons/ai'
import { AiOutlineStop } from 'react-icons/ai'
import { AiOutlineSetting } from 'react-icons/ai'
import { AiOutlineDelete } from 'react-icons/ai'


const Veiculos = () => {

  const [veiculo, setVeiculo] = useState({
    nome: "",
    placa: "",
    ano: "",
    valorDiaria: ""
  })

  const [itens, setItens] = useState([])
  const [atualizar, setAtualizar] = useState();

  //Paginação
  const [itensPerPage, setItensPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(0)

  //Paginação
  const pages = Math.ceil(itens.length / itensPerPage)
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = itens.slice(startIndex, endIndex)

  //Filtro de Busca
  const [search, setSearch] = useState("")
  const searchLowerCase = search.toLowerCase()
  const filtro = currentItens.filter((item) => item.nome.toLowerCase().includes(searchLowerCase) || item.ano.toLowerCase().includes(searchLowerCase) || item.placa.toLowerCase().includes(searchLowerCase) || item.status.toLowerCase().includes(searchLowerCase))  

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
        setItens(result.data);
    })
  }

  function buscarVeiculosDisponiveis(){
    axios.get("http://localhost:8080/api/veiculo/disponiveis").then(result => {
      setItens(result.data);
    });
  }

  function buscarVeiculosIdisponiveis(){
    axios.get("http://localhost:8080/api/veiculo/indisponiveis").then(result => {
      setItens(result.data);
    });
  }

  function buscarVeiculosManutencao(){
    axios.get("http://localhost:8080/api/veiculo/manutencao").then(result => {
      setItens(result.data);
    });
  }

  function tornarDisponivel(id) {
    axios.post("http://localhost:8080/api/veiculo/tornardisponivel/" + id).then(result => {
      setAtualizar(result);
    })
  }

  function tornarIndisponivel(id) {
    axios.post("http://localhost:8080/api/veiculo/tornarindisponivel/" + id).then(result => {
      setAtualizar(result);
    })
  }

  function colocarManutencao(id) {
    axios.post("http://localhost:8080/api/veiculo/colocarmanutencao/" + id).then(result => {
      setAtualizar(result);
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
            <div className={styles.container_search}>
              <input className={styles.search} type="text" placeholder="Procure por um veículo" value={search} onChange={(e) => setSearch(e.target.value)} onClick={() => setItensPerPage(1000)} onBlur={() => setItensPerPage(5)} />
              <div className={styles.container_btn_opcoes}>
                  <button onClick={buscarTodos} className={styles.btn_opcoes}>Todos</button>
                  <button onClick={buscarVeiculosDisponiveis} className={styles.btn_opcoes}>Disponíveis</button>
                  <button onClick={buscarVeiculosIdisponiveis} className={styles.btn_opcoes}>Indisponíveis</button>
                  <button onClick={buscarVeiculosManutencao} className={styles.btn_opcoes}>Manutanção</button>
              </div>
            </div>
            <SelectorPages itensPerPage={itensPerPage} setItensPerPage={setItensPerPage} />
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
                {filtro?.map((veiculoss) => (
                  <tr key={veiculoss.id}>
                    <td data-label="Name">{veiculoss.nome}</td>
                    <td data-label="Title">{veiculoss.ano}</td>
                    <td data-label="Website">{veiculoss.placa}</td>
                    <td data-label="Role">{veiculoss.status}</td>
                    <td className={styles.td_icones} data-label="Role">
                      {veiculoss.status == "Disponível" &&
                        <>
                          <div onClick={() => tornarIndisponivel(veiculoss.id)} className={styles.tab_ico_2}><AiOutlineStop color="#edc204"/></div>
                          <div onClick={() => colocarManutencao(veiculoss.id)} className={styles.tab_ico_3}><AiOutlineSetting color="#6B6BFF"/></div>
                          <div className={styles.tab_ico_4}><AiOutlineDelete color="#ff0000"/></div>
                        </>
                      }
                      {veiculoss.status == "Indisponível" &&
                        <>
                          <div onClick={() => tornarDisponivel(veiculoss.id)} className={styles.tab_ico_1}><AiOutlineCheck color="#02d402"/></div>
                          <div onClick={() => colocarManutencao(veiculoss.id)} className={styles.tab_ico_3}><AiOutlineSetting color="#6B6BFF"/></div>
                          <div className={styles.tab_ico_4}><AiOutlineDelete color="#ff0000"/></div>
                        </>
                      }
                      {veiculoss.status == "Manutenção" &&
                        <>
                          <div onClick={() => tornarDisponivel(veiculoss.id)} className={styles.tab_ico_1}><AiOutlineCheck color="#02d402"/></div>
                          <div onClick={() => tornarIndisponivel(veiculoss.id)} className={styles.tab_ico_2}><AiOutlineStop color="#edc204"/></div>
                          <div className={styles.tab_ico_4}><AiOutlineDelete color="#ff0000"/></div>
                        </>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.container_pag}>
                <Pagination pages={pages} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Veiculos;
