import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Layout/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}

export default App
