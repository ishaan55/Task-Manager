import React, { useState } from "react";
import { X } from "react-feather";

function Modal({ onClose, addList }) {
  const [color, setColor] = useState("#ffffff");
  const [name, setName] = useState("");
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className=" flex flex-col gap-5">
        <X
          className="place-self-end mx-2 cursor-pointer text-[#fe6d73]"
          onClick={onClose}
        />
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="bg-[#6F2DBD] rounded-lg px-20 py-10 flex flex-col gap-5 items-center mx-4">
            <input
              type="text"
              placeholder="Enter List Name"
              className="px-4 py-3 bg-transparent outline-none text-white rounded-md border-b-2 border-[#fe6d73] w-full"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex justify-around w-full">
              <label htmlFor="color" className="text-[#f5f5f5]">
                Choose Color:
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <button
              className="mt-4 bg-[#0f0a0a] text-[#f5f5f5] px-4 py-2 rounded-md"
              onClick={() => {
                console.log(name, color);
                addList(name, color);
                onClose();
              }}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
