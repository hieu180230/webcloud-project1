function load_footer() {
    // Load footer content from footer.html
    fetch('footer.ejs')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load footer.');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => {
            console.error(error);
            document.getElementById('footer-placeholder').innerHTML = "<p>Error loading footer.</p>";
        });
}

load_footer();