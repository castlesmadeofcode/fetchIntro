
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
                    console.log(productInfo)
                    if (productInfo.product.ingredients_text) {
                        food.ingredients = productInfo.product.ingredients_text
                    } else {
                        food.ingredients = "no ingredients listed"
                    }
                    if (productInfo.product.countries) {
                        food.origin = productInfo.product.countries
                    } else {
                        food.origin = "no origin listed"
                    }
                    if (productInfo.product.nutriments["energy-kcal"]) {
                        food.calories = productInfo.product.nutriments["energy-kcal"]
                    } else {
                        food.calories = "no calories per serving listed"
                    }
                    if (productInfo.product.nutriments["fat"]) {
                        food.fats = productInfo.product.nutriments["fat"]
                    } else {
                        food.fats = "no fat per serving listed"
                    }
                    if (productInfo.product.nutriments["sugars"]) {
                        food.sugars = productInfo.product.nutriments["sugars"]
                    } else {
                        food.sugars = "no sugar per serving listed"
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