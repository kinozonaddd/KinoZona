const items = [
 {title:"Peaky Blinders",type:"Serialas",year:"2022",c1:"#243b3b",c2:"#b38a4b",short:"PEAKY BLINDERS",popular:true,series:true},
 {title:"The Last of Us",type:"Serialas",year:"2023",c1:"#213b36",c2:"#687e5b",short:"THE LAST OF US",popular:false,series:true},
 {title:"Dune: Part Two",type:"Filmas",year:"2024",c1:"#9b4b1b",c2:"#e2a04c",short:"DUNE: PART TWO",popular:false},
 {title:"The Batman",type:"Filmas",year:"2022",c1:"#551b1b",c2:"#d22d2d",short:"THE BATMAN",popular:false},
 {title:"Wednesday",type:"Serialas",year:"2022",c1:"#111c45",c2:"#4565b3",short:"WEDNESDAY",popular:false,series:true},
 {title:"Oppenheimer",type:"Filmas",year:"2023",c1:"#8a3915",c2:"#ff9a28",short:"OPPENHEIMER",popular:false},
 {title:"Money Heist",type:"Serialas",year:"2017",c1:"#4d1010",c2:"#c22b24",short:"MONEY HEIST",popular:false,series:true},
 {title:"Inception",type:"Filmas",year:"2010",c1:"#123c4b",c2:"#2a9ab2",short:"INCEPTION",popular:false},
 {title:"The Witcher",type:"Serialas",year:"2019",c1:"#24343a",c2:"#b8c4c7",short:"THE WITCHER",popular:false,series:true},
 {title:"Breaking Bad",type:"Serialas",year:"2008",c1:"#253e1b",c2:"#86ad44",short:"Breaking Bad",popular:true,series:true},
 {title:"Game of Thrones",type:"Serialas",year:"2011",c1:"#242424",c2:"#88734b",short:"GAME OF THRONES",popular:true,series:true},
 {title:"Stranger Things",type:"Serialas",year:"2016",c1:"#651313",c2:"#ed2525",short:"STRANGER THINGS",popular:true,series:true},
 {title:"Interstellar",type:"Filmas",year:"2014",c1:"#224653",c2:"#7eb9d4",short:"INTERSTELLAR",popular:true},
 {title:"Fight Club",type:"Filmas",year:"1999",c1:"#64351a",c2:"#f0b14b",short:"FIGHT CLUB",popular:true},
 {title:"The Dark Knight",type:"Filmas",year:"2008",c1:"#10252c",c2:"#1881a4",short:"THE DARK KNIGHT",popular:true},
 {title:"Pulp Fiction",type:"Filmas",year:"1994",c1:"#6d2510",c2:"#d9a441",short:"PULP FICTION",popular:true},
 {title:"Goodfellas",type:"Filmas",year:"1990",c1:"#25211b",c2:"#a58b6a",short:"GOODFELLAS",popular:true}
];
const $ = id => document.getElementById(id);
let currentView = "home", currentItem = null;
function card(item) {
 const el=document.createElement("article"); el.className="poster-card"; el.tabIndex=0;
 el.innerHTML=`<div class="poster-art" style="--c1:${item.c1};--c2:${item.c2}"><b>${item.short}</b></div><h3>${item.title}</h3><p>${item.type} &nbsp;•&nbsp; ${item.year}</p>`;
 el.addEventListener("click",()=>item.series?openDetail(item):openPlayer(item));
 el.addEventListener("keydown",e=>{if(e.key==="Enter")el.click()});
 return el;
}
function renderCards(targetId,list){const target=$(targetId);target.innerHTML="";list.forEach(item=>target.append(card(item)))}
renderCards("newestRow",items.slice(0,8));
renderCards("popularRow",items.filter(i=>i.popular).concat(items.filter(i=>!i.popular)).slice(0,8));
function setActiveNav(view){document.querySelectorAll(".nav-link").forEach(a=>a.classList.toggle("active",a.dataset.openView===view || (view==="home"&&a.getAttribute("href")==="#pagrindinis")))}
function hideAll(){["homeView","catalogView","detailView","playerView"].forEach(id=>$(id).classList.add("hidden"))}
function openHome(){currentView="home";hideAll();$("homeView").classList.remove("hidden");$("pagrindinis").scrollIntoView();setActiveNav("home")}
function openCatalog(view="all",query=""){
 currentView="catalog";hideAll();$("catalogView").classList.remove("hidden");
 const list=items.filter(i=>(view==="all"||(view==="movies"?i.type==="Filmas":i.type==="Serialas"))&&i.title.toLowerCase().includes(query.toLowerCase()));
 $("catalogTitle").textContent=view==="movies"?"Filmai":view==="series"?"Serialai":"Paieškos rezultatai";
 $("catalogGrid").innerHTML="";list.forEach(item=>$("catalogGrid").append(card(item)));
 if(!list.length)$("catalogGrid").innerHTML='<p>Nieko nerasta. Pabandyk kitą pavadinimą.</p>';
 setActiveNav(view);$("catalogView").scrollIntoView({behavior:"smooth",block:"start"});
}
function openDetail(item){
 currentItem=item;currentView="detail";hideAll();$("detailView").classList.remove("hidden");
 $("detailTitle").textContent=item.title;$("detailDescription").textContent="Galinga gauja, šeimos lojalumas, įtampa ir pavojingi priešai.";
 $("backCatalog").textContent="← Grįžti į serialus";renderEpisodes();$("detailView").scrollIntoView({behavior:"smooth"});
}
function renderEpisodes(){
 const season=Number($("seasonSelect").value);const list=$("episodesList");list.innerHTML="";
 for(let n=1;n<=6;n++){const ep=document.createElement("article");ep.className="episode";ep.tabIndex=0;
 ep.innerHTML=`<div class="episode-number">${n}</div><div class="episode-thumb">▶</div><div><h3>${season} sezonas · ${n} serija</h3><p>Pasirink šią seriją ir paleisk įrašą. Prie serijos vėliau galėsi pridėti savo vaizdo nuorodą.</p></div><time>45 min.</time>`;
 ep.addEventListener("click",()=>openPlayer(currentItem,season,n));ep.addEventListener("keydown",e=>{if(e.key==="Enter")ep.click()});list.append(ep)}
}
function openPlayer(item,season=1,episode=1){
 currentItem=item;currentView="player";hideAll();$("playerView").classList.remove("hidden");
 $("playerTitle").textContent=`${item.title} — ${season} sezonas, ${episode} serija`;
 // Add a permitted video URL to VIDEO_URLS in this file to embed it.
 const url=VIDEO_URLS[item.title] || "";
 const container=$("videoContainer");container.innerHTML="";
 if(url && url.includes("youtube.com/embed/")){const iframe=document.createElement("iframe");iframe.src=url;iframe.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";iframe.allowFullscreen=true;container.append(iframe)}
 else if(url){const video=document.createElement("video");video.controls=true;video.autoplay=false;video.src=url;container.append(video)}
 else {container.innerHTML="<p>Vaizdo nuoroda dar nepridėta.<br>Įrašyk ją į VIDEO_URLS faile script.js.</p>"}
 $("playerView").scrollIntoView({behavior:"smooth"});
}
const VIDEO_URLS = {
 // YouTube: naudok įterpimo URL, pvz. "Peaky Blinders": "https://www.youtube.com/embed/VIDEO_ID"
 // Tiesioginis MP4: "Mano filmas": "https://tavo-domenas.lt/video.mp4"
};
document.querySelectorAll("[data-open-view]").forEach(el=>el.addEventListener("click",e=>{e.preventDefault();const v=el.dataset.openView;if(v==="all")openCatalog("all");else openCatalog(v)}));
$("backHome").addEventListener("click",openHome);
$("backCatalog").addEventListener("click",()=>openCatalog("series"));
$("backEpisodes").addEventListener("click",()=>openDetail(currentItem||items[0]));
$("seasonSelect").addEventListener("change",renderEpisodes);
$("heroWatch").addEventListener("click",()=>openDetail(items[0]));
$("searchForm").addEventListener("submit",e=>{e.preventDefault();openCatalog("all",$("searchInput").value.trim())});
