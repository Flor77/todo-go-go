import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import TodoForm from "./TodoForm";
import { TodoContext } from "../context";
import { calendarItems } from "../constants";
import moment from "moment";
import randomcolor from "randomcolor";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddNewTodo = () => {
  const { projects, selectedProject } = useContext(TodoContext);

  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [day, setDay] = useState();
  const [time, setTime] = useState();
  const [todoProject, setTodoProject] = useState(selectedProject);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text && !calendarItems.includes(todoProject)) {
      addDoc(collection(db, "todos"), {
        text: text,
        date: moment(day).format("MM/DD/YYYY"),
        checked: false,
        color: randomcolor(),
        day: moment(day).format("d"),
        projectName: todoProject,
        time: moment(time).format("hh:mm A"),
      });
      setShowModal(false);
      setText("");
      setDay(new Date());
      setTime(new Date());
    }
  };
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
