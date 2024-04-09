import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Layout/>}/>
    </Routes>
  )
}

export default App
