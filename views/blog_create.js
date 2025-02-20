const backButton = document.getElementById('back-button');
const blogTitle = document.getElementById('blog-title');
const blogContent = document.getElementById('blog-content');
const saveButton = document.querySelector('.save-button');
const cancelButton = document.querySelector('.cancel-button');

const alertContainer = document.getElementById('alert-container');
const alertMessage = document.getElementById('alert-message');
const closeButton = document.querySelector('.close-button');

if (put_confirm == 1) {
    blogTitle.value = post_data.post_title;
    blogContent.innerHTML = post_data.post_content;
}

function showAlert(message) {
    alertMessage.textContent = message;
    alertContainer.style.display = 'block';
}

closeButton.addEventListener('click', () => {
    alertContainer.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == alertContainer) {
        alertContainer.style.display = 'none';
    }
});

backButton.addEventListener('click', () => {
    // Redirect back to the blog page (or wherever you want to go)
    window.location.href = '/blog'; // Replace with your blog page URL
});

saveButton.addEventListener('click', () => {
    const title = blogTitle.value;
    const content = blogContent.innerHTML; // Get HTML content

    if (!blogTitle.value.trim()) { // Check for empty or whitespace-only title
        showAlert("Please enter a blog title.");
        blogTitle.focus();
        preventDefault(); // Prevent form submission
        return;
    }
    if (!blogContent.innerText.trim()) { // Check for empty or whitespace-only content
        showAlert("Please enter a blog content.");
        blogContent.focus();
        preventDefault(); // Prevent form submission
        return;
    }

    const post = {
        post_title: title,
        post_content: content,
    };

    if (put_confirm == 0) {
        try {
            const response = fetch('/blog/create', {
                method: 'post',
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
    }
    else {
        try {
            const response = fetch('/blog/put?id=' + post_data._id, {
                method: 'put',
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
    }
    window.location.href = '/blog'
});

cancelButton.addEventListener('click', () => {
    // Redirect back to the blog page (or wherever you want to go)
    window.location.href = '/blog';
});
