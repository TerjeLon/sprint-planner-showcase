import React from 'react';
import TaskBoard from './components/TaskBoard';
import { startMirage } from './mock/mirage';

function App() {
  if (process.env.NODE_ENV === "development") {
    startMirage()
  }

  return (
    <div className="App">
      <TaskBoard board_id={0}/>
    </div>
  );
}

export default App;
