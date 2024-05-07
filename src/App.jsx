import { useEffect, useState } from "react";
import "./App.css";
import List from "./components/List";
import { ListProvider } from "./context/ListContext";
import { PlusCircle } from "react-feather";
import Modal from "./components/Modal";

function App() {
  const [newTask, setNewTask] = useState("");
  const [showModal, setShowModal] = useState(false);

  const storedLists = JSON.parse(localStorage.getItem("lists")) || {};

  const [lists, setLists] = useState(storedLists);

  const addTask = (task, title) => {
    if (!task) return;

    setLists((prevLists) => {
      return {
        ...prevLists,
        [title]: {
          ...prevLists[title],
          tasks: [...prevLists[title].tasks, task],
        },
      };
    });

    setNewTask("");
  };

  const removeTask = (i, title) => {
    setLists((prevLists) => {
      return {
        ...prevLists,
        [title]: {
          ...prevLists[title],
          tasks: prevLists[title].tasks.filter((_, index) => index !== i),
        },
      };
    });
  };

  const addList = (name, color) => {
    setLists((prevLists) => {
      console.log("H");
      return {
        ...prevLists,
        [name]: {
          tasks: [],
          color: color,
        },
      };
    });
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  return (
    <ListProvider value={{ lists, addTask, removeTask }}>
      <div className="flex flex-col justify-center items-center">
        <div className="flex w-[30%] justify-around my-5 p-2">
          <input
            type="text"
            className="px-3 py-2 rounded-lg border-[#fe6d73] bg-[#f5f5f5] border w-60 outline-none"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            className="px-3 py-2 text-[#fe6d73] bg-gray-800 rounded-lg shadow-md"
            onClick={() => addTask(newTask, "TODO")}
          >
            Add
          </button>
        </div>

        <div className="flex w-[90%] justify-around mt-10">
          {Object.keys(lists).map((list) => (
            <List
              key={list}
              tasks={lists[list].tasks}
              title={list}
              color={lists[list].color}
              setLists={setLists}
            />
          ))}
          <div className="px-10 flex items-center rounded-lg w-[15%] mt-7  ">
            <PlusCircle
              className="cursor-pointer text-[#fe6d73]"
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)} addList={addList} />
        )}
      </div>
    </ListProvider>
  );
}

export default App;
