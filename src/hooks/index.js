import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "todos"));
    let unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setTodos(data);
    });

    return () => unsubscribe();
  }, []);

  return todos;
}

export function useProjects(todos) {
  const [projects, setProjects] = useState([]);

  function calculateNumOfTodos(projectName, todos) {
    return todos.filter((todo) => todo.projectName === projectName).length;
  }

  useEffect(() => {
    const q = query(collection(db, "projects"));
    let unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const projectName = doc.data().name;
        return {
          id: doc.id,
          name: projectName,
          numOfTodos: calculateNumOfTodos(projectName, todos),
        };
      });

      setProjects(data);
    });

    return () => unsubscribe();
  }, [todos]);

  return projects;
}
