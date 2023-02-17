import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/CardHome.module.css'
import PessoaImg from '../assets/pessoa.png'

import { AiOutlineCar } from 'react-icons/ai'
import { MdWorkOutline } from 'react-icons/md'
import { BsPersonCheck } from 'react-icons/bs'
import { AiOutlineIdcard } from 'react-icons/ai'
import { AiOutlineDollar } from 'react-icons/ai'


const CardHome = () => {
  return (
    <>
        <div className={styles.alugueis}>
            <div className={styles.esquerda}>
                <h3>Parabéns Administrador!</h3>
                <p>Você tem 150 aluguéis ativos. Clique no botão abaixo para verificar os aluguéis!</p>
                <Link to="/alugueis" className={styles.link}>
                    <button className={styles.btn_aluguel}>Ver Aluguéis</button>       
                </Link>
            </div>

            <div className={styles.direita}>
                <img src={PessoaImg} alt="pessoa" />
            </div>
            
        </div>

        <div className={styles.infos}>
            <h2>Informações Empresa</h2>
            <div className={styles.card_interno}>
                <div className={styles.card_conteudo}>
                    <div className={styles.icone}>
                        <BsPersonCheck fontSize={25} color='red' />
                    </div>
                    <h3>150 <br /><span>Clientes</span></h3>
                </div>

                <div className={styles.card_conteudo}>
                    <div className={styles.icone_2}>
                        <MdWorkOutline fontSize={25} color='#6B6BFF' />
                    </div>
                    <h3>45 <br /><span>Funcionários</span></h3>
                </div>

                <div className={styles.card_conteudo}>
                    <div className={styles.icone_3}>
                        <AiOutlineCar fontSize={25} color='#02d402' />
                    </div>
                    <h3>52 <br /><span>Veículos</span></h3>
                </div>

                <div className={styles.card_conteudo}>
                    <div className={styles.icone_4}>
                        <AiOutlineIdcard fontSize={25} color='#edc204' />
                    </div>
                    <h3>14 <br /><span>Aluguéis</span></h3>
                </div>
            </div>
        </div>

        <div className={styles.container_inferior}>
            <div className={styles.card_inferior_1}>
                <div className={styles.esquerda_inferior}>
                    <h3>R$0,00</h3>
                    <p>Total Recebido</p>
                </div>
                <div className={styles.direita_inferior}>
                    <div className={styles.ico_inferior_1}>
                        <AiOutlineDollar fontSize={25} color='#02d402' />
                    </div>
                </div>
            </div>

            <div className={styles.card_inferior_2}>
                <div className={styles.esquerda_inferior}>
                    <h3>R$0,00</h3>
                    <p>Total Pendente</p>
                </div>
                <div className={styles.direita_inferior}>
                    <div className={styles.ico_inferior_2}>
                        <AiOutlineDollar fontSize={25} color='#edc204' />
                    </div>
                </div>
            </div>

            <div className={styles.card_inferior_3}>
                <div className={styles.esquerda_inferior}>
                    <h3>R$0,00</h3>
                    <p>Total Cancelado</p>
                </div>
                <div className={styles.direita_inferior}>
                    <div className={styles.ico_inferior_3}>
                        <AiOutlineDollar fontSize={25} color='red' />
                    </div>
                </div>
            </div>

            <div className={styles.card_inferior_4}>
                <div className={styles.esquerda_inferior}>
                    <h3>R$0,00</h3>
                    <p>Movimentações</p>
                </div>
                <div className={styles.direita_inferior}>
                    <div className={styles.ico_inferior_4}>
                        <AiOutlineDollar fontSize={25} color='#6B6BFF' />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CardHome