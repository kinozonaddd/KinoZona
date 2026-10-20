const seasons = {
  1: {year:"1919", description:"Pirmasis sezono veiksmas, prasidedantis 1919 metais, panardina į paslapčių ir nenuspėjamų posūkių sūkurį, kur tiesa turi savo kainą, o realybės ribos pamažu nyksta.", image:"assets/peaky-1.jpg"},
  2: {year:"1922", description:"Šelbių šeima plečia savo nelegalų lažybų verslą į Londoną, kur įsivelia į karą tarp žydų bei italų mafijos gaujų.", image:"assets/peaky-2.jpg"},
  3: {year:"1924", description:"Tomas įtraukiamas į tarptautinį rusų aristokratų bei britų slaptųjų tarnybų sąmokslą, kuris įtraukia jo šeimą ir priverčia rizikuoti viskuo.", image:"assets/peaky-3.jpg"},
  4: {year:"1925–1926", description:"Šeimos nariai išteisinami paskutinę minutę, tačiau juos pradeda medžioti Niujorko mafija.", image:"assets/peaky-4.jpg"},
  5: {year:"1929–1930", description:"Ekonominė krizė sužlugdo šeimos investicijas Amerikoje, todėl Tomas ieško naujų uždarbio būdų politikoje.", image:"assets/peaky-5.jpg"},
  6: {year:"1934–1936", description:"Tomas išgyvena šeimos narių netektis, kovoja su savo paties ligos diagnoze ir sudaro paskutinius didelius opijaus sandorius su fašistais bei amerikiečiais.", image:"assets/peaky-6.jpg"}
};
// Add official, authorized video URLs here when you have them. Leave blank until then.
const episodeVideoUrls = {};
const homeView = document.querySelector("#homeView");
const seasonView = document.querySelector("#seasonView");
const navItems = [...document.querySelectorAll(".nav-item")];
const dialog = document.querySelector("#episodeDialog");
let currentSeason = 1;

function setActiveNav(season) {
  navItems.forEach(item => item.classList.toggle("active", season ? item.dataset.season === String(season) : item.hasAttribute("data-home")));
}
function showHome() {
  homeView.classList.remove("hidden");
  seasonView.classList.add("hidden");
  setActiveNav(null);
  window.scrollTo({top:0, behavior:"smooth"});
  if (location.hash !== "#pagrindinis") history.replaceState(null, "", "#pagrindinis");
}
function showSeason(number) {
  const n = Number(number);
  const data = seasons[n];
  if (!data) return;
  currentSeason = n;
  homeView.classList.add("hidden");
  seasonView.classList.remove("hidden");
  document.querySelector("#seasonImage").src = data.image;
  document.querySelector("#seasonImage").alt = `Peaky Blinders ${n} sezono viršelis`;
  document.querySelector("#seasonTitle").textContent = `${n} SEZONAS`;
  document.querySelector("#seasonYear").textContent = `BIRMINGEMAS · ${data.year}`;
  document.querySelector("#seasonDescription").textContent = data.description;
  document.querySelector("#seasonIndex").textContent = String(n).padStart(2,"0");
  document.querySelector("#episodesHeading").textContent = `${n} sezono serijos`;
  document.querySelector("#seasonStatus").textContent = n === 5 ? "4–6 serijos pažymėtos naujausiomis" : "Katalogas";
  renderSeasonEpisodes(n);
  setActiveNav(n);
  if (location.hash !== `#sezonas-${n}`) history.replaceState(null, "", `#sezonas-${n}`);
  window.scrollTo({top:0, behavior:"smooth"});
}
function renderSeasonEpisodes(number) {
  const container = document.querySelector("#seasonEpisodes");
  container.replaceChildren();
  const episodes = number === 5 ? [1,2,3,4,5,6] : [1,2,3,4,5,6];
  episodes.forEach(ep => {
    const hasVideo = Boolean(episodeVideoUrls[`${number}-${ep}`]);
    const row = document.createElement("button");
    row.className = "season-episode";
    row.type = "button";
    row.innerHTML = `<span class="episode-number">${String(ep).padStart(2,"0")}</span><span class="episode-text"><strong>${ep} serija</strong><small>${number === 5 && ep >= 4 ? ["Šelbių šeimos istorija tęsiasi","Nauji sprendimai ir pavojai","Sezono finalas"][ep-4] : "Serijos informacija bus papildyta"}</small></span><span class="episode-status">${hasVideo ? "ŽIŪRĖTI ↗" : (number === 5 && ep >= 4 ? "NUORODA BUS PRIDĖTA" : "RUOŠIAMA")}</span>`;
    row.addEventListener("click", () => openEpisode(number, ep));
    container.appendChild(row);
  });
}
function openEpisode(season, episode) {
  document.querySelector("#dialogSeason").textContent = `${season} SEZONAS`;
  document.querySelector("#dialogTitle").textContent = `${episode} serija`;
  const videoUrl = episodeVideoUrls[`${season}-${episode}`];
  const screen = document.querySelector(".dialog-screen");
  if (videoUrl) {
    screen.innerHTML = `<iframe title="${season} sezono ${episode} serija" src="${videoUrl}" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
    screen.classList.add("has-video");
  } else {
    screen.innerHTML = `<span class="play-symbol">▶</span><p>Serijos vaizdo įrašo nuoroda dar nepridėta.</p>`;
    screen.classList.remove("has-video");
  }
  if (typeof dialog.showModal === "function") dialog.showModal();
  else alert("Serijos vaizdo įrašo nuoroda dar nepridėta.");
}
document.querySelectorAll("[data-home]").forEach(el => el.addEventListener("click", showHome));
navItems.filter(el => el.dataset.season).forEach(el => el.addEventListener("click", () => showSeason(el.dataset.season)));
document.querySelectorAll("[data-episode]").forEach(el => el.addEventListener("click", () => openEpisode(5, Number(el.dataset.episode))));
document.querySelector("#closeDialog").addEventListener("click", () => dialog.close());
document.querySelector("#dialogOk").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
dialog.addEventListener("close", () => {
  const screen = document.querySelector(".dialog-screen");
  screen.innerHTML = `<span class="play-symbol">▶</span><p>Serijos vaizdo įrašo nuoroda dar nepridėta.</p>`;
  screen.classList.remove("has-video");
});
window.addEventListener("hashchange", () => {
  const match = location.hash.match(/^#sezonas-(\d)$/);
  if (match) showSeason(Number(match[1]));
  else if (location.hash === "#pagrindinis" || !location.hash) showHome();
});
if (location.hash.match(/^#sezonas-[1-6]$/)) showSeason(Number(location.hash.slice(-1)));
