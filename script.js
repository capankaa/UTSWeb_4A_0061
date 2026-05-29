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