
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
            const foodAsHTML = createFood(food)
            insertFood(foodAsHTML)
    })
})



const createFood = (food) => {
    console.log(food.name);
    return `<ul><li><b>${food.name}</b><li> <li>${food.category}</li> <li>${food.ethnicity}</li></ul> `

}

const insertFood = (food) => {
    const foodListContainer = document.querySelector(".foodList");
    foodListContainer.innerHTML += food;
    
}