document.querySelectorAll('.dropdown').forEach(item => {
    item.addEventListener('click', function (event) {
        event.stopPropagation();
        item.classList.toggle('is-active');
    });
});