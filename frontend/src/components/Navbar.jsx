// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { FaSearch } from "react-icons/fa";
import Avatar from "react-avatar";
import { api_base_url } from "../Helper";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const getUser = () => {
    fetch(`${api_base_url}getUser`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          setError(data.message);
        } else {
          setData(data.user);
        }
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Trigger onSearch prop whenever the input changes
  };

  const logout = () => {
    fetch(`${api_base_url}logout`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          setError(data.message);
        } else {
          localStorage.removeItem("userId");
          localStorage.removeItem("token");
          localStorage.removeItem("isLoggedIn");
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="navbar flex items-center px-[100px] h-[75px] justify-between bg-[#F4F4F4]">
        <img src={logo} alt="" />

        <div className="right flex items-center justify-end gap-2">
          <div className="inputBox w-[30vw]">
            <i>
              <FaSearch />
            </i>
            <input
              type="text"
              placeholder="Search here...!"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <button
            onClick={logout}
            className="p-[10px] min-w-[120px] bg-red-500 text-white rounded-lg border-0 transition-all hover:bg-red-600"
          >
            Logout
          </button>
          <Avatar
            name={data ? data.name : ""}
            className="cursor-pointer"
            size="40"
            round="50%"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
