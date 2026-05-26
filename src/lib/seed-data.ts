export interface SeedCourse {
  id: string; title: string; slug: string; description: string; level: string; type: string; status: string; category_id: string; sort_order: number; created_at: string;
}
export interface SeedChapter {
  id: string; course_id: string; title: string; sort_order: number;
}
export interface SeedLesson {
  id: string; chapter_id: string; title: string; content: string; duration: number; sort_order: number;
}

const cat = { frontend: "cat-frontend", backend: "cat-backend", ai: "cat-ai", devops: "cat-devops" };

const catData = [
  { id: cat.frontend, title: "Frontend Development", description: "Bangun interface modern dengan framework terkini.", icon: "Monitor", slug: "frontend-development", sort_order: 0 },
  { id: cat.backend, title: "Backend Development", description: "Kuasai server-side programming dan database.", icon: "Server", slug: "backend-development", sort_order: 1 },
  { id: cat.ai, title: "AI Programming", description: "Integrasikan AI ke dalam workflow development.", icon: "Brain", slug: "ai-programming", sort_order: 2 },
  { id: cat.devops, title: "DevOps & Deploy", description: "Deploy aplikasi dengan confidence.", icon: "Container", slug: "devops-deploy", sort_order: 3 },
];

function t(d: string) { return JSON.stringify({ type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: d }] }] }); }

export function getSeedData() {
  let orderCounter = 0;
  const c = (id: string, title: string, desc: string, level: string, type: string, catId: string) => ({
    id, title, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), description: t(desc), level, type, status: "published" as const, category_id: catId, sort_order: orderCounter++, created_at: new Date(Date.now() - Math.random() * 30 * 86400000).toISOString(),
  });

  const ch = (id: string, courseId: string, title: string, sort: number) => ({ id, course_id: courseId, title, sort_order: sort });
  const ls = (id: string, chapterId: string, title: string, content: string, duration: number, sort: number) => ({ id, chapter_id: chapterId, title, content, duration, sort_order: sort });

  const courses: SeedCourse[] = [
    c("c1", "HTML Dasar", "Pelajari fundamental HTML — bahasa markup dasar pembangun seluruh halaman web. Dari struktur dokumen hingga semantic HTML modern.", "Beginner", "free", cat.frontend),
    c("c2", "CSS Modern", "Kuasai CSS dari dasar hingga modern layout dengan Flexbox, Grid, dan CSS Variables untuk membangun interface yang responsif.", "Beginner", "free", cat.frontend),
    c("c3", "Tailwind CSS", "Utility-first CSS framework yang mempercepat 10x workflow styling kamu. Cocok untuk developer yang ingin produktif.", "Beginner", "free", cat.frontend),
    c("c4", "JavaScript Fundamental", "Pahami JavaScript dari nol hingga mahir. Mulai dari variabel, function, DOM, hingga konsep modern ES6+.", "Intermediate", "free", cat.frontend),
    c("c5", "React.js Modern", "Framework UI paling populer. Pelajari komponen, hooks, state management, dan best practice React modern.", "Intermediate", "premium", cat.frontend),
    c("c6", "Next.js Fullstack", "Framework React production-grade dengan App Router, Server Components, dan API routes. Dari development ke deployment.", "Intermediate", "premium", cat.frontend),
    c("c7", "TypeScript untuk Developer", "Tingkatkan kualitas kode dengan TypeScript. Static typing, generic, utility types, dan integrasi dengan React.", "Intermediate", "premium", cat.frontend),
    c("c8", "Node.js Backend", "Bangun REST API dan backend service dengan Node.js, Express, autentikasi JWT, dan koneksi database.", "Intermediate", "premium", cat.backend),
    c("c9", "PostgreSQL Dasar", "Database relational paling powerful. Pelajari SQL, indexing, query optimization, dan database design.", "Beginner", "free", cat.backend),
    c("c10", "Prisma ORM", "Modern ORM untuk TypeScript & Node.js. Schema-driven development dengan auto-generate type-safe client.", "Intermediate", "premium", cat.backend),
    c("c11", "Docker untuk Programmer", "Containerization dari nol. Build, ship, dan run aplikasi di mana saja dengan Docker & Docker Compose.", "Advanced", "premium", cat.devops),
    c("c12", "AI untuk Developer", "Integrasikan AI ke dalam aplikasi. OpenAI API, vector embeddings, RAG, dan AI-powered features.", "Intermediate", "premium", cat.ai),
  ];

  const coursesMap = Object.fromEntries(courses.map(c => [c.id, c]));

  const chapterDefs: { id: string; courseId: string; title: string; lessons: { title: string; content: string; duration: number }[] }[] = [
    // HTML Dasar
    { id: "ch1-1", courseId: "c1", title: "Pengenalan HTML", lessons: [
      { title: "Apa Itu HTML", content: t("HyperText Markup Language (HTML) adalah bahasa markup standar untuk membuat halaman web. HTML menggunakan tag-tag khusus yang memberi tahu browser bagaimana cara menampilkan konten. Setiap website yang pernah kamu kunjungi pasti menggunakan HTML sebagai fondasi utamanya. HTML terdiri dari elemen-elemen yang dibungkus dalam tag, seperti <h1> untuk heading, <p> untuk paragraf, dan <a> untuk link."), duration: 6 },
      { title: "Sejarah HTML", content: t("HTML pertama kali diciptakan oleh Tim Berners-Lee pada tahun 1991 sebagai solusi untuk berbagi dokumen ilmiah di antara rekan-rekannya di CERN. Versi HTML 2.0 dirilis sebagai standar pada 1995. HTML 3.2 (1997) menambahkan tabel dan scripting. HTML 4.01 (1999) menjadi standar utama. Pada 2014, HTML5 hadir dengan dukungan multimedia native, semantic elements, dan API modern."), duration: 5 },
      { title: "Tools Belajar HTML", content: t("Untuk memulai belajar HTML, kamu hanya butuh dua hal: text editor dan browser. Rekomendasi tools: 1) VS Code - editor paling populer dengan banyak ekstensi. 2) Live Server - ekstensi VS Code untuk auto-reload. 3) Chrome DevTools - inspeksi elemen dan debugging. 4) CodePen - platform untuk menulis dan membagikan kode HTML/CSS/JS secara online. 5) MDN Web Docs - referensi utama untuk dokumentasi HTML."), duration: 4 },
      { title: "Menjalankan File HTML", content: t("HTML adalah bahasa markup yang dijalankan di browser. Untuk menjalankan HTML: 1) Buat file dengan ekstensi .html menggunakan text editor. 2) Tulis kode HTML di dalamnya. 3) Klik dua kali file tersebut, atau buka via browser. Cara lebih nyaman: gunakan VS Code dengan ekstensi Live Server untuk auto-reload setiap kali file disimpan."), duration: 5 },
    ]},
    { id: "ch1-2", courseId: "c1", title: "Struktur Dasar HTML", lessons: [
      { title: "Struktur HTML Dasar", content: t("Setiap dokumen HTML memiliki kerangka dasar yang tetap. Dimulai dengan deklarasi <!DOCTYPE html> yang memberi tahu browser versi HTML yang digunakan. Kemudian tag <html> sebagai root element. Di dalamnya terdapat dua cabang utama: <head> dan <body>. Struktur yang benar memastikan kompatibilitas dan SEO yang baik."), duration: 7 },
      { title: "Head dan Body", content: t("Bagian <head> berisi metadata yang tidak tampil langsung di halaman, seperti judul halaman (title), karakter encoding (meta charset), link ke CSS, dan informasi untuk search engine. Bagian <body> berisi semua konten yang akan dilihat pengguna: teks, gambar, video, form, dan elemen visual lainnya."), duration: 6 },
      { title: "Title dan Meta Tag", content: t("Tag <title> menentukan judul halaman yang tampil di tab browser dan hasil pencarian Google. Meta tag seperti <meta charset=\"UTF-8\"> memastikan huruf dan simbol ditampilkan dengan benar. <meta name=\"description\"> memberikan deskripsi yang tampil di hasil pencarian. <meta name=\"viewport\"> penting untuk tampilan mobile."), duration: 5 },
      { title: "Komentar di HTML", content: t("Komentar HTML ditulis dengan <!-- teks komentar --> dan tidak akan tampil di halaman web. Komentar berguna untuk memberi catatan pada kode, menonaktifkan sementara bagian kode, menjelaskan fungsi suatu bagian, atau membagi kode menjadi seksi-seksi. Komentar hanya terlihat di source code."), duration: 4 },
    ]},
    { id: "ch1-3", courseId: "c1", title: "Text dan Heading", lessons: [
      { title: "Heading HTML", content: t("HTML menyediakan enam level heading dari <h1> (paling penting) hingga <h6>. <h1> digunakan untuk judul utama halaman, hanya boleh satu per halaman untuk SEO. <h2> untuk sub-judul, <h3> untuk sub-bagian, dan seterusnya. Heading membantu search engine memahami struktur konten."), duration: 6 },
      { title: "Paragraph HTML", content: t("Tag <p> digunakan untuk membuat paragraf teks. Browser secara otomatis menambahkan margin di atas dan bawah setiap paragraf. Paragraf bisa berisi teks, gambar, link, atau elemen inline lainnya. Gunakan tag <br> untuk membuat baris baru dalam paragraf."), duration: 5 },
      { title: "Bold, Italic, Underline", content: t("HTML memiliki beberapa tag untuk formatting teks: <b> atau <strong> untuk teks tebal (bold), <i> atau <em> untuk teks miring (italic), <u> untuk underline, <s> untuk coretan, <mark> untuk menyorot teks. <strong> dan <em> memiliki makna semantik, sementara <b> dan <i> hanya visual."), duration: 5 },
      { title: "Line Break dan Horizontal Line", content: t("Tag <br> (line break) digunakan untuk memutus baris dalam teks tanpa memulai paragraf baru. Tag <hr> (horizontal rule) membuat garis horizontal yang menandakan pemisahan konten. Keduanya self-closing tag dan sering digunakan untuk memperbaiki struktur visual teks."), duration: 4 },
    ]},
    { id: "ch1-4", courseId: "c1", title: "Link dan Navigation", lessons: [
      { title: "Membuat Link", content: t("Link dibuat dengan tag <a> (anchor) dan atribut href yang menentukan URL tujuan. Teks di antara tag pembuka dan penutup adalah teks yang tampil sebagai link. Link bisa menuju halaman web lain, file, alamat email (mailto:), atau nomor telepon (tel:). Gunakan teks yang deskriptif untuk aksesibilitas."), duration: 6 },
      { title: "Link Internal dan External", content: t("Link internal menuju ke halaman dalam website yang sama menggunakan path relatif. Link external menuju website lain dengan URL lengkap. Atribut target=\"_blank\" membuka link di tab baru. Untuk SEO, link external sebaiknya menggunakan rel=\"noopener noreferrer\" untuk keamanan."), duration: 5 },
      { title: "Navigation Menu", content: t("Navigation menu adalah kumpulan link yang memudahkan pengguna berpindah antar halaman. Struktur umum menggunakan <nav> (semantic element) yang berisi daftar link: <ul> atau <ol> dengan item <a>. Navigation bisa horizontal (navbar atas) atau vertikal (sidebar)."), duration: 7 },
      { title: "Anchor Link", content: t("Anchor link memungkinkan pengguna melompat ke bagian tertentu dalam halaman. Buat target dengan atribut id: <h2 id=\"contact\">Kontak</h2>. Buat link dengan href=\"#contact\". Ini berguna untuk halaman panjang seperti dokumentasi, FAQ, atau landing page."), duration: 5 },
    ]},
    { id: "ch1-5", courseId: "c1", title: "Image dan Multimedia", lessons: [
      { title: "Menampilkan Gambar", content: t("Tag <img> digunakan untuk menampilkan gambar. Atribut src menentukan path file gambar. Atribut alt memberikan teks alternatif yang muncul jika gambar gagal dimuat dan digunakan oleh screen reader. Gambar bisa berformat JPEG, PNG, GIF, WebP, atau SVG."), duration: 6 },
      { title: "Mengatur Ukuran Gambar", content: t("Ukuran gambar diatur dengan atribut width dan height (dalam pixel) atau dengan CSS. CSS lebih fleksibel: img { max-width: 100%; height: auto; } membuat gambar menyesuaikan lebar container. Untuk gambar responsif, gunakan tag <picture> atau atribut srcset."), duration: 5 },
      { title: "Audio HTML", content: t("Tag <audio> digunakan untuk menambahkan audio ke halaman web. Atribut controls menampilkan kontrol play/pause/volume. Dukungan format: MP3 (didukung semua browser), OGG, WAV. Gunakan atribut preload=\"metadata\" untuk memuat informasi file tanpa mengunduh semuanya."), duration: 5 },
      { title: "Video HTML", content: t("Tag <video> menambahkan video ke halaman web. Atribut utama: controls, autoplay, loop, poster (gambar thumbnail). Format didukung: MP4 (H.264), WebM, OGG. Embed YouTube gunakan <iframe>. Selalu sediakan teks fallback untuk browser yang tidak mendukung."), duration: 6 },
    ]},
    { id: "ch1-6", courseId: "c1", title: "List HTML", lessons: [
      { title: "Ordered List", content: t("Ordered list (daftar terurut) digunakan untuk item yang memiliki urutan penting. Tag <ol> membungkus item-item <li>. Atribut type mengubah gaya penomoran: 1 (angka), A (huruf), I (Romawi). Atribut start menentukan angka awal. Atribut reversed membalik urutan."), duration: 5 },
      { title: "Unordered List", content: t("Unordered list (daftar tidak terurut) digunakan untuk item yang urutannya tidak penting. Tag <ul> membungkus item-item <li>. CSS list-style-type mengubah gaya bullet: disc, circle, square, atau none. Unordered list sering digunakan untuk navigasi menu."), duration: 5 },
      { title: "Nested List", content: t("Nested list adalah daftar di dalam daftar, digunakan untuk hierarki data. Letakkan <ul> atau <ol> baru di dalam <li>. Nested list bisa dikombinasikan - <ol> di dalam <ul> atau sebaliknya. HTML secara otomatis mengindentasi level yang lebih dalam."), duration: 6 },
      { title: "Menu dengan List", content: t("List HTML adalah fondasi untuk membuat menu navigasi. Struktur <ul> dengan <li> dan <a> di dalamnya. Dengan CSS, ubah tampilan horizontal: display: flex; list-style: none;. Dropdown menu menggunakan nested list."), duration: 5 },
    ]},
    { id: "ch1-7", courseId: "c1", title: "Table HTML", lessons: [
      { title: "Struktur Table", content: t("Table HTML dibuat dengan tag <table>. Struktur dasar: <tr> (table row) untuk baris, <th> (table header) untuk sel header, <td> (table data) untuk sel data. Untuk tabel besar, gunakan <thead>, <tbody>, dan <tfoot> untuk struktur semantik."), duration: 7 },
      { title: "Colspan dan Rowspan", content: t("Colspan menggabungkan beberapa kolom menjadi satu: <td colspan=\"2\">. Rowspan menggabungkan beberapa baris: <td rowspan=\"3\">. Berguna untuk header yang mencakup beberapa kolom. Perhatikan bahwa colspan/rowspan mengubah jumlah sel di baris/kolom terkait."), duration: 6 },
      { title: "Styling Table Dasar", content: t("Table bisa di-style dengan CSS. Properti umum: border-collapse: collapse, border, padding, background-color, text-align. Gaya zebra-striping: CSS pseudo-class :nth-child(even) untuk warna bergantian per baris."), duration: 5 },
      { title: "Membuat Table Data", content: t("Table data digunakan untuk menampilkan data terstruktur seperti daftar siswa, laporan keuangan, atau jadwal. Langkah: 1) Tentukan kolom. 2) Baris pertama sebagai header. 3) Baris berikutnya sebagai data. 4) Gunakan scope pada <th> untuk aksesibilitas."), duration: 7 },
    ]},
    { id: "ch1-8", courseId: "c1", title: "Form HTML", lessons: [
      { title: "Input Text", content: t("Tag <input> adalah elemen form paling serbaguna. Atribut type menentukan jenis input: text, email, password, number, date, url. Atribut placeholder memberikan petunjuk. Atribut required memastikan input diisi. Setiap input sebaiknya memiliki <label> yang terasosiasi."), duration: 6 },
      { title: "Textarea", content: t("Tag <textarea> digunakan untuk input teks multi-baris, seperti komentar atau pesan. Atribut rows dan cols mengatur ukuran awal, tapi sebaiknya diatur dengan CSS. CSS resize: none mencegah user mengubah ukuran textarea."), duration: 5 },
      { title: "Radio dan Checkbox", content: t("Radio button (type=\"radio\") untuk pilihan satu dari beberapa opsi. Semua radio dalam grup harus memiliki name yang sama. Checkbox (type=\"checkbox\") untuk pilihan multiple atau boolean. Atribut checked menandai opsi default terpilih."), duration: 6 },
      { title: "Submit Button", content: t("Tombol submit mengirim data form ke server. Dibuat dengan <button type=\"submit\"> atau <input type=\"submit\">. Atribut action pada <form> menentukan URL tujuan data. Atribut method menentukan HTTP method: GET atau POST."), duration: 5 },
    ]},
    { id: "ch1-9", courseId: "c1", title: "Semantic HTML", lessons: [
      { title: "Semantic Element", content: t("Semantic HTML menggunakan tag yang memiliki makna: <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>. Keuntungan: SEO lebih baik, aksesibilitas meningkat, kode lebih mudah dibaca, dan membantu screen reader memahami struktur halaman."), duration: 7 },
      { title: "Layout Website Modern", content: t("Layout modern menggunakan semantic elements dan CSS Flexbox/Grid. Struktur umum: <header> untuk logo + navigasi, <main> untuk konten utama, <aside> untuk sidebar, <footer> untuk copyright. Hindari penggunaan <div> berlebihan untuk layout."), duration: 8 },
      { title: "Accessibility Dasar", content: t("Accessibility memastikan website bisa digunakan oleh semua orang. Praktik dasar: gunakan semantic HTML, tambahkan alt text pada gambar, gunakan heading hierarkis, pastikan kontras warna cukup, buat form dengan <label>, dukung navigasi keyboard."), duration: 6 },
      { title: "Best Practice HTML", content: t("Best practice HTML: 1) Gunakan <!DOCTYPE html>. 2) Lowercase untuk tag dan atribut. 3) Tutup semua tag. 4) Gunakan kutip pada nilai atribut. 5) Indentasi rapi. 6) Prioritaskan semantic elements. 7) Validasi kode. 8) Optimalkan performa."), duration: 6 },
    ]},
    { id: "ch1-10", courseId: "c1", title: "Mini Project", lessons: [
      { title: "Membuat Biodata Website", content: t("Project pertama: buat halaman biodata pribadi menggunakan HTML. Struktur: header dengan foto profil dan nama, section tentang saya, pendidikan, pengalaman, dan kontak. Gunakan heading, paragraf, gambar, list, dan link. Project ini melatih kemampuan membuat struktur halaman HTML."), duration: 10 },
      { title: "Membuat Landing Page", content: t("Project kedua: buat landing page sederhana untuk sebuah produk. Struktur: nav dengan menu, hero section, features section, testimonials, pricing table, contact form, dan footer. Landing page harus memiliki satu halaman dengan anchor link navigasi."), duration: 12 },
      { title: "Membuat Portfolio HTML", content: t("Project ketiga: buat halaman portfolio. Struktur: navbar fixed, hero section, about section, skills section, projects section, blog section, contact section, dan footer. Gunakan table untuk timeline pengalaman. Pastikan semua link dan navigasi berfungsi."), duration: 12 },
      { title: "Final Review", content: t("Review akhir dari semua materi HTML. Uji pemahaman: struktur dokumen HTML, perbedaan div dan section, kapan menggunakan ol vs ul, fungsi atribut alt, cara membuat anchor link, jenis input form, colspan/rowspan. Pastikan bisa menjawab semua sebelum lanjut ke CSS."), duration: 8 },
    ]},
    // CSS Modern
    { id: "ch2-1", courseId: "c2", title: "CSS Dasar", lessons: [
      { title: "Apa itu CSS?", content: t("Cascading Style Sheets (CSS) adalah bahasa untuk mendesain tampilan halaman web. CSS mengontrol layout, warna, font, dan responsivitas. Tanpa CSS, web hanya berupa teks polos."), duration: 5 },
      { title: "Selector & Specificity", content: t("Selector CSS menentukan elemen mana yang akan di-style. Mulai dari element selector, class (.), id (#), hingga combinator. Specificity menentukan prioritas rule ketika terjadi konflik."), duration: 8 },
      { title: "Box Model", content: t("Setiap elemen HTML adalah box yang terdiri dari content, padding, border, dan margin. Memahami box model adalah kunci untuk mengontrol layout dan spacing dengan presisi."), duration: 7 },
      { title: "Warna & Typography", content: t("CSS menyediakan berbagai cara mendefinisikan warna: hex, rgb, hsl. Untuk tipografi, atur font-family, font-size, line-height, dan letter-spacing untuk readability optimal."), duration: 6 },
    ]},
    { id: "ch2-2", courseId: "c2", title: "CSS Layout", lessons: [
      { title: "Flexbox", content: t("Flexbox adalah layout model 1 dimensi yang memudahkan pengaturan elemen dalam baris atau kolom. Sempurna untuk navigasi, card grid, dan centering."), duration: 10 },
      { title: "CSS Grid", content: t("Grid adalah layout model 2 dimensi yang memberikan kontrol penuh atas baris dan kolom. Ideal untuk layout halaman kompleks dan dashboard."), duration: 12 },
      { title: "Positioning", content: t("Properti position (static, relative, absolute, fixed, sticky) mengontrol bagaimana elemen diposisikan dalam dokumen. Kombinasikan dengan top, right, bottom, left."), duration: 8 },
      { title: "Responsive Design", content: t("Media queries memungkinkan CSS beradaptasi dengan ukuran layar. Gunakan breakpoint, relative units (em, rem, %), dan mobile-first approach."), duration: 9 },
    ]},
    { id: "ch2-3", courseId: "c2", title: "CSS Modern Features", lessons: [
      { title: "CSS Variables", content: t("Custom properties (CSS Variables) menyimpan nilai yang bisa digunakan ulang di seluruh stylesheet. Ubah tema dengan mudah melalui --primary-color, --spacing, dll."), duration: 6 },
      { title: "Animasi & Transition", content: t("Transition untuk perubahan halus antar state. @keyframes untuk animasi kompleks. Timing functions (ease, linear, cubic-bezier) mengontrol kecepatan animasi."), duration: 10 },
      { title: "Pseudo-classes & Elements", content: t("Pseudo-classes seperti :hover, :focus, :nth-child() menarget elemen berdasarkan state. Pseudo-elements ::before, ::after untuk konten dekoratif tanpa HTML tambahan."), duration: 8 },
      { title: "CSS Modern: Container Queries", content: t("Container queries memungkinkan styling berdasarkan ukuran container, bukan viewport. Game changer untuk komponen reusable yang adaptif."), duration: 7 },
    ]},
    // Tailwind CSS
    { id: "ch3-1", courseId: "c3", title: "Setup & Konsep", lessons: [
      { title: "Apa itu Tailwind?", content: t("Tailwind CSS adalah utility-first framework yang menyediakan class atomic siap pakai. Berbeda dengan Bootstrap, Tailwind memberikan kontrol penuh tanpa overriding style."), duration: 6 },
      { title: "Instalasi & Konfigurasi", content: t("Instal melalui npm atau CDN. Konfigurasi via tailwind.config.js untuk custom theme, colors, spacing, dan breakpoints sesuai kebutuhan project."), duration: 8 },
      { title: "Utility-First Workflow", content: t("Bangun UI langsung di HTML dengan kombinasi utility classes. Contoh: class=\"flex items-center justify-between p-4 bg-white rounded-lg shadow-md\"."), duration: 7 },
      { title: "Custom Theme & Design Tokens", content: t("Tailwind menggunakan design tokens terpusat. Kustomisasi warna, font, spacing, dan breakpoints di konfigurasi untuk konsistensi di seluruh project."), duration: 9 },
    ]},
    { id: "ch3-2", courseId: "c3", title: "Utility Classes", lessons: [
      { title: "Layout & Spacing", content: t("Flexbox (flex, items-center, justify-between), Grid (grid, grid-cols-3, gap-4), dan spacing (p-4, m-2, space-y-3) untuk layout cepat dan konsisten."), duration: 8 },
      { title: "Typography & Colors", content: t("Text styling (text-sm, font-bold, leading-relaxed) dan color system (text-primary, bg-blue-500, border-gray-200). Dark mode dengan class dark:"), duration: 7 },
      { title: "Responsive & State Variants", content: t("Prefix responsive (sm:, md:, lg:) dan state (hover:, focus:, active:, group-hover:) untuk adaptasi di berbagai ukuran layar dan interaksi."), duration: 8 },
      { title: "Components & Reusability", content: t("Gunakan @apply di file CSS untuk membuat komponen kustom. Atau manfaatkan framework seperti Headless UI + Tailwind untuk komponen interaktif."), duration: 6 },
    ]},
    { id: "ch3-3", courseId: "c3", title: "Responsive & Custom", lessons: [
      { title: "Mobile-First dengan Tailwind", content: t("Tailwind menggunakan pendekatan mobile-first. Tulis style untuk mobile dulu, lalu tambahkan variant sm:, md:, lg: untuk layar lebih besar."), duration: 7 },
      { title: "Dark Mode", content: t("Aktifkan darkMode di config, lalu gunakan class dark: untuk variant gelap. Bisa berdasarkan class strategy atau media system preference."), duration: 6 },
      { title: "Custom Plugins & Utilities", content: t("Buat plugin Tailwind kustom untuk utilities tambahan. Contoh: text-shadow, scrollbar-hide, atau pattern background yang digunakan berulang."), duration: 8 },
      { title: "Optimasi Production", content: t("Tailwind otomatis purge unused CSS di production. Konfigurasi content paths agar file yang benar-benar digunakan terdeteksi. Hasil akhir bisa di bawah 10KB."), duration: 5 },
    ]},
    // JavaScript Fundamental
    { id: "ch4-1", courseId: "c4", title: "Dasar JavaScript", lessons: [
      { title: "Variabel & Tipe Data", content: t("JavaScript memiliki var, let, const. Tipe data: string, number, boolean, null, undefined, symbol, dan object. Pahami perbedaan let dan const untuk mutable vs immutable."), duration: 8 },
      { title: "Operator & Ekspresi", content: t("Operator aritmatika (+, -, *, /), perbandingan (===, !==, >, <), logika (&&, ||, !), dan ternary. Coercion dan strict equality dengan ===."), duration: 7 },
      { title: "Conditional & Looping", content: t("if/else, switch, ternary untuk percabangan. for, while, do/while untuk perulangan. Array methods seperti forEach, map, filter sebagai alternatif modern."), duration: 9 },
      { title: "Array & Object", content: t("Array untuk koleksi data terurut. Object untuk key-value pairs. Spread operator, destructuring, dan method bawaan seperti push, pop, find, reduce."), duration: 10 },
      { title: "String & Number Methods", content: t("Method string: toUpperCase, split, includes, template literals. Method number: parseInt, toFixed, Math methods. Handle edge cases dengan NaN check."), duration: 6 },
    ]},
    { id: "ch4-2", courseId: "c4", title: "Function & Scope", lessons: [
      { title: "Function Declaration & Expression", content: t("Function classic vs arrow function. Parameter, default value, rest parameters. Return value dan side effects. First-class function sebagai nilai."), duration: 8 },
      { title: "Scope & Closure", content: t("Global scope, function scope, block scope dengan let/const. Closure adalah function yang mengingat scope saat dibuat. Powerful untuk data privacy dan currying."), duration: 10 },
      { title: "Hoisting & TDZ", content: t("Hoisting: deklarasi function dan var diangkat ke atas scope. Temporal Dead Zone (TDZ) untuk let/const. Pahami urutan eksekusi JavaScript."), duration: 7 },
      { title: "Callback & Higher Order Function", content: t("Callback adalah function yang dikirim sebagai argumen. Higher-order function menerima atau mengembalikan function. Map, filter, reduce adalah contoh HOF."), duration: 9 },
    ]},
    { id: "ch4-3", courseId: "c4", title: "DOM Manipulation", lessons: [
      { title: "Document Object Model", content: t("DOM adalah representasi HTML sebagai tree structure. JavaScript bisa memanipulasi DOM: mengubah konten, styling, menambah/menghapus elemen."), duration: 8 },
      { title: "Selecting & Traversing", content: t("querySelector, getElementById untuk seleksi. parentElement, children, nextSibling untuk traversing. Pilih method paling efisien untuk use case."), duration: 7 },
      { title: "Event Handling", content: t("addEventListener untuk merespon klik, submit, keydown, dll. Event object, preventDefault, stopPropagation. Event delegation untuk performa."), duration: 9 },
      { title: "DOM Manipulation Lanjutan", content: t("createElement, appendChild, innerHTML vs textContent. ClassList API untuk styling dinamis. Data attributes untuk menyimpan data di HTML."), duration: 8 },
    ]},
    { id: "ch4-4", courseId: "c4", title: "Modern JavaScript (ES6+)", lessons: [
      { title: "Arrow Function & Template Literal", content: t("Arrow function: syntax ringkas, lexical this. Template literal untuk string multi-baris dan interpolasi ekspresi JavaScript dengan ${}."), duration: 6 },
      { title: "Destructuring & Spread", content: t("Destructuring array dan object untuk ekstraksi data cepat. Spread operator (...) untuk copy, merge, dan pass arguments dengan fleksibel."), duration: 7 },
      { title: "Promise & Async/Await", content: t("Promise untuk operasi asinkron. then/catch chaining. Async/await sebagai syntactic sugar. Error handling dengan try/catch pada async function."), duration: 10 },
      { title: "Modules & Import/Export", content: t("ES Modules dengan export/import untuk organisasi kode. Default vs named export. Dynamic import untuk lazy loading. Import maps."), duration: 8 },
    ]},
    // React.js Modern
    { id: "ch5-1", courseId: "c5", title: "React Dasar", lessons: [
      { title: "Apa itu React?", content: t("React adalah library UI deklaratif berbasis komponen. Virtual DOM untuk performa tinggi. React murni untuk UI, urusan lain diurus ecosystem."), duration: 6 },
      { title: "JSX & Rendering", content: t("JSX adalah syntax extension JavaScript mirip HTML. Setiap komponen React me-return JSX. Conditional rendering dengan ternary atau &&."), duration: 8 },
      { title: "Komponen & Props", content: t("Komponen adalah function yang me-return JSX. Props adalah argumen yang dikirim ke komponen. Props bersifat read-only (one-way data flow)."), duration: 7 },
      { title: "State dengan useState", content: t("useState adalah Hook untuk state lokal. State menyebabkan re-render ketika berubah. Aturan: jangan memodifikasi state langsung, gunakan setter."), duration: 9 },
      { title: "Event Handling di React", content: t("Event handler di React ditulis camelCase (onClick, onSubmit). SyntheticEvent wrapper untuk cross-browser. Passing arguments ke event handler."), duration: 6 },
    ]},
    { id: "ch5-2", courseId: "c5", title: "Components & Props", lessons: [
      { title: "Component Composition", content: t("Komposisi komponen adalah fondasi React. Anak komponen diakses via props.children. Pattern Container vs Presentational untuk pemisahan logika."), duration: 7 },
      { title: "Conditional Rendering", content: t("Render berdasarkan kondisi dengan if, ternary, &&. Guard clause untuk loading/error state. Fragment <>...</> untuk render multiple elemen tanpa wrapper."), duration: 6 },
      { title: "List & Key", content: t("Render list dengan map(). Key unik membantu React mengidentifikasi elemen yang berubah. Hindari index sebagai key jika list bisa berubah urutan."), duration: 5 },
      { title: "Lifting State Up", content: t("Ketika dua komponen perlu berbagi state, angkat state ke parent terdekat. Props drilling bisa diatasi dengan Context atau state management."), duration: 8 },
    ]},
    { id: "ch5-3", courseId: "c5", title: "React Hooks", lessons: [
      { title: "useEffect & Lifecycle", content: t("useEffect untuk side effects: fetch data, subscription, DOM manipulation. Dependencies array mengontrol kapan efek dijalankan. Cleanup function."), duration: 10 },
      { title: "useRef & DOM Access", content: t("useRef menyimpan nilai yang persisten antar render tanpa trigger re-render. Akses DOM element langsung, simpan previous state, atau interval ID."), duration: 7 },
      { title: "useMemo & useCallback", content: t("Optimasi performa dengan memoization. useMemo untuk nilai kalkulasi berat. useCallback untuk referensi function stabil. Jangan gunakan berlebihan."), duration: 8 },
      { title: "Custom Hooks", content: t("Custom Hook adalah function JavaScript yang menggunakan Hook. Ekstrak logika berulang ke custom hook. Nama harus diawali use. Contoh: useLocalStorage, useDebounce."), duration: 9 },
      { title: "useReducer untuk State Complex", content: t("useReducer alternatif useState untuk state logic kompleks. Reducer function menerima state dan action, mengembalikan state baru. Cocok untuk form multi-step."), duration: 8 },
    ]},
    { id: "ch5-4", courseId: "c5", title: "State Management", lessons: [
      { title: "React Context", content: t("Context API untuk state global tanpa props drilling. createContext, Provider, useContext. Cocok untuk theme, auth, locale. Hati-hati dengan re-render."), duration: 8 },
      { title: "Zustand (Lightweight State)", content: t("Zustand adalah state management minimalis. create store dengan set/get. Selector untuk optimasi re-render. Middleware untuk persist dan devtools."), duration: 7 },
      { title: "React Query / TanStack Query", content: t("Library untuk server state. Cache, refetch, pagination, optimistic update built-in. Kurangi boilerplate fetch data manual dengan useQuery dan useMutation."), duration: 10 },
      { title: "Form Management dengan React Hook Form", content: t("React Hook Form untuk performa form. Uncontrolled component approach, validasi dengan Zod/Yup, integrasi dengan UI library."), duration: 9 },
    ]},
    // Next.js Fullstack
    { id: "ch6-1", courseId: "c6", title: "App Router", lessons: [
      { title: "Apa itu Next.js?", content: t("Next.js adalah React framework untuk production. Server-side rendering, static generation, API routes, dan file-system routing out of the box."), duration: 6 },
      { title: "File-based Routing", content: t("App Router menggunakan folder structure. Pages, layouts, loading, error, dan not-found files. Dynamic routes dengan [param]. Group routes dengan (group)."), duration: 9 },
      { title: "Layout & Template", content: t("Layout membungkus halaman dan persist antar navigasi. Template membuat ulang tiap navigasi. Nested layout untuk hierarki UI konsisten."), duration: 7 },
      { title: "Server & Client Components", content: t("By default semua komponen adalah Server Component. 'use client' untuk interaktivitas. Pilih yang tepat: Server untuk data fetching, Client untuk interaksi."), duration: 10 },
      { title: "Loading & Error UI", content: t("loading.tsx untuk Suspense fallback. error.tsx untuk error boundary. not-found.tsx untuk 404. Stream rendering dengan loading segment."), duration: 7 },
    ]},
    { id: "ch6-2", courseId: "c6", title: "Data Fetching", lessons: [
      { title: "Server-side Data Fetching", content: t("Fetch data langsung di Server Component dengan async/await. Tidak perlu useEffect. Fetch cache otomatis, revalidate dengan ISR atau on-demand."), duration: 8 },
      { title: "Client-side Fetching", content: t("Data fetching di Client Component dengan useEffect + fetch atau library seperti SWR/TanStack Query. Loading state manual diperlukan."), duration: 7 },
      { title: "Server Actions", content: t("Server Actions adalah function yang jalan di server. Form submission langsung panggil Server Action. Revalidate data tanpa API route."), duration: 9 },
      { title: "Incremental Static Regeneration", content: t("ISR menggabungkan static generation dengan update real-time. Halaman di-build statis, lalu di-revalidate periodik atau on-demand. Best of both worlds."), duration: 8 },
    ]},
    { id: "ch6-3", courseId: "c6", title: "API Routes", lessons: [
      { title: "Route Handlers", content: t("Route Handlers (route.ts) untuk API endpoints. GET, POST, PUT, DELETE. Request/Response Web API standar. gRPC dan WebSocket juga bisa."), duration: 7 },
      { title: "Middleware & Auth", content: t("Middleware.ts untuk request interception. Auth check, redirect, rewrite. Edge runtime untuk performa maksimal. Supabase Auth integration."), duration: 9 },
      { title: "Database Integration", content: t("Koneksi database di server component atau route handler. Prisma, Drizzle, atau Supabase SDK. Connection pooling untuk production."), duration: 8 },
      { title: "File Upload & Blob Storage", content: t("Upload file dengan Server Actions atau API route. Vercel Blob, AWS S3, atau Supabase Storage. Validasi file type dan size."), duration: 7 },
    ]},
    { id: "ch6-4", courseId: "c6", title: "Deployment", lessons: [
      { title: "Build & Optimasi", content: t("next build menganalisis dan mengoptimasi. Image optimization dengan next/image. Font optimization. Bundle analysis dengan @next/bundle-analyzer."), duration: 8 },
      { title: "Deploy ke Vercel", content: t("Vercel adalah platform deployment optimal untuk Next.js. Git integration, preview deployments, environment variables, dan analytics."), duration: 6 },
      { title: "Environment & Config", content: t("Environment variables (.env.local, .env.production). Runtime config. Feature flags. A/B testing dengan middleware."), duration: 5 },
      { title: "Monitoring & Analytics", content: t("Vercel Analytics untuk traffic. Error monitoring dengan Sentry. Logging dengan Pino atau Winston. Performance monitoring dengan Web Vitals."), duration: 7 },
    ]},
    // TypeScript untuk Developer
    { id: "ch7-1", courseId: "c7", title: "Type System", lessons: [
      { title: "Mengapa TypeScript?", content: t("TypeScript adalah superset JavaScript dengan static typing. Tangkap error di compile-time, autocomplete lebih baik, dokumentasi hidup. Standard industri untuk project scale."), duration: 6 },
      { title: "Tipe Dasar & Inference", content: t("Primitive types: string, number, boolean, null, undefined. Type inference otomatis. Type annotation eksplisit. any, unknown, never, void."), duration: 8 },
      { title: "Interface & Type Alias", content: t("Interface untuk mendefinisikan shape object. Type alias untuk union, intersection, primitive alias. Perbedaan interface (extends) vs type (&)."), duration: 7 },
      { title: "Union & Intersection", content: t("Union type (|) untuk nilai yang bisa multiple type. Intersection (&) untuk menggabungkan type. Discriminated union dengan literal type."), duration: 9 },
      { title: "Generics Dasar", content: t("Generics membuat komponen type-safe untuk berbagai tipe. Fungsi generic <T>, constraints dengan extends, default type parameter."), duration: 10 },
    ]},
    { id: "ch7-2", courseId: "c7", title: "Advanced Types", lessons: [
      { title: "Utility Types", content: t("TypeScript menyediakan utility types: Partial, Required, Pick, Omit, Record, Extract, Exclude. Kurangi boilerplate transformasi type."), duration: 8 },
      { title: "Conditional Types", content: t("Conditional types: T extends U ? X : Y. Infer keyword untuk extract type dari dalam type lain. Template literal types."), duration: 10 },
      { title: "Mapped Types", content: t("Mapped types mentransformasi properti object type. { [K in keyof T]: T[K] }. Modifier + dan - untuk readonly/optional."), duration: 9 },
      { title: "Type Guards & Narrowing", content: t("Type narrowing mempersempit union type. typeof, instanceof, discriminated union. User-defined type guards dengan is."), duration: 7 },
    ]},
    { id: "ch7-3", courseId: "c7", title: "TypeScript dengan React", lessons: [
      { title: "Typing Props & State", content: t("Tipe props dengan interface untuk komponen. Generic props dengan extends. Typing useState, useRef, useContext dengan benar."), duration: 8 },
      { title: "Typing Events & Refs", content: t("React event types: ChangeEvent, MouseEvent, FormEvent. Generic untuk elemen spesifik. Typing useRef untuk DOM element."), duration: 7 },
      { title: "Generic Components", content: t("Komponen generic untuk reusable UI. Contoh: Select<T>, List<T>, Table<T>. Constraints untuk memastikan type aman."), duration: 8 },
      { title: "Type-Safe APIs", content: t("Zod untuk runtime validation + type inference. tRPC untuk end-to-end type safety. OpenAPI-to-TypeScript generator."), duration: 9 },
    ]},
    // Node.js Backend
    { id: "ch8-1", courseId: "c8", title: "Node.js Dasar", lessons: [
      { title: "Apa itu Node.js?", content: t("Node.js adalah runtime JavaScript di server. Event-driven, non-blocking I/O. Ideal untuk aplikasi real-time, API, mikroservice. Dibangun di atas V8 engine."), duration: 6 },
      { title: "Module System (CommonJS vs ESM)", content: t("CommonJS (require/module.exports) vs ES Modules (import/export). Package.json type field. Interoperability antara kedua sistem."), duration: 7 },
      { title: "File System & Path", content: t("fs module untuk read/write file. path module untuk manipulasi path. Stream untuk file besar. __dirname, process.cwd()."), duration: 8 },
      { title: "Event Emitter & Stream", content: t("EventEmitter pattern untuk event-driven architecture. Stream untuk proses data bertahap (readable, writable, transform). Pipe untuk chaining."), duration: 9 },
      { title: "Error Handling & Debugging", content: t("Try/catch async error. UncaughtException, unhandledRejection. Debugging dengan --inspect flag. Node.js debugger di VS Code."), duration: 6 },
    ]},
    { id: "ch8-2", courseId: "c8", title: "Express.js", lessons: [
      { title: "Setup Express Server", content: t("Express adalah framework web minimalis. Setup server dengan app.listen(). Middleware konsep inti. Request/response cycle."), duration: 7 },
      { title: "Routing & Middleware", content: t("Route methods (get, post, put, delete). Route parameters dan query string. Middleware untuk logging, auth, error handling. next() function."), duration: 9 },
      { title: "REST API Design", content: t("Prinsip RESTful API: resource-based endpoints, HTTP methods, status codes. Versioning. Pagination, filtering, sorting."), duration: 8 },
      { title: "Validation & Error Handling", content: t("Input validation dengan Zod/Joi. Error handling middleware. Consistent error response format. HTTP exception classes."), duration: 7 },
    ]},
    { id: "ch8-3", courseId: "c8", title: "Database & Auth", lessons: [
      { title: "Koneksi Database", content: t("Koneksi PostgreSQL dengan pg atau Prisma. Connection pool. Environment variables untuk konfigurasi. Migration untuk schema versioning."), duration: 8 },
      { title: "Autentikasi JWT", content: t("JWT (JSON Web Token) untuk autentikasi stateless. Access token + refresh token pattern. bcrypt untuk password hashing. Middleware auth."), duration: 10 },
      { title: "Authorization & RBAC", content: t("Role-based access control. Middleware authorization. Resource ownership check. RBAC vs ABAC untuk kompleksitas berbeda."), duration: 8 },
      { title: "Testing dengan Jest", content: t("Unit test dengan Jest. Integration test untuk API endpoints. Mock database. Test coverage report. CI/CD integration."), duration: 9 },
      { title: "Deploy Node.js ke Server", content: t("PM2 untuk process manager. Nginx sebagai reverse proxy. SSL dengan Let's Encrypt. Environment-specific config. Health check endpoint."), duration: 7 },
    ]},
    // PostgreSQL Dasar
    { id: "ch9-1", courseId: "c9", title: "SQL Dasar", lessons: [
      { title: "Apa itu PostgreSQL?", content: t("PostgreSQL adalah database relational open-source paling canggih. Mendukung ACID, indexing lanjutan, JSON, dan full-text search. Pilihan utama untuk production."), duration: 5 },
      { title: "CREATE TABLE & Data Types", content: t("CREATE TABLE dengan kolom dan constraint. Data types: INTEGER, VARCHAR, TEXT, BOOLEAN, DATE, TIMESTAMP, JSONB. NOT NULL, UNIQUE, DEFAULT."), duration: 8 },
      { title: "INSERT, SELECT, UPDATE, DELETE", content: t("CRUD operations dasar. SELECT dengan WHERE, ORDER BY, LIMIT, OFFSET. UPDATE dengan kondisi. DELETE hati-hati tanpa WHERE."), duration: 7 },
      { title: "Filtering & Sorting", content: t("WHERE clause dengan AND, OR, IN, BETWEEN, LIKE. ORDER BY ASC/DESC. LIMIT dan OFFSET untuk pagination. DISTINCT untuk nilai unik."), duration: 6 },
    ]},
    { id: "ch9-2", courseId: "c9", title: "Query Lanjutan", lessons: [
      { title: "JOINs (INNER, LEFT, RIGHT)", content: t("JOIN menggabungkan tabel berdasarkan relasi. INNER JOIN untuk data yang cocok. LEFT JOIN untuk semua data dari tabel kiri. Self-join untuk hierarki."), duration: 10 },
      { title: "Aggregation & GROUP BY", content: t("COUNT, SUM, AVG, MIN, MAX untuk agregasi. GROUP BY untuk pengelompokan. HAVING untuk filter agregasi."), duration: 8 },
      { title: "Subquery & CTE", content: t("Subquery di SELECT, FROM, WHERE. Common Table Expressions (WITH) untuk query kompleks. Recursive CTE untuk data tree."), duration: 9 },
      { title: "Indexing & Performance", content: t("Index mempercepat query. B-tree, Hash, GIN, GiST index. EXPLAIN ANALYZE untuk query plan. Slow query optimization tips."), duration: 10 },
    ]},
    { id: "ch9-3", courseId: "c9", title: "Database Design", lessons: [
      { title: "Normalization & Relationships", content: t("Normal forms (1NF, 2NF, 3NF). One-to-one, one-to-many, many-to-many relationships. Junction table untuk many-to-many."), duration: 9 },
      { title: "Constraints & Validasi", content: t("PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK constraints. Cascade actions (ON DELETE CASCADE). Database-level validation."), duration: 7 },
      { title: "Transactions & ACID", content: t("BEGIN, COMMIT, ROLLBACK. ACID properties. Read committed, repeatable read, serializable isolation. Deadlock handling."), duration: 8 },
      { title: "Backup & Restore", content: t("pg_dump untuk backup. pg_restore untuk restore. Continuous archiving dengan WAL. Point-in-time recovery. cron job untuk backup otomatis."), duration: 6 },
    ]},
    // Prisma ORM
    { id: "ch10-1", courseId: "c10", title: "Prisma Setup", lessons: [
      { title: "Apa itu Prisma?", content: t("Prisma adalah modern ORM untuk Node.js dan TypeScript. Schema-driven: definisikan model di schema.prisma, auto-generate type-safe client."), duration: 5 },
      { title: "Instalasi & Inisialisasi", content: t("Install Prisma CLI dan client. npx prisma init untuk setup. Konfigurasi database URL di .env. Provider PostgreSQL, MySQL, SQLite."), duration: 7 },
      { title: "Schema & Models", content: t("Definisikan model dengan atribut dan relasi. @id, @default, @relation, @unique. Enum, composite key, dan scalar list."), duration: 8 },
      { title: "Migration", content: t("npx prisma migrate dev untuk development. Prisma Migrate menghasilkan SQL migration. deploy untuk production. Rollback strategi."), duration: 6 },
    ]},
    { id: "ch10-2", courseId: "c10", title: "CRUD Operations", lessons: [
      { title: "Create & Read", content: t("Prisma Client CRUD: create, findUnique, findFirst, findMany. Select specific fields. Include relasi. Filter dengan where."), duration: 8 },
      { title: "Update & Delete", content: t("Update dengan update dan updateMany. Upsert untuk create or update. Delete dan deleteMany. Soft delete pattern."), duration: 7 },
      { title: "Filtering, Sorting, Pagination", content: t("Where conditions: AND, OR, NOT, contains, in, gt, lt. OrderBy untuk sorting. Skip/take untuk pagination. Cursor-based pagination."), duration: 8 },
      { title: "Transactions & Batch", content: t("Prisma transactions: interactive dan batch. Nested writes untuk create related data. $transaction untuk atomic operations."), duration: 7 },
    ]},
    { id: "ch10-3", courseId: "c10", title: "Relations", lessons: [
      { title: "One-to-One & One-to-Many", content: t("Relasi satu-ke-satu dengan @relation. Relasi satu-ke-banyak otomatis. Foreign key di sisi many. Optional vs required."), duration: 7 },
      { title: "Many-to-Many", content: t("Many-to-many dengan implicit atau explicit junction table. @relation dengan fields dan references. Query relasi dengan include dan select."), duration: 8 },
      { title: "Self Relations & Referential Actions", content: t("Self-relation untuk data hierarki (kategori, komentar). Referential actions: onDelete Cascade, SetNull, Restrict, NoAction."), duration: 6 },
      { title: "Prisma dengan Express/Next.js", content: t("Integrasi Prisma dengan Express atau Next.js. Prisma Client singleton. Connection pooling di serverless. Middleware Prisma untuk logging."), duration: 9 },
    ]},
    // Docker untuk Programmer
    { id: "ch11-1", courseId: "c11", title: "Docker Dasar", lessons: [
      { title: "Apa itu Docker?", content: t("Docker adalah platform containerization. Packaging aplikasi + dependencies dalam container. Konsisten di development, staging, production. Ringan dibanding VM."), duration: 6 },
      { title: "Instalasi & Arsitektur", content: t("Install Docker Desktop. Arsitektur: Docker daemon, client, registries. Images vs Containers. Docker Hub untuk image publik."), duration: 7 },
      { title: "Dockerfile & Build", content: t("Dockerfile instruksi build image. FROM, RUN, COPY, WORKDIR, EXPOSE, CMD, ENTRYPOINT. Multi-stage build untuk image ringan."), duration: 9 },
      { title: "Docker Commands Dasar", content: t("docker run, ps, stop, rm, exec, logs. Port mapping (-p). Volume mounting (-v). Environment variables (-e). Interactive mode (-it)."), duration: 8 },
    ]},
    { id: "ch11-2", courseId: "c11", title: "Images & Containers", lessons: [
      { title: "Image Management", content: t("docker images, pull, push, tag, rmi. Image layers dan caching. Optimasi ukuran image dengan .dockerignore dan multi-stage."), duration: 7 },
      { title: "Container Lifecycle", content: t("Container states: created, running, paused, stopped, deleted. docker start, stop, pause, unpause. Restart policies."), duration: 6 },
      { title: "Volumes & Data Persistence", content: t("Volume untuk persistent data. Bind mounts untuk development. Named volumes vs anonymous volumes. Backup dan restore volume."), duration: 8 },
      { title: "Networking", content: t("Docker network: bridge, host, none, overlay. Container communication via network. Port exposure dan publishing."), duration: 7 },
    ]},
    { id: "ch11-3", courseId: "c11", title: "Docker Compose", lessons: [
      { title: "Apa itu Docker Compose?", content: t("Docker Compose mendefinisikan multi-container aplikasi di satu file YAML. Satu perintah docker compose up untuk semua service."), duration: 5 },
      { title: "docker-compose.yml", content: t("Definisi services, networks, volumes. Environment variables. Depends_on untuk startup order. Health check."), duration: 9 },
      { title: "Multi-Service Aplikasi", content: t("Contoh: web (Next.js), API (Express), database (PostgreSQL), cache (Redis). Service communication via service name."), duration: 10 },
      { title: "Production vs Development", content: t("Override file untuk environment-specific config. Production dengan restart: always. Resource limits. Logging driver."), duration: 7 },
    ]},
    // AI untuk Developer
    { id: "ch12-1", courseId: "c12", title: "AI Fundamentals", lessons: [
      { title: "Era AI untuk Developer", content: t("AI mengubah cara developer bekerja. Dari coding assistant hingga AI-powered features. Pahami LLM, embeddings, dan vector databases."), duration: 6 },
      { title: "OpenAI API Dasar", content: t("Setup OpenAI API key. Completion endpoint. Chat completions dengan GPT model. Parameters: temperature, max_tokens, top_p."), duration: 8 },
      { title: "Prompt Engineering", content: t("Seni membuat prompt efektif. System message, few-shot, chain-of-thought. Structured output dengan JSON mode. Prompt patterns untuk konsistensi."), duration: 10 },
      { title: "Vector Embeddings", content: t("Embeddings mengubah teks menjadi vector untuk semantic search. OpenAI embeddings, text-embedding-3-small. Cosine similarity untuk perbandingan."), duration: 9 },
    ]},
    { id: "ch12-2", courseId: "c12", title: "AI Integration", lessons: [
      { title: "Semantic Search", content: t("Vector database (pgvector, Pinecone) untuk semantic search. Generate embeddings untuk setiap dokumen. KNN query untuk similar search."), duration: 10 },
      { title: "RAG (Retrieval Augmented Generation)", content: t("RAG menggabungkan retrieval + generation. Konteks relevan dari database sebelum generate respons. LangChain framework untuk RAG pipeline."), duration: 12 },
      { title: "AI Chat Interface", content: t("Bangun chat interface dengan streaming response. Server-Sent Events untuk real-time. Context management untuk conversation history."), duration: 9 },
      { title: "AI Image Generation", content: t("DALL-E API untuk generate gambar. Stable Diffusion alternatif open-source. Image editing dengan inpainting dan outpainting."), duration: 8 },
    ]},
    { id: "ch12-3", courseId: "c12", title: "Production AI", lessons: [
      { title: "Rate Limiting & Cost", content: t("OpenAI rate limits dan pricing. Token usage tracking. Caching responses untuk cost optimization. Fallback model strategy."), duration: 7 },
      { title: "Safety & Moderation", content: t("Content moderation dengan OpenAI Moderation API. Input sanitization. PII redaction. Ethical AI guidelines."), duration: 6 },
      { title: "Monitoring & Analytics", content: t("Logging prompt dan response. Latency monitoring. Cost per user tracking. A/B testing model version."), duration: 7 },
      { title: "Fine-tuning & Custom Model", content: t("Fine-tuning OpenAI dengan data sendiri. LoRA untuk fine-tuning efisien. Evaluasi model performance. Dataset preparation."), duration: 10 },
    ]},
  ];

  const chapters: SeedChapter[] = [];
  const lessons: SeedLesson[] = [];

  chapterDefs.forEach((def, ci) => {
    chapters.push({ id: def.id, course_id: def.courseId, title: def.title, sort_order: ci });
    def.lessons.forEach((l, li) => {
      lessons.push({
        id: `${def.id}-l${li + 1}`,
        chapter_id: def.id,
        title: l.title,
        content: l.content,
        duration: l.duration,
        sort_order: li,
      });
    });
  });

  return { categories: catData, courses, chapters, lessons };
}
