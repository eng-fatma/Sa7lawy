fetch("json/tours.json")

.then(response => response.json())

.then(data => {

let container = document.getElementById("tours-container");

data.forEach(tour => {

container.innerHTML += `

<div class="tour-card">

<img src="${tour.image}">

<div class="tour-info">

${tour.tag ? `<span class="tag">${tour.tag}</span>` : ""}

<h2>${tour.title}</h2>

<p>${tour.description}</p>

<div class="rating">

${"⭐".repeat(tour.rating)} (${tour.reviews} reviews)

</div>

</div>

<div class="tour-price">

<p class="price">

From <span>$${tour.price}</span>

</p>
<button onclick="goDetails(${tour.id})" class="btn-details">
View Details
</button>


</div>

</div>

`;

});

});
function goDetails(id){

window.location.href = `details.html?id=${id}`;

}

