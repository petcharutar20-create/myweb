# จตุรโชคกรุ๊ป — Jaturachok Group Website

เว็บไซต์การตลาดสำหรับ **บริษัท จตุรโชคกรุ๊ป จำกัด** ผู้จำหน่ายเฟอร์นิเจอร์บ้านและสำนักงานชั้นนำในจังหวัดศรีสะเกษ สร้างด้วย **Next.js 16**, **React 19**, และ **Bootstrap 5**

---

## สารบัญ

- [ภาพรวม](#ภาพรวม)
- [Tech Stack](#tech-stack)
- [โครงสร้างโปรเจค](#โครงสร้างโปรเจค)
- [ฟีเจอร์หลัก](#ฟีเจอร์หลัก)
- [เริ่มต้นใช้งาน](#เริ่มต้นใช้งาน)
- [คำสั่งที่ใช้บ่อย](#คำสั่งที่ใช้บ่อย)
- [Design System](#design-system)
- [การ Deploy บน Vercel](#การ-deploy-บน-vercel)
- [หมายเหตุ Next.js 16](#หมายเหตุ-nextjs-16)

---

## ภาพรวม

เว็บไซต์นี้เป็น Single-Page Marketing Site ภาษาไทย ประกอบด้วยส่วนต่าง ๆ ดังนี้

| หน้า | Route | คำอธิบาย |
|------|-------|-----------|
| หน้าหลัก | `/` | Marketing page มี Hero, เกี่ยวกับเรา, สินค้าและบริการ, ติดต่อเรา, Footer |
| เข้าสู่ระบบ | `/login` | หน้า Login UI สำหรับระบบจัดการ (ยังไม่มี Auth logic) |

---

## Tech Stack

| ประเภท | เทคโนโลยี | เวอร์ชัน |
|--------|-----------|----------|
| Framework | [Next.js](https://nextjs.org/) (App Router) | 16.2.6 |
| UI Library | [React](https://react.dev/) | 19.2.4 |
| Language | TypeScript (strict mode) | ^5 |
| CSS Framework | [Bootstrap](https://getbootstrap.com/) 5 (CDN) | 5.3.3 |
| Icons | [Lucide React](https://lucide.dev/) | ^1.16.0 |
| Fonts | Google Fonts CDN (Sarabun, Prompt, Noto Sans Thai) | — |
| Deployment | [Vercel](https://vercel.com/) | — |

> **หมายเหตุ:** `bootstrap` npm package ติดตั้งไว้เป็น dev dependency เพื่อใช้ type hints เท่านั้น — Bootstrap จริง ๆ โหลดผ่าน CDN ใน `layout.tsx`

---

## โครงสร้างโปรเจค

```
my-app/
├── src/
│   └── app/
│       ├── layout.tsx          # Root layout — โหลด fonts, Bootstrap, brand CSS vars
│       ├── globals.css         # Global styles, animations, brand design system
│       ├── page.tsx            # หน้าหลัก (Marketing site)
│       └── login/
│           └── page.tsx        # หน้าเข้าสู่ระบบ
├── public/                     # Static assets (SVG icons)
├── next.config.ts              # Next.js config
├── vercel.json                 # Vercel deployment config + security headers
├── tsconfig.json               # TypeScript config (path alias @/* → ./src/*)
├── eslint.config.mjs           # ESLint config
└── package.json
```

---

## ฟีเจอร์หลัก

### หน้าหลัก (`/`)

**Navbar**
- Fixed บนสุดของหน้า
- เปลี่ยนจาก Transparent → สีขาว เมื่อ scroll ลงมาเกิน 60px
- Responsive: Desktop แสดง links แนวนอน / Mobile แสดงปุ่ม hamburger
- Mobile menu overlay แบบ fullscreen

**Hero Section**
- Background image จาก Unsplash พร้อม gradient overlay
- Scroll-triggered fade-in animation
- CTA buttons: "ดูสินค้าและบริการ" และ "ติดต่อเรา"
- Scroll-down indicator

**เกี่ยวกับเรา (About)**
- 4 Feature cards: สินค้าคุณภาพสูง, ประสบการณ์ 7+ ปี, ผู้จำหน่ายชั้นนำ, บริการจัดส่ง
- Scroll-triggered fade-up animation พร้อม hover shadow

**สินค้าและบริการ (Services)**
- 6 หมวดสินค้า: โซฟา, ชุดห้องนอน, ที่นอน, เฟอร์นิเจอร์สำนักงาน, โต๊ะอาหาร, ของตกแต่งบ้าน
- Card แต่ละใบมีรูป Unsplash พร้อม hover zoom effect
- Scroll-triggered scale-in animation

**ติดต่อเรา (Contact)**
- ข้อมูลติดต่อ: ที่อยู่, เบอร์โทร, เวลาทำการ, Facebook
- Google Maps embed แบบ responsive
- Slide-in animation จากซ้าย/ขวา

**Footer**
- Brand description, Quick links, Quick contact info, Copyright

### หน้า Login (`/login`)
- Form fields: ชื่อผู้ใช้งาน, รหัสผ่าน
- Toggle แสดง/ซ่อนรหัสผ่าน
- Back link กลับหน้าหลัก
- Form submit เป็น no-op (ยังไม่มี Auth logic)

### Scroll-triggered Animations
ใช้ `IntersectionObserver` API โดยไม่ต้องพึ่ง library ภายนอก:
- Elements เริ่มต้น `opacity: 0` พร้อม transform (translateY, translateX, scale)
- เมื่อ element เข้า viewport (threshold 15%) จะ add class `.anim-visible` → transition to `opacity: 1` + `transform: none`
- Observer disconnect หลัง animate แล้วเพื่อประหยัด memory

---

## เริ่มต้นใช้งาน

### Prerequisites

- **Node.js** 18.18+ หรือ 20+
- **npm** 9+

### ติดตั้ง

```bash
# Clone repo
git clone git@github.com:petcharutar20-create/myweb.git
cd myweb

# ติดตั้ง dependencies
npm install
```

### รัน Development Server

```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์

---

## คำสั่งที่ใช้บ่อย

```bash
npm run dev       # รัน development server (Turbopack)
npm run build     # Build สำหรับ production
npm run start     # รัน production build locally
npm run lint      # ตรวจสอบ code ด้วย ESLint
```

> **หมายเหตุ:** ใช้ `eslint` CLI ตรง ๆ — ไม่ใช่ `next lint` (Next.js 16 ลบ `next lint` ออกแล้ว)

---

## Design System

### Brand Colors

| ชื่อ | CSS Variable | Hex | ใช้สำหรับ |
|------|-------------|-----|-----------|
| Primary | `--bs-primary` | `#008864` | สีหลัก (เขียว) — buttons, icons, highlights |
| Secondary | `--bs-secondary` | `#ff991b` | สีรอง (เหลืองอำพัน) — badges, accents |
| Dark | `--bs-dark` | `#222222` | Headings, footer background |

### Typography

| Font | ใช้สำหรับ |
|------|-----------|
| **Prompt** | Headings (h1–h6) |
| **Sarabun** | Body text ทั่วไป |
| **Noto Sans Thai** | Fallback สำหรับภาษาไทย |

> โหลดผ่าน Google Fonts CDN ใน `layout.tsx` — ไม่ใช้ `next/font`

### Key CSS Classes

```css
.navbar-transparent   /* Navbar โปร่งใส (บนสุดของหน้า) */
.navbar-scrolled      /* Navbar สีขาว + shadow (หลัง scroll) */
.anim-item            /* Element รอ scroll-trigger animation */
.anim-visible         /* State หลัง animate เสร็จ */
.mobile-nav           /* Full-screen mobile menu overlay */
.service-card-img     /* Image ใน service card พร้อม hover zoom */
.login-page           /* Layout หน้า login */
.login-card           /* Card container ของ login form */
```

---

## การ Deploy บน Vercel

โปรเจคนี้มี `vercel.json` พร้อมสำหรับ deploy บน Vercel:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "headers": [...]
}
```

**Security Headers ที่ตั้งค่าไว้:**
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### ขั้นตอน Deploy

1. Push โค้ดขึ้น GitHub
2. ไปที่ [vercel.com](https://vercel.com) → "Add New Project"
3. Import repository `petcharutar20-create/myweb`
4. กด **Deploy** — Vercel จะ auto-detect Next.js และตั้งค่าให้อัตโนมัติ

ทุก route เป็น **Static HTML** ทั้งหมด → load เร็ว, ไม่มี server-side compute cost

---

## หมายเหตุ Next.js 16

Next.js 16 มี breaking changes จากเวอร์ชันก่อนหน้า:

| ฟีเจอร์ | เดิม (v15) | ใหม่ (v16) |
|---------|-----------|-----------|
| Middleware | `middleware.ts` + `middleware` export | `proxy.ts` + `proxy` export |
| Async APIs | sync fallback ยังมี | ต้อง `await` ทุกครั้ง (`cookies()`, `headers()`, `params`) |
| ESLint | `next lint` | `eslint` CLI ตรง ๆ |
| `revalidateTag` | 1 argument | ต้องมี `cacheLife` เป็น argument ที่ 2 |
| Edge runtime | รองรับใน middleware | ไม่รองรับใน proxy (Node.js only) |

ดูรายละเอียดเพิ่มเติมใน `node_modules/next/dist/docs/`

---

## ข้อมูลติดต่อธุรกิจ

**บริษัท จตุรโชคกรุ๊ป จำกัด**

- **ที่อยู่:** 286/2 หมู่ที่ 10 ถนนโพธิ์ ตำบลโพธิ์ อำเภอเมืองศรีสะเกษ จังหวัดศรีสะเกษ 33000
- **โทรศัพท์:** 081-966-3121
- **เวลาทำการ:** จันทร์ – เสาร์ 08:30 – 18:00 น.
- **Facebook:** จตุรโชคกรุ๊ป (Jaturachok Group)

---

© 2026 บริษัท จตุรโชคกรุ๊ป จำกัด. สงวนลิขสิทธิ์ทั้งหมด.
