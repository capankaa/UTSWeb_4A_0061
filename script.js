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


    // Buat tombol filter
        const $wrap = $('<div>').addClass('filter-controls');
        const $semua = createFilterBtn('Semua');

        $wrap.append($semua);
        categories.forEach(category => $wrap.append(createFilterBtn(category)));

        $projectRow.before($wrap);
        $semua.trigger('click');

        function createFilterBtn(name) {
            const $button = $('<button>')
                .addClass('btn btn-light btn-filter')
                .attr('type', 'button')
                .text(name);


            // Aksi filter
            $button.on('click', function () {
                $('.btn-filter').removeClass('active');
                $button.addClass('active');

                $cols.each(function () {
                    const text = $(this).find('.card-text').text().toLowerCase();
                    const show = name === 'Semua' || text.includes(name.toLowerCase());

                    $(this).toggle(show);
                });
            });

            return $button;
        }
    }

     // Detail proyek
function initProjectModal() {
    if ($projectRow.length === 0) return;

    const projectData = {
        'Zenny Apps': {
            category: 'Desain UI/UX',
            description: 'Zenny Apps adalah proyek desain antarmuka aplikasi pengelolaan keuangan sehari-hari dengan fokus pada pengalaman pengguna yang sederhana, modern, dan mudah dipahami.',
            result: 'Hasil proyek mencakup rancangan tampilan aplikasi, struktur navigasi, layout dashboard, dan visual interface yang responsif.'
        },
        'Keripik Usus Kreuss': {
            category: 'Desain Merek',
            description: 'Keripik Usus Kreuss merupakan proyek branding untuk produk makanan ringan lokal. Fokus desain diarahkan pada identitas visual yang menarik, mudah diingat, dan sesuai dengan karakter produk yang unik.',
            result: 'Hasil proyek mencakup konsep visual brand, desain kemasan, pemilihan warna, tipografi, dan elemen grafis pendukung.'
        },
        'Wisata Bahari Lamongan': {
            category: 'Desain Media Sosial',
            description: 'Proyek ini berfokus pada pembuatan desain media sosial untuk kebutuhan promosi Wisata Bahari Lamongan. Visual dibuat agar terlihat menarik, informatif, dan mampu meningkatkan daya tarik audiens terhadap destinasi wisata.',
            result: 'Hasil proyek mencakup desain konten promosi, layout feed, visual campaign, serta materi publikasi digital untuk media sosial.'
        },
        'Banner PPDB': {
            category: 'Desain Promosi',
            description: 'Banner PPDB adalah proyek desain promosi untuk kebutuhan penerimaan peserta didik baru. Desain dibuat dengan tampilan informatif, jelas, dan mudah dibaca agar pesan promosi tersampaikan dengan baik.',
            result: 'Hasil proyek mencakup desain banner digital, komposisi informasi, visual headline, serta elemen promosi yang siap digunakan.'
        }
    };

    // Modal detail proyek
    const $modal = $('<div>')
        .addClass('custom-modal project-detail-modal')
        .html(`
            <div class="modal-card">
                <button type="button" class="modal-close">×</button>
                <span class="project-detail-category"></span>
                <h4 class="project-detail-title">Detail Proyek</h4>
                <p class="project-detail-description"></p>
                <div class="project-detail-result"></div>
            </div>
        `)
        .appendTo($body);