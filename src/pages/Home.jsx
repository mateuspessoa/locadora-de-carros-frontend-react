import React from 'react'
import Sidebar from '../components/Sidebar'
import styles from '../styles/home.module.css'
import Menu from '../components/Menu'
import CardHome from '../components/CardHome'
import NavBarMobile from '../components/NavBarMobile'

const Home = () => {
  return (
    <div className={styles.container_geral}>
      <div className={styles.container_sidebar}>
        <Sidebar />
      </div>
      <div className={styles.container_lateral}>
        <Menu />
        <NavBarMobile />
        <CardHome />
      </div>
    </div>
  )
}

export default Home