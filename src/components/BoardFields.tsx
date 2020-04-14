import React, { useReducer } from 'react'
import Category from '../interfaces/Category';
import BoardCategory from './BoardCategory';
import './../style/BoardFields.scss';
import Task from '../interfaces/Task';

export interface OnMoveTask {
    fromCategoryId: number;
    toCategoryId: number;
    taskId: number;
    insertIndex: number;
}

export default function BoardFields(props: any) {
    function onMoveReducer(state: any, action: OnMoveTask) {
        if (action.fromCategoryId == null
            || action.toCategoryId == null
            || action.taskId == null) {
            throw new Error("Either fromCategoryId, toCategoryId or taskId is missing");
        }

        const categoryIds: number[] = props.board.categories.map((category: Category) => category.id);
        const fromCategoryIndex = categoryIds.indexOf(action.fromCategoryId);
        const toCategoryIndex = categoryIds.indexOf(action.toCategoryId);
        const newCategories = JSON.parse(JSON.stringify(state.categories));
        const taskToInsert = newCategories[fromCategoryIndex].tasks.find((task: Task) => task.id === action.taskId);

        if (action.fromCategoryId === action.toCategoryId && taskToInsert.index === action.insertIndex) {
            return { categories: state.categories }
        }

        if (action.fromCategoryId === action.toCategoryId) {
            const taskToMove = JSON.parse(JSON.stringify(taskToInsert));
            taskToMove.index = action.insertIndex;

            newCategories[toCategoryIndex].tasks.splice(action.insertIndex, 0, taskToMove);
            newCategories[toCategoryIndex].tasks = newCategories[toCategoryIndex].tasks.filter((task: Task) => task.index !== taskToInsert.index);
            newCategories[toCategoryIndex] = updateTaskIndexes(newCategories[toCategoryIndex]);
            return { categories: newCategories }
        }

        newCategories[toCategoryIndex].tasks.splice(action.insertIndex, 0, taskToInsert);
        newCategories[toCategoryIndex] = updateTaskIndexes(newCategories[toCategoryIndex]);
        newCategories[fromCategoryIndex].tasks = newCategories[fromCategoryIndex].tasks.filter((task: Task) => task.id !== action.taskId);
        newCategories[fromCategoryIndex] = updateTaskIndexes(newCategories[fromCategoryIndex]);

        return { categories: newCategories }
    }

    function updateTaskIndexes(category: Category): Category {
        category.tasks = category.tasks.map((task, index) => {
            task.index = index;

            return task;
        });

        return category;
    }

    const [state, dispatch] = useReducer(onMoveReducer, props.board);

    return (
        <div className="board_fields">
            {
                state.categories.map((category: Category) => {
                    return <BoardCategory key={ category.id } category={ category } onMove={ dispatch }/>
                })
            }
        </div>
    );
}
