import React from 'react';
import './../style/BoardCategory.scss';
import TaskCard from './TaskCard';
import Task from '../interfaces/Task';
import { OnMoveTask } from './BoardFields';
import { getPlaceholderNode, placeholderNodeExists, PlaceholderPlacement } from './TaskPlaceholder';
import { getClosestElementWithClassToDragEvent } from '../util/NodeFinder';

export default function BoardCategory(props: any) {
    let placeholderNode: Node;

    function onDragOver(event: React.DragEvent<HTMLDivElement>) {
      event.preventDefault();

      const node = getDragOverNode(event);

      if (node) {
        removePlaceholderNode();
        placeholderNode = getPlaceholderNode(PlaceholderPlacement.Top);

        if (node.classList.contains('board_category')) {
          node.appendChild(placeholderNode);
        } else {
          const parentNode = node.parentNode;
          const verticalCenter = node.getBoundingClientRect().top + (node.getBoundingClientRect().height / 2);
          let placement = PlaceholderPlacement.Top;
          let referenceNode = node;

          if (parentNode) {
            if (event.clientY > verticalCenter) {
              referenceNode = node.nextSibling as Element;
              placement = PlaceholderPlacement.Bottom;
            }

            if (!placeholderNodeExists(placement)) {
              if (referenceNode && referenceNode.parentNode === parentNode) {
                parentNode.insertBefore(placeholderNode, referenceNode);
              } else {
                parentNode.appendChild(placeholderNode);
              }
            }
          }
        }
      }
    }

    function onDrop(event: React.DragEvent<HTMLDivElement>) {
      const node = document
          .elementsFromPoint(event.clientX, event.clientY)
          .find((div) => div.classList.contains("board_category"));

      if (node) {
        const toCategoryDataId = node.attributes.getNamedItem("data-id");

        if (toCategoryDataId) {
          const onMoveTask: OnMoveTask = {
            fromCategoryId: +event.dataTransfer.getData("fromCategoryId"),
            toCategoryId: +toCategoryDataId.value,
            taskId: +event.dataTransfer.getData("taskId"),
            insertIndex: getInsertIndex(node, event)
          };

          props.onMove(onMoveTask);
          removePlaceholderNode();
        }
      }
    }

    function getDragOverNode(event: React.DragEvent<HTMLDivElement>): Element | undefined {
      const categoryNode = document
          .elementsFromPoint(event.clientX, event.clientY)
          .find((div) => div.classList.contains("board_category"));

      const taskNode = getClosestElementWithClassToDragEvent('task_card', categoryNode, event);

      return taskNode ?? categoryNode
    }

    function getInsertIndex(element: Element, event: React.DragEvent<HTMLDivElement>): number {
      const placeholderElement = document.querySelectorAll('.placeholder')[0];
      return Array.prototype.indexOf.call(placeholderElement?.parentNode?.childNodes, placeholderElement) - 1;
    }

    function removePlaceholderNode() {
      document.querySelectorAll('.placeholder-top').forEach(e => e.remove());
      document.querySelectorAll('.placeholder-bottom').forEach(e => e.remove());
    }

    return (
        <div className="board_category"
             onDragOver={ onDragOver }
             onDrop={ onDrop }
             data-id={ props.category.id }>
            <div className="board_category_header">
                <span className="category_title">{ props.category.title }</span><span className="category_total_tasks">{ props.category.tasks.length }</span>
            </div>

            {
              props.category.tasks
                  .sort(((a: Task, b: Task) => (a.index > b.index) ? 1 : -1))
                  .map((task: Task) => {
                  return <TaskCard key={ task.id } task={ task } categoryId={ props.category.id }/>
              })
            }
        </div>
    );
}
