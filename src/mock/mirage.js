import { Server, Model, hasMany } from "miragejs"
import { TaskType } from "../interfaces/Task";

export function startMirage() {
  let server = new Server({
    models: {
      boards: Model.extend({
        categories: hasMany()
      }),
      categories: Model.extend({
        tasks: hasMany(),
      }),
      tasks: Model,
    },

    routes() {
      this.namespace = "api"
      this.resource = "boards"

      this.get("/boards", (schema, request) => {
        return schema.db.boards;
      });

      this.get("/boards/:id", (schema, request) => {
        const board = schema.db.boards.find(request.params.id);
        board.id = +board.id;
        board.categories = schema.db.categories;

        board.categories.forEach((category) => {
          category.tasks = schema.db.tasks.where({ board_id: board.id, category_id: category.id });
          category.id = +category.id;

          category.tasks.forEach((task) => {
            task.id = +task.id;
          });
        });

        return board;
      });

      this.put("/task/:id", (schema, request) => {
        return schema.db.tasks.update(request.params.id, JSON.parse(request.requestBody));
      });
    },
  });

  server.db.loadData({
    boards: [
      {
        id: 0,
        title: "Sprint week 2"
      }
    ],
    categories: [
      {
        id: 0,
        title: "Planning",
      },
      {
        id: 1,
        title: "Doing",
      },
      {
        id: 2,
        title: "In review",
      },
      {
        id: 3,
        title: "Testing",
      },
      {
        id: 4,
        title: "Done",
      },
    ],
    tasks: [
      {
        id: 0,
        board_id: 0,
        category_id: 0,
        index: 0,
        title: "Add registration form",
        type: TaskType.Feature,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros vitae porttitor gravida",
      },
      {
        id: 1,
        board_id: 0,
        category_id: 0,
        index: 1,
        title: "Login screen is cut on smaller screens",
        type: TaskType.Bug,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },
      {
        id: 2,
        board_id: 0,
        category_id: 0,
        index: 2,
        title: "Hide empty lanes",
        type: TaskType.Feature,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros vitae porttitor gravida. Etiam at scelerisque risus. Nullam rutrum odio at mi sodales, eget gravida tortor luctus. Curabitur accumsan, tellus sit amet ultricies vestibulum, magna orci elementum mauris, ut sagittis nibh magna sit amet libero."
      },
      {
        id: 3,
        board_id: 0,
        category_id: 0,
        index: 3,
        title: "Export statistics",
        type: TaskType.Feature,
        description: "Lorem ipsum dolor sit amet."
      },
      {
        id: 4,
        board_id: 0,
        category_id: 0,
        index: 4,
        title: "Cards are removed when moved to its own lane",
        type: TaskType.Bug,
        description: "Lorem ipsum dolor sit amet, mi sodales."
      },
      {
        id: 5,
        board_id: 0,
        category_id: 0,
        index: 5,
        title: "Drag and drop not working on touch screens",
        type: TaskType.Bug,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros vitae porttitor gravida. Etiam at scelerisque risus. Nullam rutrum odio at mi sodales, eget gravida tortor luctus. Curabitur accumsan, tellus sit amet ultricies vestibulum, magna orci elementum mauris, ut sagittis nibh magna sit amet libero."
      },
      {
        id: 6,
        board_id: 0,
        category_id: 1,
        index: 0,
        title: "Show assignee badge",
        type: TaskType.Feature,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros vitae porttitor gravida. Etiam at scelerisque risus. Nullam rutrum odio at mi sodales, eget gravida tortor luctus. Curabitur accumsan, tellus sit amet ultricies vestibulum, magna orci elementum mauris, ut sagittis nibh magna sit amet libero."
      },
      {
        id: 7,
        board_id: 0,
        category_id: 1,
        index: 1,
        title: "Fix scroll on mobile",
        type: TaskType.Bug,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },
      {
        id: 8,
        board_id: 0,
        category_id: 2,
        index: 0,
        title: "Drag and drop between lanes",
        type: TaskType.Feature,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros vitae porttitor gravida. Etiam at scelerisque risus. Nullam rutrum odio at mi sodales, eget gravida tortor luctus. Curabitur accumsan, tellus sit amet ultricies vestibulum, magna orci elementum mauris, ut sagittis nibh magna sit amet libero."
      },
      {
        id: 9,
        board_id: 0,
        category_id: 2,
        index: 1,
        title: "Scaling breaks on mobile",
        type: TaskType.Bug,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros vitae porttitor gravida. Etiam at scelerisque risus. Nullam rutrum odio at mi sodales, eget gravida tortor luctus. Curabitur accumsan, tellus sit amet ultricies vestibulum, magna orci elementum mauris, ut sagittis nibh magna sit amet libero."
      },
      {
        id: 10,
        board_id: 0,
        category_id: 3,
        index: 0,
        title: "Dark mode does not toggle correctly",
        type: TaskType.Bug,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros vitae porttitor gravida."
      },
      {
        id: 11,
        board_id: 0,
        category_id: 4,
        index: 0,
        title: "Header breaks weird on mobile",
        type: TaskType.Bug,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros vitae porttitor gravida. Etiam at scelerisque risus. Nullam rutrum odio at mi sodales, eget gravida tortor luctus. Curabitur accumsan, tellus sit amet ultricies vestibulum, magna orci elementum mauris, ut sagittis nibh magna sit amet libero."
      },
      {
        id: 12,
        board_id: 0,
        category_id: 4,
        index: 1,
        title: "Weak contrast on dark mode",
        type: TaskType.Bug,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros vitae porttitor gravida. Etiam at scelerisque risus. Nullam rutrum odio at mi sodales, eget gravida tortor luctus."
      }
    ]
  });

  return server;
}
