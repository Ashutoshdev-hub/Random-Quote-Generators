const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteButton = document.getElementById("newQuoteBtn");
const copyButton = document.getElementById("copyBtn");
const twitterButton = document.getElementById("twitterBtn");
const exportButton = document.getElementById("exportBtn");
const quoteBox = document.getElementById("quoteCard");

// List of 10  image URLs
const backgroundPictures = [
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1920&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80",
  "https://images.unsplash.com/photo-1474524955719-b1d202f99ad5?w=1920&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80",
  "https://images.unsplash.com/photo-1438786657495-640937046d18?w=1920&q=80",
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1920&q=80",
  "https://images.unsplash.com/photo-1501785886872-3a3517e4d092?w=1920&q=80",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1920&q=80",
  "https://images.unsplash.com/photo-1511300636408-a63a89df6d46?w=1920&q=80",
];

// Function to show a new quote
function showNewQuote() {
  fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random")
    .then((response) => response.json())
    .then((data) => {
      const quote = data.data;
      quoteText.textContent = `"${quote.content}"`;
      quoteAuthor.textContent = `- ${quote.author || "Unknown"}`;

      // Pick a random picture from our list
      const picture =
        backgroundPictures[
          Math.floor(Math.random() * backgroundPictures.length)
        ];
      document.body.style.backgroundImage = `url(${picture})`;
    })
    .catch(() => {
      quoteText.textContent = '"Something went wrong!"';
      quoteAuthor.textContent = "- Oops";
    });
}

// Function to copy the quote
function copyQuote() {
  const fullText = `${quoteText.textContent}\n${quoteAuthor.textContent}`;
  navigator.clipboard.writeText(fullText);
  alert("Copied!");
}

// Function to share on Twitter
function shareOnTwitter() {
  const fullText = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    fullText
  )}`;
  window.open(twitterLink, "_blank");
}

// Function to save the quote as a picture
function saveAsPicture() {
  html2canvas(quoteBox).then((canvas) => {
    const downloadLink = document.createElement("a");
    downloadLink.download = "quote.png";
    downloadLink.href = canvas.toDataURL("image/png");
    downloadLink.click();
  });
}

// Make the buttons work
newQuoteButton.addEventListener("click", showNewQuote);
copyButton.addEventListener("click", copyQuote);
twitterButton.addEventListener("click", shareOnTwitter);
exportButton.addEventListener("click", saveAsPicture);

// Show a quote when the page starts
showNewQuote();
