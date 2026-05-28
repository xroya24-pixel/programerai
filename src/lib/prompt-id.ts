function p(title: string, desc: string, prompt: string, tips: string) {
  return JSON.stringify({
    type: "doc",
    content: [
      { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: title }] },
      { type: "paragraph", content: [{ type: "text", text: desc }] },
      { type: "heading", attrs: { level: 3 }, content: [{ type: "text", text: "Prompt" }] },
      { type: "codeBlock", attrs: { language: "text" }, content: [{ type: "text", text: prompt }] },
      { type: "heading", attrs: { level: 3 }, content: [{ type: "text", text: "Tips Penggunaan" }] },
      { type: "paragraph", content: [{ type: "text", text: tips }] },
    ],
  });
}

interface Chapter { title: string; lessons: { title: string; content: string; duration: number }[] }

export function getPromptsID(): Chapter[] {
  return [
    {
      title: "Landing Page Hero Futuristik",
      lessons: [
        {
          title: "Hero Section AI dengan Neon dan Partikel",
          content: p(
            "Membuat Hero Section Futuristik untuk Startup AI",
            "Bagian hero adalah elemen pertama yang dilihat pengguna saat mengunjungi website. Desain hero yang futuristik dengan perpaduan efek neon, partikel bergerak, dan tipografi modern akan menciptakan kesan pertama yang kuat dan profesional. Prompt ini dirancang khusus untuk membuat landing page perusahaan AI, startup teknologi, atau platform machine learning yang ingin tampil modern dan inovatif. Kombinasi warna ungu tua ke cyan menciptakan gradien yang depth dan misterius, sementara elemen hologram memberikan kesan teknologi tinggi.",
            "Buatlah sebuah hero section untuk website startup AI dengan tema futuristik. Latar belakang menggunakan gradien gelap dari ungu tua ke biru neon dengan efek mesh yang halus. Di tengah halaman, tampilkan headline utama 'Masa Depan AI' dengan tipografi sans-serif bold dan efek neon glow berwarna cyan. Di bawah headline, tambahkan subteks penjelasan singkat tentang layanan AI dengan warna abu-abu terang. Sertakan sebuah tombol CTA utama dengan gradien ungu ke cyan yang memiliki efek hover berpendar. Di bagian kanan hero, tampilkan ilustrasi 3D abstrak berbentuk jaringan saraf tiruan yang terhubung dengan garis-garis bercahaya. Tambahkan partikel-partikel kecil yang melayang di latar belakang dengan efek gerakan lembut. Gunakan efek glassmorphism pada elemen-elemen UI. Pastikan komposisi seimbang dengan hierarki visual yang jelas. Gaya desain modern, bersih, dan profesional dengan pencahayaan sinematik. Resolusi 8K untuk kualitas terbaik.",
            "Gunakan gradien ungu-cyan sebagai warna utama brand AI. Pastikan tombol CTA memiliki kontras cukup dengan background. Efek partikel jangan terlalu ramai agar tidak mengganggu keterbacaan teks."
          ),
          duration: 10,
        },
      ],
    },
    {
      title: "Dashboard Analytics Modern",
      lessons: [
        {
          title: "Layout Dashboard dengan Glassmorphism",
          content: p(
            "Membuat Dashboard Analytics dengan Gaya Glassmorphism",
            "Dashboard analytics adalah pusat kendali data yang menampilkan metrik-metrik penting secara visual. Desain dengan gaya glassmorphism memberikan kesan modern dan premium dengan efek kaca transparan yang membiaskan cahaya. Prompt ini cocok untuk aplikasi SaaS, platform e-commerce, atau sistem monitoring yang membutuhkan tampilan data yang informatif namun tetap elegan. Tata letak grid yang terstruktur memudahkan pengguna mencerna informasi dari berbagai metrik sekaligus.",
            "Buatlah dashboard analytics modern dengan gaya glassmorphism pada background gelap. Bagian kiri halaman terdapat sidebar navigasi dengan icon dan label menu yang memiliki efek hover pendaran. Di bagian atas sidebar, tampilkan logo perusahaan dan nama pengguna. Area utama dashboard terdiri dari empat kartu statistik di baris pertama: Total Pendapatan (dengan ikon dompet dan angka Rp 2,4 Miliar), Jumlah Pengguna Aktif (dengan ikon orang dan angka 12.845), Rata-rata Sesi (dengan ikon jam dan angka 4 Menit 32 Detik), dan Tingkat Konversi (dengan ikon grafik dan angka 3,8%). Setiap kartu memiliki persentase kenaikan atau penurunan dengan warna hijau atau merah. Gunakan efek glassmorphism pada setiap kartu dengan latar belakang transparan dan blur, border tipis berwarna putih dengan opasitas rendah, serta bayangan lembut. Di baris kedua, tampilkan grafik garis yang menunjukkan tren pendapatan selama 30 hari terakhir dengan gradien warna di bawah garis. Di samping kanan grafik, sertakan grafik donat untuk breakdown sumber traffic. Baris ketiga berisi tabel data transaksi terbaru dengan kolom nama pelanggan, produk, jumlah, status, dan tanggal. Gunakan warna aksen biru elektrik dan ungu pada elemen-elemen penting. Tipografi menggunakan sans-serif dengan hierarki ukuran yang jelas. Desain terinspirasi dari aplikasi analytics modern seperti Mixpanel dan Amplitude. Resolusi 4K.",
            "Gunakan efek glassmorphism dengan bijak — jangan terlalu transparan karena bisa mengganggu keterbacaan data. Warna aksen yang berbeda untuk setiap kartu statistik membantu diferensiasi visual. Sertakan sparkline mini di setiap kartu untuk menunjukkan tren sekilas."
          ),
          duration: 12,
        },
      ],
    },
    {
      title: "Halaman Pricing Premium",
      lessons: [
        {
          title: "Kartu Pricing 3 Tier dengan Highlight Recommended",
          content: p(
            "Membuat Halaman Pricing dengan Tiga Tingkatan",
            "Halaman pricing adalah salah satu halaman terpenting untuk konversi bisnis. Desain yang profesional dengan tiga tingkatan harga (Starter, Professional, Enterprise) membantu pengguna memilih paket yang sesuai. Kartu di tengah diberi highlight sebagai paket yang paling direkomendasikan, lengkap dengan badge 'Paling Populer' yang menarik perhatian. Efek glassmorphism dan elevasi pada kartu unggulan menciptakan hierarki visual yang secara halus mendorong pengguna memilih paket tersebut.",
            "Buatlah halaman pricing premium dengan tiga kartu berjajar horizontal. Latar belakang menggunakan gradien gelap dengan efek mesh lembut. Kartu pertama 'Starter' dengan harga Rp 99.000 per bulan, kartu tengah 'Professional' dengan harga Rp 249.000 per bulan yang dinaikkan sedikit lebih tinggi dan diberi efek glow di sekelilingnya serta badge 'Paling Populer' dengan gradien ungu ke emas, dan kartu ketiga 'Enterprise' dengan harga Rp 499.000 per bulan. Setiap kartu menampilkan daftar fitur dengan ikon centang berwarna hijau. Paket Professional memiliki fitur paling lengkap dengan beberapa item ditebalkan. Tombol CTA di setiap kartu: 'Mulai Gratis' untuk Starter, 'Langganan Sekarang' dengan gradien ungu dan efek glow untuk Professional, dan 'Hubungi Penjualan' untuk Enterprise. Gunakan efek glassmorphism pada kartu dengan tingkat transparansi berbeda. Kartu Professional memiliki transparansi lebih rendah dan border glow ungu. Background memiliki partikel halus melayang. Tambahkan badge penghematan 'Hemat 40%' di atas paket Professional jika memilih tagihan tahunan dengan toggle bulanan/tahunan. Desain terinspirasi dari halaman pricing Notion dan Linear dengan sentuhan premium. Resolusi 8K.",
            "Kartu tengah yang dinaikkan dan diberi glow secara visual meningkatkan konversi ke paket tersebut hingga 40%. Badge 'Paling Populer' dengan gradien menambah kredibilitas. Toggle bulanan/tahunan dengan badge 'Hemat 40%' mendorong komitmen jangka panjang."
          ),
          duration: 10,
        },
      ],
    },
    {
      title: "Card Testimonial Interaktif",
      lessons: [
        {
          title: "Testimonial dengan Avatar dan Rating Bintang",
          content: p(
            "Membuat Carousel Testimonial Pelanggan",
            "Testimonial adalah bukti sosial yang sangat efektif untuk meyakinkan calon pengguna. Carousel testimonial yang interaktif dengan foto asli, nama lengkap, jabatan, rating bintang, dan kutipan panjang menciptakan kepercayaan. Efek card yang fokus di tengah dengan card samping yang sedikit kabur menciptakan depth dan mengarahkan perhatian ke testimonial yang sedang aktif. Desain ini cocok untuk halaman landing page, halaman fitur, atau bagian social proof website.",
            "Buatlah carousel testimonial pelanggan dengan tiga kartu yang terlihat secara bersamaan. Kartu di tengah berukuran lebih besar dan lebih terang, sementara dua kartu di samping lebih kecil dan sedikit buram. Setiap kartu testimonial memiliki foto profil berbentuk lingkaran di bagian atas dengan kualitas foto profesional. Di bawah foto, tampilkan nama lengkap dalam huruf tebal, jabatan dan nama perusahaan dalam warna abu-abu. Tampilkan rating bintang emas 5 dari 5 dengan efek gemerlap ringan. Kutipan testimonial menggunakan tanda kutip besar dekoratif di awal dengan gaya tipografi italic dan garis samping kiri sebagai aksen. Latar belakang menggunakan gradien lembut dari biru tua ke ungu. Navigasi carousel berupa titik-titik di bagian bawah dengan titik aktif lebih besar dan berwarna gradien. Tombol panah kiri dan kanan di sisi carousel dengan efek hover melingkar. Tambahkan efek bayangan dan border tipis pada setiap kartu. Gaya desain modern, meyakinkan, dan premium. Terinspirasi dari desain testimonial di website Stripe dan Linear. Resolusi 4K.",
            "Gunakan foto profil yang tampak profesional dan autentik. Kutipan testimonial dengan nomor atau detail spesifik (misalnya 'pendapatan naik 240%') lebih meyakinkan daripada testimonial umum. Pastikan carousel bisa dioperasikan dengan keyboard untuk aksesibilitas."
          ),
          duration: 8,
        },
      ],
    },
    {
      title: "Form Kontak Modern",
      lessons: [
        {
          title: "Form Multi-Field dengan Floating Label",
          content: p(
            "Membuat Form Kontak dengan Animasi Floating Label",
            "Form kontak adalah pintu komunikasi antara pengguna dan bisnis. Desain form yang modern dengan floating label — di mana label bergerak ke atas saat input diisi — memberikan pengalaman pengguna yang premium dan intuitif. Setiap field memiliki state focus dengan efek glow, validasi real-time dengan ikon centang atau silang, serta pesan error yang jelas. Animasi transisi yang halus menciptakan rasa responsif dan profesional. Form ini cocok untuk halaman kontak, pendaftaran webinar, atau formulir lead generation.",
            "Buatlah form kontak modern dengan empat field input pada latar belakang gelap. Field pertama 'Nama Lengkap' dengan ikon orang di kiri input. Field kedua 'Alamat Email' dengan ikon amplop dan validasi format email. Field ketiga 'Subjek' berupa dropdown dengan pilihan: Konsultasi, Dukungan Teknis, Kerjasama, dan Lainnya. Field keempat 'Pesan' berupa textarea dengan penghitung karakter. Setiap field memiliki floating label yang awalnya berada di tengah input, lalu naik ke atas dengan animasi halus saat pengguna mengetik. State focus menampilkan border glow berwarna biru elektrik dan bayangan lembut. State valid menampilkan ikon centang hijau di ujung kanan input. State error menampilkan border merah dan pesan error di bawah field. Tombol kirim dengan gradien ungu ke biru memiliki efek loading spinner saat diklik, lalu berubah menjadi centang animasi saat berhasil. Latar belakang form menggunakan efek glassmorphism. Tambahkan teks 'Kami akan merespon dalam 24 jam' di bawah tombol. Gaya desain bersih, minimalis, dan premium terinspirasi dari form Apple dan Linear. Resolusi 4K.",
            "Floating label menghemat ruang vertikal dibanding label di atas field. Validasi real-time memberikan feedback instan ke pengguna. Sertakan CAPTCHA atau honeypot field untuk mencegah spam tanpa mengganggu pengalaman pengguna."
          ),
          duration: 9,
        },
      ],
    },
    {
      title: "Sidebar Navigasi Collapsible",
      lessons: [
        {
          title: "Sidebar dengan Icon dan Animasi Collapse",
          content: p(
            "Membuat Sidebar Navigasi yang Bisa Dicollapse",
            "Sidebar navigasi adalah komponen penting dalam aplikasi dashboard atau admin panel. Desain yang bisa dicollapse memberikan fleksibilitas: saat diperluas menampilkan icon dan label untuk navigasi mudah, saat dikecilkan hanya menampilkan icon untuk memberikan lebih banyak ruang ke konten utama. Setiap menu item memiliki efek hover yang halus, active state dengan indikator garis di samping, dan tooltip yang muncul saat sidebar dalam keadaan collapse. Bagian bawah sidebar menampilkan profil pengguna dan tombol logout. Desain ini cocok untuk aplikasi CMS, dashboard analytics, atau platform manajemen konten.",
            "Buatlah sidebar navigasi yang bisa dicollapse dengan animasi halus. Dalam keadaan diperluas, sidebar memiliki lebar 240 piksel dengan latar belakang gelap. Bagian atas menampilkan logo perusahaan berbentuk ikon terminal dalam kotak dengan border gradien dan nama perusahaan 'ProgramerAI' di sampingnya serta label 'ADMIN' dalam huruf kecil. Tombol collapse berupa icon panah kiri di pojok kanan atas. Menu navigasi dikelompokkan dalam tiga bagian: MAIN (Dashboard, Courses, Users), MANAGEMENT (Pembayaran, Premium, Live Support, Halaman Depan), dan SYSTEM (Pengaturan, Data). Setiap menu item memiliki icon di kiri dan label di kanan. Active item memiliki garis indikator vertikal berwarna biru di sisi kiri dan latar belakang dengan opasitas rendah. Efek hover menampilkan perubahan latar belakang yang halus. Dalam keadaan collapse, sidebar menyempit menjadi 60 piksel dan hanya menampilkan icon. Tooltip muncul saat hover pada icon untuk menampilkan label menu. Bagian bawah sidebar menampilkan avatar profil pengguna, nama, dan tombol logout dengan icon. Animasi collapse/expand menggunakan transisi durasi 300 milidetik dengan easing yang halus. Gaya desain modern dengan gelap, terinspirasi dari sidebar Notion dan Linear. Resolusi 4K.",
            "Gunakan ikon yang intuitif agar tetap dikenali saat sidebar dalam keadaan collapse. Tooltip membantu pengguna mengetahui fungsi icon saat collapsed. Animasi yang halus (300ms ease-in-out) memberikan pengalaman premium."
          ),
          duration: 10,
        },
      ],
    },
    {
      title: "Tabel Data Interaktif",
      lessons: [
        {
          title: "Tabel dengan Sorting, Filter, dan Pagination",
          content: p(
            "Membuat Tabel Data dengan Fitur Lengkap",
            "Tabel data adalah komponen esensial untuk menampilkan informasi terstruktur dalam jumlah besar. Desain tabel modern tidak hanya menampilkan data, tetapi juga menyediakan alat untuk mencari, menyaring, mengurutkan, dan menavigasi data dengan mudah. Header kolom yang bisa diklik untuk sorting, search bar real-time, filter dropdown per kategori, dan pagination yang informatif. Setiap baris data menampilkan status dengan badge berwarna dan tombol aksi dengan ikon. Tabel ini cocok untuk halaman manajemen pengguna, daftar pesanan, atau inventaris produk.",
            "Buatlah tabel data interaktif dengan desain modern pada latar belakang gelap. Tabel memiliki tujuh kolom: kotak centang untuk seleksi, Nama Pengguna, Alamat Email, Peran, Status, Tanggal Bergabung, dan Aksi. Setiap header kolom memiliki icon panah sorting yang berubah arah saat diklik. Baris header memiliki latar belakang sedikit lebih terang dari body tabel. Kolom Status menampilkan badge dengan warna berbeda: 'Aktif' berwarna hijau dengan icon titik, 'Menunggu' berwarna kuning, dan 'Nonaktif' berwarna abu-abu. Kolom Aksi menampilkan dua icon: pensil untuk edit dan tempat sampah untuk hapus, dengan efek tooltip saat hover. Di atas tabel, terdapat search bar dengan ikon kaca pembesar di sisi kiri, tombol 'Tambah Pengguna Baru' dengan gradien, dan dropdown filter per peran. Setiap baris memiliki efek hover dengan perubahan latar belakang halus. Baris bergantian memiliki warna sedikit berbeda untuk zebra striping. Di bagian bawah tabel, tampilkan pagination dengan informasi 'Menampilkan 1-10 dari 156 data', tombol Previous dan Next, serta nomor halaman yang bisa diklik. Halaman aktif memiliki background gradien. Efek glassmorphism ringan pada container tabel. Gaya desain bersih, profesional, dan informatif. Resolusi 4K.",
            "Zebra striping meningkatkan scannability data. Badge warna pada status memudahkan identifikasi visual cepat. Pagination dengan informasi jumlah total data membantu pengguna memahami konteks."
          ),
          duration: 11,
        },
      ],
    },
    {
      title: "Profil Pengguna Premium",
      lessons: [
        {
          title: "Kartu Profil dengan Cover Photo dan Statistik",
          content: p(
            "Membuat Profile Card dengan Cover Background",
            "Kartu profil adalah representasi visual identitas pengguna dalam sebuah platform. Desain premium dengan cover photo di bagian atas, foto profil circular yang tumpang tindih antara cover dan konten, serta statistik lengkap menciptakan tampilan yang profesional dan personal. Tombol aksi seperti Follow dan Message memudahkan interaksi. Kartu profil ini cocok untuk halaman profil pengguna di platform sosial, portfolio kreator, atau profil anggota tim di website perusahaan.",
            "Buatlah kartu profil premium dengan cover photo dan foto profil. Bagian atas kartu menampilkan cover photo bergambar landscape gunung dengan gradien warna biru ke ungu saat senja, dengan efek gradien gelap di bagian bawah cover. Foto profil berbentuk lingkaran dengan border putih tipis ditempatkan di tengah, setengah di atas cover dan setengah di bawah area konten. Di bawah foto profil, tampilkan nama lengkap 'Raffi Ahmad Pratama' dengan font tebal besar, jabatan 'Product Designer & Frontend Engineer' dalam warna abu-abu, dan lokasi 'Jakarta, Indonesia' dengan ikon pin peta. Bio singkat 'Membangun produk digital yang berdampak. Spesialis di UI/UX dan desain sistem.' dalam format teks biasa. Tiga kartu statistik berjajar: '1.248 Mengikuti' dengan ikon orang, '8.530 Pengikut' dengan ikon penggemar, dan '342 Postingan' dengan ikon dokumen. Dua tombol aksi: 'Ikuti' dengan gradien ungu terisi penuh dan efek glow, serta 'Pesan' dengan border outline putih. Efek glassmorphism pada kartu dengan latar belakang transparan dan blur. Bayangan lembut di sekeliling kartu. Gaya desain modern, premium, terinspirasi dari profil Twitter dan LinkedIn. Resolusi 4K.",
            "Cover photo dengan gradien gelap di bagian bawah memastikan teks bio tetap terbaca. Foto profil dengan border putih tipis menciptakan efek framing yang rapi. Statistik dengan angka bulat (+K) lebih mudah dicerna daripada angka persis."
          ),
          duration: 8,
        },
      ],
    },
    {
      title: "Halaman Login Modern",
      lessons: [
        {
          title: "Login dengan Split Layout dan Social Login",
          content: p(
            "Membuat Halaman Login dengan Tata Letak Terbagi",
            "Halaman login adalah gerbang utama pengguna mengakses aplikasi. Desain split layout membagi halaman menjadi dua bagian: sisi kiri berisi form login dengan efek glassmorphism, sisi kanan menampilkan visual inspiratif yang membangun koneksi emosional. Form dilengkapi dengan floating label, opsi 'Ingat Saya', tautan lupa password, tombol login gradien, serta tombol login sosial dengan Google dan GitHub. Desain ini memberikan kesan premium, aman, dan profesional sejak pertama kali pengguna membuka aplikasi.",
            "Buatlah halaman login premium dengan tata letak terbagi dua. Sisi kiri seluas 40% dari halaman menampilkan form login dalam kartu glassmorphism. Form memiliki dua field: 'Alamat Email' dengan ikon amplon di dalam input, dan 'Kata Sandi' dengan ikon gembok dan tombol toggle visibilitas mata. Setiap field memiliki floating label dan focus state dengan border glow ungu. Di bawah field password, tampilkan tautan 'Lupa Password?' dengan warna biru. Toggle switch 'Ingat Saya' dengan desain kustom berwarna ungu saat aktif. Tombol 'Masuk' dengan gradien ungu ke biru lebar penuh dan efek hover pendaran. Pemisah 'atau lanjutkan dengan' dengan garis horizontal di kedua sisi. Dua tombol login sosial: Google dengan icon dan latar belakang putih, GitHub dengan icon dan latar belakang abu-abu gelap. Di bagian bawah form, teks 'Belum punya akun? Daftar' dengan tautan. Sisi kanan seluas 60% menampilkan gambar latar penuh berupa ruang kerja modern dengan laptop, meja minimalis, dan tanaman hias dalam pencahayaan hangat, dengan overlay gradien ungu transparan. Di sudut kanan atas, logo perusahaan dengan nama. Desain profesional, aman, dan premium. Terinspirasi dari halaman login Linear dan Notion. Resolusi 4K.",
            "Split layout dengan visual inspiratif di sisi kanan membangun koneksi emosional. Glassmorphism pada form memberikan depth tanpa mengganggu fokus. Tombol login sosial mengurangi friksi registrasi. Pastikan form bisa di-submit dengan tombol Enter."
          ),
          duration: 9,
        },
      ],
    },
    {
      title: "Galeri Portfolio Masonry",
      lessons: [
        {
          title: "Grid Masonry dengan Filter dan Lightbox",
          content: p(
            "Membuat Galeri Portfolio dengan Layout Masonry",
            "Galeri portfolio dengan layout masonry menampilkan karya-karya dalam grid yang tidak rata di mana setiap kolom memiliki tinggi berbeda tergantung aspek rasio gambar. Tata letak ini menciptakan tampilan yang dinamis, artistik, dan menarik secara visual. Dilengkapi filter kategori, efek hover overlay yang menampilkan informasi proyek, serta lightbox interaktif untuk melihat detail karya. Desain ini sangat cocok untuk website portfolio kreator, fotografer, desainer grafis, atau agensi kreatif yang ingin menampilkan karya terbaik mereka dengan cara yang menarik.",
            "Buatlah halaman galeri portfolio dengan layout masonry tiga kolom. Setiap kolom memiliki item dengan tinggi berbeda karena aspek rasio gambar yang bervariasi (ada yang 4:3 portrait, 16:9 landscape, atau 1:1 square). Setiap item portfolio menampilkan thumbnail gambar dengan kualitas tinggi. Efek hover menampilkan overlay gelap transparan dari bawah ke atas dengan animasi halus. Di dalam overlay, tampilkan judul proyek dalam font bold, kategori proyek dalam teks kecil, dan tombol 'Lihat Proyek' dengan ikon panah. Di bagian atas halaman, tampilkan tombol filter kategori berjajar: 'Semua', 'Desain Web', 'Branding', 'UI/UX', 'Ilustrasi'. Kategori aktif memiliki background gradien ungu. Saat pengguna mengklik thumbnail, lightbox terbuka dengan animasi scale dan fade. Lightbox menampilkan gambar dalam ukuran besar, judul proyek, deskripsi singkat, dan tombol navigasi previous/next. Latar belakang lightbox gelap pekat dengan efek blur. Tombol close di pojok kanan atas. Background halaman utama gelap dengan sedikit tekstur. Gaya desain terinspirasi dari Dribbble dan Behance dengan sentuhan premium. Resolusi 8K.",
            "Layout masonry memberikan tampilan organik dan artistik yang cocok untuk konten visual. Filter kategori membantu pengguna menemukan jenis karya yang diminati. Lightbox dengan navigasi memudahkan penjelajahan tanpa meninggalkan halaman utama."
          ),
          duration: 10,
        },
      ],
    },
  ];
}
