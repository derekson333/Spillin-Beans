const deleteButton = document.getElementById('delete')
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to delete recipe');
      }
    }
  };
  
deleteButton.addEventListener('click', delButtonHandler);
