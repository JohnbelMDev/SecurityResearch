// Function to toggle FAQ answers
const toggleFAQ = (event) => {
    const answer = event.target.nextElementSibling;
    const isActive = answer.classList.toggle('active');

    // Provide user feedback
    if (isActive) {
        answer.style.maxHeight = answer.scrollHeight + 'px'; // Animate height
        console.log("Answer revealed.");
    } else {
        answer.style.maxHeight = '0px'; // Collapse height
        console.log("Answer hidden.");
    }
};

// Initialize FAQ items with event listeners
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', toggleFAQ);
    console.log("FAQ item initialized.");
});

// Asynchronous function to fetch data
const fetchData = async (url) => {
    try {
        console.log("Fetching data...");
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data fetched successfully:', data);
        // Process data
        processFetchedData(data);
    } catch (error) {
        console.error('Fetch Error:', error);
        displayErrorMessage("Unable to retrieve data at this time.");
    }
};

// Function to process fetched data
const processFetchedData = (data) => {
    console.log("Processing fetched data.");

    // Transform the data
    const transformedData = data.map(item => ({
        ...item,
        name: item.name.split('').reverse().join('') // Reverse the name
    }));

    displayTransformedData(transformedData);
};

// Function to display transformed data in the UI
const displayTransformedData = (data) => {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results
    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('data-item');
        div.textContent = `Name: ${item.name}, Value: ${item.value}`;
        resultsContainer.appendChild(div);
        console.log("Data item displayed:", div);
    });
};

// Function to display error messages
const displayErrorMessage = (message) => {
    const errorContainer = document.getElementById('error');
    errorContainer.textContent = message;
    errorContainer.style.display = 'block'; // Show error message
    console.log("Error displayed.");
};

// Initiate data fetch on page load
const apiUrl = 'https://api.example.com/data';
console.log("Starting data fetch...");
fetchData(apiUrl);
