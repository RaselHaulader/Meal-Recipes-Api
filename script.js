const searchFood = () =>{
    const  foodBody = document.getElementById('food-body');
    document.getElementById('food-body').textContent = ''
    foodBody.innerHTML = `
    <div class="d-flex justify-content-center">
  <div class="spinner-grow" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
    `
const foodName = document.getElementById('inputField').value
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
    .then(res => res.json())
    .then(data => displayFood(data))
    .catch(err => console.log('error'))
};
const displayFood = foods =>{
    console.log(foods.meals[1])
    const  foodBody = document.getElementById('food-body');
    document.getElementById('food-body').textContent = ''
    foods.meals.forEach(food => {
        const div = document.createElement('div');
        div.classList.add('d-inline-block','m-2',)
        div.innerHTML= `
        <div class="card " style="width: 18rem;">
               <img src="${food.strMealThumb}" class="card-img-top" alt="..."> 
                <div class=" card p-1">
                  <h5 class="card-title">${food.strMeal}</h5>
                  <p class="card-text">${food.strInstructions.slice(0,100)}</p>
                  <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button" onclick="seeDetails('${food.idMeal}')" class="btn btn-primary">Making instructions</button>
                </div>
              </div>
        `
        foodBody.appendChild(div);
    });
}
const seeDetails = item => {
    document.querySelector('.food-title').innerText = '' 
    document.querySelector('.food-details').innerText = ''
console.log(item)
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item}`)
.then(res => res.json())
.then(data => setToModal(data))
}
function setToModal(data) {
    console.log(data)
    document.querySelector('.food-title').innerText = data.meals[0].strMeal
    document.querySelector('.food-details').innerText = data.meals[0].strInstructions;
}