import React from 'react'
import styles from '../styles/selectorPages.module.css'

const SelectorPages = ({itensPerPage, setItensPerPage, itens}) => {
  return (
    <div className={styles.container_select}>
      <p>Itens por página</p>  
      <select value={itensPerPage} onChange={(e) => setItensPerPage(Number(e.target.value))}>
        <option value={5}>5</option>
        <option value={7}>7</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={100000}>Tudo</option>
      </select>
    </div>
  )
}

export default SelectorPages;