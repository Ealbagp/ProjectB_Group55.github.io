document.addEventListener('DOMContentLoaded', function () {
    console.log('Slider JS loaded');

    // Selección de elementos
    const tabs = document.querySelectorAll('.slider-tab');
    const panes = document.querySelectorAll('.content-pane');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');

    let currentIndex = 0;

    // Función que actualiza el slider
    function updateSlider(index) {
        // Ajustar el índice para hacer un loop
        index = (index + tabs.length) % tabs.length;
        currentIndex = index;

        // Eliminar clases 'active' de todos los tabs y panes
        tabs.forEach(tab => tab.classList.remove('active'));
        panes.forEach(pane => pane.classList.remove('active'));

        // Añadir clase 'active' al tab actual
        tabs[index].classList.add('active');

        // Encontrar el pane correspondiente (con el mismo valor de 'data-tab')
        const tabValue = tabs[index].dataset.tab;
        const activePane = Array.from(panes).find(pane => pane.dataset.content === tabValue);
        if (activePane) {
            activePane.classList.add('active');
        }

        updateBodyBackground(index);
    }

    // Cambiar el color de fondo del body según el índice
    function updateBodyBackground(index) {
        const colors = [
            'var(--content-bg)',   // Primer color de fondo
            'var(--card-bg)',      // Segundo color de fondo
            'var(--linen)',        // Tercer color de fondo
            'var(--pale-dogwood)', // Cuarto color de fondo
            'var(--platinum)'      // Quinto color de fondo
        ];
        document.body.style.backgroundColor = colors[index % colors.length];
    }

    // Añadir listeners a los tabs
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const tabValue = parseInt(tab.dataset.tab, 10) - 1;  // Ajustar a índice base 0
            updateSlider(tabValue);
        });
    });

    // Listeners para los botones de navegación (prev/next)
    prevBtn.addEventListener('click', () => updateSlider(currentIndex - 1));
    nextBtn.addEventListener('click', () => updateSlider(currentIndex + 1));

    // Escuchar teclas de flechas (Izquierda/Derecha)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') updateSlider(currentIndex - 1);
        if (e.key === 'ArrowRight') updateSlider(currentIndex + 1);
    });

    // Inicializar el slider en el primer tab
    updateSlider(0);

    // ===== POPUP (sin cambios) =====
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
