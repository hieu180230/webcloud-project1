const backButton = document.getElementById('back-button');
backButton.addEventListener('click', () => {
    // Redirect back to the blog page (or wherever you want to go)
    window.location.href = '/blog'; // Replace with your blog page URL
});

if (del_confirm == 1) {
    if (confirm("Are you sure you want to delete this blog post?")) {
        try {
            const response = fetch('/blog/delete?id=' + post._id, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            });

            if (!response.ok) {
                const errorData = response.json();
                throw new Error(`Server error: ${response.status} - ${errorData.message || response.statusText}`);
            }

        } catch (err) {
            console.error(`Error: ${err}`);
        }
        window.location.href = '/blog'
    }
}