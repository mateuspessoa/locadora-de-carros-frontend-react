import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Menu from "../components/Menu";
import NavBarMobile from "../components/NavBarMobile";
import Sidebar from "../components/Sidebar";
import styles from "../styles/aluguelDetalhes.module.css";

const AluguelDetalhes = () => {
  const [aluguel, setAluguel] = useState({});
  const { id } = useParams();

  useEffect(() => {
    buscarAluguel();
  }, []);

  console.log(aluguel);

  async function buscarAluguel() {
    await axios.get(`http://localhost:8080/api/aluguel/${id}`).then((result) => {
      setAluguel(result.data);
    });
  }

  const dataRetiradaFormatada = new Date(aluguel.dataRetirada).toLocaleDateString();
  const dataDevolucaoFormatada = new Date(aluguel.dataDevolucao).toLocaleDateString();

  const dataRetirada = aluguel.dataRetirada;
  const dataDevolucao = aluguel.dataDevolucao;
  const diffInMs = new Date(dataDevolucao) - new Date(dataRetirada);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);


  return (
    <div className={styles.container_geral}>
      <div className={styles.container_sidebar}>
        <Sidebar />
      </div>

      <div className={styles.container_lateral}>
        <div className={styles.menu}>
          <Menu />
          <NavBarMobile />
        </div>

        <div className={styles.container_acoes}>
          <h1>Informações do Aluguel</h1>

          <div className={styles.conteudo_geral}>
            <div className={styles.esquerda}>
              <div className={styles.titulo}>
                <hr />
                <p>FUNCIONÁRIO</p>
              </div>
              <div className={styles.info_funcionarios}>
                <p>Nome: {aluguel?.funcionario?.nome}</p>
                <p>Email: {aluguel?.funcionario?.email}</p>
                <p>CPF: {aluguel?.funcionario?.cpf}</p>
                <p>Telefone: {aluguel?.funcionario?.telefone}</p>
                <p>Status: {aluguel?.funcionario?.status}</p>
              </div>
              <div className={styles.titulo}>
                <hr />
                <p>CLIENTE</p>
              </div>
              <div className={styles.info_funcionarios}>
                <p>Nome: {aluguel?.cliente?.nome}</p>
                <p>Email: {aluguel?.cliente?.email}</p>
                <p>CPF: {aluguel?.cliente?.cpf}</p>
                <p>Telefone: {aluguel?.cliente?.telefone}</p>
                <p>Estado: {aluguel?.cliente?.estado}</p>
                <p>Habilitação: {aluguel?.cliente?.habilitacao}</p>
                <p>Status: {aluguel?.cliente?.status}</p>
              </div>
              <div className={styles.titulo}>
                <hr />
                <p>VEÍCULO</p>
              </div>
              <div className={styles.info_funcionarios}>
                <p>Nome: {aluguel?.veiculo?.nome}</p>
                <p>Placa: {aluguel?.veiculo?.placa}</p>
                <p>Ano: {aluguel?.veiculo?.ano}</p>
                <p>Diária: R$ {aluguel?.veiculo?.valorDiaria}</p>
              </div>
            </div>
            <div className={styles.direita}>
              <div className={styles.titulo}>
                <hr />
                <p>ALUGUEL</p>
              </div>
              <div className={styles.info_funcionarios}>
                <p>Data de Retirada: {dataRetiradaFormatada}</p>
                <p>Data de Devolução: {dataDevolucaoFormatada}</p>
                <p>Quantidade de Dias: {diffInDays} Dias</p>
                <p>Valor Total: R$ {aluguel.valorAluguel}</p>
                <p>Status de Pagamento: {aluguel.statusPagamento}</p>
                <p>Status de Devolução: {aluguel.statusDevolucao}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AluguelDetalhes;
