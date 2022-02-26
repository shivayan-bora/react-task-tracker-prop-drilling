import { useState } from "react";

const AddTask = ({ onAdd, toggleAddTask }) => {
  const [task, setTask] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      alert("Please enter a task");
      return;
    }
    onAdd({
      title: task,
      day: day,
      reminder: reminder,
    });
    toggleAddTask(false);
    setTask("");
    setDay("");
    setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="title">Task</label>
        <input
          type="text"
          id="title"
          placeholder="Add Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="day">Day & Time</label>
        <input
          type="text"
          id="day"
          placeholder="Add Day & Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label htmlFor="reminder">Set Reminder</label>
        <input
          type="checkbox"
          id="reminder"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
