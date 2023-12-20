class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.on('add', this.addTodo.bind(this));
        this.view.on('delete', this.deleteTodo.bind(this));
        this.view.on('edit', this.editTodo.bind(this));
        this.view.on('check', this.check.bind(this));

    }

    init() {
        this.view.show(this.model.todos) 
    }

    addTodo(title) {
       const todo =  this.model.addTodo({
            id: Date.now(),
            title,
            completed: false,
        });

        this.view.addTodo(todo);
    }

    deleteTodo(id) {
        const deletedId = this.model.deleteTodo(id);

        this.view.deleteTodo(deletedId)
    }

    editTodo({id, title}) {
        const updatedTodo = this.model.updateTodo(id, {title});  

        this.view.updateTodo(updatedTodo);
    }

    check({id, isCompleted}) {
        const updatedTodo = this.model.updateTodo(id, {isCompleted});  
        console.log('updatedTodo', updatedTodo)
        // this.view.updateTodo(updatedTodo);
    }
}