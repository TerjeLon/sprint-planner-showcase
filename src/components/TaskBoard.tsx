import React, { useEffect, useState } from 'react';
import '../style/TaskBoard.scss';
import BoardHeader from './BoardHeader';
import BoardFields from './BoardFields';

export default function TaskBoard(props: any) {
  const [board, setBoard] = useState(null);

  async function fetchData() {
    const res = await fetch(`/api/boards/${props.board_id}/`);

    res
        .json()
        .then(res => setBoard(res))
        .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <div className="task_board">
        {board !== null &&
          <>
            <BoardHeader board={ board } />
            <BoardFields board={ board } />
          </>
        }
      </div>
  );
}
