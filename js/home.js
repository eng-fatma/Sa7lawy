
// +++++++++++++review+++++++++++++++++++
let images = document.querySelectorAll(".review-img");
let text = document.getElementById("review-text");
let name = document.getElementById("review-name");
let job = document.getElementById("review-job");

images.forEach(img => {
  img.addEventListener("click", function () {

    // نشيل الاكتيف من الكل
    images.forEach(i => i.classList.remove("active"));

    // نضيفه للي اتضغط عليها
    this.classList.add("active");

    // نغير البيانات
    text.textContent = this.dataset.text;
    name.textContent = this.dataset.name;
    job.textContent = this.dataset.job;
  });
})
// +++++++++++++++++++++++++++++++

arr=["imges/WhatsApp Image 2026-01-26 at 10.57.07 PM.jpeg","imges/WhatsApp Image 2026-01-26 at 10.57.23 PM (2).jpeg", "imges/WhatsApp Image 2026-01-26 at 10.57.23 PM (1).jpeg", "imges/WhatsApp Image 2026-01-26 at 10.57.24 PM.jpeg", ]
let index = 0;


// show image
function showImage() {
  document.getElementById("x").src = arr[index];
}
  function next() {
    
  if (index < arr.length - 1) {
    index++;
    showImage();
  }
   else if (index === arr.length-1) {
      index = 0;
       showImage();
}
}
function privois() {
  if (index === 0) {
      index = arr.length-1;
}
  if (index> 0) {
    index--;
    showImage();
  }
    }

 