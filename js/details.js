/* ================= FAQ ================= */

function toggleFAQ() {
  const box = document.getElementById("faqBox");
  box.style.display = box.style.display === "block" ? "none" : "block";
}

function toggleAnswer(button) {
  const answer = button.nextElementSibling;
  answer.style.display =
    answer.style.display === "block" ? "none" : "block";
}



/* ================= ITINERARY ================= */

const days = document.querySelectorAll(".day");

days.forEach(day => {
  day.addEventListener("click", () => {

    // نشيل active من الكل
    days.forEach(d => d.classList.remove("active"));

    // نضيف active للي اتضغط عليه
    day.classList.add("active");
  });
});



/* ================= TOTAL CALCULATION ================= */

const adultInput = document.querySelectorAll(".ticket-row input")[0];
const youthInput = document.querySelectorAll(".ticket-row input")[1];
const childInput = document.querySelectorAll(".ticket-row input")[2];

const checkboxes = document.querySelectorAll(".booking-box-new input[type='checkbox']");
const totalText = document.querySelector(".total");

function calculateTotal() {

  let adultPrice = 282;
  let youthPrice = 168;
  let childPrice = 80;

  let total =
    adultInput.value * adultPrice +
    youthInput.value * youthPrice +
    childInput.value * childPrice;

  // Extras
  if (checkboxes[0].checked) {
    total += 40; // per booking
  }

  if (checkboxes[1].checked) {
    let totalPeople =
      Number(adultInput.value) +
      Number(youthInput.value) +
      Number(childInput.value);

    total += totalPeople * 40; // per person
  }

  totalText.innerText = "Total: $" + total;
}

// لما القيم تتغير
adultInput.addEventListener("input", calculateTotal);
youthInput.addEventListener("input", calculateTotal);
childInput.addEventListener("input", calculateTotal);

checkboxes.forEach(cb => {
  cb.addEventListener("change", calculateTotal);
});

// احسب أول ما الصفحة تفتح
calculateTotal();



/* ================= SEE ALL PHOTOS ================= */

const seeAllBtn = document.querySelector(".see-all button");

if (seeAllBtn) {
  seeAllBtn.addEventListener("click", () => {
    alert("Here you can open full gallery (popup coming soon 😎)");
  });
}



/* ================= SMOOTH SCROLL (optional bonus) ================= */

document.querySelectorAll("a").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    }
  });
});

/*event  */

/**BOOKING MODAL + CONFIRMATION */
// BOOK NOW BUTTON
const bookBtn = document.querySelector(".booking-box-new button");

bookBtn.addEventListener("click", function () {

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const title = document.querySelector(".title").innerText;
  const image = document.querySelector(".main-img").src;
  const location = document.querySelector(".info-row span:last-child").innerText;

  const date = document.querySelector("input[type='date']").value;

  const adult = Number(document.querySelectorAll(".ticket-row input")[0].value);
  const youth = Number(document.querySelectorAll(".ticket-row input")[1].value);
  const child = Number(document.querySelectorAll(".ticket-row input")[2].value);

  const people = adult + youth + child;

  const total = document.querySelector(".total").innerText.replace("Total: $", "");

  const booking = {
    id,
    title,
    image,
    location,
    date,
    people,
    total
  };

 let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
if(!loggedUser) {
  alert("Please log in first!");
  return;
}

let cartKey = `cart_${loggedUser.username}`;
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
cart.push(booking);
localStorage.setItem(cartKey, JSON.stringify(cart));

  alert("Added to cart successfully ✅");

  window.location.href = "card.html";

});

/*2 SCROLL ANIMATION */
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  sections.forEach(sec => {
    const position = sec.getBoundingClientRect().top;
    const screen = window.innerHeight;

    if (position < screen - 100) {
      sec.style.opacity = "1";
      sec.style.transform = "translateY(0)";
    }
  });
});
/*3 COUNTDOWN TIMER*/
let time = 7200; // ساعتين

const countdown = document.getElementById("countdown");

setInterval(() => {

  var hours = Math.floor(time / 3600);
  var  minutes = Math.floor((time % 3600) / 60);
  var seconds = time % 60;

  countdown.innerText =
    "🔥Offer ends in " + hours + ":" + minutes + ":" + seconds;

  if (time > 0) time--;

}, 1000);
/*4 DARK MODE*/
/* ===== DARK MODE ===== */
const darkBtn = document.getElementById("darkModeBtn");
darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
/*5*/
/* ===== IMAGE GALLERY WITH KEYBOARD NAVIGATION ===== */

let modal = document.getElementById("imageModal");
let modalImg = document.getElementById("modalImg");
let closeBtn = document.querySelector(".close-modal");

let images = document.querySelectorAll(".gallery-new img");
let currentIndex = 0;

// لما اضغط على صورة
images.forEach((img, index) => {
  img.addEventListener("click", function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    currentIndex = index;
  });
});

// تنقل بالكيبورد
document.addEventListener("keydown", function (e) {

  if (modal.style.display === "block") {

    // سهم اليمين
    if (e.key === "ArrowRight") {
      currentIndex++;
      if (currentIndex >= images.length) {
        currentIndex = 0;
      }
      modalImg.src = images[currentIndex].src;
    }

    // سهم الشمال
    if (e.key === "ArrowLeft") {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = images.length - 1;
      }
      modalImg.src = images[currentIndex].src;
    }

    // ESC يقفل
    if (e.key === "Escape") {
      modal.style.display = "none";
    }

  }
});

// قفل بزرار X
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// قفل لما اضغط بره الصورة
modal.onclick = function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};


////////////////////////////////////////////////////////////////////////////////////////////
/** */



const params = new URLSearchParams(window.location.search);

const id = params.get("id");

fetch("json/tours.json")

.then(res => res.json())

.then(data => {

const tour = data.find(t => t.id == id);

displayTour(tour);

});



function displayTour(tour){

document.querySelector(".title").innerHTML = tour.title;

document.querySelector(".info-row").innerHTML = `

<span>⭐ ${tour.rating} (${tour.reviews})</span>

<span>${tour.location}</span>

`;

document.querySelector(".booking-box-new h3 span").innerHTML = `$${tour.price}`;

document.querySelector(".main-img").src = tour.image;

document.querySelector(".left-content-new p").innerHTML = tour.description;

}


