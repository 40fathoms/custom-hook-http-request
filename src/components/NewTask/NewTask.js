import React, { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHTTP from '../../hooks/useHTTP'

const NewTask = (props) => {

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  }

  const { isLoading, error, sendRequest: sendTaskRequest } = useHTTP()

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: 'https://react-custom-http-hook-b561e-default-rtdb.firebaseio.com/tasks.json',
        method: 'POST',
        body: { text: taskText },
        headers: {
          'Content-Type': 'application/json',
        }
      },
      createTask.bind(null, taskText)
    )
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
