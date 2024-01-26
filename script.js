const searchBtn = document.getElementById('searchButton');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const getRecipeBtn = document.querySelector('.recipeButton');
const modal = document.querySelector('.meal-details');


searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

////find ingredients = meal
async function getMealList() {
    let searchInputText = document.getElementById('search-input').value.trim();
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    const data = await response.json()
    {
        let html = "";
        if(data.meals) {
            data.meals.forEach(meal => {
               html += `
               <div class ="meal-item" data-id = "${meal.idMeal}">
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="food">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipeButton">Get Recipe</a>
                    </div>
                </div>`;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal.  Try again.";
            mealList.classList.add('notFound');
        }
        mealList.innerHTML = html;
    };   
}

// get recipe
async function getMealRecipe(e) {
    e.preventDefault();
    if(e.target.classList.contains('recipeButton')) {
        let mealItem = e.target.parentElement.parentElement;
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`);
        const data =  await response.json();
            return mealRecipeModal(data.meals);
    }
    getRecipeBtn.addEventListener('click', mealRecipeModal);
/////modal
function mealRecipeModal(meal) {
    // console.log(meal);
    if(meal === meal[0]) return data.meals;
        html = [`
            <h2 class="recipe-title">${meal.strMeal}</h2>
            <p class="recipe-category">${meal.strCategory}</p>
            <div class="recipe-instruct">
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>
            </div>
            <div class="recipe-meal-img">
               <img src="${meal.strMealThumb}" alt="food">
            </div>
            <div class = "recipe-link">
               <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
            </div>
        `];
        
        mealDetailsContent.innerHTML = html;
        mealDetailsContent.parentElement.classList.add('showRecipe');
    };
};
