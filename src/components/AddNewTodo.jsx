import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import TodoForm from "./TodoForm";
import { TodoContext } from "../context";

const AddNewTodo = () => {
  const { selectedProject } = useContext(TodoContext);

  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [day, setDay] = useState();
  const [time, setTime] = useState();
  const [todoProject, setTodoProject] = useState(selectedProject);

  const projects = [
    { id: 1, name: "personal", numOfTodos: 0 },
    { id: 2, name: "work", numOfTodos: 1 },
    { id: 3, name: "other", numOfTodos: 2 },
  ];

  const handleSubmit = () => {};
  useEffect(() => {
    setTodoProject(selectedProject);
  }, [selectedProject]);

  return (
    <div className="AddNewTodo">
      <div className="btn">
        <button onClick={() => setShowModal(true)}>+ New Todo</button>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <TodoForm
          handleSubmit={handleSubmit}
          heading="Add new to do!"
          text={text}
          setText={setText}
          day={day}
          setDay={setDay}
          time={time}
          setTime={setTime}
          projects={projects}
          showButtons={true}
          setShowModal={setShowModal}
          todoProject={todoProject}
          setTodoProject={setTodoProject}
        />
      </Modal>
    </div>
  );
};

export default AddNewTodo;
