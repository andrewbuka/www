class DomHelper {
  createCheckbox(handler) {
    return this.createElement({
      tag: 'input',
      classList: ['checkbox'],
      attributes: [{prop: 'type', value: 'checkbox'}],
      handler,     
    });
  }

  createTitle(title) {
    return this.createElement({
      tag: 'label',
      classList: ['todo-title'],
      textContent: title,
    });
  }

  createEditInput(title) {
    return this.createElement({
      tag: 'input',
      classList: ['form-control', 'todo-input'],
      textContent: title,
    });
  }

  createEditButton(handlers) {
    return this.createElement({
      tag: 'button',
      classList: ['btn', 'btn-success', 'todo-item-btn-edit'],
      textContent: 'Edit',
      handlers,
    });
  }

  createDeleteButton(handlers) {
    return this.createElement({
      tag: 'button',
      classList: ['btn', 'btn-danger', 'todo-item-btn-delete'],
      textContent: 'Delete',
      handlers,
    });
  }

  createListItem(attributes, children) {
    return this.createElement({
      tag: 'li',
      classList: ['todo-item'],
      attributes, 
      children,
      childrenAction: 'append',
    });
  }

  createElement({tag, classList, attributes, textContent, handlers, children, childrenAction }) {
    const element = document.createElement(tag);

    if(classList?.length) {
      element.classList.add(...classList)
    }

    if(attributes?.length) {
      attributes.forEach(({prop, value}) => {
        element.setAttribute(prop, value)
      });
    }

    if(handlers?.length) {
      handlers.forEach(({event, handler}) => {
        element.addEventListener(event, handler);
      })
    }

    if(textContent) {
      element.textContent = textContent;
    }
    if(children) {
      element[childrenAction](...children);
    }

    return element;
  }
}