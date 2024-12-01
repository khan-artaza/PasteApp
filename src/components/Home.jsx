import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { addToPaste, updateToPaste } from "../features/paste/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  // const dispatch = useDispatch();
  const dispatch = useDispatch();

  const allPastes = useSelector((state)=>state.paste.pastes);

  useEffect(()=>{
    if(pasteId){
      const paste = allPastes.find((p)=> p._id === pasteId);
      setTitle(paste.title)
      setValue(paste.content)
    }
  },[pasteId])

  function createPaste(){
    const paste = {
      title : title,
      content : value,
      _id : pasteId || Date.now().toString(36),
      createdAt : new Date().toLocaleDateString()
    }

   

    if(pasteId){
      //update
      dispatch(updateToPaste(paste))
    }
    else{
      //create
      dispatch(addToPaste(paste))
    }

    //after creation or updation
    setTitle('')
    setValue('')
    setSearchParams({})
  }

  return (
    <div>
      <div className="flex justify-between flex-row p-2 items-center mt-2" >
        <input
          className="bg-slate-700 rounded-lg p-2 w-[60%]"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createPaste} className="border border-slate-700 p-2 rounded-lg bg-sky-700 ml-3">
          {pasteId ? "Update my Paste" : "Create my Paste"}
        </button>
      </div>

      <div className="mt-4">
        <textarea
          className="min-w-[500px] bg-slate-600 rounded-xl p-4"
          rows={15}
          placeholder="Enter content here"
          value={value}
          onChange={(e)=>setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
