import React, { useState } from "react";
import Modal from "./Modal";
import ProjectForm from "./ProjectForm";
import { Plus } from "react-bootstrap-icons";
import { db } from "../firebase";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";

function AddNewProject() {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (projectName) {
      const q = query(
        collection(db, "projects"),
        where("name", "==", projectName)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        addDoc(collection(db, "projects"), {
          name: projectName,
        });
      } else {
        alert("Project already exists!");
      }
      setShowModal(false);
      setProjectName("");
    }
  }

  return (
    <div className="AddNewProject">
      <div className="add-button">
        <span onClick={() => setShowModal(true)}>
          <Plus size="20" />
        </span>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <ProjectForm
          handleSubmit={handleSubmit}
          heading="New project!"
          value={projectName}
          setValue={setProjectName}
          setShowModal={setShowModal}
          confirmButtonText="+ Add Project"
        />
      </Modal>
    </div>
  );
}

export default AddNewProject;
