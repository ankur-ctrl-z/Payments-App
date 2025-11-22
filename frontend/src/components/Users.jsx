import { useEffect, useState } from "react";
import Button from "./Button";
import { getCurrentUser, getUsers } from "../services/operations/userApi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tokenAtom, userAtom } from "../store/atoms";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const Users = () => {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);

  const setCurrentUser = useSetRecoilState(userAtom);
  const token = useRecoilValue(tokenAtom);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers(token, filter);

      // backend response shape: { user: [...] }
      const userList = response?.user || [];
      setUsers(userList);
    };

    const fetchCurrentUser = async () => {
      const userDetails = await getCurrentUser(token);

      if (userDetails) {
        setCurrentUser({
          firstname: userDetails.firstName,
          lastname: userDetails.lastName,
        });
      } else {
        setCurrentUser({
          firstname: "",
          lastname: "",
        });
      }
    };

    fetchUsers();
    fetchCurrentUser();
  }, [filter, token, setCurrentUser]);

  return (
    <div className="px-4 sm:px-14">
      <div className="font-bold text-lg">Users</div>

      <div className="my-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="border rounded border-slate-200 px-2 py-1 w-full"
        />
      </div>

      <div className="space-y-3">
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-between items-center py-2">
      <div className="flex items-center">
        <div className="rounded-full h-10 w-10 bg-slate-300 flex justify-center items-center overflow-hidden">
          <img
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.firstName}`}
            className="h-full w-full rounded-full"
          />
        </div>

        <div className="font-medium text-sm ml-2">
          {user.firstName} {user.lastName}
        </div>
      </div>

      <Button
        label="Send Money"
        onClick={() =>
          navigate(
            `/send?id=${user._id}&name=${user.firstName}_${user.lastName}`
          )
        }
      />
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
};


 
