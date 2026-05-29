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

    // Back to top
    function initBackToTop() {
        const $btn = $('<button>', {
            id: 'backToTop',
            type: 'button',
            text: '↑'
        }).appendTo($body);

        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 300) {
                $btn.addClass('show');
            } else {
                $btn.removeClass('show');
            }
        });

        $btn.on('click', function () {
            $('html, body').animate({ scrollTop: 0 }, 600);
        });
    }

    // Filter proyek berdasarkan kategori
    function initProjectFilter() {
        if ($projectRow.length === 0) return;

        const $cols = $projectRow.find('.col');
        const categories = new Set();

        $cols.each(function () {
            const text = $(this).find('.card-text').text() || '';
            const match = text.match(/Kategori:\s*(.*)/i);

            if (match) {
                categories.add(match[1].trim());
            }
        });