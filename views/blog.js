document.addEventListener('DOMContentLoaded', () => { // Wait for DOM to load
    const createBlogButton = document.getElementById('create-blog-button');
    const blogPostsContainer = document.getElementById('blog-posts-container');

    if (createBlogButton) { // Check if the button exists on the page
        createBlogButton.addEventListener('click', () => {
            // Redirect to the create blog post page
            window.location.href = '/blog/create'; // Replace with the actual URL
        });
    }

    blogPostsContainer.addEventListener('click', (event) => {
        const article = event.target.closest('article');
        if (article) {
            const postId = article.dataset.postId;
            window.location.href = `/blog/view?id=${postId}`;
        }
    });
});