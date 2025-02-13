const fileInput = document.getElementById('fileInput');
const comicImage = document.getElementById('comicImage');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const zoomIn = document.getElementById('zoomIn');
const zoomOut = document.getElementById('zoomOut');
const toggleMode = document.getElementById('toggleMode');
const addBookmark = document.getElementById('addBookmark');
const bookmarkList = document.getElementById('bookmarkList');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
let images = [];
let currentIndex = 0;
let zoomLevel = 1;
let bookmarks = [];

fileInput.addEventListener('change', function(event) {
    images = Array.from(event.target.files).map(file => URL.createObjectURL(file));
    if (images.length > 0) {
        currentIndex = 0;
        comicImage.src = images[currentIndex];
    }
});

prevPage.addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--;
        comicImage.src = images[currentIndex];
    }
});

nextPage.addEventListener('click', function() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        comicImage.src = images[currentIndex];
    }
});

zoomIn.addEventListener('click', function() {
    zoomLevel += 0.2;
    comicImage.style.transform = `scale(${zoomLevel})`;
});

zoomOut.addEventListener('click', function() {
    if (zoomLevel > 0.5) {
        zoomLevel -= 0.2;
        comicImage.style.transform = `scale(${zoomLevel})`;
    }
});

toggleMode.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

addBookmark.addEventListener('click', function() {
    if (!bookmarks.includes(currentIndex)) {
        bookmarks.push(currentIndex);
        let li = document.createElement('li');
        li.textContent = `Page ${currentIndex + 1}`;
        li.addEventListener('click', function() {
            currentIndex = bookmarks[bookmarks.indexOf(currentIndex)];
            comicImage.src = images[currentIndex];
        });
        bookmarkList.appendChild(li);
    }
});

searchButton.addEventListener('click', function() {
    let searchTerm = searchInput.value.toLowerCase();
    for (let i = 0; i < images.length; i++) {
        if (images[i].toLowerCase().includes(searchTerm)) {
            currentIndex = i;
            comicImage.src = images[currentIndex];
            break;
        }
    }
});