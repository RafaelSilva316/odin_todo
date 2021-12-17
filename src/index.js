import { createTodo } from "./todoObj";
import { createProject } from "./projects";
import { renderPage } from "./render";
import { controller } from "./controller";
import "./styles.css";

let newTodo = createTodo("smoke weed", "420 blaze it", "every day", 1);
let defaultProj = createProject("default");
renderPage.addProjToList(defaultProj);
renderPage.renderNav();

defaultProj.addTodo(newTodo);

controller.setCurrProj(defaultProj);
renderPage.renderTodos(defaultProj);
const btnAddProj = document.querySelector(".btn-add-project");

btnAddProj.addEventListener("click", renderPage.newProjForm);
