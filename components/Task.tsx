import React, { useState } from 'react';

export type TaskData = {
  id: number;
  name: string;
  subtasks: string[];
  deadline: Date;
  status: string;
  completed: boolean;
};

type TaskProps = TaskData & {
  onRemove: (id: number) => void;
  onUpdate: (id: number, updatedTask: TaskData) => void;
};

const Task: React.FC<TaskProps> = ({ id, name, subtasks, deadline, status, completed, onRemove, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedSubtasks, setUpdatedSubtasks] = useState(subtasks);
  const [updatedDeadline, setUpdatedDeadline] = useState(deadline.toISOString().split('T')[0]);
  const [updatedStatus, setUpdatedStatus] = useState(status);
  const [updatedCompleted, setUpdatedCompleted] = useState(completed);

  const handleUpdate = () => {
    onUpdate(id, { id, name: updatedName, subtasks: updatedSubtasks, deadline: new Date(updatedDeadline), status: updatedStatus, completed: updatedCompleted });
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
          <input type="text" value={updatedSubtasks.join(', ')} onChange={(e) => setUpdatedSubtasks(e.target.value.split(', '))} />
          <input type="date" value={updatedDeadline} onChange={(e) => setUpdatedDeadline(e.target.value)} />
          <input type="text" value={updatedStatus} onChange={(e) => setUpdatedStatus(e.target.value)} />
          <input type="checkbox" checked={updatedCompleted} onChange={(e) => setUpdatedCompleted(e.target.checked)} />
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <div>
          <h2>{name}</h2>
          <p>{subtasks.join(', ')}</p>
          <p>{deadline.toISOString().split('T')[0]}</p>
          <p>{status}</p>
          <p>{completed ? 'Completed' : 'Not Completed'}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onRemove(id)}>Remove</button>
        </div>
      )}
    </div>
  );
};

export default Task;