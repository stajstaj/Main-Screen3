function showInput(column) {
  // Remove any existing input fields in the same column
  const existingInput = column.querySelector('.input-field');
  if (existingInput) {
    return; // Input field already exists in the column, return
  }

  // Create a new input field
  const inputField = document.createElement('textarea');
  inputField.className = 'input-field';

  inputField.addEventListener('input', function () {
    this.style.height = 'auto'; // Reset the height to auto to calculate the new height based on content
    this.style.height = this.scrollHeight + 'px'; // Set the height to the calculated scroll height
  });

  // Create the save button
  const saveButton = document.createElement('button');
  saveButton.innerText = 'Kaydet';
  saveButton.className = 'save-button';
  saveButton.addEventListener('click', function () {
    const trimmedContent = inputField.value.trim();
    if (trimmedContent === '') {
      column.removeChild(todoItem);
    } else {
      saveTodoItem(column, trimmedContent);
    }
    column.removeChild(inputField);
    column.removeChild(saveButton);
  });

  // Add the input field and save button to the column
  column.appendChild(inputField);
  column.appendChild(saveButton);
}

function saveTodoItem(column, content) {
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
  const editIcon = document.createElement('img');
  editIcon.src = 'edit.png';
  editIcon.alt = 'Edit Icon';
  editButton.appendChild(editIcon);
  actions.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  const deleteIcon = document.createElement('img');
  deleteIcon.src = 'delete.png';
  deleteIcon.alt = 'Delete Icon';
  deleteButton.appendChild(deleteIcon);
  actions.appendChild(deleteButton);

  todoItem.appendChild(actions);

  return todoItem;
}
