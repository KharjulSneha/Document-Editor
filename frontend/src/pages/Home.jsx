// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { IoAddOutline } from "react-icons/io5";
import Docs from "../components/Docs";
import { MdTitle } from "react-icons/md";
import { api_base_url } from "../Helper";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [data, setData] = useState("");

  const createDoc = () => {
    if (title === "") {
      setError("Please Enter title !");
    } else {
      fetch(`${api_base_url}createDoc`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          docName: title,
          userId: localStorage.getItem("userId"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setIsCreateModelShow(false);
            navigate(`/createDocs/${data.docId}`);
          } else {
            setError(data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const getData = () => {
    fetch(`${api_base_url}getAllDocs`, {
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
        setData(data.docs);
        setFilteredData(data.docs);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (query) => {
    if (query === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((doc) =>
        doc.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="flex items-center justify-between px-[100px]">
        <h3 className="mt-7 mb-3 text-3xl">All Documents</h3>
        <button
          className="btnBlue"
          onClick={() => {
            setIsCreateModelShow(true);
            document.getElementById("Title").focus();
          }}
        >
          <i>
            <IoAddOutline />
          </i>
          Create New Document
        </button>
      </div>

      <div className="allDocs px-[100px] mt-4">
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((el, index) => (
            <Docs key={el._id} docs={el} docID={`doc-${index + 1}`} />
          ))
        ) : (
          <p>No documents found.</p>
        )}
      </div>

      {isCreateModelShow ? (
        <>
          <div className="createDocsModelCon top-0 right-0 left-0 bottom-0 fixed bg-[rgba(0,0,0,0.3)] w-screen h-screen flex flex-col items-center justify-center">
            <div className="createDocsModel p-[15px] bg-[#fff] rounded-lg w-[35vw] h-[31vh]">
              <h3 className="text-[20px]">Create New Document</h3>
              <div className="inputCon mt-3">
                <p className="text-[14px] text-[#808080]">Enter A Title</p>
                <div className="inputBox w-[100%]">
                  <i>
                    <MdTitle />
                  </i>
                  <input
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    value={title}
                    type="title"
                    placeholder="Entere A Title"
                    id="Title"
                    name="Title"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 w-full">
                <button className="btnBlue !min-w-[48%]" onClick={createDoc}>
                  Create Document
                </button>
                <button
                  className="p-[10px] bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer min-w-[48%]"
                  onClick={() => {
                    setIsCreateModelShow(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        " "
      )}
    </>
  );
}

export default Home;
