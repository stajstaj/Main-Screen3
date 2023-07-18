function showInput(column) {
  const existingInput = column.querySelector('.input-field');
  if (existingInput) {
    return; // If there is already an input field, do nothing
  }

  // yeni input field createlendi
  const inputField = document.createElement('textarea');
  inputField.className = 'input-field';

  inputField.addEventListener('input', function () {
    this.style.height = 'auto'; // Reset the height to auto to calculate the new height based on content
    this.style.height = this.scrollHeight + 'px'; // Set the height to the calculated scroll height
  });

  // input field boşsa esc ile silinir
  document.addEventListener('keydown', function (event) {
    const inputField = document.querySelector('.input-field');
    const saveButton = document.querySelector('.save-button');
    if (event.key === 'Escape' && inputField && inputField.value.trim() === '') {
      const column = inputField.parentNode;
      column.removeChild(inputField);
      if (saveButton) {
        column.removeChild(saveButton);
      }
    }
  });

  // save butonu createlendi
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
    editsaveButton.style.display = 'none';
  });

  const editsaveButton = document.createElement('button'); // Create the save button
  editsaveButton.innerText = 'Düzenlemeyi Kaydet';
  editsaveButton.className = 'editsave-button';
  editsaveButton.style.display = 'none';
  editsaveButton.addEventListener('click', function () {
    const trimmedContent = label.innerText.trim();
    editsaveButton.style.display = 'none';
    if (trimmedContent === '') {
      column.removeChild(todoItem);
    } else {
      label.contentEditable = false;
    }
  }); 

  const editButton = todoItem.querySelector('.edit');
  const label = todoItem.querySelector('label');
  // edit butonu işlev
  editButton.addEventListener('click', function () {
    column.appendChild(editsaveButton);
    label.contentEditable = true;
    label.focus();
    editsaveButton.style.display = 'inline-block';
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
