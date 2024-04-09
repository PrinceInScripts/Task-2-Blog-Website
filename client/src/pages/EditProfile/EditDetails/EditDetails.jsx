import React, { useState } from "react";
import Layout from "../../../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isEmail } from "../../../helper/RegexMatcher";
import { updateAccount } from "../../../redux/slice/authSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function EditDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateDetails, setUpdatDetails] = useState({
    email: "",
    fullName: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;

    setUpdatDetails({
      ...updateDetails,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
   
    if (!updateDetails.fullName || !updateDetails.email) {
      toast.error("Please fill all the detials");
      return;
    }

    if (updateDetails.fullName.length < 5) {
      toast.error("Name should be atleast of 5 charcter");
      return;
    }

    if (!isEmail(updateDetails.email)) {
      toast.error("Invalid email provided");
      return;
    }

    const response = await dispatch(updateAccount(updateDetails));

    if (response?.payload?.success) {
      navigate("/profile");
    }

    setUpdatDetails({
      email: "",
      fullName: "",
    });
  }

  return (
    <Layout>
      <div className="min-h-[90vh] flex flex-col items-center justify-center">
        <form onSubmit={onFormSubmit} className=" w-96 flex flex-col gap-10">
          <Link
            onClick={() => navigate(-1)}
            className=" text-2xl link text-accent cursor-pointer"
          >
            <AiOutlineArrowLeft />
          </Link>
          <div className="flex flex-col gap-1">
          
            <input
              onChange={handleUserInput}
              value={updateDetails.fullName}
              required
              type="text"
              name="fullName"
              className="input input-bordered w-full max-w-xs"
              placeholder="fullName..."
              id="fullName"
            />
          </div>
          <div className="flex flex-col gap-1">
           
            <input
              onChange={handleUserInput}
              value={updateDetails.email}
              required
              type="email"
              name="email"
              className="input input-bordered w-full max-w-xs"
              placeholder="Email..."
              id="email"
            />
          </div>

          <div className="text-end">
            <Link to={"/change-password"}>
              <button className="text-accent link">change Password?</button>
            </Link>
          </div>

          <button type="submit" className="btn w-full btn-info">
            Update Account
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default EditDetails;
