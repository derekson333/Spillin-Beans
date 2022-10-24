const delUserButton = document.getElementById("delete-user")
const delRecipeButton = document.getElementById("delete-recipe")
const delUserHandler = async (event) => {
  event.preventDefault()  
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
    event.preventDefault()
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
  
delUserButton.addEventListener('click', delUserHandler);
delRecipeButton.addEventListener('click', delRecipeHandler);
