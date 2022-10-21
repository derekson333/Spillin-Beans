const loginFormHandler = async (event) => {
    event.preventDefault()
    // Collect values from the login form
    const user_name = document.querySelector('#user-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (user_name && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ user_name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the home page
        document.location.replace('/');
        location.reload();
        // Reload refreshes page removing the login button
      } else {
        alert(response.statusText);
      }
    }
  };
  
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  