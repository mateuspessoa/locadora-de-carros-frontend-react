import React, { useEffect, useRef, useState } from "react";
import Menu from "../components/Menu";
import Sidebar from "../components/Sidebar";
import styles from "../styles/funcionario.module.css";
import axios from "axios";
import Pagination from "../components/Pagination";
import SelectorPages from "../components/SelectorPages";
import { AiOutlineCheck } from 'react-icons/ai'
import { MdOutlineBeachAccess } from 'react-icons/md'
import { GiHealthNormal } from 'react-icons/gi'
import { AiOutlineDelete } from 'react-icons/ai'
import { AiFillEdit } from 'react-icons/ai'


const Funcionario = () => {

  const [funcionario, setFuncionario] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
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
  const filtro = currentItens.filter((item) => item.nome.toLowerCase().includes(searchLowerCase) || item.email.toLowerCase().includes(searchLowerCase) || item.telefone.toLowerCase().includes(searchLowerCase) || item.status.toLowerCase().includes(searchLowerCase))  

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
    axios.get("http://localhost:8080/api/funcionario/").then((result) => {
        setItens(result.data);
    })
  }

  function buscarFuncionariosFerias(){
    axios.get("http://localhost:8080/api/funcionario/ferias").then(result => {
      setItens(result.data);
    });
  }

  function buscarFuncionariosAtestado(){
    axios.get("http://localhost:8080/api/funcionario/atestado").then(result => {
      setItens(result.data);
    });
  }

  function buscarFuncionariosRegulares(){
    axios.get("http://localhost:8080/api/funcionario/regular").then(result => {
      setItens(result.data);
    });
  }

  function colocarFerias(id) {
    axios.post("http://localhost:8080/api/funcionario/ferias/" + id).then(result => {
      setAtualizar(result);
    })
  }

  function colocarAtestado(id) {
    axios.post("http://localhost:8080/api/funcionario/atestado/" + id).then(result => {
      setAtualizar(result);
    })
  }

  function deixarRegular(id) {
    axios.post("http://localhost:8080/api/funcionario/regular/" + id).then(result => {
      setAtualizar(result);
    })
  }

  function Demitir(id) {
    axios.post("http://localhost:8080/api/funcionario/demitido/" + id).then(result => {
      setAtualizar(result);
    })
  }

  function editar(dados) {
    setFuncionario(dados)
    abrir()
  }

  function handleChange(e) {
    setFuncionario({ ...funcionario, [e.target.name]: e.target.value });
  }

  function limpar() {
    setFuncionario({
      nome: "",
      email: "",
      senha: "",
      cpf: "",
      telefone: ""
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(funcionario)
    if (funcionario.id === undefined) {
      axios.post("http://localhost:8080/api/funcionario/", funcionario)
        .then((result) => {
          setAtualizar(result)
        })
    } else {
      axios.put("http://localhost:8080/api/funcionario/", funcionario)
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
          <h3>Adicionar Novo Funcionário</h3>
          <button onClick={() => fechar()} className={styles.btn_fechar}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.label}>
            <label>Nome</label>
            <input type="text" name="nome" onChange={handleChange} value={funcionario.nome || ''} required />
          </div>
          <div className={styles.label}>
            <label>Email</label>
            <input type="text" name="email" onChange={handleChange} value={funcionario.email || ''} required />
          </div>
          <div className={styles.label}>
            <label>Senha</label>
            <input type="password" name="senha" onChange={handleChange} value={funcionario.senha || ''} required />
          </div>
          <div className={styles.label}>
            <label>CPF</label>
            <input type="text" name="cpf" onChange={handleChange} value={funcionario.cpf || ''} required />
          </div>
          <div className={styles.label}>
            <label>Telefone</label>
            <input type="text" name="telefone" onChange={handleChange} value={funcionario.telefone || ''} required />
          </div>
          {
            funcionario.id && <input className={styles.btn_submit} type="submit" value="Cadastar" />
          }

          {
            funcionario.id === undefined && <input className={styles.btn_submit} type="submit" value="Cadastar" />
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
              <span>+</span>Novo Funcionário
            </button>
            <div className={styles.container_search}>
              <input className={styles.search} type="text" placeholder="Procure por um veículo" value={search} onChange={(e) => setSearch(e.target.value)} onClick={() => setItensPerPage(1000)} onBlur={() => setItensPerPage(5)} />
              <div className={styles.container_btn_opcoes}>
                  <button onClick={buscarTodos} className={styles.btn_opcoes}>Todos</button>
                  <button onClick={buscarFuncionariosRegulares} className={styles.btn_opcoes}>Regulares</button>
                  <button onClick={buscarFuncionariosFerias} className={styles.btn_opcoes}>Férias</button>
                  <button onClick={buscarFuncionariosAtestado} className={styles.btn_opcoes}>Atestado</button>
              </div>
            </div>
            <SelectorPages itensPerPage={itensPerPage} setItensPerPage={setItensPerPage} />
          </div>

          <div className={styles.container_table}>
            <table>
              <thead>
                <tr className="thead">
                  <th scope="col">Nome</th>
                  <th scope="col">Email</th>
                  <th scope="col">Telefone</th>
                  <th scope="col">Situação</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtro?.map((funcionarioss) => (
                  <tr key={funcionarioss.id}>
                    <td data-label="Name">{funcionarioss.nome}</td>
                    <td data-label="Title">{funcionarioss.email}</td>
                    <td data-label="Website">{funcionarioss.cpf}</td>
                    <td data-label="Role">{funcionarioss.status}</td>
                    <td className={styles.td_icones} data-label="Role">
                      {funcionarioss.status == "Regular" &&
                        <>
                          <div onClick={() => colocarFerias(funcionarioss.id)} className={styles.tab_ico_2}><MdOutlineBeachAccess color="#edc204"/></div>
                          <div onClick={() => colocarAtestado(funcionarioss.id)} className={styles.tab_ico_3}><GiHealthNormal color="#6B6BFF"/></div>
                          <div onClick={() => editar(funcionarioss)} className={styles.tab_ico_edit}><AiFillEdit color="#00e7fc"/></div>
                          <div onClick={() => Demitir(funcionarioss.id)} className={styles.tab_ico_4}><AiOutlineDelete color="#ff0000"/></div>
                        </>
                      }
                      {funcionarioss.status == "Férias" &&
                        <>
                          <div onClick={() => deixarRegular(funcionarioss.id)} className={styles.tab_ico_1}><AiOutlineCheck color="#02d402"/></div>
                          <div onClick={() => colocarAtestado(funcionarioss.id)} className={styles.tab_ico_3}><GiHealthNormal color="#6B6BFF"/></div>
                          <div onClick={() => editar(funcionarioss)} className={styles.tab_ico_edit}><AiFillEdit color="#00e7fc"/></div>
                          <div onClick={() => Demitir(funcionarioss.id)} className={styles.tab_ico_4}><AiOutlineDelete color="#ff0000"/></div>
                        </>
                      }
                      {funcionarioss.status == "Atestado" &&
                        <>
                          <div onClick={() => deixarRegular(funcionarioss.id)} className={styles.tab_ico_1}><AiOutlineCheck color="#02d402"/></div>
                          <div onClick={() => colocarFerias(funcionarioss.id)} className={styles.tab_ico_2}><MdOutlineBeachAccess color="#edc204"/></div>
                          <div onClick={() => editar(funcionarioss)} className={styles.tab_ico_edit}><AiFillEdit color="#00e7fc"/></div>
                          <div onClick={() => Demitir(funcionarioss.id)} className={styles.tab_ico_4}><AiOutlineDelete color="#ff0000"/></div>
                        </>
                      }
                      {funcionarioss.status == "Demitido" &&
                        <>
                          <p>Apenas Consulta</p>
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

export default Funcionario;
