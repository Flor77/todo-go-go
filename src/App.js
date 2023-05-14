import "./App.css";
import AddNewTodo from "./components/AddNewTodo";
import Calendar from "./components/Calendar";
import EditTodo from "./components/EditTodo";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Projects from "./components/Projects";
import Todos from "./components/Todos";
import User from "./components/User";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <Sidebar>
          <User />
          <AddNewTodo />
          <Calendar />
          <Projects />
        </Sidebar>
        <Main>
          <Todos />
          <EditTodo />
        </Main>
      </div>
    </LocalizationProvider>
  );
}

export default App;
