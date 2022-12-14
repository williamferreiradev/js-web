const header = document.querySelector("header");

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle")

const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number, span");


const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

const links = document.querySelectorAll(".nav-link");


const toggle_btn = document.querySelector(".toggle-btn");


window.addEventListener("scroll", () => {
    activeLink();
    skillsCounter();

});




// NAVBAR STICKY

function stickyNavbar() {
    header.classList.toggle("scrolled", window.pageYOffset > 0);
};


stickyNavbar() 
window.addEventListener("scroll", stickyNavbar);


let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});

sr.reveal(".showcase-info", {delay: 600});
sr.reveal(".showcase-image", {origin: "top", delay: 700});



// ANIMATION SKILLS
function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;
    
    if(window.innerHeight >= topPosition + el.offsetHeight) return true;
    return false;
}




function skillsCounter (){
    if(!hasReached(first_skill)) return;

   
    
    progress_bars.forEach(p => p.style.animation = "progress 2s ease-in-out forwards");
}



let mixer = mixitup('.portfolio-gallery', {
    selectors: {
        target: '.prt-card',
    },
    animation: {
        duration: 500,
    },
}); 





// MODAL

let currentIndex = 0;


zoom_icons.forEach((icn, i) => icn.addEventListener("click", () => {
    prt_section.classList.add("open");
    document.body.classList.add("stopScrolling");
    currentIndex = i;
    changeImage(currentIndex)
}))

modal_overlay.addEventListener("click", () => {
    prt_section.classList.remove("open")
     document.body.classList.remove("stopScrolling")
});

prevBtn.addEventListener("click", () => {
    if(currentIndex === 0){
        currentIndex = 5
    }else{
    currentIndex--;
    }
    changeImage(currentIndex)
});

nextBtn.addEventListener("click", () => {
    if(currentIndex === 5){
        currentIndex = 0;
    }else{
    currentIndex++;
    }
    changeImage(currentIndex)
});

function changeImage(index){
    images.forEach(img => img.classList.remove("show-image"));
    images[index].classList.add("show-image");
};





// TESTEMUNHOS 

const swiper = new Swiper('.swiper', {
    loop: true,
    speed: 500,
    autoplay: true,
  
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  
    
  });

// ACTIVE LINK NAV

function activeLink() {
    let sections = document.querySelectorAll("section[id]");
    let passedSections = Array.from(sections).map((sct, i) =>{
        return {
            y: sct.getBoundingClientRect().top - header.offsetHeight,
            id: i,
        };
    }).filter(sct => sct.y <= 0);

    let currSectionID = passedSections.at(-1).id;

    links.forEach(l => l.classList.remove("active") );
    links[currSectionID].classList.add("active");
}

activeLink();







// DARK MODE

let firstTheme = localStorage.getItem("dark");

changeTheme(+firstTheme);

function changeTheme(isDark){
    if(isDark){
        document.body.classList.add("dark");
        toggle_btn.classList.replace("uil-moon", "uil-sun")
        localStorage.setItem("dark", 1);
    }
    else{
        document.body.classList.remove("dark");
        toggle_btn.classList.replace("uil-sun", "uil-moon")
        localStorage.setItem("dark", 0);
    }
}

toggle_btn.addEventListener("click", () => {
    changeTheme(!document.body.classList.contains("dark"));
})
