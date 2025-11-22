import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import { useRecoilValue } from "recoil";
import { tokenAtom, userAtom } from "../store/atoms";
import { getBalance } from "../services/operations/transactionApi";
import { Users } from "../components/Users";

function Dashboard() {
  const [balance, setBalance] = useState("");
  const token = useRecoilValue(tokenAtom);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const fetchBalance = async () => {
      const userBalance = await getBalance(token);
      setBalance(userBalance);
    };
    fetchBalance();
  }, [token]);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <Appbar user={user.firstname} />

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        {/* Balance Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <Balance balance={balance} />
        </div>

        {/* Users List */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <Users />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;

