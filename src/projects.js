const createProject = function (title) {
  return {
    title,
    todoList: [],
    getTitle() {
      return title;
    },
    addTodo(todo) {
      this.todoList.push(todo);
    },
    getTodoList() {
      return this.todoList;
    },
  };
};

export { createProject };
