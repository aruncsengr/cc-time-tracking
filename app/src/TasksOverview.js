import React from 'react';
import { Link } from 'react-router-dom';

const TasksOverview = props => {
  const [tasks, setTasks] = React.useState(null);
  const [userId, setUserId] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:5000/tasks');
      const result = await response.json();
      setTasks(result.data);
      setUserId(result.data[0].user_id)
    })();
  }, []);

  const isLoading = tasks === null;
  return isLoading
    ? 'Loading…'
    : <>
        <h1>Tasks</h1>
        <p>
          <Link to={`/users/${userId}`}>
            Overall performance statistics
          </Link>
        </p>
        <hr />
        <ul>
          {tasks.map(task => (
            <li>
              <Link to={`/${task.id}`}>
                {task.instructions}
              </Link>
            </li>
          ))}
        </ul>
      </>
};

export default TasksOverview;
