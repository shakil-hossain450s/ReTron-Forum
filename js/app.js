const loadLatestPosts = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const data = await res.json();
    displayLatestNews(data);
    // console.log(data);
}

const displayLatestNews = latestNews => {
    const latestNewsContainer = document.querySelector("#latest-news-container");

    latestNews.forEach(news => {
        console.log(news);
        const { cover_image, title, description, author: { name, designation, posted_date } } = news;
        const newsCard = document.createElement("div");
        newsCard.classList = `card border border-[#12132D26] rounded-2xl p-6`;
        newsCard.innerHTML = `
            <figure class="rounded-2xl">
              <img 
                src="${cover_image}"
                alt=""
              />
            </figure>
            <div class="card-body p-0 mt-6 text-[#12132D]">
              <div class="flex items-center gap-2 mb-3">
                <img src="../images/icons/calender.png">
                <p class="opacity-60">${posted_date ? posted_date : "No publish date"}</p>
              </div>
              <h2 class="text-lg font-extrabold">${title}</h2>
              <p class="opacity-60 mb-4">${description}</p>
              <div class="flex items-center gap-4">
                <div class="w-10 rounded-full">
                  <img src="../images/author.png" />
                </div>
                <div>
                    <h4 class="font-bold">${name ? name : "Unknown"}</h4>
                    <p class="text-sm opacity-60">${designation ? designation : "Unknown"}</p>
                </div>
              </div>
            </div>
        `;
        latestNewsContainer.appendChild(newsCard);
    })
}

loadLatestPosts();