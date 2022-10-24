const delUserHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to delete user');
      }
    }
  };

  const delRecipeHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to delete recipe');
      }
    }
  };
  
  document
  .querySelector('#delete-user')
  .addEventListener('click', delUserHandler);

  document
  .querySelector('#delete-recipe')
  .addEventListener('click', delRecipeHandler);
