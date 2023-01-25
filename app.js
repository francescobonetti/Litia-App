let dailyUsageSlides = Array.from(document.querySelectorAll(".daily-usage-slide"))
let days = Array.from(document.querySelectorAll(".days-container p"))
let dailySlidesContainer = document.querySelector(".daily-usage-slide-container")

let weeklyUsageSlides = Array.from(document.querySelectorAll(".weekly-usage-slide"))
let weeks = Array.from(document.querySelectorAll(".weeks-container p"))
let weeklySlidesContainer = document.querySelector(".weekly-usage-slide-container")

let usageToggle = Array.from(document.querySelectorAll(".toggle-container h5"));
let usageContainer =  Array.from(document.querySelectorAll(".usage"));

let arrowRight = document.querySelector(".arrow-right")
let arrowLeft = document.querySelector(".arrow-left")

let contentCounter = document.querySelector(".total-content h1")
let totalContent = 0;
let randomInterval = 0;

let dailySlideWidth;
let weeklySlideWidth;
let stepsWidth;

let windowWidth = window.innerWidth

let home = document.querySelector(".home")
let profile = document.querySelector(".profile")
let homeBtn = document.querySelector(".home-btn")
let profileBtn = document.querySelector(".profile-btn")

function openHome() {home.classList.add("active"); homeBtn.classList.add("active"); profile.classList.remove("active"); profileBtn.classList.remove("active");}
function openProfile() {profile.classList.add("active"); profileBtn.classList.add("active"); home.classList.remove("active"); homeBtn.classList.remove("active");}


let holdSpecta = document.querySelector("#hold-specta")
let tl = gsap.timeline({defaults : {duration: 1, ease: Power2.easeInOut}})
let slide3 = false;

function setup() {

  
    dailySlideWidth = dailyUsageSlides[0].getBoundingClientRect().width
    weeklySlideWidth = weeklyUsageSlides[0].getBoundingClientRect().width

    dailySlidesContainer.scrollTo({left: (dailyUsageSlides.length - 1) * dailySlideWidth})
    weeklySlidesContainer.scrollTo({left: (weeklyUsageSlides.length - 1) * weeklySlideWidth})

}

let spectaOn= true; 

function contentIncrease() {
    
    if(spectaOn == false) {return}

    var min = 1,
        max = 5;

    var rand = Math.floor(Math.random() * (max - min + 1) + min); 
    
    totalContent ++
    
    setTimeout(contentIncrease, rand * 1000);
}

contentIncrease()

function keyPressed () {if(spectaOn == true){spectaOn = false;} else {spectaOn = true; contentIncrease()}}


function draw() {

    contentCounter.innerHTML = totalContent

    for(let i = 0; i < dailyUsageSlides.length ; i++) {

        let slideX = dailyUsageSlides[i].getBoundingClientRect().x
  
        if(slideX >= 0 && slideX < windowWidth/2) {
            days[i].classList.add("active")
        } else {days[i].classList.remove("active")}

    }

    for(let i = 0; i < weeklyUsageSlides.length ; i++) {

        let slideX = weeklyUsageSlides[i].getBoundingClientRect().x
  
        if(slideX >= 0 && slideX < windowWidth/2) {
            weeklyUsageSlides[i].classList.add("active")
        } else {weeklyUsageSlides[i].classList.remove("active")}

    }

    let weekIndex = weeklyUsageSlides.indexOf(document.querySelector(".weekly-usage-slide.active"))
    
    for(let i = 0; i < weeks.length ; i++) { 
        if (i == weekIndex) { weeks[i].style.opacity = 1}
        else [weeks[i].style.opacity = 0]
    }

    if (weekIndex == 0) {arrowLeft.style.opacity = 0.3} else {arrowLeft.style.opacity = 1}
    if (weekIndex == weeklyUsageSlides.length - 1) {arrowRight.style.opacity = 0.3} else {arrowRight.style.opacity = 1}


    for(let i = 0; i < connectionSteps.length ; i++) {

        let stepX = connectionSteps[i].getBoundingClientRect().x
  
        if(stepX >= 0 && stepX < windowWidth/2) {
            connectionSteps[i].classList.add("active")
        } else {connectionSteps[i].classList.remove("active")}

    }

    let stepsIndex = connectionSteps.indexOf(document.querySelector(".connection-step.active"))

    if (stepsIndex == 0) {closeOverlay.style.display = "block"; backBtn.style.display = "none"}
    else { closeOverlay.style.display = "none"; backBtn.style.display = "block"}
    if (stepsIndex == (connectionSteps.length - 1)) {nextBtn.style.display = "none";} else {nextBtn.style.display = "block";}


}

days.forEach(function(day){
    let i = days.indexOf(day) 
    day.addEventListener("click", function(){
    dailySlidesContainer.scrollTo({
            left: i * dailySlideWidth,
            behavior: "smooth"
        });
    })
})

arrowLeft.addEventListener("click", function() {
    let i = weeklyUsageSlides.indexOf(document.querySelector(".weekly-usage-slide.active"))
    i--

    weeklySlidesContainer.scrollTo({
        left: i * weeklySlideWidth,
        behavior: "smooth"
    });
})

arrowRight.addEventListener("click", function() {
    let i = weeklyUsageSlides.indexOf(document.querySelector(".weekly-usage-slide.active"))
    i++
    weeklySlidesContainer.scrollTo({
        left: i * weeklySlideWidth,
        behavior: "smooth"
    });
}) 

usageToggle.forEach(function(toggle){
    toggle.addEventListener("click", function(){
        let i = usageToggle.indexOf(toggle);
        
        if(i == 0) {usageContainer[0].classList.add("active"); usageContainer[1].classList.remove("active"); usageToggle[0].classList.add("active"); usageToggle[1].classList.remove("active"); }
        else {usageContainer[1].classList.add("active"); usageContainer[0].classList.remove("active"); usageToggle[1].classList.add("active"); usageToggle[0].classList.remove("active");}

        weeklySlideWidth = weeklyUsageSlides[0].getBoundingClientRect().width
        weeklySlidesContainer.scrollTo({left: (weeklyUsageSlides.length - 1) * weeklySlideWidth})
    })
})



// CONNECTION OVERLAY NAVIGATION BUTTONS

let newConnection = document.querySelector(".newconnection")
let connectionOverlay = document.querySelector(".overlay")
let overlayNav = document.querySelector(".steps-navigation")
let closeOverlay = document.querySelector(".close")
let backBtn = document.querySelector(".back")
let nextBtn = document.querySelector(".next")
let connectionSteps = Array.from(document.querySelectorAll(".connection-step"))

newConnection.addEventListener("click", function(){
    connectionOverlay.classList.add("active")
    overlayNav.classList.add("active")
    let plugVideo = document.querySelector(".connection-step.active .step-image-container video")
    setTimeout(function(){plugVideo.play()}, 1000)
    stepsWidth = connectionSteps[0].getBoundingClientRect().width
    connectionOverlay.scrollTo({
        left: 0
    });
})

closeOverlay.addEventListener("click", function(){
    connectionOverlay.classList.remove("active")
    overlayNav.classList.remove("active")

})

nextBtn.addEventListener("click", function() {
    let i = connectionSteps.indexOf(document.querySelector(".connection-step.active"))
    i++
    connectionOverlay.scrollTo({
        left: i * stepsWidth,
        behavior: "smooth"
    });
})

backBtn.addEventListener("click", function() {
    let i = connectionSteps.indexOf(document.querySelector(".connection-step.active"))
    i--
    connectionOverlay.scrollTo({
        left: i * stepsWidth,
        behavior: "smooth"
    });
}) 

let connectWifi = Array.from(document.querySelectorAll(".connection-step .spacebetween .underline.inactive"))
let Wifi = Array.from(document.querySelectorAll(".connection-step .spacebetween"))

connectWifi.forEach(function(connect){
    connect.addEventListener("click", function() {
        let i = connectWifi.indexOf(connect)
        for(let j = 0; j < Wifi.length; j++) {
            if (i == j) {connect.style.opacity = 1; connect.style.textDecoration = "none"; connect.innerHTML = "Connected"}
            else {Wifi[j].style.opacity = 0.3}
        }

        setTimeout(function() {connectionOverlay.scrollTo({
            left: 2 * stepsWidth,
            behavior: "smooth"
        });}, 1000);

        
    })
})








