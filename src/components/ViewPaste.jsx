import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { addToPaste, updateToPaste } from "../features/paste/pasteSlice";

const ViewPaste = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const {id} = useParams()


  const allPastes = useSelector((state)=>state.paste.pastes);

  const paste = allPastes.filter((p)=>p._id === id)[0]

  return (
    <div>
      <div className="flex justify-between flex-row p-2 items-center mt-2" >
        <input
          className="bg-slate-700 rounded-lg p-2 w-[60%]"
          type="text"
          disabled
          placeholder="Enter title here"
          value={paste.title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <textarea
          className="min-w-[500px] bg-slate-600 rounded-xl p-4"
          rows={15}
          placeholder="Enter content here"
          value={paste.content}
          disabled
          onChange={(e)=>setValue(e.target.value)}
        />
      </div>
    </div>
  );
}

export default ViewPaste
