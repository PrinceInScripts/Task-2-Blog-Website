import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Signup from './pages/Signup/Signup';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Layout/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
  )
}

export default App
