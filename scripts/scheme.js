// Existing code for schemes
document.getElementById('show-schemes-button').addEventListener('click', function() {
    var schemesContainer = document.getElementById('schemes-container');
    if (schemesContainer.style.display === 'none' || schemesContainer.style.display === '') {
        schemesContainer.style.display = 'block';
    } else {
        schemesContainer.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '5b230aee6ad84b0b83fe98ebfadcb2af'; // Replace with your actual NewsAPI key
    const url = `https://newsapi.org/v2/everything?q=agriculture&apiKey=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('News data fetched:', data); // Log the fetched data for debugging
            const newsContainer = document.getElementById('news-container');
            newsContainer.innerHTML = '';

            if (data.articles && data.articles.length > 0) {
                // Get only the top 5 articles
                const topArticles = data.articles.slice(0, 5);

                topArticles.forEach(article => {
                    const articleElement = document.createElement('div');
                    articleElement.classList.add('news-article');

                    const articleTitle = document.createElement('h3');
                    articleTitle.textContent = article.title;

                    const articleDescription = document.createElement('p');
                    articleDescription.textContent = article.description;

                    const articleLink = document.createElement('a');
                    articleLink.href = article.url;
                    articleLink.textContent = 'Read more';
                    articleLink.target = '_blank';

                    articleElement.appendChild(articleTitle);
                    articleElement.appendChild(articleDescription);
                    articleElement.appendChild(articleLink);

                    newsContainer.appendChild(articleElement);
                });
            } else {
                newsContainer.innerHTML = '<p>No news articles found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            const newsContainer = document.getElementById('news-container');
            newsContainer.innerHTML = '<p>Error fetching news. Please try again later.</p>';
        });
});