import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Veiculos from './pages/Veiculos'
import Funcionarios from './pages/Funcionarios'
import Clientes from './pages/Clientes'
import Alugueis from './pages/Alugueis'

function App() {

  return (
    <div className="App">

      <Router>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/veiculos' element={<Veiculos />} />
          <Route path='/funcionarios' element={<Funcionarios />} />
          <Route path='/clientes' element={<Clientes />} />
          <Route path='/alugueis' element={<Alugueis />} />

        </Routes>
      </Router>
      
    </div>
  )
}

export default App
