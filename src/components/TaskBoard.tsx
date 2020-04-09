import React from 'react';
import Board from '../interfaces/Board';
import '../style/TaskBoard.scss';
import BoardHeader from './BoardHeader';
import BoardFields from './BoardFields';

export default function TaskBoard(props: any) {
    let board: Board = props.board;

    return (
        <div className="task_board">
            <BoardHeader board={ board }/>
            <BoardFields board={ board }/>
        </div>
    );
}
