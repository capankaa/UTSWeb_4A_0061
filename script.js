$(function () {
    const $body = $('body');
    const $navbarContainer = $('.navbar .container');

    const $projectRow = $('#proyek .row');
    const $aboutContainer = $('#tentang .container');
    const $blogContainer = $('#artikel .container');
    const $contactForm = $('#kontak form');
    const $achievementsSection = $('#prestasi');
    const $heroContainer = $('#beranda .container');

    initDarkMode();
    initBackToTop();
    initAboutToggle();
    initProjectFilter();
    initProjectModal();
    initAchievementsCounter();
    initContactValidation();
    initBlogSearch();
    initBlogDetail();
    initSmoothScroll();
    initNavbarHighlight();

    // Dark mode
    function initDarkMode() {
        const $toggle = $('<button>', {
            id: 'darkModeToggle',
            class: 'btn btn-light btn-small',
            text: 'Dark Mode'
        });

        const $wrapper = $('<div>')
        .addClass('dark-mode-wrapper d-flex align-items-center')
        .append($toggle);

        $navbarContainer.append($wrapper);

        if (localStorage.getItem('capative-dark') === 'enabled') {
            $body.addClass('dark-mode');
            $toggle.text('Light Mode');
        }

        $toggle.on('click', function () {
            $body.toggleClass('dark-mode');

            const enabled = $body.hasClass('dark-mode');
            $toggle.text(enabled ? 'Light Mode' : 'Dark Mode');

            localStorage.setItem('capative-dark', enabled ? 'enabled' : 'disabled');
        });
    }