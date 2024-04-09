import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Denied from './pages/NotFound/Denied';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Layout/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>

      <Route path='/denied' element={<Denied/>}/>
    </Routes>
  )
}

export default App
