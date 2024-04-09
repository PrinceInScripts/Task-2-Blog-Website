import React, { useEffect } from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment, FaTimes } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function modifyContent(content,maxLength){
    if(content.length > maxLength){
        return content.substring(0,maxLength)+ '  ....  '
    }
    return content + '  ....  ';
}

function formatTime(time){
    const date =new Date(time)
    const options={
        year:'numeric',
        month:'long',
        day:'numeric',
    }

    return date.toLocaleDateString('en-US',options)
}




function BlogCard({blog}) {

    const navigate=useNavigate()
    const auth=useSelector((state)=>state?.auth.isLoggedIn)
    const blogs=useSelector((state)=>state.blog.userBlogs)

    const content=modifyContent(blog.content,150)
    const extractedDate = formatTime(blog.author.createdAt);

   
    return (
        <div className="w-full lg:w-3/4 bg-base-100 rounded-md flex flex-col lg:flex-row-reverse shadow-[0_0_10px_black]">
        <div className="w-full lg:w-1/2 flex justify-center items-center">
            <img src={blog.image} alt="Blog" className="w-11/12 lg:h-[20rem] lg:w-full h-auto object-cover rounded-md" />
        </div>
        <div className="card-body gap-4 p-6 lg:w-1/2">
            <div className="text-xl font-semibold">{blog.author.fullName}</div>
            <h2 className="card-title">{blog.title}</h2>
            <p>
                {content}
                <Link to={"/blog-details"} state={{ ...blog }}>
                    <a className="link link-primary">Read more</a>
                </Link>
            </p>
            <div className="flex justify-between items-center">
                <div className="badge badge-outline">{blog.category}</div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div>{extractedDate}</div>
            </div>
        </div>
    </div>
           
        
    );
}

export default BlogCard;