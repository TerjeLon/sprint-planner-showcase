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
            newCategories[toCategoryIndex].tasks[taskToInsert.index].index = action.insertIndex;
            newCategories[toCategoryIndex] = updateTaskIndexes(taskToInsert, newCategories[toCategoryIndex]);
            return { categories: newCategories }
        }

        taskToInsert.index = action.insertIndex;
        newCategories[toCategoryIndex].tasks.push(taskToInsert);
        newCategories[toCategoryIndex] = updateTaskIndexes(taskToInsert, newCategories[toCategoryIndex]);
        newCategories[fromCategoryIndex].tasks = newCategories[fromCategoryIndex].tasks.filter((task: Task) => task.id !== action.taskId);

        return { categories: newCategories }
    }

    function updateTaskIndexes(insertedTask: Task, categoryToUpdate: Category): Category {
        categoryToUpdate.tasks = categoryToUpdate.tasks.map((task: Task) => {
            if (task.index >= insertedTask.index && task.id !== insertedTask.id) {
                task.index++;
            }

            return task;
        });

        return categoryToUpdate;
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
