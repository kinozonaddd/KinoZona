const items = [
 {title:"Peaky Blinders",type:"Serialas",year:"2022",short:"PEAKY BLINDERS",popular:true,series:true,image:"peaky-2.jpg",featured:true},
 {title:"Peaky Blinders",type:"6 sezonas",year:"2 serija",short:"PEAKY BLINDERS",popular:false,series:true,image:"peaky-4.jpg",season:6,episode:2,featured:true},
 {title:"Peaky Blinders",type:"6 sezonas",year:"1 serija",short:"PEAKY BLINDERS",popular:false,series:true,image:"peaky-5.jpg",season:6,episode:1,featured:true},
 {title:"Peaky Blinders",type:"4 sezonas",year:"1 serija",short:"PEAKY BLINDERS",popular:true,series:true,image:"peaky-6.jpg",season:4,episode:1,featured:true},
 {title:"Peaky Blinders",type:"2 sezonas",year:"3 serija",short:"PEAKY BLINDERS",popular:true,series:true,image:"peaky-7.jpg",season:2,episode:3,featured:true}
];
const episodeDescriptions = [
 "Tomis Šelbis per klaidą pavagia vyriausybės ginklų siuntą, o į Birmingemą juos surasti atvyksta inspektorius Kempbelas.",
 "Tomis pradeda karą su vietiniais čigonais (Li šeima) ir atsisako atiduoti pavogtus ginklus Kempbelui.",
 "Greisė padeda Tomiui paslėpti ginklus nuo policijos kratos, o Fredis su Ada slapta susituokia.",
 "Bilis Kimberis pasisamdo „Peaky Blinders“ apsaugai, o Tomis išduoda savo sesers vyrą Fredį policijai, kad apsaugotų šeimos verslą.",
 "Greisė sužino, kur paslėpti pavogti ginklai, ir išduoda jų vietą Kempbelui, tačiau kartu įsimyli Tomį.",
 "Tomis įveikia Kimberį ir perima jo lažybų imperiją. Fredis išlaisvinamas, bet įvyksta labai komplikuoti reikalai."
];
const VIDEO_URLS = {
 "1": "https://www.youtube.com/embed/bA__fScME3A?rel=0",
 "2": "https://www.youtube.com/embed/cse5nQH9eok?rel=0",
 "3": "https://www.youtube.com/embed/Vh29BrG7RPA?rel=0",
 "4": "https://www.youtube.com/embed/qkfHwqH5pOc?rel=0",
 "5": "https://www.youtube.com/embed/ga3boRKxTeI?rel=0",
 "6": "https://www.youtube.com/embed/GSaLGE6g7cI?rel=0"
};
const $ = id => document.getElementById(id);
let currentView="home", currentItem=items[0];
function card(item){
 const el=document.createElement("article");el.className="poster-card";el.tabIndex=0;
 const img=item.image?`<img class="poster-image" src="${item.image}" alt="${item.title} viršelis">`:`<div class="poster-art"><b>${item.short}</b></div>`;
 el.innerHTML=`${img}<h3>${item.title}</h3><p>${item.type} &nbsp;•&nbsp; ${item.year}</p>`;
 el.addEventListener("click",()=>item.episode?openPlayer(item,item.season,item.episode):openDetail(item));
 el.addEventListener("keydown",e=>{if(e.key==="Enter")el.click()});return el;
}
function renderCards(id,list){const t=$(id);t.innerHTML="";list.forEach(i=>t.append(card(i)))}
renderCards("newestRow",items.slice(1,3));renderCards("popularRow",[items[3],items[4]]);
function setActiveNav(view){document.querySelectorAll(".nav-link").forEach(a=>a.classList.toggle("active",a.dataset.openView===view||(view==="home"&&a.getAttribute("href")==="#pagrindinis")))}
function hideAll(){["homeView","catalogView","detailView","playerView"].forEach(id=>$(id).classList.add("hidden"));document.querySelector(".hero").classList.toggle("hidden",currentView!=="home");document.querySelector(".category-tiles").classList.toggle("hidden",currentView!=="home")}
function openHome(){currentView="home";hideAll();$("homeView").classList.remove("hidden");$("pagrindinis").scrollIntoView();setActiveNav("home")}
function openCatalog(view="all",query=""){
 currentView="catalog";hideAll();$("catalogView").classList.remove("hidden");
 let list=view==="movies"?[]:items.filter(i=>i.title.toLowerCase().includes(query.toLowerCase()));
 $("catalogTitle").textContent=view==="movies"?"Filmai":view==="series"?"Serialai":"Paieškos rezultatai";
 const grid=$("catalogGrid");grid.innerHTML="";
 if(view==="movies")grid.innerHTML='<p class="empty-movies">Šiuo momentu filmų dar nėra.</p>';
 else list.slice(0,view==="series"?1:8).forEach(i=>grid.append(card(i)));
 if(!list.length&&view!=="movies")grid.innerHTML='<p>Nieko nerasta. Pabandyk kitą pavadinimą.</p>';
 setActiveNav(view);$("catalogView").scrollIntoView({behavior:"smooth",block:"start"});
}
function openDetail(item){
 currentItem=items[0];currentView="detail";hideAll();$("detailView").classList.remove("hidden");
 $("detailTitle").textContent="Peaky Blinders";
 $("detailDescription").textContent="Peaky Blinders – tai kultinė britų kriminalinė drama, pasakojanti apie Šelbių šeimos ir jų vadovaujamos gaujos iškilimą nuo gatvės nusikaltėlių iki pasaulinio lygio politinių ir verslo magnatų.";
 $("backCatalog").textContent="← Grįžti į serialus";$("seasonSelect").value="1";renderEpisodes();$("detailView").scrollIntoView({behavior:"smooth"});
}
function renderEpisodes(){
 const list=$("episodesList");list.innerHTML="";
 episodeDescriptions.forEach((desc,index)=>{const n=index+1,ep=document.createElement("article");ep.className="episode";ep.tabIndex=0;
 ep.innerHTML=`<div class="episode-number">${n}</div><div class="episode-thumb">▶</div><div><h3>1 sezonas · ${n} serija</h3><p>${desc}</p></div><time>Serija ${n}</time>`;
 ep.addEventListener("click",()=>openPlayer(currentItem,1,n));ep.addEventListener("keydown",e=>{if(e.key==="Enter")ep.click()});list.append(ep)});
}
function openPlayer(item,season=1,episode=1){
 currentItem=item;currentView="player";hideAll();$("playerView").classList.remove("hidden");
 $("playerTitle").textContent=`Peaky Blinders — ${season} sezonas, ${episode} serija`;
 const note=$("playerDescription");if(note)note.textContent=season===1?episodeDescriptions[episode-1]||"":"";
 const container=$("videoContainer");container.innerHTML="";
 const url=VIDEO_URLS[String(episode)]||"";
 if(url){const iframe=document.createElement("iframe");iframe.src=url;iframe.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";iframe.allowFullscreen=true;iframe.referrerPolicy="strict-origin-when-cross-origin";container.append(iframe)}
 $("playerView").scrollIntoView({behavior:"smooth"});
}
document.querySelectorAll("[data-open-view]").forEach(el=>el.addEventListener("click",e=>{e.preventDefault();openCatalog(el.dataset.openView)}));
$("backHome").addEventListener("click",openHome);$("backCatalog").addEventListener("click",()=>openCatalog("series"));
$("backEpisodes").addEventListener("click",()=>openDetail(currentItem));$("seasonSelect").addEventListener("change",renderEpisodes);
$("heroWatch").addEventListener("click",()=>openPlayer(items[1],6,2));
$("searchForm").addEventListener("submit",e=>{e.preventDefault();openCatalog("all",$("searchInput").value.trim())});
