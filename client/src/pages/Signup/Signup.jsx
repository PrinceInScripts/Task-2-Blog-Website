import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { isEmail, isValidPassword } from "../../helper/RegexMatcher";
import toast from "react-hot-toast";
import { createAccount } from "../../redux/slice/authSlice";
import Layout from "../../Layout/Layout";
import { BsPersonCircle } from "react-icons/bs";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signupDetails, setSignupDetails] = useState({
    email: "",
    fullName: "",
    password: "",
    username: "",
  });


  function handleUserInput(e) {
    const { name, value } = e.target;

    setSignupDetails({
      ...signupDetails,
      [name]: value,
    });
  }


  async function onFormSubmit(e) {
    e.preventDefault();

    if(!signupDetails.fullName){
      toast.error("FullName is required")
      return;
    }
    if( !signupDetails.username ){
      toast.error("username is required")
      return;
    }
    if( !signupDetails.email){
      toast.error("email is required")
      return;
    }
    if( !signupDetails.password){
      toast.error("password is required")
      return;
    }

    if (signupDetails.fullName.length < 5 ) {
      toast.error("Name should be atleast of 5 charcter");
      return;
    }
    if (signupDetails.username.length < 5) {
      toast.error("username should be atleast of 5 charcter");
      return;
    }

    if (!isEmail(signupDetails.email)) {
      toast.error("Invalid email provided");
      return;
    }

    if (!isValidPassword(signupDetails.password)) {
      toast.error(
        "Invalid password provided, password should 6-16 character long with atleast a number and a special character"
      );
      return;
    }

    const response = await dispatch(createAccount(signupDetails));
    if (response?.payload?.data.success) {
      navigate("/login");
    }

    setSignupDetails({
      email: "",
      fullName: "",
      password: "",
      username: "",
    });

  }

  return (
    <Layout>
      <div className="flex overflow-x-auto items-center justify-center gap-20 h-[90vh]">
       
        <form
          onSubmit={onFormSubmit}
          noValidate
          className="flex flex-col justify-center gap-3 bg-bash-600 rounded-lg p-6 w-96"
        >
          <p className="">
            have an account ?{" "}
            <Link to="/login" className="cusror-pointer text-accent">
              Login
            </Link>
          </p>

          <h1 className="text-2xl font-bold">Welcome to the Blog </h1>
          

          <div className="flex flex-col gap-1">
            <input
              onChange={handleUserInput}
              value={signupDetails.username}
              required
              type="text"
              name="username"
              className="input input-bordered w-full max-w-xs"
              placeholder="enter your username..."
              id="username"
            />
          </div>

          <div className="flex flex-col gap-1">
            <input
              onChange={handleUserInput}
              value={signupDetails.fullName}
              required
              type="text"
              name="fullName"
              className="input input-bordered w-full max-w-xs"
              placeholder="enter your fullName..."
              id="fullName"
            />
          </div>
          <div className="flex flex-col gap-1">
            <input
              onChange={handleUserInput}
              value={signupDetails.email}
              required
              type="email"
              name="email"
              className="input input-bordered w-full max-w-xs"
              placeholder="enter your Email..."
              id="email"
            />
          </div>

          <div className="flex flex-col gap-1">
            <input
              onChange={handleUserInput}
              value={signupDetails.password}
              required
              type="password"
              name="password"
              className="input input-bordered w-full max-w-xs"
              placeholder="enter your Password..."
              id="password"
            />
          </div>
          <button type="submit" className="mt-2 btn btn-success">
            Create Account
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Signup;
