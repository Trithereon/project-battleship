// Event handling module.

export default class EventHandler {
  static actionHandlers = {
    edit: EventHandler.handleEdit,
    delete: EventHandler.handleDelete,
  };

  static init() {
    document.addEventListener("click", EventHandler.handleClick);
  }
  static handleClick(e) {
    const action = e.target.dataset.action;
    // Execute the associated function, passing the e onto the next function.
    if (action) EventHandler.actionHandlers[action](e);
    // If the clicked element has no data-action, then ignore the click.
    else return;
  }
  static handleEdit(e) {
    const projectContainer = e.target.closest(".card-container");
    const taskContainer = e.target.closest(".card-task-item");
    const dialog = document.getElementById("dialog-card-edit-task");
    dialog.dataset.projectId = projectContainer.id;
    dialog.dataset.taskId = taskContainer.id;

    const project = ProjectManager.getProjectById(projectContainer.id);
    const task = project.getTaskById(taskContainer.id);

    const form = dialog.querySelector("form");
    form.elements["title"].value = task.title;
    form.elements["details"].value = task.details;
    form.elements["priority"].value = task.priority;
    form.elements["dueDate"].value = task.dueDate.slice(0, 16); // Bug fix: slice away the seconds and timezone, otherwise this doesn't work.
    form.elements["project"].value = project.id;

    const projectDropdown = form.elements["project"];

    // Reset any old options before populating them again.
    projectDropdown.textContent = "";

    ProjectManager.getProjectList().forEach((project) => {
      // Store project.id as option.value, but display project title as textContent
      const option = document.createElement("option");
      option.value = project.id;
      option.textContent = project.title;

      projectDropdown.appendChild(option);
    });

    // After generating the dropdown options, display the currently selected task project.
    projectDropdown.value = project.id;

    dialog.showModal();
  }
  static handleDelete(e) {
    const dialog = document.getElementById("dialog-confirm-delete");
    dialog.dataset.delete = "task";
    dialog.dataset.taskId = e.target.closest(".card-task-item").id;
    dialog.showModal();
  }
}
