const createIngredient = document.querySelector("#createIngredient")
const addIngredient = document.querySelector("#addIngredientButton")
const currentIngredients = document.querySelector("#currentIngredients")
const createInstruction = document.querySelector("#createInstruction")
const addInstruction = document.querySelector("#addInstructionButton")
const currentInstructions = document.querySelector("#currentInstructions")
const uploadButton = document.getElementById('upload')
const ingredientArr = []
const instructionArr = []
const ingNameArr = []
const instNameArr = []


function getIngredientNames(select) {
  ingNameArr.unshift(select.options[select.selectedIndex].text);
  var addedName = (select.options[select.selectedIndex].text)
  var row = document.createElement('tr')
  var header = document.createElement('th')
  var data = document.createElement('td')
  header.innerHTML = JSON.stringify(ingNameArr.length);
  data.innerHTML = addedName
  row.appendChild(header)
  row.appendChild(data)
  currentIngredients.appendChild(row)
}

addIngredient.addEventListener('click', function () {
  const chosenIngredient = document.querySelector("#ingredientData").value.trim()
  const select = document.querySelector("#ingredientData")
  ingredientArr.unshift(chosenIngredient)
  getIngredientNames(select)
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
    alert("New ingredient added to our database");
    location.reload()
  } else {
    alert(response.statusText);
  }
})


function getInstructionNames(select) {
  var addedName = (select.options[select.selectedIndex].text)
  instNameArr.unshift(addedName);
  var row = document.createElement('tr')
  var header = document.createElement('th')
  var data = document.createElement('td')
  header.innerHTML = JSON.stringify(instNameArr.length);
  data.innerHTML = addedName
  row.appendChild(header)
  row.appendChild(data)
  currentInstructions.appendChild(row)
}

addInstruction.addEventListener('click', function () {
  const chosenInstruction = document.querySelector("#instructionData").value.trim()
  instructionArr.unshift(chosenInstruction)
  const select = document.querySelector("#instructionData")
  getInstructionNames(select)
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
    alert("New instruction added to our database");
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
  onOpen: () => console.log('opened!'),
  onUploadDone: (res) => imgUrl = res.filesUploaded[0].url
};

// Event listener on upload button to open file picker
uploadButton.addEventListener('click', function () {
  client.picker(options).open();
});


const newFormHandler = async (event) => {
  event.preventDefault();
  console.log('Hi')
  const name = document.querySelector('#recipe-name').value.trim();
  const description = document.querySelector('#recipe-desc').value.trim();
  const prep_time = document.querySelector('#prep-time').value.trim();
  const cook_time = document.querySelector('#cook-time').value.trim();
  const ingredients = ingredientArr
  const instructions = instructionArr
  const img = imgUrl
  const user_id = 1


  // Post function for creating a recipe

  if (name && description) {
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





document
  .querySelector('#create-recipe')
  .addEventListener('click', newFormHandler);