const host = 'https://jsonplaceholder.typicode.com/';

//loader
const toggleLoader = (isShown) => {
    const loader = document.querySelector(".loader")
    isShown ? loader.classList.remove("hidden") : loader.classList.add("hidden");
}

//api helpers
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

//API
const fetchUsers = () => fetchData('users', 'GET');
const fetchPosts = (userId) => fetchData(`posts?userId=${userId}`, 'GET');
const fetchComents = (postId) => fetchData(`comments?postId=${postId}`, 'GET');
const updateUsers = (id, data) => fetchData(`users/${id}`, 'PUT', data);
const deleteUser = (id) => fetchData(`users/${id}`, 'DELETE');

//utils 
const createEl = (element) => document.createElement(element);

//user list functionality
const userList = document.querySelector('.userList');
const wrapper = document.querySelector('.wrapper');

const renderPost = ({ title, body }) => {
    const postBody = createEl('div');
    const postTitle = createEl('h5');
    const postComent = createEl('p');

    postBody.appendChild(postTitle);
    postBody.appendChild(postComent);

    postBody.classList.add('card-body');
    postTitle.classList.add('card-title');
    postComent.classList.add('card-text');

    postTitle.innerHTML = `${title}`;
    postComent.innerHTML = `${body}`;

    return postBody;
};

const renderComent = ({ email, body }) => {
    const comentContainer = createEl('div');
    const comentTitle = createEl('h6');
    const comentBody = createEl('p');

    comentTitle.innerHTML = `${email}`;
    comentBody.innerHTML = `${body}`;

    comentTitle.classList.add('card-subtitle', 'mb-2', 'mt-2', 'text-muted');
    comentBody.classList.add('card-text');

    comentContainer.append(comentTitle);
    comentContainer.append(comentBody);

    return comentContainer;
};

fetchUsers()
    .then(users => {
        users.forEach(user => {
            const myUser = new User(user.name, user.username, user.email, user.phone, user.id);
            const userCard = myUser.renderUser();
            userList.append(userCard);
            myUser.controlUser(userCard);
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
    }
    redirectOnPrivatePage() {

    }
    renderUser() {
        const col = createEl('div');
        const card = createEl('div');
        const cardBody = createEl('div');
        const cardTitle = createEl('a');
        const cardEmail = createEl('p');
        const cardPhone = createEl('p');
        const deleteButton = createEl('button');
        const editButton = createEl('button');

        col.appendChild(card);
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardEmail);
        cardBody.appendChild(cardPhone);
        cardBody.appendChild(deleteButton);
        cardBody.appendChild(editButton);

        col.classList.add('col-sm-6', 'mb-2', 'mt-2');
        card.classList.add('card');
        cardBody.classList.add('card-body');
        cardTitle.classList.add('card-title');
        cardEmail.classList.add('card-text');
        cardPhone.classList.add('card-text');
        editButton.classList.add('btn', 'btn-primary', 'edit', 'ml-1');
        deleteButton.classList.add('btn', 'btn-primary', 'delete');

        cardTitle.innerHTML = `${this.name} ${this.username}`;
        cardEmail.innerHTML = `${this.email}`;
        cardPhone.innerHTML = `${this.phone}`;
        editButton.innerHTML = 'edit user';
        deleteButton.innerHTML = 'delete user';

        cardTitle.addEventListener('click', () => {
            window.location.replace(`${location.href}#${this.id}`);
            userList.remove();

            fetchPosts(this.id).then(posts => {
                posts.forEach((post) => {
                    const postCard = renderPost(post);
                    wrapper.append(postCard);
                    fetchComents(post.id).then(coments => {
                        coments.forEach(comment => {
                            const comentContainer = renderComent(comment);
                            postCard.append(comentContainer);
                        });
                    })
                });
            });
        });

        return col;
    }
    renderEditForm() {
        const editCard = createEl('div');
        const editForm = createEl('div');
        const editName = createEl('input');
        const editUserName = createEl('input');
        const editEmail = createEl('input');
        const editPhone = createEl('input');
        const submit = createEl('button');

        editCard.classList.add('card');
        editForm.classList.add('card-body', 'form-group');
        editName.classList.add('form-control', 'mb-2');
        editUserName.classList.add('form-control', 'mb-2');
        editEmail.classList.add('form-control', 'mb-2');
        editPhone.classList.add('form-control', 'mb-2');
        submit.classList.add('btn', 'btn-primary', 'save');

        editName.addEventListener('change', (e) => {
            this.name = e.target.value;
        });

        editUserName.addEventListener('change', (e) => {
            this.username = e.target.value;
        });

        editEmail.addEventListener('change', (e) => {
            this.email = e.target.value;
        });

        editPhone.addEventListener('change', (e) => {
            this.phone = e.target.value;
        });

        editName.setAttribute('value', this.name);
        editUserName.setAttribute('value', this.username);
        editEmail.setAttribute('value', this.email);
        editPhone.setAttribute('value', this.phone);

        editName.setAttribute('name', 'name');
        editUserName.setAttribute('name', 'username');
        editEmail.setAttribute('name', 'email');
        editPhone.setAttribute('name', 'phone');

        submit.setAttribute('type', 'submit');

        editCard.appendChild(editForm);
        editForm.appendChild(editName);
        editForm.appendChild(editUserName);
        editForm.appendChild(editEmail);
        editForm.appendChild(editPhone);
        editForm.appendChild(submit);

        submit.innerHTML = 'Save';
        return editCard;
    }
    controlUser(userCard) {
        userCard.addEventListener('click', (e) => {
            const isEdit = e.target.className.includes('edit');
            const isSave = e.target.className.includes('save');
            const isDelete = e.target.className.includes('delete');
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
                updateUsers(this.id, params)
                    .then(user => {
                        this.removeCard(userCard);
                        this.name = user.name;
                        this.username = user.username;
                        this.email = user.email;
                        this.phone = user.phone;
                        this.id = user.id;
                        const currentUpdatedUser = this.renderUser();
                        this.addCard(userCard, currentUpdatedUser);
                    })
                    .catch(err => console.error(err));
            }
            if (isDelete) {
                deleteUser(this.id)
                    .then(() => userCard.remove())
                    .catch(() => console.error(err))

            }
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
