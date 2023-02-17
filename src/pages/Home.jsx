import React from 'react'
import Sidebar from '../components/Sidebar'
import styles from '../styles/home.module.css'
import Menu from '../components/Menu'
import CardHome from '../components/CardHome'

const Home = () => {
  return (
    <div className={styles.container_geral}>
      <Sidebar />
      <div className={styles.container_lateral}>
        <Menu />
        <CardHome />
      </div>
    </div>
  )
}

export default Home