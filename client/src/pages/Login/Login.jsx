import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/authSlice";
import { isEmail } from "../../helper/RegexMatcher";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;

    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!loginDetails.password || !loginDetails.email) {
      toast.error("Please fill all the detials");
      return;
    }

    if (!isEmail(loginDetails.email)) {
      toast.error("Invalid email provided");
      return;
    }

    const response = await dispatch(login(loginDetails));

    if (response?.payload?.data.success) {
      navigate("/");
    }

    setLoginDetails({
      email: "",
      password: "",
    });
  }

  return (
    <Layout>
      <div className="flex flex-col overflow-x-auto gap-5 items-center justify-center h-[90vh]">
        <h1 className="font-semibold text-4xl">Login Here ..</h1>
        <form
          onSubmit={onFormSubmit}
          noValidate
          className="flex flex-col gap-3 rounded-lg p-4 bg-bash-600 w-96 "
        >
         
          <div className="flex flex-col gap-1">
          
            <input
              onChange={handleUserInput}
              value={loginDetails.email}
              required
              type="email"
              name="email"
              className="input input-bordered w-full max-w-xs"
              placeholder="Email..."
              id="email"
            />
          </div>
          <div className="flex flex-col gap-1">
           
            <input
              onChange={handleUserInput}
              value={loginDetails.password}
              required
              type="password"
              name="password"
              className="input input-bordered w-full max-w-xs"
              placeholder="Password..."
              id="password"
            />
          </div>
          <div className="relative left-52 w-32 border-none hover:border-none">
            <Link to={"/forgotPassword"}>
              <button className="text-accent">Forgot Password?</button>
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-success text-lg font-semibold"
          >
            Log In
          </button>
          <p className="">
            Don't have an account ?{" "}
            <Link to="/signup" className="cusror-pointer text-accent">
              Signup
            </Link>
          </p>
        </form>

      
      </div>
    </Layout>
  );
}

export default Login;
