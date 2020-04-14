import React, { useContext, useRef } from 'react';
import Task from '../interfaces/Task';
import './../style/TaskCard.scss';
import { EditModeContext } from '../hooks/EditModeHook';
import Button, { ButtonType } from './Button';

export default function TaskCard(props: any) {
    const task: Task = props.task;
    const taskEl = useRef<HTMLDivElement>(null);
    const titleEl = useRef<HTMLHeadingElement>(null);
    const descriptionEl = useRef<HTMLParagraphElement>(null);
    const { setCurrentEditMode, currentEditMode } = useContext(EditModeContext);

    function getRedactedDescription(): string {
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
      event.dataTransfer.setData("fromCategoryId", props.categoryId);
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

    function showTaskEditMode() {
      setCurrentEditMode({
        active: true,
        taskId: task.id,
      })
    }

    function exitEditMode() {
      setCurrentEditMode({
        active: false,
        taskId: null,
      })
    }

    function saveChanges() {
      const newTitle = titleEl.current?.innerText;
      const newDescription = descriptionEl.current?.innerText;

      if (newTitle == null) {
        throw new Error("Title is not set");
      }

      if (newDescription == null) {
        throw new Error("Description is not set");
      }

      task.title = newTitle;
      task.description = newDescription;

      async function fetchData() {
        const res = await fetch(`/api/task/${task.id}`, {
          method: 'PUT',
          body: JSON.stringify(task)
        })

        res.json()
            .then(res => {
              props.didChange(res);
              exitEditMode();
            })
            .catch(err => console.log(err));
      }

      fetchData().then();
    }

    return (
        <div className={`task_card ${task.type} ${currentEditMode.active ? "edit_mode" : ""}`}
             draggable={!currentEditMode.active}
             onDragStart={ onDragStart }
             onDrag={ onDrag }
             onDragEnd={ onDragEnd }
             onClick={ currentEditMode.active ? () => {} : showTaskEditMode }
             ref={ taskEl }>

          <h1 contentEditable={currentEditMode.active}
              suppressContentEditableWarning={true}
              ref={ titleEl }>
            { task.title }
          </h1>
          
          <p contentEditable={currentEditMode.active}
             suppressContentEditableWarning={true}
             ref={ descriptionEl }>
            { currentEditMode.active ? task.description : getRedactedDescription() }
          </p>

          { currentEditMode.active &&
            <div className="actions">
              <Button title="Cancel" type={ButtonType.Destructive} onClick={ exitEditMode } />
              <Button title="Save changes" type={ButtonType.Positive} onClick={ saveChanges } />
            </div>
          }
        </div>
    );
}
