import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../features/paste/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  console.log(pastes);

  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="flex flex-col justify-center items-center p-1">
      <input
        className="p-1 bg-slate-700 rounded-lg mt-4 w-[300px]"
        type="search"
        value={searchTerm}
        placeholder="search here"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
        {filterData.length > 0 &&
          filterData.map((paste) => {
            return (
              <div className="flex flex-col justify-center items-center mt-4 p-4 w-[500px] bg-[#383b38] rounded-xl border border-slate-800">
                <div className="font-bold ">{paste.title}</div>
                <div>{paste.content}</div>
                <div className="flex flex-row gap-3 justify-evenly p-2 mt-4">
                  <button
                   className="border border-sky-800 px-2 bg-slate-800 rounded-lg"
                  >
                  <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>

                  <button
                   className="border border-sky-800 px-2 bg-slate-800 rounded-lg">
                  
                  <a href= {`/pastes/${paste?._id}`}>View</a>
                  </button>

                  <button
                   onClick={()=>handleDelete(paste?._id)}
                   className="border border-sky-800 px-2 bg-slate-800 rounded-lg"
                  >
                  Delete
                  </button>
                  <button
                  onClick={()=> {
                    navigator.clipboard.writeText(paste?.content)
                    toast.success("copied to clipboard")
                  }}
                   className="border border-sky-800 px-2 bg-slate-800 rounded-lg"
                  >
                  Copy
                  </button>
                </div>
              <div>
                {paste.createdAt}
              </div>

              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
