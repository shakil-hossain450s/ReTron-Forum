const loadAllPosts = async () => {
    loadingSpinner(true);
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
    const data = await res.json();
    const allPosts = data.posts;
    displayPosts(allPosts);
}

const displayPosts = allPosts => {
    
        const allPostsContainer = document.querySelector("#all-posts-container");
    allPostsContainer.textContent = "";

    allPosts.forEach(post => {
        const { image, id, category, isActive, title, description, comment_count = 0, view_count = 0, posted_time = 0, author: { name = "unknown" } } = post;

        const uniqueButtonId = `handle-read-${id}`;

        const setStatus = isActive ? "bg-[#00A96E]" : "bg-[#FF3434]";
        const postCard = document.createElement("div");
        postCard.classList = `bg-[#dcdcdd] mb-6 p-4 md:p-8 flex flex-col lg:flex-row items-center lg:items-start gap-6 rounded-2xl`;
        postCard.innerHTML = `
            <div class="lg:w-1/12">
                <div class="w-16 h-16 bg-white relative rounded-lg">
                  <div id="status-container"
                    class="w-4 h-4 ${setStatus} absolute -top-2 -right-2 border rounded-full"
                  ></div>
                  <img class="rounded-lg" src="${image}" alt="" />
                </div>
              </div>
              <div class="w-11/12 text-[#12132D]">
                <div class="flex gap-5 mb-3 opacity-80 text-sm font-medium">
                  <p># ${category}</p>
                  <p>Author : ${name ? name : "no data found"}</p>
                </div>
                <h3 class="text-lg font-bold mb-4">${title}</h3>
                <p class="opacity-60">${description}</p>
                <div
                  class="border-b border-dashed border-[#12132D40] my-5"
                ></div>
                <div class="flex justify-between items-center">
                  <div class="flex gap-2 md:gap-6 items-center">
                    <div class="flex items-center gap-2 md:gap-3">
                      <img src="./images/icons/message.png" alt="" />
                      <span>${comment_count}</span>
                    </div>
                    <div class="flex items-center gap-2 md:gap-3">
                      <img src="./images/icons/eye.png" alt="" />
                      <span>${view_count}</span>
                    </div>
                    <div class="flex items-center gap-2 md:gap-3">
                      <img src="./images/icons/clock.png" alt="" />
                      <span>${posted_time}</span>
                    </div>
                  </div>
                  <div>
                    <button id="${uniqueButtonId}" onclick="handleRead(\`${title.replace(/'/g, "\\'")}\`, '${view_count}', '${uniqueButtonId}')"
                      class="btn btn-circle text-white bg-[#10B981] hover:bg-[#10B981] text-lg"
                    >
                      <i class="fa-solid fa-envelope-open-text"></i>
                    </button>
                  </div>
                </div>
              </div>
        `;
        allPostsContainer.appendChild(postCard);
    });
    loadingSpinner(false);
}

let count = 0;
const handleRead = (title, view_count, uniqueButtonId) => {
    console.log(uniqueButtonId);
    count++;
    document.querySelector("#read-count").innerText = count;
    const readMailCardContainer = document.querySelector("#read-mail-container");
    const readMailCardDiv = document.createElement("div");
    readMailCardDiv.classList = `flex justify-between p-4 bg-white rounded-2xl`;
    readMailCardDiv.innerHTML = `
        <h3 class="font-semibold w-2/3">${title}</h3>
        <div class="flex items-center gap-1">
            <img src="./images/icons/eye.png" alt="" />
            <span>${view_count}</span>
        </div>
    `;
    readMailCardContainer.appendChild(readMailCardDiv);
    const mailReadButton = document.getElementById(uniqueButtonId);
    if (mailReadButton) {
        mailReadButton.setAttribute("disabled", true);
    }
}

const loadPostsByCategory = async () => {
    const categoryField = document.querySelector("#category-field");
    const categoryName = categoryField.value.toLowerCase();

    const allPostsContainer = document.querySelector("#all-posts-container");
    allPostsContainer.textContent = "";

    loadingSpinner(true);

    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`);
    const data = await res.json();
    console.log(data);
    const categoryPosts = data.posts;
    const message = data.message;

    if (categoryPosts.length !== 0) {
        displayPosts(categoryPosts);
    } else {
        const notFoundMessage = document.createElement("h2");
        notFoundMessage.classList = `text-3xl font-semibold`;
        notFoundMessage.innerText = message;
        allPostsContainer.appendChild(notFoundMessage);
        loadingSpinner(false);
    }
    categoryField.value = "";
}

const loadingSpinner = (isLoading) => {
    const loaderContainer = document.getElementById("loader-container");
    if (isLoading) {
        loaderContainer.classList.remove("hidden");
    } else {
        loaderContainer.classList.add("hidden");
    }
}

const loadLatestPosts = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const data = await res.json();
    displayLatestNews(data);
    // console.log(data);
}

const displayLatestNews = latestNews => {
    const latestNewsContainer = document.querySelector("#latest-news-container");

    latestNews.forEach(news => {
        // console.log(news);
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


loadAllPosts();
loadLatestPosts();