import React, { useRef } from 'react';
import Task from '../interfaces/Task';
import './../style/TaskCard.scss';

export default function TaskCard(props: any) {
    const task: Task = props.task;
    const taskEl = useRef<HTMLDivElement>(null);

    function getDescription(): string {
      const maxLength = 160;

      if (task.description.length <= maxLength) {
        return task.description;
      }

      return task.description.substring(0, maxLength) + "...";
    }

    function onDragStart(event: React.DragEvent<HTMLDivElement>) {
      const node = taskEl.current;

      if (node){
        const nodeStyle = window.getComputedStyle(node);
        const nodeActualWidth = +nodeStyle.getPropertyValue('width').replace("px", "");

        node.style.width = nodeActualWidth + 'px';
        node.classList.add("dragging");
      }

      event.dataTransfer.setDragImage(new Image(), 0, 0);
      event.dataTransfer.setData("taskId", task.id.toString());
      event.dataTransfer.setData("fromCategoryId", props.categoryId.toString());
    }

    function onDrag(event: React.DragEvent<HTMLDivElement>) {
      const node = taskEl.current;

      if (node){
        const leftPosition = event.clientX;
        const topPosition = event.clientY;

        node.style.left = leftPosition + 'px';
        node.style.top = topPosition + 'px';
      }
    }

    function onDragEnd(event: React.DragEvent<HTMLDivElement>) {
      const node = taskEl.current;

      if (node){
        node.style.removeProperty('width')
        node.style.removeProperty('left');
        node.style.removeProperty('top');
        node.classList.remove("dragging");
      }
    }

    return (
        <div
            className={`task_card ${task.type}`}
            draggable="true"
            onDragStart={ onDragStart }
            onDrag={ onDrag }
            onDragEnd={ onDragEnd }
            ref={ taskEl }>

            <h1>{ task.title }</h1>
            <p>{ getDescription() }</p>
        </div>
    );
}
