import React, { useRef } from "react";
import Menu from "../components/Menu";
import Sidebar from "../components/Sidebar";
import styles from "../styles/veiculo.module.css";

const Veiculos = () => {
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
        <form>
          <div className={styles.label}>
            <label>Nome</label>
            <input type="text" />
          </div>
          <div className={styles.label}>
            <label>Placa</label>
            <input type="text" />
          </div>
          <div className={styles.label}>
            <label>Ano</label>
            <input type="text" />
          </div>
          <div className={styles.label}>
            <label>Valor da Diária</label>
            <input type="text" />
          </div>
          <input className={styles.btn_submit} type="submit" value="Cadastar" />
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
          </div>

          <div className={styles.container_table}>
            <table>
              <thead>
                <tr className="thead">
                  <th scope="col">Name</th>
                  <th scope="col">Title</th>
                  <th scope="col">Website</th>
                  <th scope="col">Role</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Name">Jeevan Kumar</td>
                  <td data-label="Title">Front-end Expert</td>
                  <td data-label="Website">jeevankaree.com</td>
                  <td data-label="Role">Admin</td>
                  <td data-label="Role">Admin</td>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Veiculos;
