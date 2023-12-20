class Model {
  constructor(todos = []) {
    this.todos = todos;
  }


  addTodo(todo) {
    this.todos.push(todo);
    return todo;
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    return id;
  }

  updateTodo(id, title) {
    let updatedTodo;
    console.log('this.todos1', this.todos);
    this.todos = this.todos.map(todo => {
      if(todo.id === id) {
        todo = {
          ...todo,
          ...title,
        }
        updatedTodo = todo;
        return todo;
      }
      return todo
    })
    console.log('this.todos2', this.todos);
    return updatedTodo;
  }
}