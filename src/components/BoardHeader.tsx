import React from 'react';
import Board from '../interfaces/Board';
import BoardTitle from './BoardTitle';
import '../style/BoardHeader.scss';
import IconButton from './IconButton';
import { IconType } from './Icon';

export default function BoardHeader(props: any) {
    let board: Board = props.board;

    return (
        <div className="board_header">
            <BoardTitle title={ board.title }/>

            <div className="board_header_nav">
                <IconButton title="Add task" icon={ IconType.Plus }/>
                <IconButton title="People" icon={ IconType.Person }/>
            </div>
        </div>
    );
}
