import React from "react";
import { Bell, CalendarDay, Clock, Palette, X } from "react-bootstrap-icons";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

function TodoForm({
  handleSubmit,
  heading = false,
  text,
  setText,
  day,
  setDay,
  time,
  setTime,
  projects,
  showButtons = false,
  setShowModal = false,
}) {
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <div className="text">
        {heading && <h3>{heading}</h3>}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="To do ..."
          autoFocus
        />
      </div>
      <div className="remind">
        <Bell />
        <p>Remind Me!</p>
      </div>
      <div className="pick-day">
        <div className="title">
          <CalendarDay />
          <p>Choose a day</p>
          <p>{new Date().toLocaleDateString(undefined)}</p>
        </div>
        <DatePicker value={day} onChange={(day) => setDay(day)} />
      </div>
      <div className="pick-time">
        <div className="title">
          <Clock />
          <p>Choose time</p>
          <p>{new Date().toLocaleTimeString()}</p>
        </div>
        <TimePicker value={time} onChange={(time) => setTime(time)} />
      </div>
      <div className="pick-project">
        <div className="title">
          <Palette />
          <p>Choose a project</p>
        </div>
        <div className="projects">
          {projects.map((project) => (
            <div className="project" key={project.id}>
              {project.name}
            </div>
          ))}
        </div>
      </div>
      {showButtons && (
        <div>
          <div className="cancel" onClick={() => setShowModal(false)}>
            <X size="40" />
          </div>
          <div className="confirm">
            <button>+ Add to do</button>
          </div>
        </div>
      )}
    </form>
  );
}

export default TodoForm;