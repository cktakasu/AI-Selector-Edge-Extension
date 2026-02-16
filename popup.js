const AI_LINKS = [
  {
    name: "ChatGPT",
    url: "https://chatgpt.com/",
    icon: "https://cdn.simpleicons.org/openai/FFFFFF"
  },
  {
    name: "Claude",
    url: "https://claude.ai/",
    icon: "https://cdn.simpleicons.org/anthropic/FFFFFF"
  },
  {
    name: "Gemini",
    url: "https://gemini.google.com/",
    icon: "https://cdn.simpleicons.org/googlegemini/FFFFFF"
  },
  {
    name: "Perplexity",
    url: "https://www.perplexity.ai/",
    icon: "https://cdn.simpleicons.org/perplexity/FFFFFF"
  },
  {
    name: "Genspark",
    url: "https://www.genspark.ai/",
    icon: "https://www.genspark.ai/favicon.ico",
    isNew: true
  },
  {
    name: "Kimi",
    url: "https://kimi.moonshot.cn/",
    icon: "https://kimi.moonshot.cn/favicon.ico",
    isNew: true
  },
  {
    name: "Manus",
    url: "https://manus.im/",
    icon: "https://manus.im/favicon.ico",
    isNew: true
  }
];

const linksContainer = document.getElementById("links");

function openUrl(url) {
  if (chrome?.tabs?.create) {
    chrome.tabs.create({ url });
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
}

function createIcon(link) {
  const image = document.createElement("img");
  image.className = "link-icon";
  image.src = link.icon;
  image.alt = `${link.name} icon`;

  const fallback = document.createElement("div");
  fallback.className = "link-fallback";
  fallback.textContent = link.name.slice(0, 2).toUpperCase();
  fallback.hidden = true;

  image.addEventListener("error", () => {
    image.hidden = true;
    fallback.hidden = false;
  });

  const wrapper = document.createDocumentFragment();
  wrapper.append(image, fallback);
  return wrapper;
}

function renderLinks() {
  AI_LINKS.forEach((link) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "link-button";
    button.title = link.name;
    button.setAttribute("aria-label", `${link.name} を開く`);

    button.appendChild(createIcon(link));

    const label = document.createElement("span");
    label.className = "link-label";
    label.textContent = link.name;
    button.appendChild(label);

    if (link.isNew) {
      const badge = document.createElement("span");
      badge.className = "new-badge";
      badge.textContent = "NEW";
      button.appendChild(badge);
    }

    button.addEventListener("click", () => openUrl(link.url));
    linksContainer.appendChild(button);
  });
}

renderLinks();
