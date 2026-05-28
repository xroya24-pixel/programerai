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

interface LessonData { title: string; content: string; duration: number }
interface ChapterData { title: string; lessons: LessonData[] }

export function getPremiumPromptSeed(): ChapterData[] {
  return [
    {
      title: "Landing Page Hero",
      lessons: [
        {
          title: "Futuristic AI Hero dengan Neon Gradient",
          content: p(
            "Futuristic AI Hero Section",
            "Prompt untuk menciptakan hero section bertema AI futuristik dengan neon gradient, partikel bergerak, dan tipografi modern. Cocok untuk landing page AI startup, produk teknologi, atau platform machine learning.",
            "A cinematic hero section for an AI startup landing page. Dark mode background with deep purple-to-cyan gradient mesh. Floating holographic UI elements with glassmorphism effect. A large central headline 'AI-Powered Future' in bold modern sans-serif with neon glow text effect. Subtle animated particle system in the background. A CTA button with gradient border that pulses gently. 3D geometric shapes floating in depth. Professional, clean, futuristic tech aesthetic. Ultra-realistic lighting. 8K resolution. --ar 21:9 --v 6 --style raw",
            "Gunakan prompt ini sebagai referensi visual untuk hero section. Sesuaikan warna gradient dengan brand guideline. Tambahkan logo atau maskot di pojok kiri atas untuk branding."
          ),
          duration: 8,
        },
        {
          title: "SaaS Hero dengan 3D Illustration",
          content: p(
            "SaaS Landing Page Hero",
            "Prompt untuk membuat landing page hero section dengan 3D illustration interaktif di sisi kanan. Cocok untuk produk SaaS, platform B2B, atau layanan subscription dengan target audiens profesional.",
            "A modern B2B SaaS landing page hero section. Left side has bold headline 'Scale Your Business' with subtext in clean typography. Right side features a custom 3D illustration of interconnected digital nodes and data streams floating above a glowing platform. Color palette: deep navy blue, electric blue, and white. Clean white background with soft blue gradient. Floating UI cards with mock analytics data. A single 'Get Started' button with subtle hover glow effect. Professional corporate meets modern tech. Isometric perspective. Soft shadows and reflections. 4K resolution, commercial photography style. --ar 16:9 --v 6 --style raw",
            "3D illustration di sisi kanan memberi kesan interaktif. Gunakan mock data yang realistis seperti angka growth 240% untuk social proof."
          ),
          duration: 7,
        },
      ],
    },
    {
      title: "Features Section",
      lessons: [
        {
          title: "Features Grid dengan Gradient Icon",
          content: p(
            "Features Section Modern",
            "Prompt untuk menampilkan grid fitur produk dengan icon bergradient, deskripsi singkat, dan efek hover yang halus. Cocok untuk halaman features atau capabilities produk digital.",
            "A 3-column feature grid section for a tech product landing page. Each feature card has a rounded gradient icon at the top (purple to cyan, orange to pink) against a dark glassmorphic background. Card title in bold white text, description in lighter gray. Hover state shows subtle upward float effect with enhanced glow. Background has faint grid lines and soft radial gradient lighting. Layout: 3 columns, 2 rows = 6 features. Clean, premium, Apple-like design language. Subtle border glow on each card. 8K render, architectural visualization quality. --ar 16:9 --v 6",
            "Gradient icons konsisten menggunakan brand color. Batasi 6 fitur utama agar grid tetap bersih dan mudah discan."
          ),
          duration: 6,
        },
        {
          title: "Feature Comparison Layout",
          content: p(
            "Perbandingan Fitur Produk",
            "Prompt untuk membuat tabel perbandingan fitur yang membandingkan produk dengan kompetitor. Desain modern dengan toggle switch antara Basic/Pro/Enterprise dan highlight pada recommended plan.",
            "A feature comparison table for a SaaS product. Three plans side by side: Basic ($9/mo), Pro ($29/mo) highlighted with a glowing border as 'Recommended', Enterprise (Custom). Each column has a clean header with plan name, price, and CTA button. Rows show features with checkmarks (green) or dashes (gray). Toggle switch at top for Monthly/Annual billing with 'Save 20%' badge on annual. Dark theme with subtle grid lines. Icons for each feature category. Professional, clear information hierarchy. 4K resolution. --ar 16:9 --v 6",
            "Tingkatkan conversion dengan memberi 'Popular' atau 'Recommended' badge pada plan yang paling menguntungkan."
          ),
          duration: 7,
        },
      ],
    },
    {
      title: "Pricing Section",
      lessons: [
        {
          title: "Pricing Cards Premium",
          content: p(
            "Halaman Pricing Premium",
            "Prompt untuk desain pricing cards dengan 3 tier (Starter/Professional/Enterprise), highlight pada recommended plan, dan tombol CTA yang jelas. Efek glassmorphism dan animasi hover.",
            "A premium pricing section with 3 tier cards on a dark gradient background. Center card (Professional - $49/mo) is elevated and highlighted with a subtle glow effect. Cards have glassmorphism effect with frosted glass borders. Each card includes: plan name, monthly price, list of features with checkmark icons, and a prominent CTA button. Background has subtle animated gradient mesh moving slowly. Typography: Inter or SF Pro Display. 'Most Popular' badge on center card with gradient background. 8K quality, cinematic product photography style. --ar 16:9 --v 6 --style raw",
            "Card tengah yang di-highlight dan ditinggikan secara visual meningkatkan conversion ke plan tersebut hingga 40%."
          ),
          duration: 8,
        },
        {
          title: "Enterprise Pricing Custom",
          content: p(
            "Enterprise Pricing Section",
            "Prompt untuk bagian enterprise pricing dengan custom quote, fitur khusus enterprise seperti SLA, dedicated support, SSO, dan tombol 'Contact Sales'. Desain profesional dan meyakinkan.",
            "An enterprise pricing section with a single large card featuring 'Enterprise' title. Dark elegant background with subtle gold accent lines. Inside the card: custom pricing badge, enterprise feature list with premium icons (SSO, SLA 99.9%, Dedicated Support, Custom Integration, Audit Logs). A prominent 'Contact Sales' button with gradient background. Trust elements: logos of well-known enterprise clients at bottom. Professional, luxury feel with dark gold and midnight blue color scheme. 4K resolution. --ar 16:9 --v 6",
            "Cantumkan logo perusahaan terkenal sebagai social proof. Gunakan warna aksen gold/elegant untuk kesan premium enterprise."
          ),
          duration: 6,
        },
      ],
    },
    {
      title: "Testimonial & Social Proof",
      lessons: [
        {
          title: "Testimonial Carousel Modern",
          content: p(
            "Carousel Testimonial Interaktif",
            "Prompt untuk menampilkan testimonial pelanggan dalam bentuk carousel dengan avatar, rating bintang, dan teks testimonial. Navigasi dot dan arrow yang elegan.",
            "A testimonial carousel section with 3 testimonial cards visible (center focused, sides blurred). Each card has: circular customer avatar with photo, customer name and title, 5-star rating in gold, testimonial quote text in elegant quotation marks. Dark glass background with subtle gradient. Navigation dots at bottom and arrow buttons on sides. Background has soft floating shapes. Professional, trustworthy feel. Light leak effect on edges. 8K quality. --ar 16:9 --v 6",
            "Gunakan foto profil yang realistis (bisa dari generated faces). Quote yang panjang sebaiknya di-truncate dengan 'Read More'."
          ),
          duration: 6,
        },
        {
          title: "Logo Grid Social Proof",
          content: p(
            "Grid Logo Klien",
            "Prompt untuk menampilkan grid logo perusahaan-perusahaan terkenal yang menggunakan produk sebagai social proof. Desain clean dengan grid 4x4 atau 6x4 logo grayscale dengan hover color.",
            "A client logo grid section showing logos of well-known tech companies. Logos displayed in grayscale by default, with color reveal on hover. 6-column grid layout with subtle dividers between rows. Background: clean white with very light gray. Section headline: 'Trusted by Industry Leaders' in thin elegant font. Some logos: recognizable tech brands silhouettes. Professional, minimal, trustworthy aesthetic. Corporate presentation quality. 4K resolution. --ar 16:9 --v 6",
            "Grayscale logo yang berwarna saat hover memberikan efek interaktif tanpa mengganggu fokus. Batasi 12-24 logo."
          ),
          duration: 5,
        },
      ],
    },
    {
      title: "Footer Design",
      lessons: [
        {
          title: "Footer Multi-Column Premium",
          content: p(
            "Footer Premium Multi-Kolom",
            "Prompt untuk footer dengan 4 kolom links, logo perusahaan, social media icons, newsletter signup, dan copyright. Desain dark mode elegan dengan efek gradient subtle.",
            "A premium dark mode website footer with 4 columns. Left column: company logo + brief description + social media icons (circular, with hover glow). Column 2-4: link groups with category headers in uppercase small text. Bottom section: newsletter signup input field with gradient submit button, copyright text, and legal links. Separator line at top with subtle gradient. Background: dark navy/charcoal gradient. Typography: clean sans-serif. Apple-like footer design philosophy. 4K quality. --ar 16:9 --v 6",
            "Link footer dibagi menjadi Product, Resources, Company, Legal untuk navigasi yang jelas. Newsletter input meningkatkan retention."
          ),
          duration: 6,
        },
        {
          title: "Footer Minimalis dengan Back-to-Top",
          content: p(
            "Footer Minimalis Modern",
            "Prompt untuk footer minimalis dengan navigasi utama, social links, dan tombol back-to-top yang elegan. Desain compact cocok untuk landing page modern.",
            "A minimalist footer section with a clean layout. Left: company name and copyright. Center: horizontal navigation links (Privacy, Terms, Contact). Right: social media icon row. A subtle back-to-top arrow button in bottom-right corner that appears with fade animation. Background: solid dark with very subtle top border gradient. Typography: lightweight sans-serif. Modern, uncluttered, elegant design. Monaco-inspired minimalism. 4K resolution. --ar 16:9 --v 6",
            "Footer minimalis cocok untuk landing page yang ingin menjaga fokus pada CTA di atasnya. Back-to-top meningkatkan UX."
          ),
          duration: 4,
        },
      ],
    },
    {
      title: "Navigation & Navbar",
      lessons: [
        {
          title: "Navbar Transparan dengan Glass Effect",
          content: p(
            "Glassmorphism Navigation Bar",
            "Prompt untuk navbar dengan efek glassmorphism (blur background), logo di kiri, menu links di tengah, dan CTA button di kanan. Navbar tetap terlihat saat scroll dengan efek blur.",
            "A transparent navigation bar with glassmorphism effect. Logo on the left side with gradient text. Center navigation links: Product, Features, Pricing, About, Contact (with subtle hover underline animation). Right side: Sign In text link and 'Get Started' gradient button. Background blur effect shows content behind navbar. Navbar has a subtle bottom border with gradient. White/gray text that becomes more opaque on scroll. Modern tech startup style. 4K resolution. --ar 16:9 --v 6",
            "Navbar glassmorphism memberikan kesan modern dan premium. Pastikan kontras tetap terjaga untuk aksesibilitas."
          ),
          duration: 6,
        },
        {
          title: "Mega Menu Dropdown",
          content: p(
            "Mega Menu dengan Grid Kategori",
            "Prompt untuk mega menu dropdown dengan grid kategori produk, link populer, dan gambar thumbnail. Muncul dengan animasi fade + slide yang halus saat hover menu utama.",
            "A mega menu dropdown for a product website. Grid layout with 4 columns. Each column has a category header with icon, then 4-5 sub-links below with descriptions. Right section has a featured card with image thumbnail and 'New' badge. Background: dark with glassmorphism effect. Hover state shows subtle lift animation. Separator lines between columns. Product icons in rounded containers. Professional, information-rich without being overwhelming. 4K quality. --ar 16:9 --v 6",
            "Mega menu cocok untuk website dengan banyak halaman/kategori. Gunakan gambar thumbnail untuk featured content."
          ),
          duration: 8,
        },
      ],
    },
    {
      title: "Card Components",
      lessons: [
        {
          title: "Article Card dengan Image",
          content: p(
            "Card Artikel Modern",
            "Prompt untuk card artikel berita/blog dengan image thumbnail, kategori badge, judul, excerpt singkat, author info, dan tanggal. Desain clean dengan shadow halus.",
            "A modern blog article card with a 16:9 thumbnail image at top with gradient overlay. Category badge (e.g., 'Technology') in top-left corner of image with semi-transparent background. Card body: article title in bold, 2-line excerpt in gray, author avatar + name + date row at bottom. Card has subtle rounded corners, soft shadow, and white/dark background. Hover effect: slight elevation increase and image zoom. Clean, readable, Medium-inspired design. 4K. --ar 16:9 --v 6",
            "Gunakan image ratio 16:9 untuk konsistensi. Badge kategori membantu filtering visual. Batasi excerpt ke 2 baris."
          ),
          duration: 5,
        },
        {
          title: "Product Card E-Commerce",
          content: p(
            "Card Produk dengan Harga",
            "Prompt untuk card produk e-commerce dengan gambar produk, nama produk, rating bintang, harga (dengan coretan harga asli jika diskon), dan tombol Add to Cart. Hover menampilkan quick view.",
            "An e-commerce product card showing a fashion item on clean background. Product image takes top 60% of card. Below: product name, 4.5 star rating with review count, current price in bold (with original price crossed out and discount badge), color swatch options as small circles, and 'Add to Cart' button with shopping bag icon. Card has white background, subtle shadow, rounded corners. Hover state: 'Quick View' overlay on image. Premium shopping experience design. 8K. --ar 3:4 --v 6",
            "Coretan harga asli + diskon badge meningkatkan urgency. Swatch warna membantu visualisasi tanpa klik."
          ),
          duration: 6,
        },
      ],
    },
    {
      title: "Button & CTA Design",
      lessons: [
        {
          title: "Primary CTA Button Gradient",
          content: p(
            "Tombol CTA Gradient Premium",
            "Prompt untuk tombol CTA utama dengan gradient background, efek glow, hover scale, dan ikon panah. Cocok untuk tombol 'Get Started', 'Sign Up Free', atau 'Buy Now'.",
            "A prominent CTA button with gradient background (purple to cyan). Button text in white bold uppercase with slight letter spacing. Right side: arrow icon animated to slide right on hover. Button has soft glow shadow effect that intensifies on hover. Subtle scale transform on hover (1.02). Rounded corners (12px). Placed on dark background so gradient pops. 'Get Started Free' text. Premium, conversion-optimized design. 4K macro shot quality. --ar 3:1 --v 6",
            "Gradient CTA button dengan glow shadow meningkatkan conversion rate. Animasi arrow ke kanan memberi sinyal aksi lanjutan."
          ),
          duration: 4,
        },
        {
          title: "Secondary & Ghost Buttons",
          content: p(
            "Button Style Variants",
            "Prompt untuk collection berbagai style button: primary (filled), secondary (outlined), ghost (transparent), dan disabled state. Masing-masing dalam keadaan default, hover, dan active.",
            "A button component showcase with 4 variants: Primary (gradient filled), Secondary (outlined with border), Ghost (transparent with hover background), and Disabled (grayed out). Each variant shows 3 states: default, hover (with darken/lighten effect), and active (with press effect). Buttons arranged in a row with labels below. Clean, dark background. UI component library style. 'Get Started' text for all variants. Professional design system aesthetic. 4K. --ar 16:9 --v 6",
            "Button system yang konsisten mempercepat development. Gunakan variants untuk hierarki aksi: primary untuk main action."
          ),
          duration: 5,
        },
      ],
    },
    {
      title: "Form & Input Components",
      lessons: [
        {
          title: "Contact Form Modern",
          content: p(
            "Form Kontak dengan Animasi",
            "Prompt untuk form kontak dengan input field yang memiliki label floating, focus state dengan border glow, textarea untuk pesan, dan tombol submit gradient. Feedback state sukses/error.",
            "A modern contact form with 4 fields: Name, Email (with validation icon), Subject (dropdown), Message (textarea with character count). Each field has floating label that animates up on focus or when filled. Focus state shows glowing border in brand color. Error state shows red border with error message below. Submit button with gradient, shows loading spinner on click, then success checkmark animation. Dark glass background. Clean, professional, Apple-like form design. 8K. --ar 16:9 --v 6",
            "Floating label menghemat vertical space dibanding label di atas. Real-time validasi feedback membantu user mengisi form."
          ),
          duration: 7,
        },
        {
          title: "Sign Up Form Multi-Step",
          content: p(
            "Form Registrasi Multi-Step",
            "Prompt untuk form registrasi multi-step dengan progress indicator di atas, input field per step, dan tombol Next/Back. Step 1: Akun, Step 2: Profil, Step 3: Preferences, Step 4: Konfirmasi.",
            "A multi-step signup form with 4 steps indicated by a horizontal progress bar with numbered circles. Step 1 shows: email, password, confirm password. Step 2: full name, profile photo upload with drag-and-drop zone. Step 3: preference toggles and checkboxes. Step 4: summary review with 'Create Account' final button. Navigation: Back button (text) and Next button (gradient, with arrow). Active step highlighted with gradient in the progress indicator. Dark theme. Clean, modern, high conversion design. 4K. --ar 16:9 --v 6",
            "Multi-step form meningkatkan completion rate dibanding satu form panjang. Progress indicator memberi user gambaran durasi."
          ),
          duration: 8,
        },
      ],
    },
    {
      title: "Dashboard UI",
      lessons: [
        {
          title: "Admin Dashboard dengan Sidebar",
          content: p(
            "Dashboard Admin Modern",
            "Prompt untuk dashboard admin dengan sidebar navigasi di kiri, top bar dengan search dan profile avatar, dan area konten utama dengan stat cards, chart, dan recent activity table.",
            "A modern admin dashboard layout. Left sidebar with dark background, menu items with icons (Dashboard, Analytics, Users, Settings), active item highlighted with gradient indicator. Top bar: search bar with shortcut hint, notification bell with badge, profile avatar dropdown. Main content: 4 stat cards (Revenue, Users, Orders, Growth) with percentage change indicators. A line chart showing 30-day revenue trend. A recent orders table below with status badges. Dark theme. Professional data visualization. 4K. --ar 16:9 --v 6",
            "Stat cards dengan percentage change (positif hijau, negatif merah) memberikan insight cepat tanpa perlu membaca grafik."
          ),
          duration: 9,
        },
        {
          title: "Analytics Dashboard",
          content: p(
            "Dashboard Analytics Data",
            "Prompt untuk dashboard analytics dengan berbagai metrik performa, grafik interaktif, filter tanggal, dan export button. Layout grid yang menampilkan data secara hierarkis.",
            "An analytics dashboard with date range picker at top (Last 7 days, Last 30 days, Custom). Main KPIs: Total Visitors (1.2M), Bounce Rate (32.4%), Avg Session (4m 32s), Conversion (3.8%). Below: area chart showing visitor trend with annotations. Right sidebar: top pages table, device breakdown donut chart. Bottom: user journey flow diagram. Filters for source, medium, campaign. Dark background with neon accent colors. Professional, data-dense but readable. 4K. --ar 16:9 --v 6",
            "Hierarki informasi: KPI utama di atas (big number), tren di tengah (chart), detail di bawah (table). Gunakan warna konsisten."
          ),
          duration: 8,
        },
      ],
    },
    {
      title: "Tables & Data Grid",
      lessons: [
        {
          title: "Data Table dengan Filter",
          content: p(
            "Tabel Data Interaktif",
            "Prompt untuk tabel data dengan kolom yang bisa diurutkan, search bar, filter dropdown, pagination, dan checkbox untuk select all. Setiap baris memiliki status badge dan action buttons.",
            "A data table with 6 columns: checkbox, Name, Email, Role, Status, Actions. Column headers have sort arrows (active column highlighted). Top bar: search input with magnifying glass, 'Add User' button, filter dropdown by role. Status column shows colored badges: Active (green), Pending (yellow), Inactive (gray). Actions column: Edit (pencil icon), Delete (trash icon) with hover tooltips. Pagination at bottom: 'Showing 1-10 of 156' with page numbers. Dark theme. Clean, professional. 4K. --ar 16:9 --v 6",
            "Data table dengan sorting dan filtering adalah standar untuk dashboard. Badge status memberikan visual cue cepat."
          ),
          duration: 8,
        },
        {
          title: "Kanban Board Table",
          content: p(
            "Kanban Board Visual",
            "Prompt untuk kanban board dengan 3 kolom (To Do, In Progress, Done) yang berisi card task. Drag-and-drop visual dengan status berbeda per kolom dan avatar assignee.",
            "A kanban project management board with 3 columns: 'To Do' (gray header), 'In Progress' (blue header), 'Done' (green header). Each column has task cards with: task title, priority badge (Urgent/High/Medium/Low), due date, assignee avatar circles, and attachment count. Cards have subtle shadow and rounded corners. Column backgrounds are slightly tinted. Top of board: 'Add Task' button and filter options. Professional project management aesthetic. 4K. --ar 16:9 --v 6",
            "Warna header kolom membantu identifikasi status. Priority badge di card membantu prioritisasi visual."
          ),
          duration: 7,
        },
      ],
    },
    {
      title: "Charts & Data Visualization",
      lessons: [
        {
          title: "Line Chart & Area Chart",
          content: p(
            "Chart Garis dengan Anotasi",
            "Prompt untuk line chart dengan gradient fill area, titik data dengan tooltip, grid lines minimalis, dan anotasi pada titik penting. Sumbu X label tanggal, sumbu Y nilai revenue.",
            "A financial line chart showing 12-month revenue data. Line has gradient stroke (purple to cyan) with matching gradient area fill below. Key data points have subtle dot markers with hover tooltips showing exact values. Chart background: dark with very subtle grid lines. X-axis: month labels (Jan-Dec). Y-axis: dollar amounts. Annotations on highest and lowest points with callout labels. Legend at top showing 'Revenue 2024'. Clean, Bloomberg-terminal inspired design. 8K. --ar 16:9 --v 6",
            "Gradient fill area memudahkan visualisasi tren. Tooltip dengan data eksak untuk informasi detail tanpa mengacaukan grafik."
          ),
          duration: 7,
        },
        {
          title: "Bar Chart & Donut Chart",
          content: p(
            "Grafik Batang dan Donat",
            "Prompt untuk kombinasi bar chart (horizontal) dan donut chart dalam satu dashboard card. Bar chart untuk perbandingan kategori, donut chart untuk distribusi persentase.",
            "A data visualization card containing two charts side by side. Left: horizontal bar chart comparing 5 categories with gradient bars (longest bar in accent color, others in muted gray). Right: donut chart with 4 segments in different colors, percentage labels on each segment, center showing total value. Chart container: dark glass with border, subtle shadow. Clean, minimalist, data-journalism inspired style. 4K resolution. --ar 16:9 --v 6",
            "Kombinasi bar + donut dalam satu card memberikan dua perspektif berbeda. Bar untuk comparison, donut untuk distribution."
          ),
          duration: 6,
        },
      ],
    },
    {
      title: "Modal & Dialog",
      lessons: [
        {
          title: "Confirm Dialog Modern",
          content: p(
            "Dialog Konfirmasi Aksi",
            "Prompt untuk modal konfirmasi dengan backdrop blur, icon warning di atas, judul, deskripsi, tombol Cancel (secondary) dan Confirm (primary/danger). Animasi masuk scale + fade.",
            "A confirmation modal dialog with glassmorphism background overlay (blur effect). Modal card: centered, rounded corners, subtle shadow. Top: warning triangle icon in amber/red circle. Below: 'Delete Account' title in bold, 'This action cannot be undone...' description in gray. Two buttons: 'Cancel' (ghost style on left), 'Delete' (red gradient on right). Close X icon in top-right corner. Entrance animation: scale from 0.95 with fade. Dark theme. Clean, premium UI. 4K. --ar 4:3 --v 6",
            "Modal konfirmasi dengan dua tombol (Cancel/Confirm) mengurangi aksi tidak sengaja. Tombol danger berwarna merah sebagai sinyal."
          ),
          duration: 5,
        },
        {
          title: "Fullscreen Modal Gallery",
          content: p(
            "Gallery Modal Layar Penuh",
            "Prompt untuk modal layar penuh dengan gambar besar di tengah, thumbnail strip di bawah, navigasi arrow kiri/kanan, dan tombol close. Desain immersive dengan background gelap.",
            "A fullscreen image gallery modal. Dark background (near black) with image displayed in center at maximum size. Navigation arrows (left/right) on image edges with subtle glow on hover. Bottom: horizontal thumbnail strip with active thumbnail highlighted. Top: image counter '3/12' on left, 'Download' button and 'Close' X icon on right. Smooth slide transition between images. Cinematic, full-bleed design. Lightbox UI with premium feel. 8K. --ar 16:9 --v 6",
            "Fullscreen modal memberikan immersive experience untuk gallery. Thumbnail strip membantu navigasi cepat antar gambar."
          ),
          duration: 6,
        },
      ],
    },
    {
      title: "Sidebar Navigation",
      lessons: [
        {
          title: "Sidebar Collapse dengan Icon",
          content: p(
            "Sidebar Navigasi Collapsible",
            "Prompt untuk sidebar navigasi dengan icon + label, bisa collapse jadi icon-only. Menu items dengan active state indicator, section dividers, user profile di bottom, dan toggle collapse button.",
            "A collapsible sidebar navigation. Expanded state: shows icon + label for each menu item, section headers (MAIN, WORKSPACE, SETTINGS) in small uppercase text. Active item has gradient indicator bar on left and subtle background highlight. Collapsed state: only icons visible with tooltip on hover. Bottom: user profile section with avatar, name, and logout icon. Collapse toggle button as a floating icon on the sidebar edge. Smooth animation between states. Dark background. Professional admin panel design. 4K. --ar 9:16 --v 6",
            "Collapsible sidebar memberikan fleksibilitas: expanded untuk navigasi mudah, collapsed untuk fokus ke konten. Ikon harus intuitif."
          ),
          duration: 7,
        },
        {
          title: "Sidebar dengan Notification Badge",
          content: p(
            "Sidebar dengan Notifikasi",
            "Prompt untuk sidebar dengan notification badge merah pada menu items tertentu (seperti Inbox, Activity). Juga menampilkan status online/offline pada profile section.",
            "A sidebar with notification badges. Menu items: Dashboard, Inbox (with red badge showing '5'), Projects (with '2'), Calendar, Reports, Settings, Help. Badges are small red circles with white numbers, positioned at top-right of icons/end of labels. User section at bottom: avatar with green online status dot, username, and role ('Admin'). Active item has left gradient border. Background: slightly lighter than main content. Clean, professional. 4K. --ar 9:16 --v 6",
            "Notification badge sebaiknya menunjukkan angka yang actionable. Online indicator memberi sense of presence pada team."
          ),
          duration: 5,
        },
      ],
    },
    {
      title: "Profile & User Pages",
      lessons: [
        {
          title: "Profile Card dengan Cover",
          content: p(
            "Kartu Profil Premium",
            "Prompt untuk profile card dengan cover image, foto profil circular overlay, nama, title, bio singkat, stat counts (Followers, Following, Posts), dan tombol Follow/Message.",
            "A premium profile card with a cover photo (gradient mountain landscape) taking top 40%. Circular profile photo overlapping cover and card body. Below photo: full name in bold, professional title in gray, short bio. Stats row: '1.2K Following', '8.5K Followers', '342 Posts' in 3 columns with labels. Two action buttons: 'Follow' (gradient filled), 'Message' (outlined). Card has rounded corners, subtle shadow, white/dark background. Instagram/Twitter inspired profile design. 4K. --ar 4:3 --v 6",
            "Cover photo personalisasi memberi identitas visual. Stat counts dengan angka bulat (+K) lebih mudah dicerna."
          ),
          duration: 5,
        },
        {
          title: "Settings Page Layout",
          content: p(
            "Halaman Pengaturan Akun",
            "Prompt untuk halaman settings/profile dengan tab navigasi (Account, Security, Notifications, Appearance), form fields, toggle switches, dan tombol Save. Desain dengan section cards terpisah.",
            "A settings page layout with vertical tab navigation on the left (Account, Security, Notifications, Appearance, Billing). Active tab highlighted. Account tab content: avatar upload area with edit overlay, name/email/phone input fields. Security tab: password change form, 2FA toggle, active sessions list. Notifications tab: toggle switches for email, push, SMS preferences grouped by category. Appearance tab: theme selector (Light/Dark/System), font size slider. Save button fixed at bottom. Clean, organized. 4K. --ar 16:9 --v 6",
            "Tab settings memecah form panjang menjadi bagian manageable. Toggle switch lebih user-friendly daripada checkbox untuk on/off."
          ),
          duration: 8,
        },
      ],
    },
    {
      title: "E-Commerce UI",
      lessons: [
        {
          title: "Product Listing dengan Filter",
          content: p(
            "Halaman Daftar Produk",
            "Prompt untuk halaman product listing dengan sidebar filter (kategori, harga, warna, ukuran), grid produk, sort dropdown, dan pagination. Desain clean dengan whitespace cukup.",
            "An e-commerce product listing page. Left sidebar with filter groups: Category (checkboxes), Price Range (dual slider), Color (color swatch circles), Size (button group). Main area: sort dropdown ('Sort by: Popular'), product grid (3 columns), each product card has image, name, price, rating. Top: breadcrumb navigation, result count ('Showing 1-12 of 47'). Pagination at bottom with page numbers. Clean white background. Premium online shopping experience. 4K. --ar 16:9 --v 6",
            "Filter sidebar membantu narrowing down produk. Sort dropdown penting untuk fleksibilitas user. Gunakan infinite scroll untuk mobile."
          ),
          duration: 8,
        },
        {
          title: "Shopping Cart & Checkout",
          content: p(
            "Keranjang Belanja Modern",
            "Prompt untuk halaman shopping cart dengan daftar item (gambar, nama, quantity selector, harga, subtotal), promo code input, order summary, dan tombol Checkout. Progress stepper untuk checkout flow.",
            "A shopping cart page with a 3-step progress indicator at top (Cart → Checkout → Confirmation). Cart items list: each item has small product image, name with variant (size/color), quantity +/- selector, unit price, and subtotal. Remove button (trash icon) with 'Save for Later' option. Right sidebar: order summary card with subtotal, shipping, tax, total in bold, promo code input with 'Apply' button, and prominent 'Checkout' button. Trust badges (SSL, Money-back guarantee). Clean, modern e-commerce design. 4K. --ar 16:9 --v 6",
            "Progress stepper mengurangi abandonment dengan memberi user gambaran checkout flow. Trust badges di dekat tombol checkout."
          ),
          duration: 9,
        },
      ],
    },
    {
      title: "Blog & Article Layout",
      lessons: [
        {
          title: "Blog Post Detail",
          content: p(
            "Halaman Artikel Blog",
            "Prompt untuk halaman blog post lengkap dengan featured image hero, author info, reading time, social share buttons, konten artikel dengan tipografi bagus, dan related posts di bawah.",
            "A blog article page with a full-width featured image at top (with gradient overlay for text readability). Article header: category badge, title in large bold font, author avatar + name + date + 5 min read. Social share buttons (Twitter, Facebook, LinkedIn, Copy Link) with share count. Article body: clean typography with drop caps, pull quotes in larger italic, subtitles, bullet points, and a code block with syntax highlighting. Table of contents sticky sidebar. Bottom: author bio card, comments section, 'Related Posts' grid (3 cards). Medium-inspired. 4K. --ar 16:9 --v 6",
            "Featured image dengan gradient overlay memastikan teks tetap terbaca. Social share buttons dengan count mendorong engagement."
          ),
          duration: 9,
        },
        {
          title: "Blog Grid dengan Featured Post",
          content: p(
            "Halaman Blog Grid",
            "Prompt untuk halaman blog listing dengan featured post besar di atas (hero card), lalu grid 3 kolom untuk post lainnya. Masing-masing card dengan thumbnail, kategori, tanggal, dan judul.",
            "A blog listing page with a featured post card at top taking full width: large 21:9 image with overlay text, category badge, title in large font, author + date. Below: 3-column grid of regular blog cards, each with 16:9 thumbnail, category badge, title (2 lines), excerpt (2 lines), author avatar + name + date. 'Load More' button at bottom. Clean whitespace. Category filter tabs above the grid: All, Technology, Design, Business. Modern publishing aesthetic. 8K. --ar 16:9 --v 6",
            "Featured post hero memberikan exposure ke konten terbaru/terpopuler. Filter kategori membantu user menemukan minat mereka."
          ),
          duration: 7,
        },
      ],
    },
    {
      title: "Portfolio Design",
      lessons: [
        {
          title: "Portfolio Grid Masonry",
          content: p(
            "Portfolio Masonry Grid",
            "Prompt untuk portfolio grid dengan layout masonry (kolom tidak rata), thumbnail proyek dengan hover overlay informasi, filter kategori di atas, dan lightbox preview saat diklik.",
            "A creative portfolio page with a 3-column masonry grid. Each project thumbnail has different height based on image aspect ratio. Hover overlay: semi-transparent dark overlay with project title, category, and 'View Project' link. Top: filter buttons (All, Web Design, Branding, UI/UX, Illustration) with active state underline. Clicking a thumbnail opens a lightbox with larger preview, description, and navigation to next/previous. Dark background. Award-winning portfolio design inspiration. Dribbble/Behance quality. 4K. --ar 16:9 --v 6",
            "Masonry grid memberikan tampilan dinamis dan artistik. Hover overlay dengan informasi proyek tanpa klik tambahan."
          ),
          duration: 7,
        },
        {
          title: "Single Project Showcase",
          content: p(
            "Halaman Detail Proyek",
            "Prompt untuk halaman detail proyek dengan hero image full-width, project info sidebar (client, tahun, role, link), deskripsi proyek, gallery gambar, dan testimonial client.",
            "A single project page with a full-width hero image at top (with subtle parallax effect). Below: two-column layout. Left (70%): project description with rich text, process section with numbered steps, and an image gallery with before/after slider comparison. Right (30%): sticky project info card with Client name, Year, Role, Technologies used (tags), and 'Visit Live Site' button. Bottom: client testimonial quote, and 'Next Project' navigation with thumbnail. Sleek, professional. 4K. --ar 16:9 --v 6",
            "Before/after slider powerful untuk menunjukkan hasil kerja. Sticky sidebar info memudahkan akses detail proyek."
          ),
          duration: 8,
        },
      ],
    },
    {
      title: "Mobile App UI",
      lessons: [
        {
          title: "Mobile App Onboarding",
          content: p(
            "Onboarding Screen Interaktif",
            "Prompt untuk screen onboarding mobile app dengan 3 slide (illustration di atas, judul, deskripsi, dot indicator, dan tombol Next/Get Started). Desain ilustrasi 3D khas mobile app.",
            "A mobile app onboarding screen (iPhone 15 Pro frame). 3 slides shown sequentially: Slide 1: 'Welcome' with 3D illustration of phone with data flowing, Slide 2: 'Features' with illustration of charts and stats, Slide 3: 'Get Started' with celebration illustration. Each slide has: colorful 3D illustration taking top 60%, title in bold, subtitle in gray. Bottom: dot indicators (active dot larger with gradient), 'Skip' text button on top-left, 'Next' arrow button or 'Get Started' gradient button on last slide. Clean modern mobile UI. 4K. --ar 9:19.5 --v 6",
            "Onboarding 3 slide adalah best practice. Ilustrasi 3D meningkatkan engagement. Dot indicator memberi konteks progress."
          ),
          duration: 6,
        },
        {
          title: "Mobile Dashboard Mobile",
          content: p(
            "Dashboard Mobile Aplikasi",
            "Prompt untuk dashboard mobile dengan balance card di atas, recent transactions list, quick action buttons (Send, Receive, Top Up), dan expense chart circular. Desain dark mode untuk fintech app.",
            "A mobile banking/fintech dashboard (iPhone frame). Top: greeting with user name, notification bell icon, and profile avatar. Below: balance card with gradient background showing total balance ($24,560.00), eye toggle for show/hide, and 'Last transaction: Today, 10:30 AM'. Quick action row: 3 circular buttons with icons - Send (up arrow), Receive (down arrow), Top Up (+). Below: 'Recent Transactions' list with icon, merchant name, date, and amount (+green/-red). Bottom: expense breakdown donut chart with categories. Dark mode, premium fintech design. 4K. --ar 9:19.5 --v 6",
            "Balance card gradient memberikan focal point. Quick action buttons untuk 3 aksi paling sering. Warna merah/hijau untuk transaksi."
          ),
          duration: 8,
        },
      ],
    },
    {
      title: "Logo & Brand Identity",
      lessons: [
        {
          title: "Tech Logo Modern",
          content: p(
            "Logo Perusahaan Teknologi",
            "Prompt untuk logo teknologi dengan icon abstrak geometris dan teks nama perusahaan. Style minimalis, modern, dengan gradient warna dan mockup pada berbagai background.",
            "A modern tech company logo design. Abstract geometric icon: interconnected hexagonal nodes forming an 'A' shape. Clean sans-serif logotype below with custom letter-spacing. Gradient colors: deep purple to vibrant cyan. Logo displayed in multiple mockups: on dark gradient background, on white card, on building signage, on mobile app icon (rounded square with gradient), and on letterhead. Minimalist, memorable, scalable. Fortune 500 tech company quality. 8K vector illustration style. --ar 16:9 --v 6",
            "Logo harus terlihat baik di semua ukuran (app icon 58px sampai billboard). Versi monokrom juga penting untuk certain use cases."
          ),
          duration: 6,
        },
        {
          title: "Brand Identity Kit",
          content: p(
            "Brand Identity System",
            "Prompt untuk brand identity kit yang menampilkan logo variants, color palette, typography, pattern, dan aplikasi pada mockup merchandise. Desain presentasi profesional.",
            "A brand identity presentation board showing: Top-left: primary logo + secondary logo + icon mark. Top-right: color palette with hex codes (5 swatches). Middle: typography specified with font names, weights, and sample text. Bottom-left: brand pattern/graphic motif. Bottom-right: mockups showing logo on business card, tote bag, and laptop. Clean grid layout with plenty whitespace. Museum-quality presentation. 4K. --ar 16:9 --v 6",
            "Brand identity kit memastikan konsistensi visual di semua touchpoint. Sertakan do's and don'ts untuk penggunaan logo."
          ),
          duration: 7,
        },
      ],
    },
    {
      title: "Icon & Illustration",
      lessons: [
        {
          title: "Icon Set Line Style",
          content: p(
            "Set Icon Line Modern",
            "Prompt untuk set icon dengan style line art, stroke konsisten, rounded caps, dalam grid 4x4. Icon mencakup: home, search, settings, user, bell, heart, star, chat, camera, file, clock, map pin.",
            "A set of 16 line-style icons arranged in a 4x4 grid. Each icon: consistent 2px stroke, rounded line caps and joins, outlined style with no fill. Icons include: Home, Search, Settings, User, Bell, Heart, Star, Chat, Camera, File, Clock, Map Pin, Shopping Bag, Credit Card, Graph, Download. Grid alignment, consistent optical sizing. All icons on dark background with subtle grid. Professional, ready-for-development icon set. Lucide/Figma icon quality. 4K. --ar 1:1 --v 6",
            "Konsistensi stroke weight dan optical sizing adalah kunci icon set profesional. Gunakan grid system untuk alignment sempurna."
          ),
          duration: 5,
        },
        {
          title: "Illustration 3D Abstract",
          content: p(
            "Ilustrasi 3D Abstrak",
            "Prompt untuk ilustrasi 3D abstrak dengan bentuk organik mengalir, glass spheres, gradient neon, dan efek cahaya volumetric. Cocok untuk background hero section atau visual konten.",
            "An abstract 3D illustration with floating organic shapes and glass spheres. Gradient colors: deep purple blending into electric cyan and soft pink. Volumetric lighting creates depth. Some shapes are translucent with refraction effects. Floating particles with bokeh effect in background. Smooth curved surfaces with subtle reflections. Modern, dreamy, ethereal aesthetic. Suitable for tech hero backgrounds or social media visuals. Cinema 4D + Octane render quality. 8K. --ar 16:9 --v 6",
            "Ilustrasi abstrak 3D cocok untuk background karena tidak mengganggu teks di atasnya. Warna gradient menciptakan depth."
          ),
          duration: 6,
        },
      ],
    },
    {
      title: "Animation & Motion",
      lessons: [
        {
          title: "Loading Animation Lottie",
          content: p(
            "Animasi Loading Interaktif",
            "Prompt untuk sequence animasi loading dengan 4 frame: lingkaran berputar dengan gradient, dot bouncing, progress bar mengisi, dan checkmark muncul. Style modern dan halus.",
            "A loading animation sequence shown in 4 frames. Frame 1: a circular spinner with gradient stroke rotating smoothly. Frame 2: 3 dots bouncing sequentially with scale animation. Frame 3: a horizontal progress bar filling from 0 to 100% with gradient fill. Frame 4: a circular checkmark drawing animation with success burst. Each frame has dark background and shows the animation state. Smooth 60fps motion design. Clean, modern, premium loading indicators. Lottie/Motion design quality. 4K. --ar 16:9 --v 6",
            "Loading animation yang halus mengurangi perceived wait time. Checkmark animation memberikan positive feedback setelah loading."
          ),
          duration: 5,
        },
        {
          title: "Micro-interaction Buttons",
          content: p(
            "Animasi Button Mikro",
            "Prompt untuk demonstrasi 4 micro-interactions pada button: hover scale + glow, click ripple effect, loading spinner in button, dan success checkmark. Tiap state dalam frame terpisah.",
            "A button micro-interaction showcase with 4 states in separate panels. Panel 1: Default → Hover (button scales to 1.05 with glow shadow intensifying). Panel 2: Click (ripple wave effect emanating from click point). Panel 3: Loading (text fades to spinner icon, button slightly dims). Panel 4: Success (spinner transitions to checkmark icon, button turns green briefly). Each panel labeled with state name. Dark background. Clean UI component documentation style. 4K. --ar 16:9 --v 6",
            "Micro-interactions meningkatkan perceived quality secara signifikan. Ripple effect memberi feedback tactile pada klik di layar sentuh."
          ),
          duration: 6,
        },
      ],
    },
    {
      title: "Marketing & Banner",
      lessons: [
        {
          title: "Social Media Banner Promo",
          content: p(
            "Banner Promo Instagram/Facebook",
            "Prompt untuk banner promosi social media dengan headline besar, CTA button, background gradient dengan pattern, dan produk mockup. Ukuran optimal untuk Instagram Feed 1080x1080.",
            "A social media promotional banner (Instagram feed, 1:1). Bold headline: 'SUMMER SALE - 40% OFF' in large impact font with gradient text effect. Background: warm gradient (orange to pink) with subtle geometric pattern overlay. Product mockup floating in foreground (minimalist white earphones case). CTA: 'Shop Now' button with white background. Bottom: date range 'June 1-30' in small text. Tag: '@brand' in top corner. Eye-catching, scroll-stopping social media design. 4K. --ar 1:1 --v 6",
            "Warna warm (orange/pink) menciptakan urgency dan cocok untuk promo. Teks headline besar dengan kontras tinggi untuk scroll-stopping."
          ),
          duration: 5,
        },
        {
          title: "Web Banner Responsive",
          content: p(
            "Banner Website Hero 21:9",
            "Prompt untuk web banner dengan aspect ratio 21:9, headline berlapis, ilustrasi di samping kanan, gradient background, dan CTA button. Cocok untuk homepage hero atau promotion section.",
            "A 21:9 web banner (e.g., 1400x600px). Left side: layered headline 'Build Smarter' with 'with AI' in gradient text below, short supporting text, and two CTA buttons ('Get Started' filled, 'Learn More' outlined). Right side: abstract 3D illustration of a glowing brain with neural network connections. Background: dark gradient with subtle grid pattern. Red glow accent on right for visual interest. Professional, conversion-optimized banner design. 8K. --ar 21:9 --v 6",
            "Headline berlapis dengan weight berbeda menciptakan hierarki visual. Ilustrasi di kanan memberi konteks tanpa mengganggu teks."
          ),
          duration: 5,
        },
      ],
    },
    {
      title: "Social Media Content",
      lessons: [
        {
          title: "LinkedIn Banner Profesional",
          content: p(
            "Banner LinkedIn Premium",
            "Prompt untuk banner LinkedIn dengan background premium, nama + title, tagline, dan contact info. Ukuran 1584x396px dengan desain profesional dan corporate feel.",
            "A LinkedIn banner image (1584x396px). Left: professional headshot in circular frame, name in large bold font, title 'Product Designer & Frontend Engineer' below, company name. Background: abstract gradient with subtle brand pattern (dark blue to teal). Right side: minimal contact info (email icon + email, location pin + city) and a personal tagline 'Building products that matter'. Clean, premium, corporate professional aesthetic. 4K. --ar 4:1 --v 6",
            "LinkedIn banner adalah real estate visual pertama profil Anda. Gunakan untuk menyampaikan value proposition secara instant."
          ),
          duration: 4,
        },
        {
          title: "Instagram Carousel Konten",
          content: p(
            "Carousel Instagram Edukatif",
            "Prompt untuk carousel Instagram 5 slide tentang tips design. Slide 1: Cover dengan judul menarik. Slide 2-4: Konten tips dengan icon dan bullet points. Slide 5: CTA untuk follow dan share.",
            "An Instagram carousel post with 5 slides. Slide 1 (Cover): large title '5 Tips Desain UI Modern' with gradient text, subtitle 'by @yourhandle', abstract background with floating UI elements. Slide 2-4 (Content): each slide has one tip number (1-5), tip title, brief explanation with bullet points, supporting icon/graphic. Slide 5 (CTA): 'Save this post!' with bookmark icon, 'Follow for more design tips', engagement question 'Which tip was most helpful?'. Consistent brand colors. Beautiful, save-worthy design content. 4K. --ar 4:5 --v 6",
            "Carousel Instagram dengan 5 slide optimal untuk engagement. Slide CTA dengan pertanyaan mendorong komentar. Gunakan font besar."
          ),
          duration: 6,
        },
      ],
    },
    {
      title: "Email & Newsletter",
      lessons: [
        {
          title: "Newsletter Welcome Email",
          content: p(
            "Email Selamat Datang Premium",
            "Prompt untuk template email welcome newsletter dengan header, hero section, benefit list, CTA button, dan footer. Desain responsive dengan dark mode support.",
            "A welcome email template design. Header: logo + 'Welcome to the Club' text. Hero section: 3D illustration of a gift box opening with sparkles. Body: personalized greeting 'Hi [Name]', brief welcome message, 3 benefit cards with icons (Weekly Insights, Exclusive Resources, Community Access). CTA: 'Explore Now' button with gradient. Footer: social media icons, unsubscribe link, 'Sent by Brand Name'. Clean, responsive email design. Apple Mail/Outlook compatible. 4K. --ar 16:9 --v 6",
            "Welcome email adalah touchpoint kritis. Personalisasi dan benefit yang jelas meningkatkan konversi ke aksi selanjutnya."
          ),
          duration: 6,
        },
        {
          title: "Newsletter Product Update",
          content: p(
            "Email Update Produk",
            "Prompt untuk template newsletter product update dengan changelog items, feature spotlight, screenshot produk, dan early access CTA. Cocok untuk SaaS product updates.",
            "A product update email template. Header: version number 'What's New in v2.5' with date. Feature spotlight: large screenshot/UI mockup, feature title, description, and 'Try It Now' link. Changelog below: 5-6 update items with bullet points and icons (new features in green, improvements in blue, fixes in yellow). Bottom: 'Upgrade Now' button and 'Share Feedback' link. Clean, scannable, developer-friendly design. Stripe/Linear-inspired update emails. 4K. --ar 16:9 --v 6",
            "Feature spotlight dengan screenshot visual lebih engaging. Changelog dikelompokkan (New/Improved/Fixed) untuk scannability."
          ),
          duration: 6,
        },
      ],
    },
    {
      title: "Error & Empty State",
      lessons: [
        {
          title: "404 Page Kreatif",
          content: p(
            "Halaman 404 Interaktif",
            "Prompt untuk halaman error 404 dengan ilustrasi custom (astronot tersesat atau robot broken), pesan error friendly, tombol 'Back to Home', dan search bar. Desain playful namun profesional.",
            "A creative 404 error page. Full-height layout with centered content. Main visual: custom illustration of an astronaut floating in space with a broken satellite, looking confused. Below: '404 - Page Not Found' in large bold text, friendly message 'Looks like you've drifted into deep space...', two options: 'Back to Home' button (gradient filled) and search bar with 'Search' button. Background: dark space gradient with subtle stars. Playful but professional. 4K. --ar 16:9 --v 6",
            "404 page dengan ilustrasi kreatif mengurangi frustrasi user. Search bar memberikan opsi alternatif selain back to home."
          ),
          duration: 5,
        },
        {
          title: "Empty State Dashboard",
          content: p(
            "Empty State dengan CTA",
            "Prompt untuk empty state pada dashboard dengan ilustrasi (kotak kosong atau data sheet), pesan informatif, dan tombol aksi untuk memulai. Cocok untuk halaman yang belum ada data.",
            "An empty state component for a dashboard. Centered layout with: illustration of an open empty folder with a document icon above it, glowing slightly. Headline: 'No Data Yet' in muted bold. Description: 'Start by adding your first project to see analytics here.' CTA: 'Add Your First Project' button with plus icon. Optional: 'Learn More' link below. Background: subtle gradient. Calm, encouraging, not frustrating. Minimalist illustration style. 4K. --ar 16:9 --v 6",
            "Empty state adalah kesempatan untuk onboarding. Ilustrasi + CTA mengarahkan user ke aksi berikutnya yang diinginkan."
          ),
          duration: 4,
        },
      ],
    },
    {
      title: "Gamification & Badges",
      lessons: [
        {
          title: "Achievement Badges Set",
          content: p(
            "Set Badge Prestasi",
            "Prompt untuk set achievement badges dalam grid 3x3 dengan berbagai level (bronze, silver, gold, platinum), masing-masing dengan icon unik, efek gemerlap, dan progress ring.",
            "A set of 9 achievement badges in a 3x3 grid. Each badge is a circular medal with: unique icon (star, trophy, shield, lightning, crown, flame, diamond, rocket, heart), level color (bronze/copper, silver/gray, gold/yellow, platinum/cyan gradient), subtle metallic sheen effect, and a small progress ring around the edge. Badges with different sizes for different tiers. Gaming console achievement inspired. Dark background with particle sparkle effects. 4K. --ar 1:1 --v 6",
            "Badge system dengan tier visual jelas (bronze → platinum) memotivasi user mencapai level berikutnya. Metallic effect meningkatkan persepsi nilai."
          ),
          duration: 5,
        },
        {
          title: "Leaderboard Scoreboard",
          content: p(
            "Papan Peringkat Kompetisi",
            "Prompt untuk leaderboard dengan top 3 podium (gold/silver/bronze), avatar dan nama peserta, skor, dan tanda naik/turun peringkat. Desain kompetitif dengan efek glow pada juara 1.",
            "A gamified leaderboard with a 3-step podium display. 1st place: center podium (highest) with gold glow effect, trophy icon, avatar with crown, name, and score. 2nd place: left podium, silver color. 3rd place: right podium, bronze color. Below: ranked list of remaining participants (4-10) with position number, avatar, name, score, and green/red arrow indicators for rank change. Background: dark with confetti/sparkle effects around top 3. Competitive esports/quiz app aesthetic. 4K. --ar 16:9 --v 6",
            "Podium visual memberikan pengakuan instan untuk top 3. Arrow indicator (+/-) untuk perubahan peringkat meningkatkan engagement."
          ),
          duration: 6,
        },
      ],
    },
    {
      title: "Authentication UI",
      lessons: [
        {
          title: "Login Screen Modern",
          content: p(
            "Halaman Login Premium",
            "Prompt untuk halaman login dengan background bergambar, form di kiri dengan floating label, social login buttons, dan link registrasi. Desain modern dengan glassmorphism pada form card.",
            "A premium login page with a split layout. Left (40%): login form with glassmorphism card. Form fields: email and password with floating labels, 'Remember me' checkbox, 'Forgot password?' link, 'Sign In' gradient button, divider line 'or continue with', Google and GitHub login buttons with their respective brand colors/icons. Right (60%): full-bleed background image of a modern workspace with gradient overlay. Bottom: 'Don't have an account? Sign up' link. Professional, secure-feeling design. 4K. --ar 16:9 --v 6",
            "Split layout dengan background inspiratif memberikan kesan premium. Social login mengurangi friksi registrasi."
          ),
          duration: 6,
        },
        {
          title: "Magic Link & OTP Screen",
          content: p(
            "Verifikasi OTP/Magic Link",
            "Prompt untuk halaman verifikasi OTP dengan 6 digit input boxes, timer countdown, tombol resend, dan opsi magic link alternative. Desain fokus pada satu aksi utama.",
            "An OTP verification screen with 6 digit input boxes in a row. Each box: square shape, centered digit, focus state with bottom border glow, auto-advance to next on input. Timer countdown 'Resend code in 0:45' with clickable state when expired. Title: 'Check your email' with email address shown. 'Verify' button below inputs (enabled when all 6 digits filled). 'Send magic link instead' text link at bottom. Clean, focused, single-action design. No distractions. 4K. --ar 16:9 --v 6",
            "Auto-advance OTP input mengurangi friction. Timer countdown memberi transparansi kapan bisa resend. Magic link sebagai fallback."
          ),
          duration: 5,
        },
      ],
    },
  ];
}
