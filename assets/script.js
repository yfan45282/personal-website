const header=document.querySelector(".site-header");
const menuButton=document.querySelector(".menu-button");
const nav=document.querySelector(".nav-links");
const revealItems=document.querySelectorAll(".reveal");

function updateHeader(){header.classList.toggle("scrolled",window.scrollY>24)}
function closeMenu(){
  nav.classList.remove("open");
  menuButton.classList.remove("active");
  menuButton.setAttribute("aria-expanded","false");
  document.body.classList.remove("nav-open");
}
menuButton.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuButton.classList.toggle("active",open);
  menuButton.setAttribute("aria-expanded",String(open));
  document.body.classList.toggle("nav-open",open);
});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",closeMenu));
window.addEventListener("scroll",updateHeader,{passive:true});
updateHeader();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

revealItems.forEach(item=>observer.observe(item));
document.getElementById("year").textContent=new Date().getFullYear();
