const accessKey = 'hyc-1oW4MaMsZ3UjdhlheaR37wQWKHNssBbEtsU9aYg'; // Replace with your Unsplash API key
const searchForm = document.querySelector('form');
const searchinput = document.querySelector('.search-input');
const imagescontainer = document.querySelector('.images-container');

// Function to fetch images using Unsplash API
const fetchImages = async (query) => {
    imagescontainer.innerHTML = '';

    try {
        const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&client_id=${accessKey}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch images.');
        }

        const data = await response.json();
        imagescontainer.innerHTML = ''; // Clear previous results.

        if (data.results.length === 0) {
            imagescontainer.innerHTML = '<h2>No images found. Try a different search query.</h2>';
            return;
        }

        data.results.forEach(photo => {
            const imageElement = document.createElement('div');
            imageElement.innerHTML = `<img src="${photo.urls.regular}" alt="${photo.alt_description}"/>`;
            imagescontainer.appendChild(imageElement);
        });
    } catch (error) {
        imagescontainer.innerHTML = `<h2>Error: ${error.message}</h2>`;
    }
};

// Adding Event Listener to search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = searchinput.value.trim();

    if (inputText !== '') {
        fetchImages(inputText);
    } else {
        imagescontainer.innerHTML = '<h2>Please enter a search query.</h2>';
    }
});
