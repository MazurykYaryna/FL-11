const host = 'https://jsonplaceholder.typicode.com/';

const toggleLoader = (isShown) => {
    const loader = document.querySelector(".loader")
    isShown ? loader.classList.remove("hidden") : loader.classList.add("hidden");
}

const fetchData = (url, method, data = null) => {
    let headers = {
        'Content-Type': 'application/json',
    };

    headers = {
        ...headers,
    };

    const options = { method, headers };
    if (data) {
        options.body = JSON.stringify(data);
    }
    return sendAsync(url, options);
}


function sendAsync(url, options) {
    return new Promise((resolve, reject) => {
        toggleLoader(true)
        fetch(`${host}${url}`, options)
            .then((response) => {
                if (response) {
                    return response.json();
                }
                return console.error(response && response.message);
            })
            .catch(function (error) {
                console.error(error);
                toggleLoader(true)
            })
            .then((response) => {
                toggleLoader(false)
                if (response) {
                    return resolve(response);
                }
                console.error(response && response.message);
                return reject(response);
            });
    });
}

const fetchUsers = () => fetchData('users', 'GET');
const UpdateUsers = (id, data) => fetchData(`users/${id}`, 'PUT', data);
const DeleteUser = (id) => fetchData(`users/${id}`, 'DELETE');
let users1 = [];


DeleteUser(1)
    .then((user) => console.log(user))
    .catch(error => console.error(error))

const userList = document.querySelector('.userList');

fetchUsers()
    .then(users => {
        users.forEach(user => {
            const myUser = new User(user.name, user.username, user.email, user.phone, user.id);
            const userCard = myUser.renderUser();
            const editUserCard = myUser.editUser(userCard);
            userList.append(userCard);
            editUserCard && userList.append(editUserCard);
        });
    })
    .catch(error => console.error(error))


class User {
    constructor(name, username, email, phone, id) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.id = id;
        this.isLoad = false;
    }
    renderUser() {
        const doc = document;
        const createEl = (element) => { return document.createElement(element) }
        const col = createEl('div');
        const card = createEl('div');
        const cardBody = createEl('div');
        const cardTitle = createEl('p');
        const cardEmail = createEl('p');
        const cardPhone = createEl('p');
        const deleteButton = createEl('button');
        const editButton = createEl('button');

        cardTitle.setAttribute('href', '');
        col.appendChild(card);
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardEmail);
        cardBody.appendChild(cardPhone);
        cardBody.appendChild(deleteButton);
        cardBody.appendChild(editButton);

        col.classList.add('col-sm-6');
        card.classList.add('card');
        cardBody.classList.add('card-body');
        cardTitle.classList.add('card-title');
        cardEmail.classList.add('card-text');
        cardPhone.classList.add('card-text');
        editButton.classList.add('btn', 'btn-primary', 'edit');
        deleteButton.classList.add('btn', 'btn-primary');

        cardTitle.innerHTML = `${this.name} ${this.username}`;
        cardEmail.innerHTML = `${this.email}`;
        cardPhone.innerHTML = `${this.phone}`;
        editButton.innerHTML = 'edit user';
        deleteButton.innerHTML = 'delete user';

        return col;
    }
    renderEditForm() {
        const editCard = document.createElement('div');
        const editForm = document.createElement('div');
        const editName = document.createElement('input');
        const editEmail = document.createElement('input');
        const editPhone = document.createElement('input');
        const submit = document.createElement('button');

        editCard.classList.add('card');
        editForm.classList.add('card-body', 'form-group');
        editName.classList.add('form-control');
        editEmail.classList.add('form-control');
        editPhone.classList.add('form-control');
        submit.classList.add('btn', 'btn-primary', 'save');

        editName.addEventListener('change', (e) => {
            this.name = e.target.value;
        });

        editEmail.addEventListener('change', (e) => {
            this.email = e.target.value;
        });

        editPhone.addEventListener('change', (e) => {
            this.phone = e.target.value;
        });

        editName.setAttribute('value', this.name);
        editEmail.setAttribute('value', this.email);
        editPhone.setAttribute('value', this.phone);

        editName.setAttribute('name', 'name');
        editEmail.setAttribute('name', 'email');
        editPhone.setAttribute('name', 'phone');

        submit.setAttribute('type', 'submit');

        editCard.appendChild(editForm);
        editForm.appendChild(editName);
        editForm.appendChild(editEmail);
        editForm.appendChild(editPhone);
        editForm.appendChild(submit);

        submit.innerHTML = 'Save';
        return editCard;
    }
    editUser(userCard) {
        userCard.addEventListener('click', (e) => {
            this.isLoad = true;
            const isEdit = e.target.className.includes('edit');
            const isSave = e.target.className.includes('save');
            const editForm = this.renderEditForm();
            if (isEdit) {
                this.removeCard(userCard);
                userCard.appendChild(editForm);
            }
            if (isSave) {
                let inputs = editForm.firstChild.children;
                let params = {};
                for (let i = 0; i < inputs.length; i++) {
                    if ((inputs[i].value)) {
                        params[inputs[i].name] = inputs[i].value;
                    }
                }
                UpdateUsers(this.id, params)
                    .then(user => {
                        this.removeCard(userCard);
                        this.name = user.name;
                        this.email = user.email;
                        this.phone = user.phone;
                        this.isLoad = false;
                        this.id = user.id;
                        const currentUpdatedUser = this.renderUser();
                        this.addCard(userCard, currentUpdatedUser);
                    })
                    .catch(err => console.error(err));
            }
        })
    }
    deleteUser() {
        userCard.addEventListener('click', (e) => {
            console.log(e.target)
        })

    }
    removeCard(container) {
        container.firstChild.remove();
    }
    addCard(container, item) {
        const card = item.querySelector('.card');
        container.insertAdjacentElement('afterbegin', card)
    }
}
