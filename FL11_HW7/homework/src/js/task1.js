const email = prompt('Please enter you email', '');
const regex = /[^@]+\.+/g;

if (!(email==='' || email===null)) {
    const minLength = 6;
    if (email.length <= minLength) {
        alert("I don't know any emails having name length less than 6 symbols");
    } else {
        if (regex.test(email)) {
            let password = prompt('Please enter you password', '');
            if (!(password === '' || password === null)) {
                if (email === 'user@gmail.com' && password === 'UserPass'
                    || email === 'admin@gmail.com' && password === 'AdminPass') {
                    alert('You are logged in');
                    const changePassword = confirm('Do you want to change your password');
                    if (changePassword) {
                        const oldPassword = prompt('Please enter old password', '');
                        if (oldPassword === password) {
                            const newPassword = prompt('Please enter new password', '');
                            const minLength = 5;
                            if (newPassword.length <= minLength) {
                                alert('It’s too short password. Sorry.');
                            } else {
                               const newPasswordAgain = prompt('Please confirm new password', '');
                               if (newPassword !== newPasswordAgain) {
                                   alert('You wrote the wrong password');
                               } else {
                                   alert('You have successfully changed your password');
                               }
                            }
                        } else {
                            alert('You wrote the wrong old password');
                        }
                    } else {
                        alert('You have failed the change');
                    }
                } else {
                    alert('Wrong password');
                }
            } else {
                alert('Canceled');
            }
        } else {
            alert('I don’t know you');
        }
    }
} else {
    alert('Canceled');
}
