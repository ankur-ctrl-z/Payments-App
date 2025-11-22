import { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { signup } from "../services/operations/authApi";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function hanldeClick(event) {
    event.preventDefault();
    const response = await signup(
      formData.email,
      formData.firstName,
      formData.lastName,
      formData.password
    );

    if (response === "User created successfully") {
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
      });
      setShowError(false);
      navigate("/signin");
    } else {
      setShowError(true);
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex flex-col space-y-4">
          <div className="text-center">
            <Heading label="Sign Up" />
            <SubHeading label="Enter your information to create an account" />
          </div>

          <div className="space-y-3">
            <InputBox
              label="Email"
              placeholder="johndoe@example.com"
              name="email"
              value={formData.email}
              onChange={changeHandler}
            />

            <InputBox
              label="First Name"
              placeholder="Ankur"
              name="firstName"
              value={formData.firstName}
              onChange={changeHandler}
            />

            <InputBox
              label="Last Name"
              placeholder="Sharma"
              name="lastName"
              value={formData.lastName}
              onChange={changeHandler}
            />

            <InputBox
              label="Password"
              placeholder="123456"
              name="password"
              value={formData.password}
              onChange={changeHandler}
            />
          </div>

          <div className="mt-2">
            <Button label="Sign up" onClick={hanldeClick} />
          </div>

          <div className="mt-2 text-center">
            <BottomWarning
              label="Already have an account? "
              to="/signin"
              buttonText="Sign in"
            />
          </div>

          {showError && (
            <div className="text-center font-medium text-red-600 text-sm mt-2">
              Signup Failed!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;

