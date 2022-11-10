const createIngredient = document.querySelector("#createIngredient")
const addIngredient = document.querySelector("#addIngredientButton")
const removeIngredient = document.querySelector("#removeIngredientButton")
const currentIngredients = document.querySelector("#currentIngredients")
const createInstruction = document.querySelector("#createInstruction")
const addInstruction = document.querySelector("#addInstructionButton")
const removeInstruction = document.querySelector("#removeInstructionButton")
const currentInstructions = document.querySelector("#currentInstructions")
const uploadButton = document.getElementById('upload')
const ingredientSelect = document.querySelector("#ingredientData")
const instructionSelect = document.querySelector("#instructionData")
const ingredientArr = []
const instructionArr = []
const ingNameArr = []
const instNameArr = []

function getIngredientNames() {
  var div = document.createElement('div')
  for (let i = 0; i < ingNameArr.length; ++i) {
    var row = document.createElement('tr')
    var header = document.createElement('th')
    var data = document.createElement('td')
    header.innerHTML = JSON.stringify(i + 1);
    data.innerHTML = ingNameArr[i]
    row.appendChild(header)
    row.appendChild(data)
    div.appendChild(row)
  }
  currentIngredients.innerHTML = div.innerHTML
}
addIngredient.addEventListener('click', function () {
  const chosenIngredient = ingredientSelect.value.trim()
  ingredientArr.unshift(chosenIngredient)
  var addedName = (ingredientSelect.options[ingredientSelect.selectedIndex].text)
  ingNameArr.unshift(addedName);
  getIngredientNames()
})
removeIngredient.addEventListener('click', function () {
  ingredientArr.shift()
  ingNameArr.shift()
  getIngredientNames()
})

createIngredient.addEventListener('click', async function () {
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
    location.reload()

  } else {
    alert(response.statusText);
  }
})


function getInstructionNames() {
  var div = document.createElement('div')
  for (let i = 0; i < instNameArr.length; ++i) {
    var row = document.createElement('tr')
    var header = document.createElement('th')
    var data = document.createElement('td')
    header.innerHTML = JSON.stringify(i + 1);
    data.innerHTML = instNameArr[i]
    row.appendChild(header)
    row.appendChild(data)
    div.appendChild(row)
  }
  currentInstructions.innerHTML = div.innerHTML
}

addInstruction.addEventListener('click', function () {
  const chosenInstruction = instructionSelect.value.trim()
  var addedName = instructionSelect.options[instructionSelect.selectedIndex].text
  instNameArr.unshift(addedName)
  instructionArr.unshift(chosenInstruction)
  getInstructionNames()
})
removeInstruction.addEventListener('click', function () {
  instructionArr.shift()
  instNameArr.shift()
  getInstructionNames()
})

createInstruction.addEventListener('click', async function () {
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
    location.reload()

  } else {
    alert(response.statusText);
  }
})



// API setup to use filepicker and store image URL
const apikey = 'A2Cms4wvRRnqHepwihpV0z';
const client = filestack.init(apikey);
const options = {
  maxFiles: 1,
  uploadInBackground: false,
  onUploadDone: (res) => imgUrl = res.filesUploaded[0].url
};
// Event listener on upload button to open file picker
uploadButton.addEventListener('click', function () {
  client.picker(options).open();
});

const newFormHandler = async (event) => {
  event.preventDefault();
  const name = document.querySelector('#recipe-name').value.trim();
  const description = document.querySelector('#recipe-desc').value.trim();
  const prep_time = document.querySelector('#prep-time').value.trim();
  const cook_time = document.querySelector('#cook-time').value.trim();
  const user_id = document.querySelector('#user-id').value.trim();
  const ingredients = ingredientArr
  const instructions = instructionArr
  const img = imgUrl
  // Post function for creating a recipe
  if (name && description && prep_time && cook_time && ingredients && instructions && img) {
    const response = await fetch(`/api/recipes`, {
      method: 'POST',
      body: JSON.stringify({
        user_id,
        name,
        description,
        prep_time,
        cook_time,
        ingredients,
        instructions,
        img
      }),
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





create-recipe
  .addEventListener('click', newFormHandler);