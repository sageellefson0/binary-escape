document.addEventListener('DOMContentLoaded', (event) => {
    const content = document.getElementById('content');
    const statusBar = document.getElementById('status-bar');

    content.addEventListener('input', () => {
        const text = content.innerText || content.textContent;
        const words = text.trim().split(/\s+/).length;
        statusBar.textContent = `Page 1 of 1 | Words: ${words} | English (United States)`;
    });
});
