import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { CgProfile } from "react-icons/cg";


function formatTime(time) {
  const date = new Date(time);
  const options = {
    day: "numeric",
    month: "short",
  };
  return date.toLocaleDateString("en-US", options);
}

function BlogDetails() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const { state } = useLocation();
  const id = nanoid();
  const date = state ? formatTime(state?.createdAt) : null;

  
  


  return (
    <Layout>
      <Link
        to="#"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
        className="relative left-40 text-2xl link text-accent cursor-pointer"
      >
        <AiOutlineArrowLeft />
      </Link>
      <div className="min-h-[90vh] flex flex-col gap-5 items-center py-10 justify-center w-3/4 m-auto">
        <div className="lg:text-4xl w-full font-bold font-serif">
          <h1>{state?.title}</h1>
        </div>

        <div className="bg-bash-100 w-full lg:px-10 flex items-center gap-3 lg:gap-5 py-5 shadow-[0_0_6px_black]">
          <div className="rounded-full">
          {state?.author.avatar?<img src={state?.author.avatar} alt="" className="rounded-full w-12 h-12" />: <CgProfile size={12}  className="rounded-full w-12 h-12"/> } 

           
          </div>
          <div>
            <p className="lg:text-xl text-xs font-semibold">{state?.author.username}</p>
          </div>
          <div>
            <p className="lg:text-lg text-xs font-serif">{date}</p>
          </div>
          <div>
            <p className=" lg:text-lg text-xs font-mono">{state?.readTime} min read</p>
          </div>
        </div>

        <div className="flex flex-col w-full gap-5">
          <img className="lg:h-[30rem] object-cover" src={state?.image} alt="" />

          <div className="min-h-30 content-wrapper overflow-auto ">
            <p className="font-serif">
              <span className="font-semibold font-serif">
                {state?.author.fullName}
              </span>{" "}
              - {state?.content}
            </p>
          </div>

          
        </div>
      </div>
    </Layout>
  );
}

export default BlogDetails;
