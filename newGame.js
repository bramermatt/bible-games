document.addEventListener('DOMContentLoaded', () => {
    const newGameBtn = document.getElementById('newGameBtn');
    const newGameModal = document.getElementById('newGameModal');
    const closeModal = document.getElementById('closeModal');

    newGameBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        newGameModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        newGameModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === newGameModal) {
            newGameModal.style.display = 'none';
        }
    });
});
