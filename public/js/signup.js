const signupFormHandler = async (event) => {
    event.preventDefault();

    const user_name = document.querySelector('#user-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();

    // Creates user with entered user name and password
    
    if (user_name && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                user_name,
                password,
                email
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);