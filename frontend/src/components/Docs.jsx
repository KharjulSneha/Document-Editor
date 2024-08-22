// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import docsIcon from "../images/docsIcon.png";
import { MdDelete } from "react-icons/md";
import deleteImg from "../images/delete.png";
import { api_base_url } from "../Helper";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

const Docs = ({ docs }) => {
  const [error, setError] = useState("");
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
  const docID = `doc-${docs._id}`;
  const navigate = useNavigate();

  const deleteDoc = (id, docID) => {
    let doc = document.getElementById(docID);
    fetch(`${api_base_url}deleteDoc`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        docId: id,
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          setError(data.message);
        } else {
          setIsDeleteModelShow(false);
          setTimeout(() => {
            alert(data.message);
          }, 100);
          doc.remove();
        }
      })
      .catch((error) => {
        console.error("Error deleting document:", error);
        setError("An error occurred while deleting the document.");
      });
  };

  return (
    <>
      <div
        id={docID}
        className="docs cursor-pointer rounded-lg mt-2 flex items-center justify-between p-[10px] bg-[#F0F0F0] transition-all hover:bg-[#DCDCDC]"
      >
        <div
          onClick={() => {
            navigate(`/createDocs/${docs._id}`);
          }}
          className="left flex items-center gap-2"
        >
          <img src={docsIcon} alt="" />
          <div className="">
            <h3 className="text-[21px]">{docs.title}</h3>
            <p className="text-[14px] text-[#808080]">
              Created In : {new Date(docs.date).toDateString()} | Last Updated :{" "}
              {new Date(docs.lastUpdate).toDateString()}
            </p>
          </div>
        </div>
        <div
          className="docsRight"
          onClick={() => {
            setIsDeleteModelShow(true);
          }}
        >
          <i className="delete text-[30px] text-red-500 cursor-pointer transition-all hover:text-red-600">
            <MdDelete />
          </i>
        </div>
      </div>

      {isDeleteModelShow ? (
        <>
          <div className="deleteDocsModelCon top-0 right-0 left-0 bottom-0 fixed bg-[rgba(0,0,0,0.3)] w-screen h-screen flex flex-col items-center justify-center">
            <div className="deleteModel flex flex-col justify-center p-[15px] bg-[#fff] rounded-lg w-[35vw] h-[37vh]">
              <h3 className="text-[21px]">Delete Document</h3>
              <div className="flex items-center gap-3 ">
                <img src={deleteImg} alt="" />
                <div>
                  <h3 className="text-[19px]">
                    Do You Want Delete This Document
                  </h3>
                  <p className="text-[14px] text-[#808080]">Delete / Cancel</p>
                </div>
              </div>
              <div className="flex mt-4 items-center justify-between gap-2 w-full">
                <button
                  onClick={() => {
                    deleteDoc(docs._id, docID);
                  }}
                  className="p-[10px] bg-red-500 text-white rounded-lg border-0 cursor-pointer min-w-[48%]"
                >
                  Delete
                </button>
                <button
                  className="p-[10px] bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer min-w-[48%]"
                  onClick={() => {
                    setIsDeleteModelShow(false);
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
};

Docs.propTypes = {
  docs: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    Date: PropTypes.string.isRequired,
    lastUpdate: PropTypes.string.isRequired,
  }).isRequired,
};

export default Docs;
