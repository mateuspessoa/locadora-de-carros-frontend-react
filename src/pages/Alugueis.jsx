import React, { useEffect, useRef, useState } from "react";
import Menu from "../components/Menu";
import Sidebar from "../components/Sidebar";
import styles from "../styles/aluguel.module.css";
import axios from "axios";
import Pagination from "../components/Pagination";
import SelectorPages from "../components/SelectorPages";
import { AiOutlineCheck } from 'react-icons/ai'
import { BsArrowBarDown } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BiDetail } from 'react-icons/bi'
import { AiFillEdit } from 'react-icons/ai'


const Aluguel = () => {

  const [aluguel, setAluguel] = useState({
    funcionario: {},
    cliente: {},
    veiculo: {},
    dataRetirada: "",
    dataDevolucao: "",
    valorAluguel: ""
  })

  const [funcionarios, setFuncionarios] = useState([])
  const [clientes, setClientes] = useState([])
  const [veiculos, setVeiculos] = useState([])
  const [veiculo, setVeiculo] = useState({})
  
  const [idFuncionarios, setIdFuncionario] = useState(null)
  const [idCliente, setIdCliente] = useState(null)

  const [idVeiculo, setIdVeiculo] = useState(null)
  const idVeiNum = parseInt(idVeiculo)

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
  const filtro = currentItens.filter((item) => item.cliente.nome.toLowerCase().includes(searchLowerCase))

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
    buscarTodos()
    buscarTodosFuncionarios()
    buscarTodosClientes()
    buscarTodosVeiculos()
  }, [atualizar])


  function buscarTodos() {
    axios.get("http://localhost:8080/api/aluguel/").then((result) => {
        setItens(result.data);
    })
  }

  function buscarTodosFuncionarios() {
    axios.get("http://localhost:8080/api/funcionario/").then((result) => {
        setFuncionarios(result.data);
    })
  }

  function buscarTodosClientes() {
    axios.get("http://localhost:8080/api/cliente/").then((result) => {
        setClientes(result.data);
    })
  }

  function tornarClienteInativo(id) {
    axios.post("http://localhost:8080/api/cliente/tornarinativo/" + id).then(result => {
      setAtualizar(result);
    })
  }

  function tornarClienteAtivo(id) {
    axios.post("http://localhost:8080/api/cliente/tornarativo/" + id).then(result => {
      setAtualizar(result);
    })
  }

  function buscarTodosVeiculos() {
    axios.get("http://localhost:8080/api/veiculo/").then((result) => {
        setVeiculos(result.data);
    })
  }

  function tornarVeiculoIndisponivel(id) {
    axios.post("http://localhost:8080/api/veiculo/tornarindisponivel/" + id).then(result => {
      setAtualizar(result);
    })
  }

  async function tornarVeiculoDisponivel(id) {
    await axios.post("http://localhost:8080/api/veiculo/tornardisponivel/" + id).then(result => {
      setAtualizar(result);
    })
  }

  function colocarEmAtraso(id) {
    axios.post("http://localhost:8080/api/aluguel/colocarematraso/" + id).then(result => {
      setAtualizar(result);
    })
  }

  function confirmarDevolucao(id, idVeiculo) {
    axios.post("http://localhost:8080/api/aluguel/confirmardevolucao/" + id).then(result => {
      setAtualizar(result);
    })
    axios.post("http://localhost:8080/api/veiculo/tornardisponivel/" + idVeiculo).then(result => {
      setAtualizar(result);
    })
  }

  function confirmarPagamento(id) {
    axios.post("http://localhost:8080/api/aluguel/confirmarpagamento/" + id).then(result => {
      setAtualizar(result);
    })
  }

  async function calcularValorAluguel(idVeiculo) {
    await axios.get(`http://localhost:8080/api/veiculo/${idVeiculo}`).then((result) => {
        setVeiculo(result.data);
        
        const dataRetirada = aluguel.dataRetirada;
        const dataDevolucao = aluguel.dataDevolucao;
        const diffInMs = new Date(dataDevolucao) - new Date(dataRetirada)
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24)
        const diffDias = parseInt(diffInDays);
        const valorTotal = veiculo.valorDiaria * diffDias
        aluguel.valorAluguel = valorTotal;
    
        console.log(aluguel.valorAluguel)
    })
  }


  function editar(dados) {
    setAluguel(dados)
    abrir()
  }

  function handleChange(e) {
    setAluguel({ ...aluguel, [e.target.name]: e.target.value });
  }

  function limpar() {
    setAluguel({
      funcionario: "",
      cliente: "",
      veiculo: "",
      dataRetirada: "",
      dataDevolucao: "",
      valorAluguel: ""
    });
  }

  function handleSubmit() {

    var idFuncionarioNum = parseInt(idFuncionarios);
    var obj = `{"id":${idFuncionarioNum}}`;
    var objConv = JSON.parse(obj);
    aluguel.funcionario = objConv;

    var idClienteNum = parseInt(idCliente);
    var obj2 = `{"id":${idClienteNum}}`;
    var objConv2 = JSON.parse(obj2);
    aluguel.cliente = objConv2;

    var idVeiculoNum = parseInt(idVeiculo);
    var obj3 = `{"id":${idVeiculoNum}}`;
    var objConv3 = JSON.parse(obj3);
    aluguel.veiculo = objConv3;

    console.log(aluguel)

    if (aluguel.id === undefined) {
      axios.post("http://localhost:8080/api/aluguel/", aluguel)
        .then((result) => {
          setAtualizar(result)
        })
        tornarVeiculoIndisponivel(idVeiculo)
        tornarClienteAtivo(idCliente)
        
    } else {
      axios.put("http://localhost:8080/api/aluguel/", aluguel)
      .then((result) => {
        setAtualizar(result)
      })
    }
    fechar()
    limpar()
  }

  function excluir(id) {
      axios.delete("http://localhost:8080/api/aluguel/" + id).then(result => {
        setAtualizar(result)
      })
    }


  return (
    <div className={styles.container_geral}>
      {/* Container do Formulário dinâmico */}
      <div ref={containerForm} className={styles.container_geral_form}>
        <div className={styles.info_form}>
          <h3>Adicionar Novo Aluguel</h3>
          <button onClick={() => fechar()} className={styles.btn_fechar}>
            X
          </button>
        </div>
          {/* Início do Formulário - tag <form/> bugada */}
          <div className={styles.label}>
            <label>Funcionário</label>
            <select
              name="funcionario"
              onChange={(e) => {
                setIdFuncionario(e.target.value);
              }}
              defaultValue={'DEFAULT'}
              >
              <option value="DEFAULT" disabled>Selecione...</option>
              {funcionarios?.map((funcionarioss) => (
                <>
                  {
                    funcionarioss.status == "Regular" && <option key={funcionarioss.id} value={funcionarioss.id}>{funcionarioss.nome}</option>
                  }
                </>
                
              ))}
          </select>
          </div>
          <div className={styles.label}>
            <label>Cliente</label>
            <select
              name="cliente"
              onChange={(e) => {
                setIdCliente(e.target.value);
              }}
              defaultValue={'DEFAULT'}
              className={styles.select}
              >
              <option value="DEFAULT" disabled>Selecione...</option>
              {clientes?.map((clientess) => (
                <option key={clientess.id} value={clientess.id}>{clientess.nome}</option>
              ))}
          </select>
          </div>
          <div className={styles.label}>
            <label>Veículo</label>
            <select
              name="veiculo"
              onChange={(e) => {
                setIdVeiculo(e.target.value);
              }}
              defaultValue={'DEFAULT'}
              >
              <option value="DEFAULT" disabled>Selecione...</option>
              {veiculos?.map((veiculoss) => (
                <>
                  {
                  veiculoss.status == "Disponível" && <option key={veiculoss.id} value={veiculoss.id}>{veiculoss.nome} | {veiculoss.placa}</option>
                  }
                </>
              ))}
          </select>
          </div>
          <div className={styles.label}>
            <label>Retirada</label>
            <input type="date" name="dataRetirada" onChange={handleChange} value={aluguel.dataRetirada || ''} />
          </div>
          <div className={styles.label}>
            <label>Devolução</label>
            <input type="date" name="dataDevolucao" onChange={handleChange} value={aluguel.dataDevolucao || ''} />
          </div>
          <div className={styles.label}>
            <label>Valor Total</label>
            <div className={styles.valorTotal}>
              <input type="text" name="valorAluguel" defaultValue={aluguel.valorAluguel || ''} />
              <button onClick={() => calcularValorAluguel(idVeiculo)}>Calcular Valor</button>
            </div>
          </div> 
          {
            aluguel.id && <button onClick={() => handleSubmit()} className={styles.btn_submit}>Editar</button>
          }

          {
            aluguel.id == undefined && <button onClick={() => handleSubmit()} className={styles.btn_submit}>Cadastrar</button>
          }
          
        {/* Final do Formulário - tag <form/> bugada */}
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
              <span>+</span>Novo Aluguel
            </button>
            <div className={styles.container_search}>
              <input className={styles.search} type="text" placeholder="Procure por um veículo" value={search} onChange={(e) => setSearch(e.target.value)} onClick={() => setItensPerPage(1000)} onBlur={() => setItensPerPage(5)} />
              <div className={styles.container_btn_opcoes}>
                  <button className={styles.btn_opcoes}>Todos</button>
                  <button className={styles.btn_opcoes}>Dentro do Prazo</button>
                  <button className={styles.btn_opcoes}>Atrasados</button>
                  <button className={styles.btn_opcoes}>Finalizados</button>
              </div>
            </div>
            <SelectorPages itensPerPage={itensPerPage} setItensPerPage={setItensPerPage} />
          </div>

          <div className={styles.container_table}>
            <table>
              <thead>
                <tr className="thead">
                  <th scope="col">Cliente</th>
                  <th scope="col">Veículo</th>
                  <th scope="col">Devolução</th>
                  <th scope="col">Status</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtro?.map((alugueiss) => {

                  var data_formatada = new Date(alugueiss.dataDevolucao).toLocaleDateString();

                  return (
                  <tr key={alugueiss.id}>
                    <td data-label="Name">{alugueiss.cliente.nome}</td>
                    <td data-label="Title">{alugueiss.veiculo.nome}</td>
                    <td data-label="Website">{data_formatada}</td>
                    <td data-label="Role">{alugueiss.statusDevolucao}</td>
                    <td className={styles.td_icones} data-label="Role">
                      {alugueiss.statusDevolucao == "Dentro do Prazo" &&
                        <>
                          <div onClick={() => colocarEmAtraso(alugueiss.id)} className={styles.tab_ico_2}><AiOutlineClockCircle color="#edc204"/></div>
                          <div onClick={() => confirmarDevolucao(alugueiss.id, alugueiss.veiculo.id)}  className={styles.tab_ico_3}><BsArrowBarDown color="#0000ff"/></div>
                          <div onClick={() => editar(alugueiss.id)} className={styles.tab_ico_edit}><AiFillEdit color="#00e7fc"/></div>
                          <div onClick={() => excluir(alugueiss.id)} className={styles.tab_ico_4}><BiDetail color="#fff"/></div>
                        </>
                      }

                      {alugueiss.statusDevolucao == "Atrasado" &&
                        <>
                          <div onClick={() => confirmarDevolucao(alugueiss.id, alugueiss.veiculo.id)} className={styles.tab_ico_3}><BsArrowBarDown color="#0000ff"/></div>
                          <div onClick={() => editar(alugueiss)} className={styles.tab_ico_edit}><AiFillEdit color="#00e7fc"/></div>
                          <div onClick={() => excluir(alugueiss.id)} className={styles.tab_ico_4}><BiDetail color="#fff"/></div>
                        </>
                      }

                      {alugueiss.statusDevolucao == "Devolvido" &&
                        <>
                          <div>Apenas Consula</div>
                          
                          <div onClick={() => excluir(alugueiss.id)} className={styles.tab_ico_4}><BiDetail color="#fff"/></div>
                        </>
                      }
                    </td>
                  </tr>
                )})}
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

export default Aluguel;
