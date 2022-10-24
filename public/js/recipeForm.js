
const createIngredient = document.querySelector("#createIngredient")
const addIngredient = document.querySelector("#addIngredientButton")

const createInstruction = document.querySelector("#createInstruction")
const addInstruction = document.querySelector("#addInstructionButton")
const ingredientArr = []
const instructionArr = []


addIngredient.addEventListener('click', function() {
  const chosenIngredient = document.querySelector("#ingredientIn").value.trim()
  ingredientArr.unshift(chosenIngredient)
console.log(ingredientArr)})
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
  location.reload()
} else {
  alert(response.statusText);
}
})
addInstruction.addEventListener('click', function() {
  const chosenInstruction = document.querySelector("#instructionSearch")
  instructionArr.unshift(chosenInstruction.value.trim())
  console.log(chosenInstruction.value.trim())
console.log(instructionArr)})
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
    console.log('Hi')
    const name = document.querySelector('#recipe-name').value.trim();
    const description = document.querySelector('#recipe-desc').value.trim();
    const prep_time = document.querySelector('#prep-time').value.trim();
    const cook_time = document.querySelector('#cook-time').value.trim();
    const ingredients = ingredientArr
    const instructions = instructionArr
    const user_id = 1
    // localStorage.getItem('userId')
    
  
    // Post function for creating a recipe
  
    if (name  && description) {
      const response = await fetch(`/api/recipes`, {
        method: 'POST',
        body: JSON.stringify({user_id, name,  description, prep_time, cook_time, ingredients, instructions }),
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
  
