import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Denied from './pages/NotFound/Denied';
import Profile from './pages/Profile/Profile';
import ForgotPassword from './pages/password/forgetPassword.jsx/ForgotPassword';
import EditAvatar from './pages/EditProfile/EditAvatar/EditAvatar';
import EditCoverImage from './pages/EditProfile/EditCoverImage/EditCoverImage';
import ResetPssword from './pages/password/resetPassword/ResetPssword';
import EditDetails from './pages/EditProfile/EditDetails/EditDetails';
import ChangePassword from './pages/password/changePassword/ChangePassword';
import AddBlog from './pages/AddBlog/AddBlog';
import AllBlog from './pages/AllBlog.jsx/AllBlog';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Layout/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>

      <Route path='/denied' element={<Denied/>}/>
      <Route path='/profile' element={<Profile/>}/>
      
      <Route path='/update-coverImage' element={<EditCoverImage/>}/>
      <Route path='/update-avatar' element={<EditAvatar/>}/>
      <Route path='/update-account' element={<EditDetails/>}/>
      <Route path='/add-blog' element={<AddBlog/>}/>
      <Route path='/change-password' element={<ChangePassword/>}/>
      <Route path='/all-blog' element={<AllBlog/>}/>
      <Route path='/forgotPassword' element={<ForgotPassword/>}/>
      <Route path='/reset-password/:resetToken' element={<ResetPssword/>}/>

    </Routes>
  )
}

export default App
