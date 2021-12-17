import { createProject } from "./projects";
import { controller } from "./controller";
import { createTodo } from "./todoObj";

const renderPage = (() => {
  const tabsEl = document.querySelector(".tabs-nav");
  const mainEl = document.querySelector("main");
  let projectsList = [];

  const addProjToList = function (project) {
    projectsList.push(project);
  };

  const addProjToNav = function (proj) {
    let projTab = document.createElement("button");
    projTab.innerText = proj.getTitle();
    const switchToProj = function () {
      controller.setCurrProj(proj);
      // console.log(controller.getCurrProj());
      removeChildren(mainEl);
      renderTodos(controller.getCurrProj());
    };

    projTab.addEventListener("click", switchToProj);
    tabsEl.appendChild(projTab);
  };

  const renderNav = function () {
    for (let i = 0; i < projectsList.length; i++) {
      addProjToNav(projectsList[i]);
    }
  };

  const addTodoClasses = function (card, prior) {
    card.classList.add("todo-card");
    prior.classList.add("todo-prior");
  };

  const renderTodo = function (todo, projEl) {
    let renderCard = document.createElement("div");
    let titleEl = document.createElement("h4");
    let dueEl = document.createElement("p");
    let descEl = document.createElement("p");
    let priorityEl = document.createElement("p");
    titleEl.innerText = todo.getTitle();
    dueEl.innerText = todo.getDueDate();
    descEl.innerText = todo.getDesc();
    priorityEl.innerText = todo.getPriority();
    addTodoClasses(renderCard, priorityEl);
    renderCard.append(titleEl, dueEl, descEl, priorityEl);

    projEl.appendChild(renderCard);
  };

  const removeChildren = function (parentEl) {
    while (parentEl.firstChild) {
      parentEl.removeChild(parentEl.firstChild);
    }
  };

  const newTodoForm = function () {
    let formCard = document.createElement("div");
    let titleEl = document.createElement("input");
    let dueEl = document.createElement("input");
    let descEl = document.createElement("input");
    let priorityEl = document.createElement("input");
    let confirmAddBtnEl = document.createElement("button");
    confirmAddBtnEl.innerText = "confirm";
    confirmAddBtnEl.addEventListener("click", () => {
      let newTodo = createTodo(
        titleEl.value,
        dueEl.value,
        descEl.value,
        priorityEl.value
      );
      controller.getCurrProj().addTodo(newTodo);
      let projEl = document.querySelector(".curr-proj-div");
      renderTodo(newTodo, projEl);
    });
    formCard.append(titleEl, dueEl, descEl, priorityEl, confirmAddBtnEl);
    mainEl.appendChild(formCard);
  };

  const renderTodos = function (project) {
    let projEl = document.createElement("div");
    projEl.classList.add("curr-proj-div");
    let projTitleEl = document.createElement("h4");
    projEl.appendChild(projTitleEl);
    projTitleEl.innerText = project.getTitle();
    let todos = project.getTodoList();
    for (let i = 0; i < todos.length; i++) {
      renderTodo(todos[i], projEl);
    }

    mainEl.appendChild(projEl);

    let prevBtn = mainEl.querySelector(".btn-add-todo");
    if (prevBtn) {
      mainEl.removeChild(prevBtn);
    }

    let btnAddTodo = document.createElement("button");
    btnAddTodo.classList.add("btn-add-todo");
    btnAddTodo.innerText = "+";
    btnAddTodo.addEventListener("click", newTodoForm);
    mainEl.appendChild(btnAddTodo);
  };

  const newProjForm = function () {
    let inputEl = document.createElement("input");
    let confirmAddBtnEl = document.createElement("button");
    confirmAddBtnEl.innerText = "+";
    confirmAddBtnEl.addEventListener("click", () => {
      let newProjName = inputEl.value;
      let newProj = createProject(newProjName);
      tabsEl.removeChild(inputEl);
      tabsEl.removeChild(confirmAddBtnEl);
      addProjToList(newProj);
      addProjToNav(newProj);
      // renderNav();
    });

    tabsEl.appendChild(inputEl);
    tabsEl.appendChild(confirmAddBtnEl);
  };

  return { renderTodos, newProjForm, addProjToList, renderNav };
})();

export { renderPage };
