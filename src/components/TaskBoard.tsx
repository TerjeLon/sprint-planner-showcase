import React, { useEffect, useState } from 'react';
import '../style/TaskBoard.scss';
import BoardHeader from './BoardHeader';
import BoardFields from './BoardFields';
import { EditModeContext, useEditMode } from '../hooks/EditModeHook';
import TaskCard from './TaskCard';
import Task from '../interfaces/Task';
import Board from '../interfaces/Board';

export default function TaskBoard(props: any) {
  const [board, setBoard] = useState<Board | null>(null);
  const editMode = useEditMode()

  function getTaskWithId(id: number | null): Task | undefined {
      if (!id == null) { return undefined; }

      return board?.categories
          .flatMap(category => category.tasks)
          .find(task => task.id === id);
  }

  function taskDidChange(newTask: Task) {
    if (board) {
      board.categories[newTask.category_id].tasks[newTask.index] = newTask;
    }
  }

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/boards/${props.board_id}`);

      res.json()
          .then(res => setBoard(res))
          .catch(err => console.log(err));
    }

    fetchData().then();
  }, [props]);

  return (
      <EditModeContext.Provider value={editMode}>
        <div className="task_board">
          {board !== null &&
            <>
              <BoardHeader board={ board } />
              <BoardFields board={ board } />
            </>
          }
          { editMode.currentEditMode.active &&
          <div className="task_card_edit_wrapper">
            <TaskCard task={ getTaskWithId(editMode.currentEditMode.taskId) } didChange={ taskDidChange }/>
          </div>
          }
        </div>
      </EditModeContext.Provider>
  );
}
