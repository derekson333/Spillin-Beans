const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#recipe-name').value.trim();
    const description = document.querySelector('#recipe-desc').value.trim();
  
    // Post function for creating a recipe
  
    if (name  && description) {
      const response = await fetch(`/api/recipes`, {
        method: 'POST',
        body: JSON.stringify({ name,  description, prep_time, cook_time, ingredients, instructions }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
 
     if (response.ok) {
       document.location.replace('/');
     } else {
       alert('Failed to create recipe');
     }
   }
 };
 
 // Function that handles deleting a recipe
 

 document
   .querySelector('.new-recipe-form')
   .addEventListener('submit', newFormHandler);
 