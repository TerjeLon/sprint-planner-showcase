import React from 'react';
import TaskBoard from './components/TaskBoard';
import Board from './interfaces/Board';
import { TaskType } from './interfaces/Task';

function App() {
  function getBoard() {
    let board: Board = {
      title: "Sprint week 2",
      categories: [
        {
          id: 0,
          title: "Planning",
          tasks: [
            {
              id: 0,
              index: 0,
              title: "Add registration form",
              type: TaskType.Feature,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros vitae porttitor gravida",
            },
            {
              id: 1,
              index: 1,
              title: "Login screen is cut on smaller screens",
              type: TaskType.Bug,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
              id: 2,
              index: 2,
              title: "Hide empty lanes",
              type: TaskType.Feature,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros vitae porttitor gravida. Etiam at scelerisque risus. Nullam rutrum odio at mi sodales, eget gravida tortor luctus. Curabitur accumsan, tellus sit amet ultricies vestibulum, magna orci elementum mauris, ut sagittis nibh magna sit amet libero."
            },
            {
              id: 3,
              index: 3,
              title: "Export statistics",
              type: TaskType.Feature,
              description: "Lorem ipsum dolor sit amet."
            },
            {
              id: 4,
              index: 4,
              title: "Cards are removed when moved to its own lane",
              type: TaskType.Bug,
              description: "Lorem ipsum dolor sit amet, mi sodales."
            },
            {
              id: 5,
              index: 5,
              title: "Drag and drop not working on touch screens",
              type: TaskType.Bug,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros vitae porttitor gravida. Etiam at scelerisque risus. Nullam rutrum odio at mi sodales, eget gravida tortor luctus. Curabitur accumsan, tellus sit amet ultricies vestibulum, magna orci elementum mauris, ut sagittis nibh magna sit amet libero."
            }
          ]
        },
        {
          id: 1,
          title: "Doing",
          tasks: [
            {
              id: 6,
              index: 0,
              title: "Show assignee badge",
              type: TaskType.Feature,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros vitae porttitor gravida. Etiam at scelerisque risus. Nullam rutrum odio at mi sodales, eget gravida tortor luctus. Curabitur accumsan, tellus sit amet ultricies vestibulum, magna orci elementum mauris, ut sagittis nibh magna sit amet libero."
            },
            {
              id: 7,
              index: 1,
              title: "Fix scroll on mobile",
              type: TaskType.Bug,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
          ]
        },
        {
          id: 2,
          title: "In review",
          tasks: [
            {
              id: 9,
              index: 0,
              title: "Drag and drop between lanes",
              type: TaskType.Feature,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros vitae porttitor gravida. Etiam at scelerisque risus. Nullam rutrum odio at mi sodales, eget gravida tortor luctus. Curabitur accumsan, tellus sit amet ultricies vestibulum, magna orci elementum mauris, ut sagittis nibh magna sit amet libero."
            },
            {
              id: 10,
              index: 1,
              title: "Scaling breaks on mobile",
              type: TaskType.Bug,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros vitae porttitor gravida. Etiam at scelerisque risus. Nullam rutrum odio at mi sodales, eget gravida tortor luctus. Curabitur accumsan, tellus sit amet ultricies vestibulum, magna orci elementum mauris, ut sagittis nibh magna sit amet libero."
            }
          ]
        },
        {
          id: 3,
          title: "Testing",
          tasks: [
            {
              id: 11,
              index: 0,
              title: "Dark mode does not toggle correctly",
              type: TaskType.Bug,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros vitae porttitor gravida."
            }
          ]
        },
        {
          id: 4,
          title: "Done",
          tasks: [
            {
              id: 12,
              index: 0,
              title: "Header breaks weird on mobile",
              type: TaskType.Bug,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros vitae porttitor gravida. Etiam at scelerisque risus. Nullam rutrum odio at mi sodales, eget gravida tortor luctus. Curabitur accumsan, tellus sit amet ultricies vestibulum, magna orci elementum mauris, ut sagittis nibh magna sit amet libero."
            },
            {
              id: 13,
              index: 1,
              title: "Weak contrast on dark mode",
              type: TaskType.Bug,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros vitae porttitor gravida. Etiam at scelerisque risus. Nullam rutrum odio at mi sodales, eget gravida tortor luctus."
            }
          ]
        },
      ]
    };

    return board;
  }

  return (
    <div className="App">
      <TaskBoard board={ getBoard() }/>
    </div>
  );
}

export default App;
