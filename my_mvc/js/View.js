class View extends EventEmitter {
    constructor(builder, list) {
        super();
        this.builder = builder;
        this.list = list;

        this.form = document.getElementById('form');
        this.formInput = document.getElementById('form-input');

        this.onSubmit= this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onCheck = this.onCheck.bind(this);

        this.form.addEventListener('submit', this.onSubmit);

        this.isEditing = false;
    }

    show(todos) {
        todos.forEach(todo => {
            this.addTodo(todo);
        });
    }

    addTodo(todo) {
        const todoItem = this.createTodoo(todo);

        this.list.append(todoItem);
    }

    createTodoo(todo) {
        const checkbox = this.builder.createCheckbox([{event: 'change', handler: this.onCheck}]);
        const title = this.builder.createTitle(todo.title);
        const titleInput = this.builder.createEditInput(todo.title);
        const editButton = this.builder.createEditButton([{event: 'click', handler: this.onEdit}]);
        const deleteButton = this.builder.createDeleteButton([{event: 'click', handler: () => this.onDelete(todo.id)}]);

        const item = this.builder.createListItem([{prop: 'data-id', value: todo.id}], [checkbox, title, titleInput, editButton, deleteButton]);

        return item;
    }
    onDelete(id) {
        this.emit('delete', id);
    }
    deleteTodo(id) {
        const todo = this.findTodo(id);
        todo.remove();
    }

    onEdit(event) {
        const todo = event.target.closest('.todo-item');
        const label = todo.querySelector('.todo-title');
        const input = todo.querySelector('.todo-input');
        const editButton = todo.querySelector('.todo-item-btn-edit');
        const id = +todo.dataset.id;

        if(!this.isEditing) {
            this.isEditing = !this.isEditing;
            editButton.textContent = 'Save';
            todo.classList.add('editing');
            input.value = label.textContent;
        } else {
            const title = input.value;
            this.emit('edit', { id, title });            
        }
    }

    onCheck(event) {
        const todo = event.target.closest('.todo-item');
        const id = +todo.dataset.id;

        const isCompleted = event.target.checked;

        console.log('isCompleted', isCompleted, todo)

        this.emit('check', {id, isCompleted});
        
    }

    updateTodo(updatedTodo) {
        const todo = event.target.closest('.todo-item');
        const label = todo.querySelector('.todo-title');
        const input = todo.querySelector('.todo-input');
        const editButton = todo.querySelector('.todo-item-btn-edit');
            
            this.isEditing = !this.isEditing;
            editButton.textContent = 'Edit';
            todo.classList.remove('editing');          
            label.textContent = updatedTodo.title;
    }

    onSubmit(event) {
        event.preventDefault();
        const title = this.formInput.value;
        if(title === '') {
            alert("BUKA");
            return;
        }

        this.formInput.value = '';

        this.emit('add', title);        
    }

    findTodo(id) {
        
     return this.list.querySelector(`[data-id="${id}"]`);
  
       

    }
}