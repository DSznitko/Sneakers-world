
// NAVIGATION FUNCTIONS HANDLE

const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const closeMenuBtn = document.querySelector(".nav__close");
const showBrandsBtn = document.querySelector(".nav__link-brands");
const brandsContainer = document.querySelector(".nav__link-sneakers");
const navLinks = document.querySelectorAll(".nav__link");

const activeMenu = () => {
  nav.classList.add("active");
 gsap.to(navLinks,  {x: 0, opacity:1, stagger:.1, duration:.4, ease:"power4.in"})
}


const closeMenu = () => {
  nav.classList.remove("active");
  gsap.to(navLinks,  {x: 400, opacity:0,  duration:.4, ease:"power4.in"})
}

const openLogosList = () => {
  brandsContainer.classList.toggle("active")
}

navLinks.forEach(link => {
  if(link.classList.contains("nav__link-brands")) {
    return
  }
  link.addEventListener("click", closeMenu)
})

showBrandsBtn.addEventListener("click", openLogosList)
burger.addEventListener("click", activeMenu);
closeMenuBtn.addEventListener("click", closeMenu);

//SLIDER FUNCTIONS HANDLE

const slides = document.querySelectorAll(".slider__slide");
const dots = document.querySelectorAll(".slider__dots-dot");
const sliderTitle = document.querySelector(".thin")

let index = 0;
const sliderTexts = ["Prices", "Brands", "Quality"]


const slider = () => {
 
  setInterval(() => {
  
    slides.forEach(slide => {
      slide.classList.remove("active")
    });
  
    dots.forEach(dot => {
      dot.classList.remove("active")
    });
    sliderTitle.textContent = sliderTexts[index]
slides[index].classList.add("active");
dots[index].classList.add("active");
if(index == slides.length -1) {
  index = -1
}
index++;
  }, 5000)
}

slider()

// NEW PRODUCT GALLERY HANDLE

const mainImg = document.querySelector(".gallery__main-photo-img");
const smallImages = document.querySelectorAll(".new-product__small-images-img");

smallImages[0].style.opacity = ".4";

const mainGallery = e => {
  smallImages.forEach(img =>{
    img.style.opacity = "1"
  })
  const clickedPhoto = e.target;
  clickedPhoto.style.opacity = ".4"
  mainImg.src = clickedPhoto.src;

  mainImg.classList.add("current-photo");
  setTimeout(() => {
mainImg.classList.remove("current-photo")
  },200)
}


smallImages.forEach(img => img.addEventListener("click", mainGallery));

gsap.registerPlugin(ScrollTrigger)

gsap.fromTo(".new-product__title", {opacity:0, x:60}, {opacity:1, x:0, duration: .5, ease:"power4.in", scrollTrigger:{
  trigger: ".new-product__title"
}})

gsap.fromTo(".gallery__main-photo-img", {opacity:0, y:200}, {opacity:1, y:0, duration:1, ease:"bounce.out", scrollTrigger:{
  trigger:".gallery__main-photo-img"
}})

gsap.fromTo(".new-product__small-images-img", {opacity:0, y:100, rotate:45}, {opacity:1, y:0, duration:.8,rotate:0, ease:"circ.out", stagger:.2, scrollTrigger:{
  trigger:".new-product__small-images-img"
}})