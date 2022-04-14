import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

import useHTTP from './hooks/useHTTP';

function App() {

  const [tasks, setTasks] = useState([]);

  //const {isLoading, error, sendRequest} = httpData
  // const httpData = useHTTP(etc)
  const { isLoading, error, sendRequest: fetchTasks } = useHTTP()

  useEffect(() => {

    const transformTasks = tasksObj => {
      const loadedTasks = [];
  
      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }
  
      setTasks(loadedTasks);
    }

    fetchTasks(
      { url: 'https://react-custom-http-hook-b561e-default-rtdb.firebaseio.com/tasks.json' },
      transformTasks
    );
    
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
