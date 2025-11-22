import { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import { useRecoilValue } from "recoil";
import { tokenAtom, userAtom } from "../store/atoms";
import Button from "../components/Button";
import { updateCredentials } from "../services/operations/userApi";
import Appbar from "../components/Appbar";

const Settings = () => {
  const user = useRecoilValue(userAtom);
  const token = useRecoilValue(tokenAtom);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    password: "",
  });

  function handleChange(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleClick() {
    const updatedData = {};

    if (formData.firstname) updatedData.firstname = formData.firstname;
    if (formData.lastname) updatedData.lastname = formData.lastname;
    if (formData.password) updatedData.password = formData.password;

    const response = await updateCredentials(token, updatedData);

    if (response === "user updated successfully") {
      setFormData({
        firstname: "",
        lastname: "",
        password: "",
      });
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-300">
      <Appbar user={user.firstname} />

      <div className="flex justify-center items-center h-[calc(100vh-64px)] px-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <div className="flex flex-col space-y-4">

            <div className="text-center">
              <Heading label="Update Credentials" />
              <SubHeading label="Enter the information that you want to update" />
            </div>

            <div className="space-y-3">
              <InputBox
                label="First Name"
                placeholder={user.firstname}
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />

              <InputBox
                label="Last Name"
                placeholder={user.lastname}
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />

              <InputBox
                label="Password"
                placeholder="*******"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="mt-2">
              <Button label="Update" onClick={handleClick} />
            </div>

            {success && (
              <div className="text-center font-medium text-green-600 text-sm mt-2">
                Data updated!
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

