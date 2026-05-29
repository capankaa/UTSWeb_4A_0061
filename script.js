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

    // Buka modal saat klik proyek
    $modal.on('click', function (e) {
        if (e.target === this) {
            $modal.removeClass('open');
        }
    });

    $modal.find('.modal-close').on('click', function () {
        $modal.removeClass('open');
    });

    // Isi konten modal berdasarkan proyek yang diklik
    $('#proyek').on('click', '.btn-primary', function () {
        const $card = $(this).closest('.card');
        const title = $card.find('.card-title').text().trim();

        const project = projectData[title] || {
            category: 'Project',
            description: 'Detail proyek belum tersedia.',
            result: 'Informasi hasil proyek belum tersedia.'
        };

        $modal.find('.project-detail-category').text(project.category);
        $modal.find('.project-detail-title').text(title);
        $modal.find('.project-detail-description').text(project.description);
        $modal.find('.project-detail-result').html(`
            <strong>Output:</strong>
            <p>${project.result}</p>
        `);

        $modal.addClass('open');
    });
}

    // Animasi counter prestasi
    function initAchievementsCounter() {
        if ($achievementsSection.length === 0) return;

        const $counters = $achievementsSection.find('h3');

        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $counters.each(function () {
                        animateCounter($(this));
                    });

                    obs.disconnect();
                }
            });
        }, { threshold: 0.5 });

        obs.observe($achievementsSection[0]);
    }

    //Animasi angka prestasi
    function animateCounter($el) {
        const target = parseInt($el.text().replace('+', ''), 10) || 0;
        let count = 0;
        const step = Math.max(1, Math.floor(target / 80));

        const interval = setInterval(() => {
            count += step;

            if (count >= target) {
                $el.text(target + '+');
                clearInterval(interval);
            } else {
                $el.text(count + '+');
            }
        }, 30);
    }


    // Validasi form kontak
    function initContactValidation() {
        if ($contactForm.length === 0) return;

        const $msg = $('<div>')
            .css('marginTop', '1rem')
            .appendTo($contactForm);

        $contactForm.on('submit', function (e) {
            e.preventDefault();

            const name = $('#name').val().trim();
            const email = $('#email').val().trim();
            const message = $('#message').val().trim();

            if (!name || !email || !message) {
                $msg.text('Semua field harus diisi.').css('color', '#dc2626');
                return;
            }

            $msg.text('Pesan berhasil dikirim. Terima kasih!').css('color', '#16a34a');
            this.reset();
        });
    }

    // Pencarian artikel
    function initBlogSearch() {
        const $blogSearch = $('#blogSearch');
        const $blogCards = $('.blog-card');

        if ($blogSearch.length === 0 || $blogCards.length === 0) return;

        $blogSearch.on('input', function () {
            const keyword = $(this).val().toLowerCase();

            $blogCards.each(function () {
                const title = $(this).find('.card-title').text().toLowerCase();
                const text = $(this).find('.card-text').text().toLowerCase();

                const isMatch = title.includes(keyword) || text.includes(keyword);

                $(this).toggle(isMatch);
            });
        });
    }

    // Modal data detail artikel
    function initBlogDetail() {
        if ($blogContainer.length === 0) return;

        const artikelData = {
    'Tips Desain Kreatif': {
        title: 'Tips Desain Kreatif',
        category: 'Tips Desain',
        description: 'Desain kreatif membantu brand terlihat lebih menarik, profesional, dan mudah diingat. Dalam membuat desain yang efektif, penting untuk memperhatikan warna, tipografi, layout, hierarki visual, dan pesan utama yang ingin disampaikan.'
    },
    'Branding yang Efektif': {
        title: 'Branding yang Efektif',
        category: 'Branding',
        description: 'Branding yang efektif adalah proses membangun identitas visual dan karakter brand secara konsisten. Mulai dari logo, warna, font, gaya komunikasi, hingga konten promosi harus memiliki arah yang sama.'
    },
    'UI/UX Trends 2026': {
        title: 'UI/UX Trends 2026',
        category: 'UI/UX Design',
        description: 'Tren UI/UX tahun 2026 berfokus pada pengalaman pengguna yang lebih sederhana, cepat, personal, dan interaktif. Desain antarmuka perlu dibuat responsif, mudah dipahami, dan nyaman digunakan.'
    }
};
        // Modal detail artikel
        const $modal = $('<div>')
            .addClass('custom-modal blog-detail-modal')
        .html(`
            <div class="modal-card">
                <button type="button" class="modal-close">×</button>
                <span class="blog-detail-category"></span>
                <h4 class="blog-detail-title">Detail Artikel</h4>
                <p class="blog-detail-description"></p>
            </div>
        `)
            .appendTo($body);

            //Interaksi buka modal saat klik artikel
            $modal.on('click', function (e) {
            if (e.target === this) {
                $modal.removeClass('open');
            }
        });

        $modal.find('.modal-close').on('click', function () {
            $modal.removeClass('open');
        });


        //Konten modal berdasarkan artikel yang diklik
        $('#artikel').on('click', '.blog-detail-btn', function (e) {
            e.preventDefault();

            const $card = $(this).closest('.blog-card');
            const blogTitle = $card.find('.card-title').text().trim();

            const artikel = artikelData[blogTitle] || {
                title: blogTitle,
                description: 'Detail artikel belum tersedia.'
            };

            $modal.find('.blog-detail-category').text(artikel.category);
            $modal.find('.blog-detail-title').text(artikel.title);
            $modal.find('.blog-detail-description').text(artikel.description);
            $modal.addClass('open');
        });
    }