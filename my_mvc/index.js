const model =new Model();
const view = new View(new DomHelper(), document.getElementById('todo-list'));
const controller = new Controller(model, view);

controller.init();