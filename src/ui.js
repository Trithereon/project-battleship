// DOM manipulation module.

export default class UI {
  // Private function, so underscore prefix.
  _createElement = (tag, classes, text) => {
    const element = document.createElement(tag);
    if (classes) element.classList.add(...classes.split(" "));
    if (text) element.textContent = text;
    return element;
  };

  mainContent = document.getElementById("main-content");

  // Public functions to be exported.
  renderProject = (project) => {
    const container = _createElement("div", "card-container");
    const titleContainer = _createElement(
      "div",
      "card-project-title-container",
    );
    const title = _createElement("h3", "card-project-title", project.title);

    // Assign attributes.
    container.id = project.id;
    addNewTask.dataset.action = "cardNewTask";
    imgEdit.width = "18";
    imgEdit.height = "18";
    imgEdit.src = editImg;
    imgEdit.alt = "Edit icon";
    imgEdit.dataset.action = "editProject";
    imgDelete.width = "18";
    imgDelete.height = "18";
    imgDelete.src = deleteImg;
    imgDelete.alt = "Delete icon";
    imgDelete.dataset.action = "deleteProject";

    mainContent.appendChild(container);
    container.append(titleContainer, taskList);
    titleContainer.appendChild(title);
    // Prevent deletion or modification of Default Project.
    if (project.title !== "Unassigned tasks") {
      titleContainer.appendChild(cardActionsContainer);
    }
    cardActionsContainer.append(imgEdit, imgDelete);
    taskList.appendChild(addNewTask);

    return container;
  };
}
