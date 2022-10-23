
const createIngredient = document.querySelector("#createIngredient")
const addIngredient = document.querySelector("#addIngredientButton")



const newIngredient = async () => {
  
  const ingredientIn = document.querySelector("#ingredientInput").value.trim()
  const response = await fetch('/api/ingredients', {
    method: 'POST',
    body: JSON.stringify({
        ingredientIn,
    
    }),
    headers: {
        'Content-Type': 'application/json'
    },
});
if (response.ok) {
  alert("New ingredient added to our database");
} else {
  alert(response.statusText);
}
}
createIngredient.addEventListener('click', newIngredient())





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
  

  
 
  document
    .querySelector('#create-recipe')
    .addEventListener('click', newFormHandler);
  
