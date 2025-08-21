// News Management System
class NewsManager {
  constructor() {
    this.news = this.getNewsData();
    this.currentCategory = "all";
    this.displayedNews = 6;

    this.initializeElements();
    this.bindEvents();
    this.renderNews();
  }

  initializeElements() {
    // News elements
    this.newsGrid = document.getElementById("newsGrid");
    this.loadMoreBtn = document.getElementById("loadMoreBtn");

    // Category buttons
    this.categoryButtons = document.querySelectorAll(".news-category");

    // Mobile menu
    this.mobileMenuBtn = document.getElementById("mobileMenuBtn");
    this.mobileMenu = document.getElementById("mobileMenu");
  }

  bindEvents() {
    // Category filtering
    this.categoryButtons.forEach((btn) => {
      btn.addEventListener("click", (e) =>
        this.filterByCategory(e.target.dataset.category)
      );
    });

    // Load more button
    this.loadMoreBtn.addEventListener("click", () => this.loadMoreNews());

    // Mobile menu
    this.mobileMenuBtn.addEventListener("click", () => this.toggleMobileMenu());
  }

  getNewsData() {
    // Simulated news data (in real app, this would come from API)
    return [
      {
        id: 1,
        title: "Ethereum 2.0 Staking Reaches New Milestone",
        excerpt:
          "The Ethereum network has achieved another significant milestone with over 25% of total supply now staked in the proof-of-stake consensus mechanism.",
        category: "ethereum",
        author: "Crypto Daily",
        timeAgo: "1 hour ago",
        image:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 2,
        title: "DeFi Protocols See Record TVL Growth",
        excerpt:
          "Decentralized finance protocols have experienced unprecedented growth in Total Value Locked (TVL), reaching new all-time highs across multiple platforms.",
        category: "defi",
        author: "DeFi Pulse",
        timeAgo: "3 hours ago",
        image:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 3,
        title: "NFT Market Shows Signs of Recovery",
        excerpt:
          "After months of declining sales, the NFT market is showing signs of recovery with increased trading volume and new high-profile collections launching.",
        category: "nft",
        author: "NFT Insider",
        timeAgo: "5 hours ago",
        image:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 4,
        title: "Regulatory Clarity Expected for Crypto Industry",
        excerpt:
          "Government officials have indicated that comprehensive cryptocurrency regulations may be announced in the coming months, providing much-needed clarity for the industry.",
        category: "regulation",
        author: "Crypto Policy",
        timeAgo: "7 hours ago",
        image:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 5,
        title: "Solana Network Performance Improvements",
        excerpt:
          "The Solana blockchain has implemented several performance upgrades, resulting in faster transaction processing and reduced network congestion.",
        category: "solana",
        author: "Solana Foundation",
        timeAgo: "9 hours ago",
        image:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 6,
        title: "Bitcoin Mining Difficulty Adjusts Downward",
        excerpt:
          "Bitcoin's mining difficulty has decreased for the first time in several months, potentially making mining more profitable for smaller operations.",
        category: "bitcoin",
        author: "Mining Weekly",
        timeAgo: "11 hours ago",
        image:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 7,
        title: "Cardano Smart Contract Development Surges",
        excerpt:
          "Developers are increasingly building on Cardano as the platform's smart contract capabilities continue to expand and improve.",
        category: "cardano",
        author: "Cardano Community",
        timeAgo: "13 hours ago",
        image:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 8,
        title: "Dogecoin Community Initiatives",
        excerpt:
          "The Dogecoin community has launched several new initiatives aimed at increasing adoption and utility of the meme cryptocurrency.",
        category: "dogecoin",
        author: "DOGE Daily",
        timeAgo: "15 hours ago",
        image:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 9,
        title: "Cross-Chain Bridge Security Concerns",
        excerpt:
          "Recent security incidents involving cross-chain bridges have raised concerns about the safety of moving assets between different blockchain networks.",
        category: "defi",
        author: "Security Weekly",
        timeAgo: "17 hours ago",
        image:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
    ];
  }

  filterByCategory(category) {
    this.currentCategory = category;
    this.displayedNews = 6;

    // Update active category button
    this.categoryButtons.forEach((btn) => {
      if (btn.dataset.category === category) {
        btn.className =
          "news-category bg-lighter text-white px-4 py-2 rounded-lg transition-colors";
      } else {
        btn.className =
          "news-category bg-darker hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors";
      }
    });

    this.renderNews();
  }

  renderNews() {
    this.newsGrid.innerHTML = "";

    let filteredNews = this.news;
    if (this.currentCategory !== "all") {
      filteredNews = this.news.filter(
        (item) => item.category === this.currentCategory
      );
    }

    const newsToShow = filteredNews.slice(0, this.displayedNews);

    newsToShow.forEach((item) => {
      const newsCard = this.createNewsCard(item);
      this.newsGrid.appendChild(newsCard);
    });

    // Show/hide load more button
    this.loadMoreBtn.style.display =
      this.displayedNews >= filteredNews.length ? "none" : "block";
  }

  createNewsCard(newsItem) {
    const card = document.createElement("div");
    card.className =
      "bg-primary rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer";

    card.innerHTML = `
      <div class="h-48 overflow-hidden">
        <img src="${newsItem.image}" alt="${newsItem.title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
      </div>
      <div class="p-6">
        <div class="flex items-center text-sm text-gray-400 mb-2">
          <span class="bg-lighter text-white px-2 py-1 rounded text-xs font-semibold mr-3 capitalize">${newsItem.category}</span>
          <span>${newsItem.timeAgo}</span>
        </div>
        <h4 class="text-lg font-bold mb-3 line-clamp-2">${newsItem.title}</h4>
        <p class="text-gray-300 mb-4 line-clamp-3">${newsItem.excerpt}</p>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-400">By ${newsItem.author}</span>
          <button class="bg-lighter hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition-colors text-sm">
            Read More
          </button>
        </div>
      </div>
    `;

    // Add click event
    card.addEventListener("click", () => this.readNews(newsItem));

    return card;
  }

  readNews(newsItem) {
    // TODO: Implement news reading functionality
    alert(
      `Reading: ${newsItem.title}\n\nThis would open a detailed view of the news article.`
    );
  }

  loadMoreNews() {
    this.displayedNews += 3;
    this.renderNews();
  }

  toggleMobileMenu() {
    this.mobileMenu.classList.toggle("hidden");
  }
}

// Initialize the news manager when DOM is loaded
let newsManager;
document.addEventListener("DOMContentLoaded", () => {
  newsManager = new NewsManager();
});
