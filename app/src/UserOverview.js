import React from 'react';
import { Link, useParams } from 'react-router-dom';

const UserOverview = props => {
  const { id: userId } = useParams();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:5000/users/${userId}`);
      const result = await response.json();
      setUser(result.data);
    })();
  }, [userId]);

  const isLoading = user === null;
  return isLoading
    ? 'Loading…'
    : <>
        <div>
          <Link to="/">Back</Link>
        </div>
        <div>
          <h3>{user.firstname} {user.lastname}</h3>
          <hr />
          <p>{user.email}</p>
          <hr />
          <h3>Statistics</h3>
          <p>
            How long has the user been working in total?&nbsp;
            <b>{user.statistics.total_duration || 0} {user.statistics.metric_unit}</b>
          </p>
          <p>
            On average, how long did it take the user to submit a task?&nbsp;
            <b>{user.statistics.average_duration_to_submit || 0} {user.statistics.metric_unit}</b>
          </p>
          <p>
            How long is the user's average session?&nbsp;
            <b>{user.statistics.average_duration || 0} {user.statistics.metric_unit}</b>
          </p>
        </div>
      </>
};

export default UserOverview;
