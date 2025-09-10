

const manageSpinner = (status)=>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("card-conainer").classList.add("hidden");

    }
    else{
        document.getElementById("card-conainer").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}


const loadCategories = () => {
	fetch('https://openapi.programming-hero.com/api/categories')
		.then((res) => res.json())
		.then((json) => displayCategory(json.categories))
};

const displayCategory = (categories) => {
	//    get the container & empty
	const categoryContainer = document.getElementById('category-container')
	categoryContainer.innerHTML = ''
	// get into every categories
	for (let category of categories) {
		categoryContainer.innerHTML += `<button onclick="loadCategoryPlants(${category.id})" class="btn btn-primary block py-2 w-full text-left bg-[#15803D] ">${category.category_name}
       </button>
       `
	}
};


const loadTreeDetail =async(id) =>{
    const url =`https://openapi.programming-hero.com/api/plant/${id}`;
    const res =await fetch(url);
    const details = await res.json();
    displayTreeDetails(details.plants);
}

displayTreeDetails =(plant) =>{
    console.log(plant);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML =
    `
    <div class="p-4 w-[320px] h-[450px] bg-white rounded-xl mb-3">

                <h3 = class="font-bold py-2">${plant.name}</h3> 

                <div class="h-[180px] w-full">
                   <img class="h-[180px] w-full" src="${plant.image}" alt="">
                   </div>
                    <p class=" h-[22px] w-[200px] font-bold mb-3 mt-3">Category:${plant.category}</p>
                     <p class="pr-5 font-bold">Price: ৳${plant.price}</p>
                     <p class="text-regular h-[120px] font-bold mt-3">Description: <br> ${plant.description}</p>
                </div> 
    `;
    document.getElementById("my_modal_5").showModal();
}


const loadCategoryPlants = (id) => {
   manageSpinner(true);
const url = `https://openapi.programming-hero.com/api/category/${id}`
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			displayCategoryTree(data.plants)
		});


        const displayCategoryTree =(trees) => {
        //   console.log(trees)};

            const cardContainer = document.getElementById("card-conainer");
            cardContainer.innerHTML = "";

//             {
//     "id": 7,
//     "image": "https://i.ibb.co.com/FkH6MRhR/banyan-min.jpg",
//     "name": "Banyan Tree",
//     "description": "A majestic shade tree with a vast canopy and iconic aerial roots. Revered in many cultures, it offers shelter to countless birds and animals.",
//     "category": "Shade Tree",
//     "price": 1200
// }
          
            for(const tree of trees){
                // console.log(tree);
                const card = document.createElement("div");
                card.innerHTML=`
                <div class="p-4 w-[320px] h-[450px] bg-white rounded-xl mb-3">
                    <div class="h-[180px] w-[300px]">
                    <img class="h-[180px] w-[290px]" src="${tree.image}" alt="">
                        
                    </div>
                    <h3 onclick="loadTreeDetail(${tree.id})" class="font-bold py-2">${tree.name}</h3>
                    <p class="text-regular h-[120px]">${tree.description}</p>
                    <div class="flex justify-between py-3">
                        <p class="bg-[#A4FDC5] h-[22px] w-[200px] text-center rounded-2xl">${tree.category}</p>
                        <p class="pr-5">৳${tree.price}</p>
                    </div>
                    <button class="bg-[#15803D] w-full h-[30px] text-white rounded-2xl cart-btn">Add to Cart</button>
                </div> 
                
                `;  
                cardContainer.append(card);


    
            }
            
         manageSpinner(false)
        }
       
};

loadCategories();


