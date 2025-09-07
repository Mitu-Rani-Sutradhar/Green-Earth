// console.log("i am js")

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCategory(json.categories));
};
const displayCategory = (categories) => {
//    get the container & empty
     const categoryContainer = document.getElementById("category-container");
     categoryContainer.innerHTML = "";
        // get into every categories
     for (let category of categories){

//    create element
      const btnDiv = document.createElement("div");
       btnDiv.innerHTML=`
       
       <button onclick="loadLevelTree(${category.category_name})" class="">${category.category_name}
       </button>
       `;

//    append into container
      categoryContainer.append(btnDiv);
      
}
};
loadCategories();