import React, { useEffect, useRef, useState } from "react";
import Menu from "../components/Menu";
import Sidebar from "../components/Sidebar";
import styles from "../styles/cliente.module.css";
import axios from "axios";
import Pagination from "../components/Pagination";
import SelectorPages from "../components/SelectorPages";
import { AiOutlineCheck } from 'react-icons/ai'
import { MdOutlineBeachAccess } from 'react-icons/md'
import { AiOutlineStop } from 'react-icons/ai'
import { AiOutlineDelete } from 'react-icons/ai'
import { AiFillEdit } from 'react-icons/ai'


const Cliente = () => {

  const [cliente, setCliente] = useState({
    nome: "",
    cpf: "",
    habilitacao: "",
    estado: "",
    email: "",
    telefone: ""
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
  const filtro = currentItens.filter((item) => item.nome.toLowerCase().includes(searchLowerCase))  

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
    axios.get("http://localhost:8080/api/cliente/").then((result) => {
        setItens(result.data);
    })
  }

  function buscarClientesAtivos(){
    axios.get("http://localhost:8080/api/cliente/ativos").then(result => {
      setItens(result.data);
    });
  }

  function buscarClientesInativos(){
    axios.get("http://localhost:8080/api/cliente/inativos").then(result => {
      setItens(result.data);
    });
  }

  function tonarAtivo(id) {
    axios.post("http://localhost:8080/api/cliente/tornarativo/" + id).then(result => {
      setAtualizar(result);
    })
  }

  function tornarInativo(id) {
    axios.post("http://localhost:8080/api/cliente/tornarinativo/" + id).then(result => {
      setAtualizar(result);
    })
  }


  function editar(dados) {
    setCliente(dados)
    abrir()
  }

  function handleChange(e) {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  }

  function limpar() {
    setCliente({
      nome: "",
      cpf: "",
      habilitacao: "",
      estado: "",
      email: "",
      telefone: ""
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(cliente)
    if (cliente.id === undefined) {
      axios.post("http://localhost:8080/api/cliente/", cliente)
        .then((result) => {
          setAtualizar(result)
        })
    } else {
      axios.put("http://localhost:8080/api/cliente/", cliente)
      .then((result) => {
        setAtualizar(result)
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
          <h3>Adicionar Novo Cliente</h3>
          <button onClick={() => fechar()} className={styles.btn_fechar}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.label}>
            <label>Nome</label>
            <input type="text" name="nome" onChange={handleChange} value={cliente.nome || ''} required />
          </div>
          <div className={styles.label}>
            <label>Email</label>
            <input type="text" name="email" onChange={handleChange} value={cliente.email || ''} required />
          </div>
          <div className={styles.label}>
            <label>Habilitação</label>
            <input type="text" name="habilitacao" onChange={handleChange} value={cliente.habilitacao || ''} required />
          </div>
          <div className={styles.label}>
            <label>CPF</label>
            <input type="text" name="cpf" onChange={handleChange} value={cliente.cpf || ''} required />
          </div>
          <div className={styles.label}>
            <label>Estado</label>
            <input type="text" name="estado" onChange={handleChange} value={cliente.estado || ''} required />
          </div>
          <div className={styles.label}>
            <label>Telefone</label>
            <input type="text" name="telefone" onChange={handleChange} value={cliente.telefone || ''} required />
          </div>
          {
            cliente.id && <input className={styles.btn_submit} type="submit" value="Editar" />
          }

          {
            cliente.id === undefined && <input className={styles.btn_submit} type="submit" value="Cadastrar" />
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
              <span>+</span>Novo Cliente
            </button>
            <div className={styles.container_search}>
              <input className={styles.search} type="text" placeholder="Procure por um veículo" value={search} onChange={(e) => setSearch(e.target.value)} onClick={() => setItensPerPage(1000)} onBlur={() => setItensPerPage(5)} />
              <div className={styles.container_btn_opcoes}>
                  <button onClick={buscarTodos} className={styles.btn_opcoes}>Todos</button>
                  <button onClick={buscarClientesAtivos}  className={styles.btn_opcoes}>Ativos</button>
                  <button onClick={buscarClientesInativos}  className={styles.btn_opcoes}>Inativos</button>
              </div>
            </div>
            <SelectorPages itensPerPage={itensPerPage} setItensPerPage={setItensPerPage} />
          </div>

          <div className={styles.container_table}>
            <table>
              <thead>
                <tr className="thead">
                  <th scope="col">Nome</th>
                  <th scope="col">CPF</th>
                  <th scope="col">Telefone</th>
                  <th scope="col">Status</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtro?.map((clientess) => (
                  <tr key={clientess.id}>
                    <td data-label="Name">{clientess.nome}</td>
                    <td data-label="Title">{clientess.cpf}</td>
                    <td data-label="Website">{clientess.telefone}</td>
                    <td data-label="Role">{clientess.status}</td>
                    <td className={styles.td_icones} data-label="Role">
                      {clientess.status == "Ativo" &&
                        <>
                          <div onClick={() => tornarInativo(clientess.id)} className={styles.tab_ico_2}><AiOutlineStop color="#edc204"/></div>
                          <div onClick={() => editar(clientess)} className={styles.tab_ico_edit}><AiFillEdit color="#00e7fc"/></div>
                          <div className={styles.tab_ico_4}><AiOutlineDelete color="#ff0000"/></div>
                        </>
                      }
                      {clientess.status == "Inativo" &&
                        <>
                          <div onClick={() => tonarAtivo(clientess.id)} className={styles.tab_ico_1}><AiOutlineCheck color="#02d402"/></div>
                          <div onClick={() => editar(clientess)} className={styles.tab_ico_edit}><AiFillEdit color="#00e7fc"/></div>
                          <div onClick={() => Demitir(clientess.id)} className={styles.tab_ico_4}><AiOutlineDelete color="#ff0000"/></div>
                        </>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>/
          </div>
          <div className={styles.container_pag}>
                <Pagination pages={pages} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cliente;
