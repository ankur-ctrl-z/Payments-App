import { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import { signin } from "../services/operations/authApi";
import { useSetRecoilState } from "recoil";
import { tokenAtom } from "../store/atoms";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const setToken = useSetRecoilState(tokenAtom);
  const [showError, setShowError] = useState(false);

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function hanldeClick() {
    const token = await signin(formData.email, formData.password);
    if (token) {
      setToken(token);
      setFormData({
        email: "",
        password: "",
      });
      setShowError(false);
      navigate("/dashboard");
    } else {
      setShowError(true);
    }
  }

  return (
    <div className="h-screen bg-slate-300 flex justify-center items-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex flex-col space-y-4">
          <div className="text-center">
            <Heading label="Sign in" />
            <SubHeading label="Enter your credentials to access your account" />
          </div>

          <div className="space-y-3">
            <InputBox
              label="Email"
              placeholder="johndoe@example.com"
              onChange={changeHandler}
              name="email"
              value={formData.email}
            />

            <InputBox
              label="Password"
              placeholder="123456"
              onChange={changeHandler}
              name="password"
              value={formData.password}
            />
          </div>

          <div className="mt-2">
            <Button label="Sign in" onClick={hanldeClick} />
          </div>

          <div className="mt-2 text-center">
            <BottomWarning
              label="Don't have an account? "
              to="/signup"
              buttonText="Sign up"
            />
          </div>

          {showError && (
            <div className="text-center font-medium text-red-600 text-sm mt-2">
              Signin Failed!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;

