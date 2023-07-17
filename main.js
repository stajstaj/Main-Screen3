function showInput(column) {
  // Remove any existing input fields in the same column
  const existingInput = column.querySelector('.input-field');
  if (existingInput) {
    return; // Input field already exists in the column, return
  }

  // Create a new input field
  const inputField = document.createElement('input');
  inputField.className = 'input-field';
  inputField.type = 'text';

  // Create the save button
  const saveButton = document.createElement('button');
  saveButton.innerText = 'Save';
  saveButton.addEventListener('click', function () {
    saveTodoItem(column, inputField.value);
    column.removeChild(inputField);
    column.removeChild(saveButton);
  });

  // Add the input field and save button to the column
  column.appendChild(inputField);
  column.appendChild(saveButton);
}

function saveTodoItem(column, content) {
  if (content.trim() === '') {
    return; // If content is empty, do not add the todo
  }

  const todoItem = createTodoItem(content);
  const deleteButton = todoItem.querySelector('.delete');
  deleteButton.addEventListener('click', function () {
    column.removeChild(todoItem);
  });

  const editButton = todoItem.querySelector('.edit');
  const label = todoItem.querySelector('label');
  editButton.addEventListener('click', function () {
    label.contentEditable = true;
    label.focus();
    saveButton.style.display = 'inline-block';
  });

  const saveButton = document.createElement('button'); // Create the save button
  saveButton.innerText = 'Save';
  saveButton.style.display = 'none';
  saveButton.addEventListener('click', function () {
    label.contentEditable = false;
    saveButton.style.display = 'none';
  });

  // Add the todo item to the column
  column.insertBefore(todoItem, column.lastChild.previousSibling);
}

function createTodoItem(content) {
  const todoItem = document.createElement('div');
  todoItem.className = 'todo-item';

  const label = document.createElement('label');
  label.innerText = content;
  todoItem.appendChild(label);

  const actions = document.createElement('div');
  actions.className = 'actions';

  const editButton = document.createElement('button');
  editButton.className = 'edit';
  editButton.innerHTML = '<i class="far fa-edit"></i>';
  actions.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';
  actions.appendChild(deleteButton);

  todoItem.appendChild(actions);

  return todoItem;
}