import React, { useState } from 'react';
import Task, { TaskData } from './Task';

type TaskProps = TaskData;

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const handleAddTask = (task: TaskProps) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleRemoveTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (id: number, updatedTask: TaskProps) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? updatedTask : task)));
  };

  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} {...task} onRemove={handleRemoveTask} onUpdate={handleUpdateTask} />
      ))}
    </div>
  );
};

export default TaskList;