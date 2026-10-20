const $ = id => document.getElementById(id);
const descriptions = {
  1: "Tomis Šelbis per klaidą pavagia vyriausybės ginklų siuntą, o į Birmingemą juos surasti atvyksta inspektorius Kempbelas.",
  2: "Tomis pradeda karą su vietiniais čigonais (Li šeima) ir atsisako atiduoti pavogtus ginklus Kempbelui.",
  3: "Greisė padeda Tomiui paslėpti ginklus nuo policijos kratos, o Fredis su Ada slapta susituokia.",
  4: "Bilis Kimberis pasisamdo „Peaky Blinders“ apsaugai, o Tomis išduoda savo sesers vyrą Fredį policijai, kad apsaugotų šeimos verslą.",
  5: "Greisė sužino, kur paslėpti pavogti ginklai, ir išduoda jų vietą Kempbelui, tačiau kartu įsimyli Tomį.",
  6: "Tomis susidoroja su Bilio Kimberio grėsme ir siekia perimti jo lažybų imperiją. Fredis išlaisvinamas, tačiau šeimos laukia nauji sudėtingi išbandymai."
};
const videoUrls = {
  1: "https://www.youtube.com/embed/bA__fScME3A?rel=0",
  2: "https://www.youtube.com/embed/cse5nQH9eok?rel=0",
  3: "https://www.youtube.com/embed/Vh29BrG7RPA?rel=0",
  4: "https://www.youtube.com/embed/qkfHwqH5pOc?rel=0",
  5: "https://www.youtube.com/embed/ga3boRKxTeI?rel=0",
  6: "https://www.youtube.com/embed/GSaLGE6g7cI?rel=0"
};
const imageForEpisode = n => `images/peaky-${n === 1 ? 4 : n === 2 ? 3 : n === 3 ? 6 : n === 4 ? 5 : n === 5 ? 7 : 2}.jpg`;
let currentSeason = 1;
let currentEpisode = 1;
let currentView = "home";

function showView(view) {
  currentView = view;
  ["homeView", "catalogView", "detailView", "playerView"].forEach(id => $(id).classList.add("hidden"));
  const target = ({home:"homeView", movies:"catalogView", series:"catalogView", detail:"detailView", player:"playerView"})[view] || "homeView";
  $(target).classList.remove("hidden");
  document.querySelectorAll(".nav-link").forEach(btn => btn.classList.toggle("active", btn.dataset.view === view || (view === "detail" && btn.dataset.view === "series")));
  window.scrollTo({top:0, behavior:"smooth"});
}
function episodeCard({title, season, episode, image, badge, description}) {
  const card = document.createElement("article");
  card.className = "media-card";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Žiūrėti ${title}`);
  card.innerHTML = `<div class="card-image-wrap"><img class="card-image" src="${image}" alt="${title}" loading="lazy"><span class="card-badge">${badge}</span></div><div class="card-copy"><h3>${title}</h3><p>${description}</p><div class="card-foot"><span class="card-meta">Peaky Blinders · ${season} sezonas · ${episode} serija</span><button class="card-play" type="button">▶ ŽIŪRĖTI</button></div></div>`;
  const open = () => openPlayer(season, episode);
  card.addEventListener("click", open);
  card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  card.querySelector("button").addEventListener("click", e => { e.stopPropagation(); open(); });
  return card;
}
function renderHomeCards() {
  const latest = [
    {title:"Peaky Blinders", season:6, episode:2, image:"images/peaky-3.jpg", badge:"NAUJAUSIA", description:"6 sezonas · 2 serija. Tęsk Šelbių šeimos istoriją."},
    {title:"Peaky Blinders", season:6, episode:1, image:"images/peaky-4.jpg", badge:"6 SEZONAS", description:"6 sezonas · 1 serija. Paskutinio sezono pradžia."}
  ];
  const popular = [
    {title:"Peaky Blinders", season:4, episode:1, image:"images/peaky-6.jpg", badge:"POPULIARUS", description:"4 sezonas · 1 serija."},
    {title:"Peaky Blinders", season:2, episode:3, image:"images/peaky-5.jpg", badge:"ŽIŪROVŲ PASIRINKIMAS", description:"2 sezonas · 3 serija."}
  ];
  for (const [id, list] of [["latestCards", latest], ["popularCards", popular]]) {
    const target = $(id); target.replaceChildren(); list.forEach(item => target.append(episodeCard(item)));
  }
}
function openCatalog(type, query = "") {
  showView(type === "movies" ? "movies" : "series");
  const title = $("catalogTitle");
  const content = $("catalogContent");
  content.replaceChildren();
  if (type === "movies") {
    title.textContent = "Filmai";
    content.innerHTML = '<div class="empty-state"><h3>Šiuo momentu filmų dar nėra.</h3><p>Filmai bus pridėti vėliau.</p></div>';
    return;
  }
  title.textContent = query ? "Paieškos rezultatai" : "Serialai";
  if (query && !"peaky blinders".includes(query.toLowerCase())) {
    content.innerHTML = '<div class="empty-state"><h3>Nieko nerasta</h3><p>Pabandyk kitą paieškos žodį.</p></div>';
    return;
  }
  const card = document.createElement("article");
  card.className = "media-card single-series"; card.tabIndex = 0; card.setAttribute("role", "button");
  card.innerHTML = '<div class="card-image-wrap"><img class="card-image" src="images/peaky-1.jpg" alt="Peaky Blinders serialo viršelis" loading="lazy"><span class="card-badge">SERIALAS</span></div><div class="card-copy"><h3>Peaky Blinders</h3><p>Kultinė britų kriminalinė drama apie Šelbių šeimą.</p><div class="card-foot"><span class="card-meta">6 sezonai</span><button class="card-play" type="button">ATIDARYTI SERIALĄ</button></div></div>';
  const open = () => openDetail(6);
  card.addEventListener("click", open); card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  card.querySelector("button").addEventListener("click", e => { e.stopPropagation(); open(); });
  content.append(card);
}
function openDetail(season = currentSeason) {
  currentSeason = Number(season) || 1;
  $("seasonSelect").value = String(currentSeason);
  showView("detail");
  renderEpisodes();
}
function renderEpisodes() {
  const target = $("episodesList"); target.replaceChildren();
  for (let n = 1; n <= 6; n++) {
    const row = document.createElement("article"); row.className = "episode"; row.tabIndex = 0; row.setAttribute("role", "button");
    const description = currentSeason === 1 ? descriptions[n] : `${currentSeason} sezono ${n} serija. Serijos aprašymas bus papildytas.`;
    row.innerHTML = `<span class="episode-number">${String(n).padStart(2,"0")}</span><img class="episode-image" src="${imageForEpisode(n)}" alt="${currentSeason} sezono ${n} serija" loading="lazy"><div class="episode-copy"><h4>${currentSeason} sezonas · ${n} serija</h4><p>${description}</p></div><span class="episode-action" aria-hidden="true">▶</span>`;
    const open = () => openPlayer(currentSeason, n);
    row.addEventListener("click", open); row.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") {e.preventDefault();open();} });
    target.append(row);
  }
}
function openPlayer(season, episode) {
  currentSeason = Number(season); currentEpisode = Number(episode);
  showView("player");
  $("playerTitle").textContent = `Peaky Blinders — ${currentSeason} sezonas, ${currentEpisode} serija`;
  $("currentEpisodeDescription").textContent = currentSeason === 1 ? descriptions[currentEpisode] : `${currentSeason} sezono ${currentEpisode} serija.`;
  const container = $("videoContainer"); container.replaceChildren();
  const url = currentSeason === 1 ? videoUrls[currentEpisode] : "";
  if (url) {
    const frame = document.createElement("iframe"); frame.src = url; frame.title = `Peaky Blinders ${currentEpisode} serija`; frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"; frame.allowFullscreen = true; frame.referrerPolicy = "strict-origin-when-cross-origin"; container.append(frame);
  } else {
    container.innerHTML = '<p>Šiai serijai dar nepridėta vaizdo nuoroda. Galima pridėti nuorodą į teisėtai įterpiamą vaizdo įrašą.</p>';
  }
}
document.querySelectorAll(".nav-link").forEach(btn => btn.addEventListener("click", () => btn.dataset.view === "home" ? showView("home") : openCatalog(btn.dataset.view)));
$("watchLatest").addEventListener("click", () => openPlayer(6, 2));
$("moreInfo").addEventListener("click", () => openDetail(6));
$("catalogBack").addEventListener("click", () => showView("home"));
$("detailBack").addEventListener("click", () => openCatalog("series"));
$("playerBack").addEventListener("click", () => openDetail(currentSeason));
$("seasonSelect").addEventListener("change", e => { currentSeason = Number(e.target.value); renderEpisodes(); });
$("searchForm").addEventListener("submit", e => { e.preventDefault(); const query = $("searchInput").value.trim(); if (!query) { openCatalog("series"); return; } openCatalog("series", query); });
$("toTop").addEventListener("click", e => { e.preventDefault(); showView("home"); });
renderHomeCards();
