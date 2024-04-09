import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
// import { getUserBlogs } from "../../redux/slice/blogSlice";
// import BlogCard from "../../components/BlogCard/BlogCard";
import { MdModeEditOutline } from "react-icons/md";
import { FaCamera, FaUpload } from "react-icons/fa";
// import UserBlogCard from "../../components/BlogCard/UserBlogCard";
import { CgProfile } from "react-icons/cg";


function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const user = useSelector((state) => state.auth.data);
  // const blogs = useSelector((state) => state.blog.userBlogs);

  async function load() {
    await dispatch(getUserBlogs());
  }

  useEffect(() => {
    // load();
    console.log(user);
  }, []);
  return (
    <Layout>
      <div className="min-h-[100vh] flex flex-col items-center m-auto pb-20">
        

        <div className="flex flex-col lg:flex-row mt-10 justify-start gap-20  ">
          <div className="">
           {user.avatar?<img src={user.avatar} alt="" className="w-56 h-56 rounded-full" />: <CgProfile size={224}  className="w-42 m-auto rounded-full border border-black"/> } 
            <div className="relative left-24 bottom-10 w-10 h-10 rounded-full flex items-center justify-center bg-white cursor-pointer text-black">
              <Link to={"/update-avatar"}>
                <FaCamera size={25} />
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center items-start gap-4 m-2 ">
            <div className="flex items-center gap-10">
              <p>{user.username}</p>
              <Link to={"/update-account"}>
                <button className="btn btn-success">Edit Profile</button>
              </Link>
            </div>
            <div className="flex flex-col justify-start">
              <p>{user.fullName}</p>
              <p>{user.email}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start mt-20 items-start lg:w-3/4 gap-10 m-auto">
          <h1 className="text-center text-4xl font-bold">POSTS</h1>

          {/* {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-40 gap-y-20">
              {blogs?.map((element) => (
                <UserBlogCard key={element._id} blog={element} />
              ))}
            </div>
          ) : (
            <div className="flex w-full items-center justify-center h-40">
              <Link to={"/add-blog"}>
                <button className="btn btn-info">Create Your First Blog</button>
              </Link>
            </div>
          )} */}
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
