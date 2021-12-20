import React from 'react';
import { Link, useParams } from 'react-router-dom';

const TaskSubmit = props => {
  const { id: taskId } = useParams();
  const [task, setTask] = React.useState(null);
  const [errors, setErrors] = React.useState(null);
  const [answer, setAnswer] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [startTime, setStartTime] = React.useState(null);

  const getCurrentTime = () => {
    return new Date().toISOString();
  }

  React.useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`);
      const result = await response.json();
      setTask(result.data);
      if(result.data && !result.data.submitted) {
        setAnswer(result.data.answer);
        setStartTime(getCurrentTime());
      };
    })();
  }, [taskId]);

  const onChangeAnswer = React.useCallback(event =>
    setAnswer(event.target.value)
  , []);

  const onSubmitAnswer = React.useCallback(event => {
    const endTime = getCurrentTime();
    const submitted = event.target.dataset.submitted;
    (async () => {
      setIsSubmitting(true);
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: { submitted, answer,
          start_time: startTime,
          end_time: endTime} })
      });
      const result = await response.json();

      if (result.success) {
        setTask(result.data);
      } else {
        setErrors(JSON.stringify(result.errors));
      }

      setIsSubmitting(false);
    })();
  }, [taskId, answer, startTime]);

  const isLoading = task === null;

  return isLoading
    ? 'Loading…'
    : (
      <>
        <div>
          <Link to="/">Back</Link>
        </div>
        <div>
          <h1>{task.instructions}</h1>
          {
            task.submitted
              ? (
                <>
                  <h3>Your answer</h3>
                  <hr />
                  <p>{task.answer}</p>
                  <hr />
                  <h3>Statistics</h3>
                  <p>
                    How long did it take the user to submit the task?&nbsp;
                    <b>{task.statistics.total_duration} {task.statistics.metric_unit}</b>
                  </p>
                  <p>
                    In how many sessions did the user work on the task?&nbsp;
                    <b>{task.statistics.session_count}</b>
                  </p>
                  <p>
                    How long was the user's average session for this task?&nbsp;
                    <b>{task.statistics.average_duration} {task.statistics.metric_unit}</b>
                  </p>
                </>
              ) : (
                <>
                  <p>Submit your answer:</p>
                  <textarea
                    rows="20"
                    style={{ display: 'block', width: '80%' }}
                    onChange={onChangeAnswer}
                    value={answer}
                  />
                  {errors ? <p>{errors}</p> : null}
                  <button onClick={onSubmitAnswer} disabled={isSubmitting} data-submitted={false}>
                    Save
                  </button>
                  <button onClick={onSubmitAnswer} disabled={isSubmitting} data-submitted={true}>
                    Submit
                  </button>
                </>
            )
          }
        </div>
      </>
    )
};

export default TaskSubmit;
