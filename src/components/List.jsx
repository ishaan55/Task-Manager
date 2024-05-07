import React, { useState } from "react";
import { MinusCircle, X } from "react-feather";
import { useList } from "../context/ListContext";

function List({ tasks, color, setLists, title = "Hello" }) {
  const { removeTask, addTask, lists } = useList();
  

  const colors = ["bg-[#6b7280]", "bg-[#9235d4]", "bg-[#3edb25]"];

  const handleOnDrag = (e, task, index, title) => {
    e.dataTransfer.setData("task", task);
    e.dataTransfer.setData("index", index);
    e.dataTransfer.setData("title", title);
  };

  const handleOnDrop = (e) => {
    const task = e.dataTransfer.getData("task");
    const oldTitle = e.dataTransfer.getData("title");
    const index = parseInt(e.dataTransfer.getData("index"));
    if (title === e.dataTransfer.getData("title")) return;
    addTask(task, title);
    removeTask(index, oldTitle);
  };

  const removeList = (title) => {
    const newLists = { ...lists };
    delete newLists[title];
    setLists(newLists);
  };


  return (
    <div
      className=""
      onDrop={handleOnDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div
        className={`w-[13rem] px-3 py-2 text-gray-100 pl-4 rounded-lg flex justify-between relative`}
        style={{ backgroundColor: color }}
      >
        <div>{title}</div>
        <X
          className={`cursor-pointer w-[1rem] text-gray-100`}
          onClick={() => removeList(title)}
        />
      </div>

      {tasks.map((task, index) => (
        <div
          key={index}
          className="bg-[#f5f5f5] px-3 py-3 rounded-lg shadow-lg mt-5 flex justify-between relative"
          draggable
          onDragStart={(e) => handleOnDrag(e, task, index, title)}
        >
          <div className="">{task}</div>
          <MinusCircle
            className="cursor-pointer w-[15px] absolute bottom-0 right-0 mr-2"
            onClick={() => removeTask(index, title)}
          />
        </div>
      ))}
    </div>
  );
}

export default List;
