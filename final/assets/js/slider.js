document.addEventListener('DOMContentLoaded', function () {
    console.log('Slider JS loaded');

    const tabs = document.querySelectorAll('.slider-tab');
    const panes = document.querySelectorAll('.content-pane');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');

    let currentIndex = 0;

    function updateSlider(index) {
        // Wrap index around
        index = (index + tabs.length) % tabs.length;
        currentIndex = index;

        // Remove all active
        tabs.forEach(tab => tab.classList.remove('active'));
        panes.forEach(pane => pane.classList.remove('active'));

        // Add active to tab
        tabs[index].classList.add('active');

        // Find matching pane (by data-tab == data-content)
        const tabValue = tabs[index].dataset.tab;
        const activePane = Array.from(panes).find(pane => pane.dataset.content === tabValue);
        if (activePane) {
            activePane.classList.add('active');
        }

        updateBodyBackground(index);
    }

    function updateBodyBackground(index) {
        const colors = [
            'var(--content-bg)',
            'var(--card-bg)',
            'var(--linen)',
            'var(--pale-dogwood)',
            'var(--platinum)'
        ];
        document.body.style.backgroundColor = colors[index % colors.length];
    }

    // Add click listener to tabs
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const tabValue = parseInt(tab.dataset.tab, 10) - 1;  // Ajusta a índice base 0
            updateSlider(tabValue);
        });
    });


    prevBtn.addEventListener('click', () => updateSlider(currentIndex - 1));
    nextBtn.addEventListener('click', () => updateSlider(currentIndex + 1));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') updateSlider(currentIndex - 1);
        if (e.key === 'ArrowRight') updateSlider(currentIndex + 1);
    });

    updateSlider(0);

    // ===== POPUP (unchanged) =====
    const healthDetailsBtn = document.getElementById('healthDetailsBtn');
    const healthDetailsModal = document.getElementById('healthDetailsModal');
    const popupClose = document.querySelector('.popup-close');

    if (healthDetailsBtn && healthDetailsModal) {
        healthDetailsBtn.addEventListener('click', () => {
            healthDetailsModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        popupClose.addEventListener('click', () => {
            healthDetailsModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        healthDetailsModal.addEventListener('click', (e) => {
            if (e.target === healthDetailsModal) {
                healthDetailsModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && healthDetailsModal.classList.contains('active')) {
                healthDetailsModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});
