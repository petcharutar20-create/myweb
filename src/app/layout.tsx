import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "จตุรโชคกรุ๊ป - ผู้นำเฟอร์นิเจอร์ในจังหวัดศรีสะเกษ",
  description:
    "บริษัท จตุรโชคกรุ๊ป จำกัด ผู้จำหน่ายเฟอร์นิเจอร์บ้านและสำนักงานชั้นนำในจังหวัดศรีสะเกษ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&family=Sarabun:wght@300;400;500;600;700&family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Bootstrap 5 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        />
        {/* Boxicons */}
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        {/* Override Bootstrap primary/secondary with brand colors — placed after Bootstrap CDN so our variables win */}
        <style>{`
          :root {
            --bs-primary: #008864;
            --bs-primary-rgb: 0, 136, 100;
            --bs-secondary: #ff991b;
            --bs-secondary-rgb: 255, 153, 27;
            --bs-link-color: #008864;
            --bs-link-color-rgb: 0, 136, 100;
            --bs-link-hover-color: #007052;
          }
          .btn-primary {
            --bs-btn-bg: #008864;
            --bs-btn-border-color: #008864;
            --bs-btn-hover-bg: #007052;
            --bs-btn-hover-border-color: #007052;
            --bs-btn-active-bg: #005a41;
            --bs-btn-active-border-color: #005a41;
            color: #fff;
          }
          a { color: #008864; }
          a:hover { color: #007052; }
        `}</style>
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
