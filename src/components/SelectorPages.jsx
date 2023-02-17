import React from 'react'

const SelectorPages = ({itensPerPage, setItensPerPage, itens}) => {
  return (
    <div>
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