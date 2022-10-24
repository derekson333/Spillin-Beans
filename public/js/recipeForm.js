
const createIngredient = document.querySelector("#createIngredient")
const addIngredient = document.querySelector("#addIngredientButton")
const createInstruction = document.querySelector("#createInstruction")
const addInstruction = document.querySelector("#addInstructionButton")

createIngredient.addEventListener('click', async function(){
  const name = document.querySelector("#ingredientInput").value.trim()
  const response = await fetch(`/api/ingredients`, {
    method: 'POST',
    body: JSON.stringify({
        name,
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
})

createInstruction.addEventListener('click', async function(){
  const name = document.querySelector("#instructionInput").value.trim()
  const response = await fetch(`/api/instructions`, {
    method: 'POST',
    body: JSON.stringify({
        name,
    }),
    headers: {
        'Content-Type': 'application/json'
    },
});
if (response.ok) {
  alert("New instruction added to our database");
  location.reload()
} else {
  alert(response.statusText);
}
})





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
  
