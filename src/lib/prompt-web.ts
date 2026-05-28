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

export function getWebPrompts(): Chapter[] {
  return [
    {
      title: "Website Company Profile Startup",
      lessons: [
        {
          title: "Desain Website Profil Perusahaan Teknologi",
          content: p(
            "Membuat Website Company Profile Startup Teknologi",
            "Website company profile adalah wajah digital perusahaan. Untuk startup teknologi, desain harus mencerminkan inovasi, modernitas, dan profesionalisme. Halaman ini mencakup hero section dengan value proposition, bagian tentang perusahaan, timeline perjalanan bisnis, portofolio produk atau layanan, tim kepemimpinan, klien yang pernah ditangani, dan informasi kontak. Tata letak yang bersih dengan aksen warna biru dan putih menciptakan kesan terpercaya dan inovatif.",
            "Buatlah desain website company profile untuk sebuah startup teknologi bernama 'TechInnovate'. Halaman utama memiliki hero section dengan latar belakang gradien biru ke ungu, headline 'Membangun Masa Depan dengan Teknologi' dalam font bold besar, dan subteks yang menjelaskan visi perusahaan. Di bawah hero, terdapat bagian 'Tentang Kami' dengan timeline interaktif yang menampilkan perjalanan perusahaan dari tahun berdiri hingga sekarang. Bagian 'Layanan' menampilkan tiga kartu dengan ikon gradien: Pengembangan Aplikasi, Kecerdasan Buatan, dan Infrastruktur Cloud. Bagian 'Tim' menampilkan foto profil tim dalam grid dengan nama dan jabatan. Bagian 'Klien' menampilkan deretan logo perusahaan terkenal dalam format grayscale yang berwarna saat hover. Footer multi-kolom dengan tautan cepat, alamat kantor, dan ikon media sosial. Gunakan tipografi sans-serif modern dengan hierarki jelas. Warna utama biru laut dan aksen biru terang. Efek scroll animasi yang halus pada setiap section. Gaya desain profesional, modern, dan meyakinkan. Resolusi 4K.",
            "Gunakan foto tim yang profesional dan konsisten. Logo klien dalam grayscale memberikan tampilan bersih dan profesional. Animasi scroll yang halus meningkatkan engagement pengguna."
          ),
          duration: 10,
        },
      ],
    },
    {
      title: "Website E-commerce Fashion",
      lessons: [
        {
          title: "Desain Toko Online Fashion Modern",
          content: p(
            "Membuat Website E-commerce Fashion Modern",
            "Website e-commerce fashion membutuhkan desain yang stylish, premium, dan memprioritaskan visual produk. Halaman utama menampilkan koleksi terbaru, kategori fashion, tren musiman, dan fitur pencarian yang intuitif. Pengalaman berbelanja harus mulus dengan navigasi yang mudah, filter produk yang lengkap, dan proses checkout yang cepat. Estetika visual sangat penting untuk produk fashion — foto produk berkualitas tinggi dengan tata letak yang bersih dan elegan.",
            "Buatlah desain website e-commerce fashion premium bernama 'StyleEra'. Bagian atas terdapat navbar transparan dengan logo di kiri, menu navigasi (Koleksi Terbaru, Pria, Wanita, Aksesoris, Sale), ikon pencarian, ikon wishlist, dan ikon keranjang belanja dengan badge jumlah item. Hero section menampilkan slideshow gambar full-width dengan model mengenakan koleksi terbaru, overlay teks 'Koleksi Musim Panas 2024 - Diskon hingga 50%' dan tombol 'Belanja Sekarang'. Di bawah hero, grid kategori fashion 4 kolom: Pria, Wanita, Aksesoris, dan Sepatu dengan foto lifestyle dan teks overlay. Bagian 'Produk Terbaru' menampilkan grid 4 kolom produk dengan foto produk, nama, harga, rating bintang, dan tombol 'Tambah ke Keranjang' yang muncul saat hover. Sidebar filter untuk memperbarui produk berdasarkan kategori, ukuran, warna, dan rentang harga. Halaman produk detail menampilkan foto produk besar dengan zoom hover, thumbnail gambar lain, nama produk, harga, pilihan ukuran dan warna, tabel ukuran, dan tombol 'Tambah ke Keranjang' dan 'Beli Sekarang'. Proses checkout dengan progress stepper: Keranjang → Pengiriman → Pembayaran → Konfirmasi. Gunakan palet warna netral dengan aksen merah muda atau emas. Tipografi elegan dan modern. Gaya desain terinspirasi dari Zara dan H&M. Resolusi 8K.",
            "Foto produk berkualitas tinggi adalah prioritas utama untuk e-commerce fashion. Zoom hover pada gambar produk membantu pelanggan melihat detail. Sertakan size guide dan material info untuk mengurangi retur."
          ),
          duration: 14,
        },
      ],
    },
    {
      title: "Website Portal Berita",
      lessons: [
        {
          title: "Desain Portal Berita Online Terkini",
          content: p(
            "Membuat Website Portal Berita Online",
            "Portal berita online membutuhkan desain yang fokus pada keterbacaan, kecepatan akses informasi, dan hierarki berita yang jelas. Halaman depan harus menampilkan headline berita utama, berita terbaru, kategori berita, dan widget trending topics. Tata letak grid yang terstruktur memudahkan pembaca menemukan berita yang relevan. Navigasi kategori yang jelas dan fitur pencarian membantu pengguna mengakses konten dengan cepat.",
            "Buatlah desain portal berita online bernama 'BeritaTerkini'. Bagian atas terdapat navbar dengan logo surat kabar di kiri, menu kategori berita (Nasional, Internasional, Ekonomi, Teknologi, Olahraga, Hiburan, Gaya Hidup), dan ikon pencarian di kanan. Di bawah navbar, terdapat breaking news ticker horizontal yang menampilkan berita terbaru secara bergulir. Hero section menampilkan satu berita utama dengan foto besar 16:9, judul berita dalam font bold besar, kategori badge, dan waktu publikasi. Di samping kanan hero, terdapat 4 berita sampingan dengan foto lebih kecil dan judul pendek. Di bawah hero, grid 3 kolom untuk berita terbaru dengan foto thumbnail, judul, cuplikan singkat, dan informasi penulis. Sidebar kanan menampilkan widget: berita populer (dengan nomor peringkat), tag cloud, dan newsletter signup. Bagian footer menampilkan logo, tautan kategori, tautan legal, dan ikon media sosial. Halaman detail berita menampilkan foto utama, judul, penulis, tanggal, tombol share sosial, konten artikel dengan tipografi nyaman dibaca, dan bagian berita terkait di bawah. Gunakan tipografi serif untuk judul berita dan sans-serif untuk body teks. Warna utama biru tua dengan aksen merah untuk breaking news. Gaya desain terinspirasi dari Kompas dan BBC News. Resolusi 4K.",
            "Hierarki berita sangat penting: headline utama harus dominan. Breaking news ticker memberikan informasi real-time. Gunakan font serif untuk judul berita memberikan kesan formal dan terpercaya."
          ),
          duration: 12,
        },
      ],
    },
    {
      title: "Website Restoran & Kuliner",
      lessons: [
        {
          title: "Desain Website Restoran Mewah",
          content: p(
            "Membuat Website Restoran & Kuliner Premium",
            "Website restoran adalah etalase digital yang harus menggugah selera dan mencerminkan atmosfer restoran. Desain yang elegan dengan foto makanan berkualitas tinggi, menu digital interaktif, informasi reservasi, dan galeri suasana restoran. Pengguna harus bisa melihat menu, melakukan reservasi meja, dan mendapatkan informasi lengkap tentang restoran. Estetika visual sangat penting — penggunaan warna hangat, tipografi elegan, dan fotografi makanan yang menggoda.",
            "Buatlah desain website restoran mewah bernama 'Savoria'. Hero section menampilkan video background slow-motion dari koktail yang dituang atau hidangan yang disiapkan, dengan overlay gradien gelap. Di tengah hero, logo restoran dengan font script elegan, tagline 'Fine Dining Experience' dalam font tipis, dan tombol 'Reservasi Sekarang' dengan border tipis. Navbar transparan dengan logo, menu navigasi (Menu, Reservasi, Tentang, Galeri, Kontak), dan tombol 'Reservasi'. Bagian 'Tentang Kami' menampilkan foto interior restoran yang hangat dan cerita singkat tentang chef dan filosofi restoran. Bagian 'Menu Unggulan' menampilkan 6 hidangan dalam grid 3 kolom dengan foto makanan close-up yang menggugah selera, nama hidangan, bahan-bahan, dan harga. Efek hover pada foto makanan menampilkan informasi tambahan. Bagian 'Testimonial' dengan kutipan tamu dalam format elegant dengan foto profil. Bagian 'Galeri' menampilkan foto suasana restoran, interior, dan hidangan dalam layout masonry. Halaman menu digital interaktif dengan kategori: Makanan Pembuka, Hidangan Utama, Hidangan Penutup, dan Minuman. Setiap item menu memiliki foto, deskripsi, alergen info, dan harga. Bagian footer dengan jam operasional, alamat, nomor telepon, dan tautan media sosial. Gunakan palet warna hangat: krem, emas, dan coklat tua dengan aksen hijau zaitun. Tipografi campuran script untuk judul dan sans-serif untuk body. Gaya desain elegan, hangat, dan premium. Resolusi 8K.",
            "Foto makanan berkualitas tinggi dengan pencahayaan hangat adalah investasi terpenting untuk website restoran. Sertakan informasi alergen pada setiap menu. Form reservasi harus mudah dan cepat diisi."
          ),
          duration: 12,
        },
      ],
    },
    {
      title: "Website Agency Kreatif",
      lessons: [
        {
          title: "Desain Website Digital Agency Kreatif",
          content: p(
            "Membuat Website Agency Kreatif Digital",
            "Website agency kreatif harus menampilkan portofolio terbaik, keahlian tim, dan pendekatan kerja yang unik. Desain yang berani, penuh warna, dan kreatif mencerminkan identitas agency. Setiap proyek dalam portofolio ditampilkan dengan detail proses kreatif dari konsep hingga hasil akhir. Halaman ini menjadi alat penjualan paling kuat untuk meyakinkan calon klien tentang kualitas layanan agency.",
            "Buatlah desain website agency kreatif digital bernama 'CraftWorks'. Hero section dengan latar belakang hitam pekat dan headline 'Kami Menciptakan Pengalaman Digital' dalam font bold besar putih. Di bawah headline, terdapat showcase animasi dari proyek-proyek terbaik yang berganti secara otomatis. Navbar dengan logo, menu (Portofolio, Layanan, Tentang, Blog, Kontak), dan tombol 'Mulai Proyek' dengan gradien. Bagian 'Layanan' menampilkan 4 kartu dengan ikon unik: Desain UI/UX, Pengembangan Web, Branding, dan Pemasaran Digital. Setiap kartu memiliki efek hover dengan informasi tambahan. Bagian 'Portofolio' menampilkan grid masonry proyek dengan filter kategori (Semua, Desain Web, Aplikasi, Branding). Setiap item portofolio menampilkan thumbnail, judul proyek, dan overlay dengan tombol 'Lihat Detail' saat hover. Halaman detail proyek menampilkan gambar hero full-width, challenge, solusi, hasil, dan testimonial klien. Bagian 'Klien' menampilkan logo perusahaan yang pernah bekerja sama dalam slider otomatis. Bagian 'Testimonial' dengan video testimonial klien. Bagian 'Blog' menampilkan 3 artikel terbaru. Footer dengan CTA 'Mulai Proyek Bersama Kami' dan informasi kontak. Gunakan warna berani seperti ungu, oranye, dan cyan. Tipografi modern sans-serif dengan variasi weight. Gaya desain kreatif, dinamis, dan inspiring. Resolusi 4K.",
            "Highlight hasil konkret di setiap proyek (misalnya 'meningkatkan konversi 240%'). Testimonial video lebih powerful daripada teks. CTA di footer adalah kesempatan terakhir konversi."
          ),
          duration: 11,
        },
      ],
    },
    {
      title: "Website Marketplace Handmade",
      lessons: [
        {
          title: "Desain Marketplace Produk Kerajinan Tangan",
          content: p(
            "Membuat Website Marketplace Produk Handmade",
            "Website marketplace untuk produk handmade dan kerajinan tangan membutuhkan desain yang hangat, personal, dan menonjolkan keunikan setiap produk. Berbeda dengan e-commerce biasa, marketplace handmade perlu menampilkan cerita di balik setiap produk, profil penjual, dan proses pembuatan yang autentik. Pengguna harus bisa menjelajahi produk berdasarkan kategori, bahan, atau lokasi penjual.",
            "Buatlah desain website marketplace produk handmade bernama 'HandmadeHub'. Hero section dengan latar belakang hangat berwarna krem, ilustrasi tangan yang sedang membuat kerajinan, headline 'Temukan Keunikan dalam Setiap Karya' dan tombol 'Jelajahi Produk'. Navbar dengan logo, menu (Jelajahi, Kategori, Penjual, Tentang), ikon keranjang, dan tombol 'Daftar Jadi Penjual'. Bagian 'Kategori Populer' menampilkan 6 kartu kategori dengan ilustrasi: Aksesoris, Dekorasi Rumah, Fashion, Perlengkapan Dapur, Mainan Anak, dan Stationery. Bagian 'Produk Pilihan' menampilkan grid 4 kolom produk unggulan dengan foto produk dari berbagai sudut, nama produk, nama penjual, harga, dan badge 'Handmade' dengan ikon hati. Setiap kartu produk memiliki efek hover yang menampilkan rating dan tombol 'Tambah ke Favorit'. Bagian 'Cerita Penjual' menampilkan profil penjual dengan foto, cerita singkat, jumlah produk, dan rating dalam format kartu horizontal. Halaman detail produk menampilkan galeri foto multi-sudut, deskripsi detail, bahan yang digunakan, estimasi waktu pembuatan, profil penjual, ulasan pembeli, dan produk terkait. Halaman profil penjual menampilkan toko online mereka, portofolio produk, ulasan, dan kebijakan pengiriman. Gunakan palet warna hangat: krem, terracotta, hijau sage, dan coklat. Tipografi yang hangat dan mudah dibaca. Gaya desain terinspirasi dari Etsy dan Tokopedia dengan sentuhan artisanal. Resolusi 4K.",
            "Cerita di balik produk handmade adalah nilai jual utama. Foto multi-sudut penting untuk produk kerajinan. Fitur favorit/wishlist membantu pengguna menyimpan produk favorit."
          ),
          duration: 13,
        },
      ],
    },
    {
      title: "Website Hotel & Resort",
      lessons: [
        {
          title: "Desain Website Hotel dan Resort Premium",
          content: p(
            "Membuat Website Hotel & Resort Mewah",
            "Website hotel bintang lima harus mencerminkan kemewahan, kenyamanan, dan pelayanan eksklusif. Setiap elemen desain harus membangkitkan keinginan untuk menginap. Foto-foto kamar, fasilitas, dan pemandangan berkualitas tinggi menjadi fokus utama. Sistem pemesanan kamar yang terintegrasi, virtual tour, dan informasi paket menginap melengkapi pengalaman pengguna. Website ini adalah etalase digital yang harus mampu meyakinkan calon tamu untuk memesan kamar.",
            "Buatlah desain website hotel resort premium bernama 'Serenity Bay Resort'. Hero section full-screen dengan video slideshow pemandangan resort saat matahari terbenam, kolam renang infinity dengan latar laut, dan interior kamar mewah. Overlay gradien gelap dengan logo resort dalam font script emas, tagline 'Surga Tropis Anda Menanti', dan tombol 'Pesan Kamar' dengan aksen emas. Navbar transparan yang menjadi solid saat scroll dengan logo, menu (Kamar, Fasilitas, Galeri, Restoran, Kontak), pilihan bahasa, dan tombol 'Pesan Sekarang'. Bagian 'Kamar & Suite' menampilkan 4 tipe kamar dalam grid 2 kolom dengan foto kamar, nama (Deluxe Room, Suite Ocean View, Villa Premium, Presidential Suite), fasilitas dalam ikon, harga per malam, dan tombol 'Lihat Detail'. Halaman detail kamar menampilkan galeri foto 360 derajat, denah kamar, daftar fasilitas lengkap, kebijakan pembatalan, dan kalender ketersediaan dengan harga dinamis. Bagian 'Fasilitas' menampilkan grid ikon dengan deskripsi: Kolam Renang Infinity, Spa & Wellness, Pusat Kebugaran, Restoran Tepi Pantai, Layanan Kamar 24 Jam, dan Transportasi Bandara. Bagian 'Galeri' dengan layout masonry penuh foto-foto resort yang menakjubkan. Bagian 'Testimonial Tamu' dengan rating dan foto tamu. Footer dengan peta interaktif, alamat, kontak, dan tautan media sosial. Gunakan palet warna putih, emas, biru laut, dan hijau tropis. Tipografi elegan dengan font serif untuk judul dan sans-serif untuk body. Gaya desain mewah, eksklusif, dan menenangkan. Resolusi 8K.",
            "Foto dan video berkualitas sinematik adalah investasi utama untuk website hotel. Sertakan virtual tour 360 untuk kamar dan fasilitas. Kalender ketersediaan dengan harga dinamis meningkatkan konversi pemesanan."
          ),
          duration: 14,
        },
      ],
    },
    {
      title: "Platform Kursus Online",
      lessons: [
        {
          title: "Desain Platform Belajar Online Interaktif",
          content: p(
            "Membuat Website Platform Kursus Online",
            "Platform kursus online (LMS) membutuhkan desain yang fokus pada pengalaman belajar. Antarmuka harus bersih, navigasi intuitif, dan konten mudah diakses. Fitur-fitur seperti progress belajar, dashboard siswa, katalog kursus, dan sistem evaluasi terintegrasi dalam satu platform. Desain yang memotivasi dan tidak mengganggu sangat penting untuk pembelajaran online yang efektif.",
            "Buatlah desain platform kursus online bernama 'LearnEase'. Halaman utama menampilkan hero section dengan ilustrasi 3D seseorang yang belajar dengan laptop, headline 'Kuasai Keahlian Baru, Mulai Karier Impianmu', dan tombol 'Mulai Belajar Gratis'. Navbar dengan logo, menu (Jelajahi Kursus, Untuk Perusahaan, Harga, Tentang), ikon notifikasi, dan avatar profil pengguna. Bagian 'Kategori Populer' menampilkan 6 kartu dengan ikon: Pemrograman, Desain, Pemasaran, Bisnis, Fotografi, dan Musik. Bagian 'Kursus Unggulan' menampilkan grid 3 kolom kartu kursus dengan thumbnail, kategori badge, judul, instruktur dengan foto dan nama, rating bintang, jumlah siswa, harga dengan coretan untuk diskon, dan badge 'Terlaris' atau 'Diskon 50%'. Halaman detail kursus menampilkan video preview, deskripsi kursus, silabus dalam format akordeon (setiap bab bisa diekspansi), profil instruktur dengan portofolio, ulasan siswa, dan tombol 'Daftar Sekarang'. Dashboard siswa menampilkan progress belajar dalam bentuk lingkaran, kursus yang sedang diambil, jadwal live session, dan rekomendasi kursus lanjutan. Halaman belajar video menampilkan video di kiri (70%) dengan daftar materi di kanan (30%), fitur catatan, bookmark, dan kecepatan pemutaran. Sertakan halaman forum diskusi untuk tanya jawab antar siswa. Gunakan warna biru dan hijau yang menenangkan dengan aksen oranye untuk tombol CTA. Tipografi bersih dan mudah dibaca. Gaya desain terinspirasi dari Udemy dan Coursera. Resolusi 4K.",
            "Progress tracking visual meningkatkan motivasi belajar. Sertakan fitur bookmark agar siswa bisa melanjutkan dari bagian terakhir. Forum diskusi meningkatkan engagement dan retensi siswa."
          ),
          duration: 13,
        },
      ],
    },
    {
      title: "Website Lowongan Pekerjaan",
      lessons: [
        {
          title: "Desain Portal Lowongan Kerja Online",
          content: p(
            "Membuat Website Portal Lowongan Pekerjaan",
            "Portal lowongan kerja adalah platform yang menghubungkan pencari kerja dengan perusahaan. Desain harus profesional, terpercaya, dan memudahkan pencarian pekerjaan. Fitur utama meliputi pencarian lowongan dengan filter lengkap, profil perusahaan, upload CV, notifikasi lowongan sesuai minat, dan sistem lamaran terintegrasi. Pengalaman pengguna yang lancar sangat penting karena pencari kerja sering mengakses platform ini setiap hari.",
            "Buatlah desain portal lowongan kerja online bernama 'KerjaDulu'. Hero section dengan latar belakang gradien biru ke ungu, ilustrasi orang yang sedang merayakan keberhasilan, headline 'Temukan Pekerjaan Impianmu', dan kolom pencarian besar dengan input kata kunci, dropdown lokasi, dan dropdown kategori. Tombol 'Cari Lowongan' dengan gradien. Di bawah hero, statistik real-time: '12.450+ Lowongan Tersedia', '8.920+ Perusahaan', '45.000+ Pencari Kerja Terdaftar'. Navbar dengan logo, menu (Cari Lowongan, Perusahaan, Tentang, Blog), ikon notifikasi, dan tombol 'Masuk/Daftar'. Bagian 'Kategori Populer' menampilkan 8 ikon kategori: Teknologi, Keuangan, Kesehatan, Pendidikan, Pemasaran, Desain, Manufaktur, dan Pariwisata. Bagian 'Lowongan Pilihan' menampilkan daftar lowongan dalam format kartu horizontal dengan logo perusahaan, nama posisi, nama perusahaan, lokasi dengan ikon pin, gaji, tipe pekerjaan (Full-time/Part-time/Kontrak), badge 'Baru' atau 'Segera', dan tombol 'Lihat Detail'. Halaman detail lowongan menampilkan header dengan logo perusahaan besar, nama posisi, perusahaan, lokasi, gaji, tipe pekerjaan, deskripsi pekerjaan, kualifikasi, tanggung jawab, benefit, dan tombol 'Lamar Sekarang'. Halaman profil perusahaan menampilkan header dengan cover photo, logo, nama perusahaan, industri, lokasi, jumlah karyawan, website, dan daftar lowongan aktif dari perusahaan tersebut. Halaman profil pencari kerja menampilkan foto, nama, headline profesional, ringkasan, pengalaman kerja (timeline), pendidikan, keahlian (tag), dan tombol download CV. Gunakan warna biru profesional dan hijau untuk aksen positif. Tipografi bersih dan modern. Gaya desain terinspirasi dari LinkedIn dan Jobstreet. Resolusi 4K.",
            "Pencarian dengan filter lengkap (lokasi, gaji, tipe) adalah fitur paling penting. Sertakan estimasi gaji untuk transparansi. Fitur notifikasi lowongan baru meningkatkan retensi pengguna."
          ),
          duration: 12,
        },
      ],
    },
    {
      title: "Website Komunitas Gaming",
      lessons: [
        {
          title: "Desain Platform Komunitas Gaming Online",
          content: p(
            "Membuat Website Komunitas dan Forum Gaming",
            "Website komunitas gaming adalah platform untuk para gamer berkumpul, berdiskusi, berbagi konten, dan mengikuti turnamen. Desain harus energetik, modern, dan mencerminkan budaya gaming. Elemen gamifikasi seperti level pengguna, badge prestasi, dan leaderboard meningkatkan engagement. Fitur forum diskusi, berbagi screenshot gameplay, turnamen, dan profil pemain menjadi inti dari platform ini.",
            "Buatlah desain platform komunitas gaming bernama 'GameVault'. Hero section dengan latar belakang gelap pekat, efek partikel bercahaya, ilustrasi karakter game dengan armor futuristik, headline 'Level Up Komunitas Gaming-mu' dengan efek neon glow, dan tombol 'Gabung Sekarang Gratis'. Navbar dengan logo bergaya pixel art modern, menu (Beranda, Forum, Turnamen, Leaderboard, Marketplace), ikon pencarian, dan avatar pengguna dengan level badge. Bagian 'Game Populer' menampilkan 6 kartu game dengan cover art, judul, platform (PC, PlayStation, Xbox), dan jumlah pemain aktif. Bagian 'Forum Diskusi' menampilkan daftar thread terbaru dengan foto profil poster, judul thread, kategori, jumlah balasan, dan waktu posting terakhir. Kategori forum meliputi: Diskusi Game, Tips & Trik, Build & Setup, Cari Tim, dan Off Topic. Bagian 'Turnamen' menampilkan kartu turnamen dengan nama, game, tanggal, hadiah, status (Pendaftaran Dibuka/Sedang Berlangsung/Selesai), dan tombol 'Daftar'. Bagian 'Leaderboard' menampilkan peringkat pemain dengan avatar, username, level, XP, dan badge pencapaian. Top 3 ditampilkan dengan podium khusus. Halaman profil pemain menampilkan banner, avatar dengan frame kustom, username, level, XP bar, statistik (jam bermain, game favorit, win rate), koleksi badge, dan riwayat turnamen. Fitur chat real-time untuk komunikasi antar pemain. Gunakan palet warna gelap dengan aksen neon (ungu, cyan, merah). Tipografi bold dan modern dengan aksen pixel untuk elemen tertentu. Gaya desain terinspirasi dari Discord dan Steam. Resolusi 4K.",
            "Gamifikasi (level, badge, XP) meningkatkan retensi dan partisipasi. Leaderboard dengan podium untuk top 3 memotivasi kompetisi. Forum dengan kategori jelas memudahkan navigasi diskusi."
          ),
          duration: 13,
        },
      ],
    },
    {
      title: "Website Booking Dokter",
      lessons: [
        {
          title: "Desain Platform Booking Dokter dan Klinik",
          content: p(
            "Membuat Website Booking Dokter Online",
            "Platform booking dokter memudahkan pasien menemukan dokter, melihat jadwal praktik, dan membuat janji temu secara online. Desain harus memberikan rasa percaya dan aman, dengan informasi dokter yang lengkap, jadwal yang jelas, dan proses booking yang sederhana. Fitur telekonsultasi dan manajemen riwayat kesehatan terintegrasi untuk memberikan layanan kesehatan yang komprehensif.",
            "Buatlah desain platform booking dokter online bernama 'SehatQ'. Hero section dengan latar belakang biru muda bersih, ilustrasi dokter dan pasien dalam gaya ilustrasi modern yang ramah, headline 'Konsultasi Kesehatan Tanpa Antri', subteks 'Temukan dokter, buat janji temu, dan konsultasi online dengan mudah', dan kolom pencarian dengan input 'Cari dokter, spesialisasi, atau rumah sakit' dan tombol 'Cari'. Navbar dengan logo, menu (Cari Dokter, Spesialisasi, RS & Klinik, Artikel Kesehatan), dan tombol 'Masuk/Daftar'. Bagian 'Spesialisasi Populer' menampilkan 8 ikon lingkaran dengan ilustrasi: Dokter Umum, Spesialis Anak, Spesialis Kulit, Spesialis Mata, Spesialis Gigi, Spesialis Jantung, Spesialis Kandungan, dan Psikolog. Bagian 'Dokter Tersedia' menampilkan grid kartu dokter dengan foto profesional, nama lengkap, spesialisasi, nomor STR, rating bintang, jumlah pasien, tahun pengalaman, harga konsultasi, jadwal tersedia (hari dan jam), dan tombol 'Buat Janji'. Halaman detail dokter menampilkan foto besar, informasi lengkap (pendidikan, pengalaman, anggota organisasi), jadwal praktik mingguan, ulasan pasien dengan rating dan komentar, dan tombol 'Booking Sekarang'. Proses booking dengan kalender interaktif yang menampilkan slot tersedia, pilih jam, konfirmasi data pasien, dan pembayaran (jika berbayar). Halaman dashboard pasien menampilkan janji temu mendatang, riwayat konsultasi, resep obat, dan tagihan. Fitur telekonsultasi video terintegrasi dalam platform. Gunakan warna biru dan hijau yang menenangkan dan memberikan rasa percaya. Tipografi bersih, hangat, dan mudah dibaca. Gaya desain terinspirasi dari Halodoc dan Alodokter. Resolusi 4K.",
            "Informasi dokter yang lengkap (termasuk nomor STR dan pendidikan) membangun kepercayaan. Kalender slot real-time mengurangi no-show. Fitur telekonsultasi meningkatkan aksesibilitas layanan kesehatan."
          ),
          duration: 13,
        },
      ],
    },
    {
      title: "Website Real Estate Properti",
      lessons: [
        {
          title: "Desain Portal Properti dan Real Estate",
          content: p(
            "Membuat Website Real Estate dan Properti",
            "Portal properti adalah platform untuk mencari dan menjual properti seperti rumah, apartemen, tanah, dan ruko. Desain harus profesional, terpercaya, dan memudahkan pencarian properti dengan berbagai filter. Visual properti berkualitas tinggi, denah, dan virtual tour menjadi fitur penting. Informasi lengkap tentang properti termasuk harga, lokasi, spesifikasi, dan fasilitas sekitar membantu pembeli membuat keputusan.",
            "Buatlah desain portal properti real estate bernama 'PropertiIndah'. Hero section dengan foto properti premium full-width seperti rumah mewah dengan kolam renang, overlay gradien gelap, headline 'Temukan Rumah Impian Anda' dengan font elegan, dan kolom pencarian besar dengan tiga input: 'Kota atau Area', 'Tipe Properti', dan 'Rentang Harga'. Tombol 'Cari Properti' besar dengan ikon pencarian. Navbar dengan logo, menu (Beli, Sewa, Baru, Agen, Pasang Iklan), dan tombol 'Masuk'. Bagian 'Kategori Properti' menampilkan 6 kartu dengan ikon dan ilustrasi: Rumah Tapak, Apartemen, Tanah, Ruko, Vila, dan Gedung Kantor. Bagian 'Properti Unggulan' menampilkan grid 3 kolom kartu properti dengan foto utama besar, badge 'Dijual' atau 'Disewakan', harga dalam font bold, judul properti, lokasi dengan ikon pin, spesifikasi (kamar tidur, kamar mandi, luas bangunan, luas tanah) dalam ikon, dan nama agen dengan foto kecil. Hover effect menampilkan tombol 'Lihat Detail' dan 'Simpan'. Halaman detail properti menampilkan galeri foto dengan navigasi thumbnail, denah lantai, virtual tour 360, deskripsi properti, spesifikasi lengkap, fasilitas, lokasi di peta interaktif (dengan informasi sekolah, rumah sakit, pusat perbelanjaan di sekitar), profil agen, dan form pertanyaan. Sertakan fitur mortgage calculator untuk estimasi cicilan. Halaman hasil pencarian menampilkan properti dalam grid atau list view dengan filter sidebar: harga, tipe, lokasi, luas bangunan, luas tanah, kamar tidur, kamar mandi, dan fasilitas. Gunakan warna biru navy profesional dan emas untuk aksen premium. Tipografi bersih dan modern. Gaya desain terinspirasi dari Rumah123 dan 99.co. Resolusi 8K.",
            "Foto properti berkualitas tinggi adalah faktor terpenting dalam penjualan properti. Virtual tour 360 meningkatkan minat pembeli secara signifikan. Informasi fasilitas sekitar properti (sekolah, rumah sakit) sangat dipertimbangkan pembeli."
          ),
          duration: 14,
        },
      ],
    },
    {
      title: "Website Fitness & Gym",
      lessons: [
        {
          title: "Desain Website Pusat Kebugaran dan Gym",
          content: p(
            "Membuat Website Fitness dan Gym Center",
            "Website pusat kebugaran harus memotivasi dan menginspirasi pengunjung untuk memulai perjalanan fitness mereka. Desain yang energetik dengan foto atletis, warna-warna berani, dan tipografi kuat menciptakan kesan dinamis dan profesional. Informasi tentang program latihan, jadwal kelas, profil pelatih, paket keanggotaan, dan testimoni anggota menjadi konten utama. Integrasi dengan sistem pendaftaran dan pembayaran online melengkapi fungsionalitas.",
            "Buatlah desain website fitness dan gym center bernama 'IronFit Gym'. Hero section dengan foto full-width atlet sedang berlatih dengan pencahayaan dramatis dan keringat yang terlihat, overlay gradien gelap dengan warna oranye dan hitam. Headline 'Transformasi Dimulai Hari Ini' dalam font bold besar dengan efek teks sedikit miring. Subteks 'Latihan dengan pelatih profesional terbaik di kota'. Dua tombol CTA: 'Mulai Gratis' dengan gradien oranye dan 'Lihat Program' dengan outline. Navbar dengan logo bergambar barbel, menu (Program, Jadwal, Pelatih, Harga, Blog, Tentang), dan tombol 'Daftar Anggota'. Bagian 'Program Latihan' menampilkan 4 kartu dengan foto ilustrasi: Kebugaran Umum, Penurunan Berat Badan, Pembentukan Otot, dan Yoga & Fleksibilitas. Setiap kartu memiliki deskripsi singkat, durasi program, dan tombol 'Lihat Detail'. Bagian 'Jadwal Kelas' menampilkan tabel jadwal mingguan dengan nama kelas, waktu, instruktur, dan level. Kelas yang sudah penuh diberi badge 'Penuh'. Bagian 'Pelatih Kami' menampilkan grid 4 kolom foto pelatih dengan nama, spesialisasi, dan sertifikasi. Hover menampilkan bio singkat. Bagian 'Harga Keanggotaan' menampilkan 3 kartu pricing: Basic (Rp 250.000/bulan), Premium (Rp 500.000/bulan dengan badge 'Terpopuler' dan fitur tambahan seperti sauna dan kelas premium), dan VIP (Rp 1.000.000/bulan dengan personal trainer). Bagian 'Testimonial' menampilkan foto before-after anggota dan kutipan. Bagian footer dengan jam operasional, alamat, kontak, dan tautan media sosial. Gunakan warna hitam, oranye terang, dan abu-abu. Tipografi bold dan maskulin. Gaya desain energetik, profesional, dan memotivasi. Resolusi 4K.",
            "Foto before-after anggota asli adalah social proof paling kuat untuk gym. Sertakan trial gratis untuk menarik anggota baru. Jadwal kelas interaktif membantu anggota merencanakan latihan."
          ),
          duration: 11,
        },
      ],
    },
    {
      title: "Website Wedding Organizer",
      lessons: [
        {
          title: "Desain Website Wedding Organizer Premium",
          content: p(
            "Membuat Website Wedding Organizer dan Pernikahan",
            "Website wedding organizer harus romantis, elegan, dan memberikan inspirasi pernikahan. Desain yang feminin dengan warna-warna lembut, tipografi elegan, dan foto-foto pernikahan yang indah menciptakan suasana yang hangat dan romantis. Portofolio pernikahan, paket layanan, galeri inspirasi, daftar vendor rekomendasi, dan fitur budgeting menjadi konten utama. Website ini harus mampu membangkitkan emosi dan kepercayaan calon pasangan pengantin.",
            "Buatlah desain website wedding organizer premium bernama 'Serenata Wedding'. Hero section dengan foto pernikahan dreamy dengan pencahayaan golden hour, overlay gradien putih transparan, headline 'Setiap Cinta Pantas Dirayakan dengan Sempurna' dalam font script elegan berwarna emas, dan tombol 'Konsultasi Gratis' dengan border emas. Navbar transparan dengan logo berbentuk cincin, menu (Portofolio, Paket, Galeri, Vendor, Blog, Kontak), dan ikon wishlist. Bagian 'Layanan Kami' menampilkan 6 kartu dengan ilustrasi: Wedding Planning, Dekorasi, Dokumentasi, Katering, Makeup & Busana, dan Hiburan. Setiap kartu memiliki ikon, judul, dan deskripsi layanan. Bagian 'Portofolio' menampilkan grid masonry foto-foto pernikahan dengan efek hover yang menampilkan nama pasangan dan tanggal pernikahan. Klik untuk melihat detail pernikahan dengan galeri lengkap. Bagian 'Paket Pernikahan' menampilkan 3 kartu paket: Essentials (Rp 25 Juta), Premium (Rp 50 Juta dengan badge 'Terlaris'), dan Luxury (Rp 100 Juta). Setiap paket menampilkan daftar layanan dengan checklist, harga, dan tombol 'Lihat Detail'. Bagian 'Vendor Rekomendasi' menampilkan grid vendor dari berbagai kategori: fotografer, rias, katering, dll. Masing-masing dengan rating dan ulasan. Bagian 'Galeri Inspirasi' menampilkan foto-foto berdasarkan tema: Klasik, Modern, Rustic, Tropical, dan Intimate. Bagian 'Blog' menampilkan artikel tips pernikahan. Bagian 'Testimonial' dengan foto pasangan bahagia dan kutipan haru. Footer dengan kontak, alamat, dan media sosial. Gunakan palet warna putih, emas, dusty pink, dan hijau sage. Tipografi campuran script untuk judul dan sans-serif untuk body. Gaya desain romantis, elegan, dan premium. Resolusi 8K.",
            "Foto pernikahan berkualitas tinggi adalah aset terpenting. Testimonial dengan foto pasangan asli membangun kepercayaan. Sertakan fitur budgeting calculator untuk membantu pasangan merencanakan anggaran."
          ),
          duration: 12,
        },
      ],
    },
    {
      title: "Website Travel & Wisata",
      lessons: [
        {
          title: "Desain Portal Travel dan Pemesanan Wisata",
          content: p(
            "Membuat Website Travel dan Pemesanan Wisata",
            "Portal travel dan wisata adalah platform untuk merencanakan dan memesan perjalanan. Desain harus inspiring dan memicu wanderlust dengan foto-foto destinasi yang menakjubkan. Fitur pencarian tiket pesawat, booking hotel, paket wisata, dan sewa mobil terintegrasi dalam satu platform. Informasi lengkap tentang destinasi termasuk panduan wisata, ulasan traveler, dan rekomendasi itinerary membantu pengguna merencanakan perjalanan impian mereka.",
            "Buatlah desain portal travel online bernama 'JelajahiDunia'. Hero section dengan video background slow-motion dari berbagai destinasi eksotis: pantai tropis, pegunungan bersalju, kota metropolitan, dan kuil kuno. Overlay gradien gelap dengan headline 'Jelajahi Keindahan Dunia' dalam font tipis putih, dan kolom pencarian multi-input: 'Destinasi', 'Tanggal Check-in', 'Tanggal Check-out', dan 'Jumlah Tamu'. Tombol 'Cari' besar dengan ikon pencarian. Navbar dengan logo, menu (Pesawat, Hotel, Paket Wisata, Sewa Mobil, Inspirasi), dan tombol 'Masuk/Daftar'. Bagian 'Destinasi Populer' menampilkan 6 kartu destinasi horizontal dengan foto full-bleed, overlay gradien, nama kota, negara, dan harga mulai. Efek hover dengan zoom halus. Bagian 'Paket Wisata Unggulan' menampilkan grid 3 kolom kartu paket dengan foto destinasi, durasi (3 Hari 2 Malam), nama paket, itinerary ringkas, fasilitas (hotel, makan, guide), harga, rating, dan tombol 'Lihat Detail'. Halaman detail paket wisata menampilkan galeri foto, itinerary harian, hotel termasuk, fasilitas, kebijakan pembatalan, ulasan traveler, dan tombol 'Pesan Sekarang'. Bagian 'Inspirasi Perjalanan' menampilkan artikel blog dengan foto menarik, judul, dan cuplikan. Bagian 'Testimonial Traveler' dengan foto, nama, asal, destinasi yang dikunjungi, dan rating. Footer dengan peta interaktif kantor cabang, kontak, dan tautan media sosial. Gunakan warna biru laut, putih, dan aksen coral atau kuning. Tipografi bersih dan mudah dibaca. Gaya desain terinspirasi dari Traveloka dan Booking.com. Resolusi 4K.",
            "Video destinasi sebagai background langsung membangkitkan keinginan traveling. Itinerary yang jelas dalam paket wisata memudahkan keputusan. Ulasan traveler asli membangun kepercayaan."
          ),
          duration: 13,
        },
      ],
    },
    {
      title: "Website Donasi & Crowdfunding",
      lessons: [
        {
          title: "Desain Platform Donasi dan Crowdfunding",
          content: p(
            "Membuat Website Donasi dan Penggalangan Dana",
            "Platform donasi dan crowdfunding mempertemukan penggalang dana dengan donatur. Desain harus membangkitkan empati, transparan, dan memudahkan proses donasi. Cerita di balik setiap kampanye, progress penggalangan dana, dan dampak yang telah dicapai menjadi elemen penting. Kepercayaan adalah faktor utama — informasi pencairan dana, laporan penggunaan dana, dan identitas penggalang dana yang jelas sangat penting.",
            "Buatlah desain platform donasi dan crowdfunding bernama 'BersamaBisa'. Hero section dengan latar belakang gradien hangat dari oranye ke merah, ilustrasi tangan-tangan yang saling membantu, headline 'Bersama Kita Bisa Membantu Sesama' yang menghangatkan hati, dan tombol 'Mulai Donasi' besar dengan ikon hati. Navbar dengan logo, menu (Jelajahi Kampanye, Cara Membantu, Tentang, Blog), dan tombol 'Galang Dana'. Bagian 'Kampanye Mendesak' menampilkan 3 kampanye prioritas dengan foto penerima manfaat, judul kampanye, progress penggalangan dana dalam progress bar berwarna, dana terkumpul dari target, jumlah donatur, dan sisa hari. Warna progress bar hijau jika mencapai 75%+, kuning jika 50-75%, merah jika di bawah 50%. Bagian 'Kategori Kampanye' menampilkan 6 ikon kategori: Bencana Alam, Kesehatan, Pendidikan, Sosial, Hewan, dan Lingkungan. Bagian 'Kampanye Lainnya' menampilkan grid 3 kolom kampanye dengan format kartu serupa. Halaman detail kampanye menampilkan foto utama, judul, cerita lengkap (dengan foto dan video), progress bar real-time, daftar donatur terbaru (nama, jumlah, waktu), penggalang dana (profil dan identitas), tombol 'Donasi Sekarang' fixed di bawah, dan pembaruan kampanye. Form donasi menampilkan pilihan nominal (Rp 50.000, Rp 100.000, Rp 250.000, Rp 500.000, atau jumlah kustom), metode pembayaran (transfer bank, e-wallet, kartu kredit), opsi anonim, dan pesan untuk penggalang dana. Bagian 'Dampak Kami' menampilkan statistik: total dana terkumpul, jumlah kampanye sukses, jumlah donatur, dan jumlah penerima manfaat. Footer dengan transparansi laporan keuangan, kontak, dan tautan. Gunakan warna hangat: oranye, merah, dan kuning dengan aksen putih. Tipografi hangat dan mudah dibaca. Gaya desain terinspirasi dari Kitabisa dan GoFundMe. Resolusi 4K.",
            "Progress bar real-time mendorong donatur untuk membantu mencapai target. Foto dan cerita autentik membangkitkan empati. Transparansi laporan dana membangun kepercayaan jangka panjang."
          ),
          duration: 12,
        },
      ],
    },
    {
      title: "Website Musik & Audio Streaming",
      lessons: [
        {
          title: "Desain Platform Streaming Musik Online",
          content: p(
            "Membuat Website Streaming Musik dan Audio",
            "Platform streaming musik adalah layanan digital untuk mendengarkan jutaan lagu secara online. Desain harus imersif, gelap, dan fokus pada pengalaman mendengarkan. Fitur pencarian lagu, playlist pribadi, rekomendasi berdasarkan selera, dan integrasi dengan artis favorit. Visual yang kaya dengan artwork album, lirik real-time, dan visualisasi audio menciptakan pengalaman mendengarkan yang lengkap.",
            "Buatlah desain platform streaming musik online bernama 'MelodiKu'. Hero section dengan background gradien gelap ke ungu, ilustrasi gelombang suara 3D yang bergerak dinamis, headline 'Dengarkan Jutaan Lagu Tanpa Batas', subteks 'Nikmati musik favoritmu kapan saja, di mana saja', dan tombol 'Coba Gratis 1 Bulan' dengan gradien ungu ke merah muda. Navbar dengan logo (not balok stylized), menu (Beranda, Cari, Perpustakaan, Playlist), ikon notifikasi, dan avatar profil. Bagian 'Sedang Tren' menampilkan horizontal scroll kartu lagu populer dengan artwork album, judul lagu, artis, dan badge 'Top 10'. Bagian 'Playlist Pilihan' menampilkan grid 4 kolom kartu playlist dengan artwork koleksi, judul playlist, jumlah lagu, dan suasana (Mood: Semangat, Santai, Sedih, Fokus). Bagian 'Artis Favorit' menampilkan deretan foto profil artis melingkar dengan nama di bawah. Pemutar musik tetap di bagian bawah (sticky player) dengan artwork album, judul lagu, artis, kontrol play/pause, next/previous, progress bar dengan waktu, kontrol volume, dan ikon like. Saat diperluas, player menampilkan lirik real-time dan visualisasi audio. Halaman detail artis menampilkan banner besar, foto profil, nama, genre, jumlah pendengar bulanan, lagu populer (top 10), album, dan konser mendatang. Halaman pencarian dengan hasil real-time saat mengetik, filter berdasarkan lagu, artis, album, dan playlist. Halaman perpustakaan menampilkan playlist buatan pengguna, lagu favorit, album tersimpan, dan artis diikuti. Gunakan palet warna gelap (hitam, ungu tua) dengan aksen gradien ungu ke merah muda. Tipografi modern sans-serif. Gaya desain terinspirasi dari Spotify dan Apple Music. Resolusi 4K.",
            "Sticky player memastikan akses cepat ke kontrol musik dari halaman mana pun. Rekomendasi personalisasi berdasarkan selera mendengarkan meningkatkan retensi. Fitur lirik real-time menambah nilai hiburan."
          ),
          duration: 13,
        },
      ],
    },
    {
      title: "Website Organisasi Non-Profit",
      lessons: [
        {
          title: "Desain Website Yayasan dan Lembaga Sosial",
          content: p(
            "Membuat Website Organisasi Non-Profit",
            "Website organisasi non-profit harus menyampaikan misi sosial dengan jelas, membangun kepercayaan, dan menginspirasi aksi. Desain yang hangat, humanis, dan profesional dengan foto-foto kegiatan nyata di lapangan. Informasi tentang program, dampak yang telah dicapai, cara berkontribusi (donasi, relawan, kemitraan), dan laporan transparansi keuangan menjadi konten utama. Cerita penerima manfaat yang menyentuh hati adalah kekuatan terbesar website non-profit.",
            "Buatlah desain website yayasan non-profit bernama 'HarapanKita'. Hero section dengan foto kegiatan sosial di lapangan (anak-anak belajar atau warga dibantu), overlay gradien hangat, headline 'Bersama Wujudkan Senyuman Baru' dalam font hangat, subteks 'Setiap donasi Anda memberi harapan bagi yang membutuhkan', dan tombol 'Donasi Sekarang' dengan warna hangat menonjol. Navbar dengan logo (gambar tangan memegang hati), menu (Tentang, Program, Dampak, Bergabung, Blog, Kontak), dan tombol 'Donasi'. Bagian 'Program Kami' menampilkan 4 kartu program dengan foto kegiatan: Pendidikan untuk Semua, Layanan Kesehatan, Bantuan Bencana, dan Pemberdayaan Ekonomi. Setiap kartu memiliki deskripsi, jumlah penerima manfaat, dan tombol 'Lihat Detail'. Bagian 'Dampak Kami' menampilkan statistik besar dengan ikon: '12.500+ Anak Terbantu', '50+ Sekolah Dibangun', '25.000+ Donatur', '8 Tahun Berdiri'. Angka ditampilkan dengan animasi counting. Bagian 'Kegiatan Terbaru' menampilkan grid 3 kolom foto kegiatan dengan judul dan tanggal. Halaman detail program menampilkan foto, deskripsi program, tujuan, penerima manfaat, progress, dan cara terlibat. Bagian 'Kisah Penerima Manfaat' menampilkan profil dengan foto, nama, dan kisah inspiratif dalam format kartu. Halaman 'Cara Membantu' menampilkan tiga opsi: Donasi (dengan pilihan nominal), Menjadi Relawan (form pendaftaran), dan Kemitraan Perusahaan. Bagian 'Transparansi' menampilkan laporan keuangan tahunan dalam format visual yang mudah dipahami. Footer dengan alamat, kontak, rekening donasi, dan media sosial. Gunakan warna hangat: hijau tosca, oranye lembut, dan putih. Tipografi hangat dan bersih. Gaya desain humanis, profesional, dan menginspirasi. Resolusi 4K.",
            "Cerita penerima manfaat yang autentik adalah kekuatan terbesar website non-profit. Transparansi laporan keuangan membangun kepercayaan donatur. Foto kegiatan nyata lebih powerful daripada ilustrasi."
          ),
          duration: 12,
        },
      ],
    },
    {
      title: "Website Ensiklopedia Digital",
      lessons: [
        {
          title: "Desain Platform Ensiklopedia dan Referensi Online",
          content: p(
            "Membuat Website Ensiklopedia Digital",
            "Platform ensiklopedia digital menyediakan akses ke pengetahuan dan informasi terstruktur. Desain harus fokus pada keterbacaan, navigasi yang mudah, dan pencarian yang cepat. Artikel dengan format kaya (gambar, tabel, diagram, video), kategori hierarkis, referensi silang, dan mode baca yang nyaman. Sistem kontribusi dan editorial yang memungkinkan banyak penulis berpartisipasi dengan tetap menjaga kualitas konten.",
            "Buatlah desain platform ensiklopedia digital berbahasa Indonesia bernama 'WawasanID'. Halaman utama menampilkan kolom pencarian besar di tengah dengan placeholder 'Cari pengetahuan...' dan ikon kaca pembesar. Di bawahnya, terdapat 'Artikel Pilihan' yang menampilkan satu artikel unggulan dengan ilustrasi, judul, cuplikan, dan kategori. Bagian 'Kategori Pengetahuan' menampilkan 8 kartu kategori besar dengan ikon: Sains & Teknologi, Sejarah & Budaya, Geografi & Alam, Seni & Sastra, Filsafat & Agama, Kesehatan & Psikologi, Masyarakat & Politik, dan Olahraga & Rekreasi. Setiap kategori menampilkan jumlah artikel. Bagian 'Artikel Terbaru' menampilkan daftar artikel yang baru diterbitkan atau diedit. Navbar minimalis dengan logo, tautan (Beranda, Jelajahi, Kategori, Tentang), tombol 'Masuk' untuk kontributor, dan ikon pencarian. Halaman artikel menggunakan tata letak dua kolom: konten utama (70%) dan sidebar (30%). Konten artikel menampilkan judul, metadata (penulis, editor terakhir, tanggal publikasi, lisensi), daftar isi sticky, konten dengan heading hierarkis, gambar dengan caption, tabel, kutipan referensi, dan catatan kaki. Sidebar menampilkan daftar isi, artikel terkait, dan informasi kategori. Di bagian bawah artikel, terdapat bagian referensi, bacaan lanjutan, tautan eksternal, dan komentar diskusi. Halaman kategori menampilkan subkategori hierarkis dan daftar artikel dalam kategori tersebut. Fitur mode baca malam untuk kenyamanan membaca. Gunakan palet warna putih bersih, abu-abu, dan biru tua sebagai aksen. Tipografi serif untuk konten artikel dan sans-serif untuk UI. Gaya desain terinspirasi dari Wikipedia dan Britannica dengan sentuhan modern. Resolusi 4K.",
            "Mode baca malam sangat penting untuk platform baca konten panjang. Referensi silang antar artikel meningkatkan nilai pengetahuan. Sistem riwayat revisi menjaga kredibilitas dan akuntabilitas konten."
          ),
          duration: 12,
        },
      ],
    },
    {
      title: "Website Event & Ticketing",
      lessons: [
        {
          title: "Desain Platform Event dan Pemesanan Tiket",
          content: p(
            "Membuat Website Event Management dan Ticketing",
            "Platform event dan ticketing adalah solusi untuk menemukan, mendaftar, dan membeli tiket berbagai acara. Desain harus energetik, informatif, dan memudahkan pencarian event berdasarkan kategori, lokasi, dan tanggal. Fitur kalender event, rekomendasi berdasarkan minat, peta venue interaktif, dan sistem QR code ticketing. Excellent UX sangat penting karena pengguna sering membeli tiket dalam tekanan waktu (event akan segera dimulai atau tiket terbatas).",
            "Buatlah desain platform event dan ticketing online bernama 'EventHub'. Hero section dengan ilustrasi kerumunan orang merayakan konser, gradien warna-warni, headline 'Temukan dan Hadiri Acara Favoritmu', subteks 'Dari konser, konferensi, hingga workshop — semua ada di sini', dan kolom pencarian dengan input 'Cari acara, kategori, atau lokasi' dan tombol 'Cari'. Navbar dengan logo, menu (Jelajahi, Kalender, Kategori, Buat Event), dan tombol 'Masuk/Daftar'. Bagian 'Kategori Event' menampilkan 8 ikon kategori melingkar: Konser Musik, Konferensi & Seminar, Workshop & Kelas, Olahraga, Seni & Budaya, Festival, Pameran, dan Networking. Bagian 'Event Mendatang' menampilkan grid 3 kolom kartu event dengan foto poster, kategori badge, judul event, tanggal dan jam (dengan countdown), lokasi dengan ikon pin, harga mulai, dan jumlah tiket tersisa (jika sedikit tampilkan 'Hampir Habis' dengan warna merah). Halaman detail event menampilkan poster besar, informasi lengkap (tanggal, jam, lokasi, peta venue), deskripsi event, lineup/pembicara (dengan foto dan bio), agenda/jadwal acara, kategori kursi/paket tiket dengan pilihan harga, peta tempat duduk interaktif (untuk event with seating), tombol 'Beli Tiket' fixed di bawah. Proses pembelian tiket: pilih kategori tiket dan jumlah, pilih kursi (jika ada), data peserta, pilih metode pembayaran, konfirmasi. Setelah pembayaran, tampilkan QR code tiket dan email konfirmasi. Halaman dashboard pengguna menampilkan tiket yang akan datang (dengan QR code), riwayat event, dan wishlist. Bagian 'Testimonial' menampilkan ulasan peserta event. Footer dengan bantuan, kontak, dan media sosial. Gunakan warna-warna cerah: ungu, pink, dan biru dengan aksen neon. Tipografi modern dan dinamis. Gaya desain terinspirasi dari Loket dan Tiket.com. Resolusi 4K.",
            "Countdown ke event menciptakan urgensi. Indikator 'Hampir Habis' mendorong pembelian cepat. QR code ticketing memudahkan check-in. Peta venue interaktif sangat penting untuk event with assigned seating."
          ),
          duration: 13,
        },
      ],
    },
  ];
}
