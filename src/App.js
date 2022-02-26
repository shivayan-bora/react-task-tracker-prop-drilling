import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import About from "./components/About";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch all tasks from the server
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5050/tasks");
    const data = await res.json();
    return data;
  };

  // Fetch a specific task from the server
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5050/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  // Toggle Add Task
  const toggleAddTask = () => {
    setShowAddTask(!showAddTask);
  };

  // Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5050/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  // Delete Task:
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5050/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder,
    };

    const res = await fetch(`http://localhost:5050/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header toggleAddTask={toggleAddTask} showAddTask={showAddTask} />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                {showAddTask && (
                  <AddTask onAdd={addTask} toggleAddTask={toggleAddTask} />
                )}
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
                <Footer />
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
