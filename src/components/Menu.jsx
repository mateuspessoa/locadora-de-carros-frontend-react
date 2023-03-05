import React from 'react'
import styles from '../styles/menu.module.css'
import { CgProfile } from 'react-icons/cg'


const Menu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content_geral}>
        <div className={styles.icon}>
          <CgProfile color='#FFF' fontSize={20} />
        </div>
        <button className={styles.btn_sair}>Sair</button>
      </div>
    </div>
  )
}

export default Menu