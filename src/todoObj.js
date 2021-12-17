const createTodo = function (
  title = "title",
  desc = "description",
  dueDate = "due Date",
  priority = 1
) {
  return {
    title,
    desc,
    dueDate,
    priority,

    getTitle() {
      return title;
    },
    getDesc() {
      return desc;
    },
    getDueDate() {
      return dueDate;
    },
    getPriority() {
      return priority;
    },
  };
};

export { createTodo };
