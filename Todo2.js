import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import "./Todo2.css";

Modal.setAppElement("#root"); // Set the root element for accessibility

const Todo2 = () => {
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({
    text: "",
    date: new Date(),
  });
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setTaskData((prevData) => ({ ...prevData, date }));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingTaskIndex(null);
    setTaskData({ text: "", date: new Date() });
  };

  const addTask = () => {
    if (!taskData.text || !taskData.date) return;

    if (editingTaskIndex !== null) {
      // Edit existing task
      const updatedTasks = [...tasks];
      updatedTasks[editingTaskIndex] = taskData;
      setTasks(updatedTasks);
      setEditingTaskIndex(null);
      closeModal();
    } else {
      // Add new task
      setTasks((prevTasks) => [...prevTasks, taskData]);
      closeModal();
    }
  };

  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setTaskData(taskToEdit);
    setEditingTaskIndex(index);
    openModal();
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <div className="container">
        <h1>Todo List App</h1>
        <div>
          <input
            type="text"
            name="text"
            placeholder="Task"
            value={taskData.text}
            onChange={handleInputChange}
          />
          <DatePicker selected={taskData.date} onChange={handleDateChange} />
          <button className="add-btn" onClick={addTask}>
            {editingTaskIndex !== null ? "Edit Task" : "Add Task"}
          </button>
        </div>
        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              <div className="task-container">
                <div className="task-text">
                  {task.text} - {task.date.toDateString()}
                </div>
                <button className="edit-button" onClick={() => editTask(index)}>
                  Edit
                </button>
                <button className="del-button" onClick={() => deleteTask(index)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ol>

        
        
        <Modal
          isOpen={modalIsOpen}
          className="modal"
          onRequestClose={closeModal}
          contentLabel="Edit Task Modal"
        >
          <div className="container2">
          <h2>Edit Task</h2>
          <div>
            <input
              type="text"
              name="text"
              placeholder="Task"
              value={taskData.text}
              onChange={handleInputChange}
            />
            <DatePicker selected={taskData.date} onChange={handleDateChange} />
            <button className="edit2-button" onClick={addTask}>
              Edit Task
            </button>
            <button className="del-button" onClick={closeModal}>
              Cancel
            </button>
          </div> </div>
        </Modal>
       
      </div>
    </div>
  );
};

export default Todo2;
