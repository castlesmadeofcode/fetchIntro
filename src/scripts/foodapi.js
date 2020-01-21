
// This makes a request to a specific domain, port address, and resource on the Web.
// localhost is the domain
// 8088 is the port address
// food is the resource
// By default, fetch performs a GET operation, so it requires no other configuration.
fetch("http://localhost:8088/food")
    // This line of code accepts the response from your request, parses the body of the 
    // response as JSON and returns it to any subsequent then() method.
    .then(foods => foods.json())
    // This line of code accepts the parsed JSON as the argument to a function, and then
    //  uses console.table() to display the results.
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            console.log(food);

            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    const productIngredients = productInfo.product.ingredients_text;
                    const productCountries = productInfo.product.countries;
                    const productCalories = productInfo.product.nutriments["energy-kcal"];
                    const productFats = productInfo.product.nutriments["fat"];
                    const productSugars = productInfo.product.nutriments["sugars"];

                    if (productIngredients) {
                        food.ingredients = productIngredients;
                    } else {
                        food.ingredients = "no ingredients listed";
                    }
                    if (productCountries) {
                        food.origin = productCountries;
                    } else {
                        food.origin = "no origin listed";
                    }
                    if (productCalories) {
                        food.calories = productCalories;
                    } else {
                        food.calories = "no calories per serving listed";
                    }
                    if (productFats) {
                        food.fats = productFats;
                    } else {
                        food.fats = "no fat per serving listed";
                    }
                    if (productSugars) {
                        food.sugars = productSugars;
                    } else {
                        food.sugars = "no sugar per serving listed";
                    }

                    // Produce HTML representation
                    const foodAsHTML = createFood(food)
                    // Add representaiton to DOM
                    insertFood(foodAsHTML)
                })
        })
    })





const createFood = (food) => {
    // console.log(food.name);
    return `<ul><li><b>${food.name}</b></li><li>${food.category}</li><li>${food.ethnicity}</li>
    <li>${food.ingredients}</li><li>${food.origin}</li><li>${food.calories}</li><li>${food.fats}</li><li>${food.sugars}</li></ul> `

}

const insertFood = (food) => {
    const foodListContainer = document.querySelector(".foodList");
    foodListContainer.innerHTML += food;

}