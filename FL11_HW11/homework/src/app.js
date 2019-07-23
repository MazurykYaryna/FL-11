let rootNode = document.getElementById('root');

const addItemButton = document.getElementById('addItem');
const taskInput = document.getElementById('task');
const listTasks = document.getElementsByClassName('list-item')[0];
const completedButton = document.getElementsByClassName('completed')[0];
const listTitle = document.querySelector('.list-title');
let dragSrcEl;
let counterTasks = 0;

const addNewTask = () => {
    taskInput.addEventListener('change', (event) => {
        console.log(event.target.value);
        if(event.target.value === '') {
            addItemButton.classList.add('not-active');
        } else {
            addItemButton.classList.remove('not-active');   
        }
    })
    addItemButton.addEventListener('click', () => {
        const MaximumNumberOfTasks = 10;
        if (counterTasks <= MaximumNumberOfTasks) {
            listTasks.appendChild(createTask(taskInput.value));
            insertTODOTitle(listTitle);
            counterTasks++;
        } else {
            insertWarning(listTitle);
        }
    }) 
};

const insertWarning = (element) => {
    element.innerHTML = '';
    element.innerHTML = 'Maximum item per list are created'
}
const insertTODOTitle = (element) => {
    element.innerHTML = '';
    element.innerHTML = 'TODO Cat list'
}

const markCompleted = (element) => {
    element.innerHTML = 'done';
    element.classList.add('material-icons', 'not-active');
}
const deleteItem = (element) => {
    element.remove();
}

const createTask = (text) => {
    let tasks = document.querySelectorAll('.item');
    const item = document.createElement('div');
    const mainSection = document.createElement('div');
    const completed = document.createElement('i');
    const task = document.createElement('p');
    const editIcon = document.createElement('i');
    const deleteIcon = document.createElement('i');

    item.classList.add('item');
    mainSection.classList.add('main-section');
    completed.classList.add('completed');
    task.classList.add('task-title');
    editIcon.classList.add('material-icons', 'edit');
    deleteIcon.classList.add('material-icons', 'delete');
    task.innerHTML = text;
    editIcon.innerHTML = 'edit'
    deleteIcon.innerHTML = 'delete'

    item.appendChild(mainSection);
    item.appendChild(deleteIcon);
    mainSection.appendChild(completed);
    mainSection.appendChild(task);
    mainSection.appendChild(editIcon);

    function handleDragEnd() {
        [].forEach.call(tasks, function (col) {
            col.classList.remove('over');
        });
    }

    mainSection.addEventListener('dragstart', handleDragStart, false);
    mainSection.addEventListener('dragenter', handleDragEnter, false)
    mainSection.addEventListener('dragover', handleDragOver, false);
    mainSection.addEventListener('dragleave', handleDragLeave, false);
    mainSection.addEventListener('drop', handleDrop, false);
    mainSection.addEventListener('dragend', handleDragEnd, false);

    return item;
}

const editTask = () => {
    const editSection = document.createElement('div');
    const changeTitle = document.createElement('input');
    const saveChanges = document.createElement('i');

    editSection.classList.add('edit-section');
    saveChanges.classList.add('material-icons', 'save');
    saveChanges.innerHTML = 'save';
    changeTitle.setAttribute('type', 'text');
    changeTitle.setAttribute('class','changed-title');
    
    editSection.appendChild(changeTitle);
    editSection.appendChild(saveChanges);
    return editSection;
}

function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}
function handleDragEnter() {
    this.classList.add('over');
}
function handleDragLeave() {
    this.classList.remove('over');
}
function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    if (dragSrcEl !== this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
}
const manageTaskList = () => {
    listTasks.addEventListener('click', (e) => {
        const classOfelement = e.target.getAttribute('class');
        if ( classOfelement === 'completed') {
            markCompleted(e.target);
        } else if (classOfelement.includes('delete')) {
            deleteItem(e.target.parentNode);
            counterTasks--;
        } else if (classOfelement.includes('edit')) {
            e.target.parentNode.appendChild(editTask());
        } else if (classOfelement.includes('save')) {
            const editInput = document.getElementsByClassName('changed-title')[0];
            const taskTitle = document.getElementsByClassName('task-title')[0];
            if (editInput.value !== '') {
                taskTitle.innerHTML = editInput.value;
                deleteItem(e.target.parentNode);
            }
        }
    });
}

manageTaskList();
addNewTask();