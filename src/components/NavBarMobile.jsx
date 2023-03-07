import React from "react";
import styles from "../styles/navBarMobile.module.css";
import { Link } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import { BiHomeCircle } from "react-icons/bi";
import { AiOutlineCar } from "react-icons/ai";
import { MdWorkOutline } from "react-icons/md";
import { BsPersonCheck } from "react-icons/bs";
import { AiOutlineIdcard } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useRef } from "react";

const NavBarMobile = () => {

    const botaoAbrir = useRef();
    const botaoFechar = useRef();
    const conteudo = useRef();

    function abrir() {
        conteudo.current.style.display = "flex";
        botaoFechar.current.style.display = "block"
        botaoAbrir.current.style.display = "none"
    }

    function fechar() {
        botaoAbrir.current.style.display = "block"
        botaoFechar.current.style.display = "none"
        conteudo.current.style.display = "none";
    }

  return (
    <div className={styles.container}>
      <div className={styles.icone_geral}>
        <div onClick={() => abrir()} ref={botaoAbrir} className={styles.abrir}>
          <RiMenu3Fill fontSize={25} color="#8B8BA5" />
        </div>

        <div onClick={() => fechar()} ref={botaoFechar} className={styles.fechar}>
          <AiOutlineCloseCircle fontSize={25} color="#8B8BA5" />
        </div>
      </div>
      <div ref={conteudo} className={styles.container_conteudo}>
        <div className={styles.itens}>
          <Link to="/" className={styles.link}>
            <div onClick={() => fechar()} className={styles.btn_dashboard}>
              <BiHomeCircle color="#FFF" />
              <h4>Dashboard</h4>
            </div>
          </Link>

          <div className={styles.label}>
            <hr />
            <p>GESTÃO</p>
          </div>

          <Link to="/clientes" className={styles.link}>
            <div onClick={() => fechar()} className={styles.btn_menu}>
              <BsPersonCheck color="#FFF" />
              <h4>Clientes</h4>
            </div>
          </Link>

          <Link to="/funcionarios" className={styles.link}>
            <div onClick={() => fechar()} className={styles.btn_menu}>
              <MdWorkOutline color="#FFF" />
              <h4>Funcionários</h4>
            </div>
          </Link>

          <Link to="/veiculos" className={styles.link}>
            <div onClick={() => fechar()} className={styles.btn_menu}>
              <AiOutlineCar color="#FFF" />
              <h4>Veículos</h4>
            </div>
          </Link>

          <Link to="/alugueis" className={styles.link}>
            <div onClick={() => fechar()} className={styles.btn_menu}>
              <AiOutlineIdcard color="#FFF" />
              <h4>Aluguéis</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBarMobile;
