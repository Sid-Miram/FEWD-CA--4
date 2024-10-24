// Fetch a random meal
fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then(response => response.json())
  .then(parsedDataRandom => {
    console.log('meal');
    console.log(parsedDataRandom);
    dataRandom(parsedDataRandom.meals);
  });

// Function to handle random meal data
function dataRandom(meals) {
  const randomMeal = meals[Math.floor(Math.random() * meals.length)];
  
  const image = document.getElementById('get-meal');
  image.src = randomMeal.strMealThumb;

  const title = document.createElement('h2');
  title.textContent = randomMeal.strMeal;

  const todayImg = document.querySelector('#get-meal');
  todayImg.appendChild(image);
  todayImg.appendChild(title);
}

// Fetch meals by seafood category
fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
  .then(response => response.json())
  .then(parsedDataSearch => {
    console.log('meal');
    console.log(parsedDataSearch);

    const randomMeal = parsedDataSearch.meals[Math.floor(Math.random() * parsedDataSearch.meals.length)];
  });

// Input search handling
const searchInput = document.querySelector('#search');
let input = ' ';

searchInput.addEventListener('input', (e) => {
  input = e.target.value;
});

const gridContainer = document.querySelector('#meal-category');
let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`;

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    input = e.target.value;
    apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`;
    getdata();
  }
});

// Function to fetch data based on search input
function getdata() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(parsedData => {
      const meals = parsedData.meals;
      gridContainer.innerHTML = '';

      meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('grid');

        const image = document.createElement('img');
        image.src = meal.strMealThumb;
        mealDiv.appendChild(image);

        const title = document.createElement('h2');
        title.textContent = meal.strMeal;
        title.style.fontSize = '30px';
        title.style.textAlign = 'justify';
        title.style.color = 'white';
        mealDiv.appendChild(title);

        gridContainer.appendChild(mealDiv);
      });
    });
}

// Function to handle click event and display meal ingredients
function dataRandom(meals) {
  const randomMeal = meals[Math.floor(Math.random() * meals.length)];

  const image = document.createElement('img');
  image.src = randomMeal.strMealThumb;

  const title = document.createElement('h1');
  title.textContent = randomMeal.strMeal;

  const todayImg = document.querySelector('.todayImg');

  todayImg.addEventListener('click', function() {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMeal.idMeal}`)
      .then(response => response.json())
      .then(data => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          if (data.meals[0][`strIngredient${i}`]) {
            const ingredient = data.meals[0][`strIngredient${i}`];
            const measure = data.meals[0][`strMeasure${i}`];
            ingredients.push(`${ingredient} - ${measure}`);
          }
        }

        const modals = document.createElement('span');
        modals.classList.add('modal');
        modals.innerHTML = `
          <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Ingredients</h2>
            <ul>
              ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
          </div>
        `;
        document.body.appendChild(modals);

        const closeButton = modals.querySelector('.close');
        closeButton.addEventListener('click', function() {
          modals.remove();
        });
      })
      .catch(error => {
        console.error('Error is here', error);
      });
  });

  todayImg.appendChild(image);
  todayImg.appendChild(title);
}
