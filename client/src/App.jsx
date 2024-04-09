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
import Home from './pages/Home/Home';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import EditBlog from './pages/EditBlog/EditBlog/EditBlog';
import EditBlogImage from './pages/EditBlog/EditBlog/EditBlogImage';
import NotRequireAuth from './components/Auth/NotRequireAuth';
import RequireAuth from './components/Auth/RequireAuth';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      

      <Route element={<NotRequireAuth/>}>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      </Route>

      <Route element={<RequireAuth allowedRoles={["USER"]}/>}>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/edit-blog' element={<EditBlog/>}/>
      <Route path='/update-image' element={<EditBlogImage/>}/>
      <Route path='/update-coverImage' element={<EditCoverImage/>}/>
      <Route path='/update-avatar' element={<EditAvatar/>}/>
      <Route path='/update-account' element={<EditDetails/>}/>
      <Route path='/change-password' element={<ChangePassword/>}/>
      <Route path='/add-blog' element={<AddBlog/>}/>
      </Route>

      <Route path='/denied' element={<Denied/>}/>
            <Route path='/all-blog' element={<AllBlog/>}/>
      <Route path='/blog-details' element={<BlogDetails/>}/>
      <Route path='/forgotPassword' element={<ForgotPassword/>}/>
      <Route path='/reset-password/:resetToken' element={<ResetPssword/>}/>

    </Routes>
  )
}

export default App
