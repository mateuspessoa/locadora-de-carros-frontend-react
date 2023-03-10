import React from 'react'
import styles from '../styles/sidebar.module.css'
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { BiHomeCircle } from 'react-icons/bi'
import { AiOutlineCar } from 'react-icons/ai'
import { MdWorkOutline } from 'react-icons/md'
import { BsPersonCheck } from 'react-icons/bs'
import { AiOutlineIdcard } from 'react-icons/ai'


const Sidebar = () => {
  return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link to="/"><img src={Logo} alt="logo" /></Link>
                <h2>Rent a Car</h2>
            </div>
            
            <Link to="/" className={styles.link}>
                <div className={styles.btn_dashboard}>
                    <BiHomeCircle color='#FFF' />
                    <h4>Dashboard</h4>
                </div>        
            </Link>

            <div className={styles.label}>
                <hr />
                <p>GESTÃO</p>
            </div>

            <Link to="/clientes" className={styles.link}>
                <div className={styles.btn_menu}>
                    <BsPersonCheck color='#FFF' />
                    <h4>Clientes</h4>
                </div>        
            </Link>

            <Link to="/funcionarios" className={styles.link}>
                <div className={styles.btn_menu}>
                    <MdWorkOutline color='#FFF' />
                    <h4>Funcionários</h4>
                </div>        
            </Link>

            <Link to="/veiculos" className={styles.link}>
                <div className={styles.btn_menu}>
                    <AiOutlineCar color='#FFF' />
                    <h4>Veículos</h4>
                </div>        
            </Link>

            <Link to="/alugueis" className={styles.link}>
                <div className={styles.btn_menu}>
                    <AiOutlineIdcard color='#FFF' />
                    <h4>Aluguéis</h4>
                </div>        
            </Link>
        </div>
  )
}

export default Sidebar