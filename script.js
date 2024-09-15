// Constants
let perPage = 15;
let currPage = 1;
const API_KEY = "DAm0sf47DDnvZ9mWH0KnolKcNvtQne96DJiRtK0dH5SOEEXJ3xWGjb11";
const url = `https://api.pexels.com/v1/curated?page=${currPage}&per_page=${perPage}`;

// Function to get images
async function getImages(query) {
  try {
    const res = await fetch(query, {
      headers: { Authorization: API_KEY }
    });
    const data = await res.json();
    bindData(data.photos);
    console.log(data.photos);
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

// Function to bind data to HTML elements
function bindData(photos) {
  const cardContainer = document.getElementById("card-container");
  const newsCardTemplate = document.getElementById("template-image-card");

  if (!cardContainer || !newsCardTemplate) {
    console.error("Missing HTML elements: card-container or template-image-card");
    return;
  }

//   cardContainer.innerHTML = "";
  photos.forEach(photo => {
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, photo);
    cardContainer.appendChild(cardClone);
  });
}

// Function to fill data in a card
function fillDataInCard(cardClone, photo) {
  const newsImg = cardClone.querySelector('#news-img');
  const imgAuthor = cardClone.querySelector('#img-author');
  if (photo.src && photo.src.medium) {
    newsImg.src = photo.src.medium;
    imgAuthor.innerHTML = photo.photographer;
    cardClone.firstElementChild.addEventListener("click", () => {
      window.open(photo.src.medium, "_blank");
    });
  } else {
    console.error("Invalid photo data:", photo);
  }
}

// Call getImages function on window load
window.addEventListener('load', getImages(`https://api.pexels.com/v1/curated?page=${currPage}&per_page=${perPage}`));
const btn = document.getElementById("load-more");
btn.addEventListener("click", () =>{
    currPage++;
    console.log(currPage);
    getImages(`https://api.pexels.com/v1/curated?page=${currPage}&&per_page=${perPage}`);
});

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-image');
searchButton.addEventListener('click',()=>{
    const searchQuery = searchText.value.trim();
    console.log(searchQuery)
    if(searchQuery.length === 0) return;
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    getImages(`https://api.pexels.com/v1/search?query=${searchQuery}&per_page=15`)
})
//
const links = document.querySelectorAll("li");
links.forEach(link =>{
    link.addEventListener("click",(event)=>{
        const clickEvent = event.target;
        console.log(event);
        const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
        getImages(`https://api.pexels.com/v1/search?query=${clickEvent.id}&per_page=15`);
    }
    )
});
