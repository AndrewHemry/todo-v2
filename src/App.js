import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Todo from './component/ToDo';
import Form from './component/Form';
import FilterButton from './component/FilterButton';
import './App.css';

// WE WILL NEED THIS FOR THE DATE AND POPULARITY FILTERS
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

  const [filter, setFilter] = useState('All');
  const [tasks, setTasks] = useState(props.tasks);

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
      />
  ));

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }  

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
    console.log("The updated tasks:", updatedTasks)
  }
  
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id)
    setTasks(remainingTasks)
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task
    })
    setTasks(editedTaskList)
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
    />
  ));
  

  const taskNoun = taskList.length !== 1 ? 'tasks' : 'task'
  const headingText = `${taskList.length} ${taskNoun} remaining`

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}

        {/* <FilterButton />
        <FilterButton />
        <FilterButton /> */}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
          {taskList}

          {/* /* <Todo name="Eat" completed={true} id="todo-0" />
          <Todo name="Sleep" completed={false} id="todo-1" />
          <Todo name="Repeat" completed={false} id="todo-2" /> */}
      </ul>
    </div>
  );
}



export default App;