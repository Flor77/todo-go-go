import React, { useState, useContext } from "react";
import { Pencil, XCircle } from "react-bootstrap-icons";
import Modal from "./Modal";
import RenameProject from "./RenameProject";
import { TodoContext } from "../context/index";
import {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

async function deleteProject(id) {
  // Delete the project document
  await deleteDoc(doc(db, "projects", id));

  // Fetch the associated todos using a query
  const todosQuery = query(
    collection(db, "todos"),
    where("projectId", "==", id)
  );
  const todosSnapshot = await getDocs(todosQuery);

  // Create an array of delete promises for todos
  const deletePromises = todosSnapshot.docs.map((doc) => {
    return deleteDoc(doc.ref);
  });

  // Delete all todos using Promise.all()
  await Promise.all(deletePromises);
}

function Project({ project, edit }) {
  const [showModal, setShowModal] = useState(false);
  const { setSelectedProject } = useContext(TodoContext);

  const handleDeleteProject = async (id) => {
    await deleteProject(id);
    setSelectedProject(null);
  };

  return (
    <div className="Project">
      <div className="name" onClick={() => setSelectedProject(project.name)}>
        {project.name}
      </div>
      <div className="btns">
        {edit ? (
          <div
            className="edit-delete"
            onClick={() => handleDeleteProject(project.id)}
          >
            <span className="edit" onClick={() => setShowModal(true)}>
              <Pencil size="13" />
            </span>
            <span className="delete">
              <XCircle size="13" />
            </span>
          </div>
        ) : project.numOfTodos === 0 ? (
          ""
        ) : (
          <div className="total-todos">{project.numOfTodos}</div>
        )}
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <RenameProject project={project} setShowModal={setShowModal} />
      </Modal>
    </div>
  );
}

export default Project;
