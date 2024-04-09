import React, { useEffect } from "react";
import Layout from "../../Layout/Layout";
import { Link } from "react-router-dom";
import { getAllBlogs, getUserBlogs } from "../../redux/slice/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../../components/BlogCard/BlogCard";
import home from "../../assets/home.jpg";

function Home() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  async function load() {
    const response = await dispatch(getAllBlogs());
  }
  useEffect(() => {
    load();
  }, []);

  const blog = useSelector((state) => state.blog.allBlogs);
  const auth = useSelector((state) => state?.auth.isLoggedIn);

  return (
    <Layout>
      <div className="hero min-h-screen flex flex-col justify-center items-center relative">
        <div
          className="bg-center bg-no-repeat bg-cover w-full h-full absolute top-0 left-0"
          style={{ backgroundImage: `url(${home})` }}
        ></div>
        <div className="bg-black opacity-50 w-full h-full absolute top-0 left-0"></div>
        <div className="hero-content flex flex-col w-full lg:w-2/5 text-center text-white relative">
          <div>
            <p className="lg:text-4xl text-3xl font-bold">A Place To Read </p>
            <p className="lg:text-4xl text-3xl font-bold">Write and Connect</p>
          </div>
          <p className="lg:text-xl text-sm font-semibold py-6">
            It is easy and free to post your thinking on any
            <br className="hidden lg:block" /> topics and connect with millions
            of readers.
          </p>
          <div className="flex gap-4">
            <Link to="/all-blog">
              <button className="btn btn-success">Read Blogs</button>
            </Link>{" "}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
