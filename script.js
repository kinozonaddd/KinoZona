document.addEventListener('DOMContentLoaded', () => {
    const moviesSection = document.querySelector('#filmai') || document.querySelector('.movies-section');
    if (moviesSection) {
        const moviesContent = moviesSection.querySelector('.grid, .movies-grid, .content') || moviesSection;
        if (moviesContent) {
            moviesContent.innerHTML = `
                <div style="text-align: center; font-size: 20px; color: #ffffff; padding: 60px 20px; font-weight: 500;">
                    Šiuo momentu filmų nėra
                </div>
            `;
        }
    }

    const mainBannerDesc = document.querySelector('.hero-description, .banner-desc, #pagrindinis p');
    if (mainBannerDesc) {
        mainBannerDesc.textContent = "Sugrįžta paskutiniam mūšiui: „Peaky Blinders“ 6-asis sezonas: 1933 metai. Pasibaigus sausajam įstatymui, opijaus verslas atveria duris į naujus, tačiau itin pavojingus aljansus. Šeštasis ir pats paskutinis kultinio serialo sezonas panardina Šelbių šeimą į giliausią iki šiol patirtą krizę.";
    }

    const seriesMainDesc = document.querySelector('.series-header p, #serialai .description');
    if (seriesMainDesc) {
        seriesMainDesc.textContent = "Peaky Blinders – tai kultinė britų kriminalinė drama, pasakojanti apie Šelbių šeimos ir jų vadovaujamos gaujos iškilimą nuo gatvės nusikaltėlių iki pasaulinio lygio politinių ir verslo magnatų.";
    }

    const episodesData = [
        {
            title: "1 sezonas · 1 serija",
            desc: "Tomis Šelbis per klaidą pavagia vyriausybės ginklų siuntą, o į Birmingemą juos surasti atvyksta inspektorius Kempbelas.",
            embed: "https://www.youtube.com/embed/bA__fScME3A?rel=0"
        },
        {
            title: "1 sezonas · 2 serija",
            desc: "Tomis pradeda karą su vietiniais čigonais (Li šeima) ir atsisako atiduoti pavogtus ginklus Kempbelui.",
            embed: "https://www.youtube.com/embed/cse5nQH9eok?rel=0"
        },
        {
            title: "1 sezonas · 3 serija",
            desc: "Greisė padeda Tomiui paslėpti ginklus nuo policijos kratos, o Fredis su Ada slapta susituokia.",
            embed: "https://www.youtube.com/embed/Vh29BrG7RPA?rel=0"
        },
        {
            title: "1 sezonas · 4 serija",
            desc: "Bilis Kimberis pasisamdo „Peaky Blinders“ apsaugai, o Tomis išduoda savo sesers vyrą Fredį policijai, kad apsaugotų šeimos verslą.",
            embed: "https://www.youtube.com/embed/qkfHwqH5pOc?rel=0"
        },
        {
            title: "1 sezonas · 5 serija",
            desc: "Greisė sužino, kur paslėpti pavogti ginklai, ir išduoda jų vietą Kempbelui, tačiau kartu įsimyli Tomį.",
            embed: "https://www.youtube.com/embed/ga3boRKxTeI?rel=0"
        },
        {
            title: "1 sezonas · 6 serija",
            desc: "Kimberį ir perima jo lažybų imperiją. Fredis išlaisvinamas bet ivyksta labai komplikuoti reikalai.",
            embed: "https://www.youtube.com/embed/GSaLGE6g7cI?rel=0"
        }
    ];

    const episodeCards = document.querySelectorAll('.episode-card, .episode-item, .serija-card');
    if (episodeCards.length > 0) {
        episodeCards.forEach((card, index) => {
            if (episodesData[index]) {
                const titleElem = card.querySelector('h3, .title');
                const descElem = card.querySelector('p, .description');
                const iframeElem = card.querySelector('iframe');

                if (titleElem) titleElem.textContent = episodesData[index].title;
                if (descElem) descElem.textContent = episodesData[index].desc;
                if (iframeElem) iframeElem.src = episodesData[index].embed;
            }
        });
    }
});
