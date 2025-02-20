fetch('/header.ejs')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load header.');
        }
        return response.text();
    })
    .then(data => {
        const header_placeholder = document.getElementById('header-placeholder');
        const existing_header = document.querySelector('header');

        if (existing_header) {
            existing_header.insertAdjacentHTML('beforebegin', data);
            header_placeholder.remove();
        }
        else {
            header_placeholder.innerHTML = data;
        }
    })
    .catch(error => {
        console.error(error);
        document.getElementById('header-placeholder').innerHTML = "<p>Error loading header.</p>";
    });