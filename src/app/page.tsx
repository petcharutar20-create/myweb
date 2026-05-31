"use client";

import { useEffect, useRef, useState } from "react";
import {
  Award,
  Briefcase,
  ThumbsUp,
  Truck,
  ChevronRight,
  ArrowDown,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
} from "lucide-react";

function FacebookIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

/* ─── data ─────────────────────────────────────────────── */

const ABOUT_CARDS = [
  {
    icon: <Award size={40} className="text-primary mb-3" />,
    title: "สินค้าคุณภาพสูง",
    text: "คัดสรรเฟอร์นิเจอร์คุณภาพดี ทนทาน สวยงาม เหมาะกับทุกการใช้งาน",
  },
  {
    icon: <Briefcase size={40} className="text-primary mb-3" />,
    title: "ประสบการณ์ 7+ ปี",
    text: "สั่งสมความเชี่ยวชาญด้านเฟอร์นิเจอร์และการบริการมาอย่างยาวนาน",
  },
  {
    icon: <ThumbsUp size={40} className="text-primary mb-3" />,
    title: "ผู้จำหน่ายชั้นนำ",
    text: "ผู้จำหน่ายเฟอร์นิเจอร์บ้านและสำนักงานชั้นนำในจังหวัดศรีสะเกษ",
  },
  {
    icon: <Truck size={40} className="text-primary mb-3" />,
    title: "บริการจัดส่งถึงบ้าน",
    text: "พร้อมบริการจัดส่งและติดตั้งเฟอร์นิเจอร์ถึงบ้านคุณ",
  },
];

const SERVICES = [
  {
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2670&auto=format&fit=crop",
    title: "โซฟาและที่นั่งพักผ่อน",
    desc: "โซฟา เก้าอี้นวด เก้าอี้พักผ่อน หลากสไตล์ หลายขนาด เหมาะกับทุกพื้นที่",
  },
  {
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2670&auto=format&fit=crop",
    title: "ชุดห้องนอน",
    desc: "เตียงนอน ตู้เสื้อผ้า โต๊ะเครื่องแป้ง ชุดห้องนอนครบเซ็ตราคาพิเศษ",
  },
  {
    img: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=2670&auto=format&fit=crop",
    title: "ที่นอนและเครื่องนอน",
    desc: "ที่นอนสปริง เมมโมรี่โฟม ลาเท็กซ์ คุณภาพดี นอนหลับสบายทุกคืน",
  },
  {
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2670&auto=format&fit=crop",
    title: "เฟอร์นิเจอร์สำนักงาน",
    desc: "โต๊ะทำงาน เก้าอี้ออฟฟิศ ตู้เก็บเอกสาร ครบครันสำหรับทุกสำนักงาน",
  },
  {
    img: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=2670&auto=format&fit=crop",
    title: "ชุดโต๊ะอาหาร",
    desc: "ชุดโต๊ะรับประทานอาหาร โต๊ะกลาง ชั้นวางของ ดีไซน์สวยงามทันสมัย",
  },
  {
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2670&auto=format&fit=crop",
    title: "ของตกแต่งบ้าน",
    desc: "ของตกแต่งบ้านสวยงาม โคมไฟ พรม กรอบรูป เพิ่มความสวยงามให้ทุกมุมบ้าน",
  },
];

const CONTACT_ITEMS = [
  {
    icon: <MapPin size={24} />,
    label: "ที่อยู่",
    content: (
      <>
        286/2 หมู่ที่ 10 ถนนโพธิ์ ตำบลโพธิ์
        <br />
        อำเภอเมืองศรีสะเกษ จังหวัดศรีสะเกษ 33000
      </>
    ),
  },
  {
    icon: <Phone size={24} />,
    label: "เบอร์โทรศัพท์",
    content: <>โทรศัพท์: 081-966-3121</>,
  },
  {
    icon: <Mail size={24} />,
    label: "เวลาทำการ",
    content: <>จันทร์ – เสาร์: 08:30 – 18:00 น.</>,
  },
  {
    icon: <FacebookIcon size={24} />,
    label: "Facebook",
    content: <>จตุรโชคกรุ๊ป (Jaturachok Group)</>,
  },
];

/* ─── hooks ─────────────────────────────────────────────── */

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("anim-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── sub-components ────────────────────────────────────── */

function AnimDiv({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const ref = useScrollAnimation();
  return (
    <div ref={ref} className={`anim-item ${className ?? ""}`} style={style}>
      {children}
    </div>
  );
}

/* ─── page ──────────────────────────────────────────────── */

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  return (
    <div className="main-wrapper">
      {/* ── Navbar ─────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          padding: "15px 0",
          zIndex: 1030,
          transition: "all 0.4s",
        }}
        className={scrolled ? "navbar-scrolled" : "navbar-transparent"}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <a
            className="text-decoration-none me-auto d-flex align-items-center gap-2"
            href="#hero"
          >
            <span
              className="fw-bold h3 mb-0 nav-brand-text"
              style={{
                color: "#ffffff",
                transition: "color 0.3s",
              }}
            >
              จตุรโชคกรุ๊ป
            </span>
          </a>

          {/* Desktop links */}
          <div className="d-none d-lg-flex align-items-center">
            {[
              ["#hero", "หน้าแรก"],
              ["#about", "เกี่ยวกับเรา"],
              ["#services", "สินค้าและบริการ"],
              ["#contact", "ติดต่อเรา"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="nav-link-item"
                style={{
                  color: "#ffffff",
                  padding: "18px 15px",
                  fontSize: 16,
                  fontWeight: 400,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "color 0.3s",
                }}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="d-none d-lg-flex gap-2 ms-2">
            <a
              href="/login"
              style={{
                color: "#fff",
                background: "var(--bs-primary)",
                fontSize: 14,
                padding: "8px 26px",
                borderRadius: 4,
                textDecoration: "none",
                transition: "background 0.3s",
              }}
            >
              เข้าสู่ระบบ
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="d-lg-none btn btn-link p-0"
            onClick={() => setMobileOpen(true)}
            aria-label="เปิดเมนู"
          >
            <Menu
              size={28}
              style={{ color: "#ffffff", transition: "color 0.3s" }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mobile-nav">
          <button
            className="btn btn-link p-0 position-absolute"
            style={{ top: 20, right: 20 }}
            onClick={closeMenu}
            aria-label="ปิดเมนู"
          >
            <X size={32} color="#fff" />
          </button>
          {[
            ["#hero", "หน้าแรก"],
            ["#about", "เกี่ยวกับเรา"],
            ["#services", "สินค้าและบริการ"],
            ["#contact", "ติดต่อเรา"],
          ].map(([href, label]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
          <a
            href="/login"
            className="btn btn-primary px-5 py-2 rounded-pill"
            onClick={closeMenu}
          >
            เข้าสู่ระบบ
          </a>
        </div>
      )}

      {/* ── Hero ───────────────────────────────────────────── */}
      <section
        id="hero"
        className="position-relative d-flex align-items-center justify-content-center min-vh-100 overflow-hidden text-white"
      >
        {/* Background image */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2670&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#d9d9d9",
            zIndex: -2,
          }}
        />
        {/* Gradient overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,136,100,0.55) 100%)",
            zIndex: -1,
          }}
        />

        <div className="container position-relative pt-5">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <AnimDiv
                style={{ opacity: 0, transform: "translateY(30px)" }}
              >
                <span className="badge bg-secondary mb-3 px-3 py-2 fs-6 rounded-pill">
                  ประสบการณ์กว่า 7 ปี — สินค้ามากกว่า 1,000 รายการ
                </span>
                <h1 className="display-4 fw-bold text-white mb-4 lh-sm">
                  ระดับแนวหน้าในเขต{" "}
                  <br />
                  <span className="text-warning">จังหวัดศรีสะเกษ</span>
                  <br />
                  และภาคอีสาน
                </h1>
                <p
                  className="lead text-white opacity-75 mb-5 pe-lg-5"
                  style={{ maxWidth: 600 }}
                >
                  ขอต้อนรับทุกท่านเข้าสู่เว็บไซต์ บริษัท จตุรโชคกรุ๊ป จำกัด
                  ผู้จำหน่ายเฟอร์นิเจอร์บ้านและสำนักงานชั้นนำในจังหวัดศรีสะเกษ
                  พร้อมให้บริการด้วยสินค้าคุณภาพและราคาที่เป็นธรรม
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <a
                    href="#services"
                    className="btn btn-primary btn-lg rounded-pill px-4 d-inline-flex align-items-center gap-2"
                  >
                    ดูสินค้าและบริการ <ChevronRight size={20} />
                  </a>
                  <a
                    href="#contact"
                    className="btn btn-outline-light btn-lg rounded-pill px-4"
                  >
                    ติดต่อเรา
                  </a>
                </div>
              </AnimDiv>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 text-center">
          <a
            href="#about"
            className="text-white text-decoration-none opacity-75 d-flex flex-column align-items-center"
          >
            <small className="mb-2 text-uppercase">เลื่อนลง</small>
            <ArrowDown size={24} />
          </a>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────── */}
      <section id="about" className="bg-light" style={{ padding: "100px 0" }}>
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <AnimDiv style={{ opacity: 0, transform: "translateY(20px)" }}>
                <h2 className="section-title h1 fw-bold text-dark mb-4">
                  เกี่ยวกับเรา
                </h2>
                <p className="lead text-muted lh-lg">
                  บริษัท จตุรโชคกรุ๊ป จำกัด ก่อตั้งขึ้นในปี พ.ศ. 2561
                  ด้วยวิสัยทัศน์ในการเป็นผู้นำด้านการจำหน่ายเฟอร์นิเจอร์คุณภาพสูงสำหรับบ้านและสำนักงาน
                  เพื่อตอบสนองความต้องการของลูกค้าในจังหวัดศรีสะเกษและพื้นที่ใกล้เคียง
                </p>
              </AnimDiv>
            </div>
          </div>

          <div className="row g-4 mt-4">
            {ABOUT_CARDS.map((card, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <AnimDiv
                  style={{
                    opacity: 0,
                    transform: "translateY(20px)",
                    height: "100%",
                  }}
                >
                  <div
                    className="card h-100 border-0 shadow-sm text-center p-4 hover-shadow-lg transition-all"
                    style={{ borderRadius: "1rem" }}
                  >
                    <div className="card-body">
                      {card.icon}
                      <h4 className="card-title fw-bold h5 mb-3 text-dark">
                        {card.title}
                      </h4>
                      <p className="card-text text-muted mb-0">{card.text}</p>
                    </div>
                  </div>
                </AnimDiv>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────── */}
      <section id="services" style={{ padding: "100px 0" }}>
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <AnimDiv style={{ opacity: 0, transform: "translateY(20px)" }}>
                <h2 className="section-title h1 fw-bold text-dark mb-4">
                  สินค้าและบริการของเรา
                </h2>
                <p className="lead text-muted lh-lg">
                  เราจำหน่ายเฟอร์นิเจอร์คุณภาพสูงสำหรับบ้านและสำนักงาน
                  ครอบคลุมทุกความต้องการ
                  พร้อมบริการจัดส่งและติดตั้งถึงบ้านคุณ
                </p>
              </AnimDiv>
            </div>
          </div>

          <div className="row g-4 mt-2">
            {SERVICES.map((svc, i) => (
              <div key={i} className="col-md-6 col-lg-4">
                <AnimDiv
                  style={{
                    opacity: 0,
                    transform: "scale(0.95)",
                    height: "100%",
                  }}
                >
                  <div
                    className="card h-100 border-0 shadow-sm overflow-hidden service-card hover-shadow-lg transition-all"
                    style={{ borderRadius: "1rem" }}
                  >
                    <div
                      className="position-relative overflow-hidden bg-light"
                      style={{ height: 240 }}
                    >
                      <div
                        className="service-card-img w-100 h-100"
                        style={{
                          backgroundImage: `url('${svc.img}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundColor: "#d9d9d9",
                        }}
                      />
                      <div
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{
                          background:
                            "linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.62) 100%)",
                        }}
                      />
                      <h3 className="h4 position-absolute bottom-0 start-0 m-0 p-4 text-white fw-bold">
                        {svc.title}
                      </h3>
                    </div>
                    <div className="card-body p-4 d-flex flex-column bg-white">
                      <p className="card-text text-muted mb-4">{svc.desc}</p>
                      <div className="mt-auto">
                        <a
                          href="#contact"
                          className="text-primary text-decoration-none fw-semibold d-inline-flex align-items-center gap-2"
                        >
                          ติดต่อสอบถาม <ArrowRight size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimDiv>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────── */}
      <section
        id="contact"
        className="bg-light"
        style={{ padding: "100px 0" }}
      >
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <AnimDiv style={{ opacity: 0, transform: "translateY(20px)" }}>
                <h2 className="section-title h1 fw-bold text-dark mb-4">
                  ติดต่อเรา
                </h2>
                <p className="lead text-muted lh-lg">
                  เราพร้อมให้คำปรึกษาและบริการคุณอย่างเต็มที่
                  ติดต่อเราได้หลากหลายช่องทางด้านล่างนี้
                </p>
              </AnimDiv>
            </div>
          </div>

          <div className="row g-5 align-items-center">
            {/* Contact info */}
            <div className="col-lg-6">
              <AnimDiv
                style={{ opacity: 0, transform: "translateX(-30px)" }}
              >
                <div className="d-flex flex-column gap-4">
                  {CONTACT_ITEMS.map((item, i) => (
                    <div key={i} className="d-flex align-items-start gap-3">
                      <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="h5 fw-bold mb-2">{item.label}</h4>
                        <p className="text-muted mb-0">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimDiv>
            </div>

            {/* Map */}
            <div className="col-lg-6">
              <AnimDiv
                style={{ opacity: 0, transform: "translateX(30px)" }}
              >
                <div
                  className="shadow-lg rounded-4 overflow-hidden"
                  style={{ paddingBottom: "75%", position: "relative", backgroundColor: "#e2e8f0" }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7722.512076476395!2d104.33207!3d15.11727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3110e4ba897b6c25%3A0x6d2a09a4a1b48ed8!2z4LiV4Liz4Li14LiH4LiC4LmJ4Liy!5e0!3m2!1sth!2sth!4v1716000000000!5m2!1sth!2sth"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: 0,
                    }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="แผนที่จตุรโชคกรุ๊ป ศรีสะเกษ"
                  />
                </div>
              </AnimDiv>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="bg-dark text-white pt-5 pb-3">
        <div className="container">
          <div className="row g-4 mb-4">
            {/* Brand */}
            <div className="col-lg-4 col-md-6">
              <h3 className="h4 fw-bold mb-4 text-white">
                JATURACHOK GROUP
              </h3>
              <p
                className="pe-lg-4 lh-lg mb-4"
                style={{ color: "#aaaaaa" }}
              >
                ผู้จำหน่ายเฟอร์นิเจอร์บ้านและสำนักงานชั้นนำในจังหวัดศรีสะเกษ
                ที่มีประสบการณ์กว่า 7 ปี พร้อมให้บริการคุณ
              </p>
            </div>

            {/* Quick links */}
            <div className="col-lg-4 col-md-6">
              <h4 className="h5 fw-bold mb-4 text-white">ลิงก์ที่เป็นประโยชน์</h4>
              <ul className="list-unstyled d-flex flex-column gap-3">
                {[
                  ["#hero", "หน้าแรก"],
                  ["#about", "เกี่ยวกับเรา"],
                  ["#services", "สินค้าและบริการ"],
                  ["#contact", "ติดต่อเรา"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-decoration-none"
                      style={{ color: "#aaaaaa" }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick contact */}
            <div className="col-lg-4 col-md-6">
              <h4 className="h5 fw-bold mb-4 text-white">ติดต่อด่วน</h4>
              <ul className="list-unstyled d-flex flex-column gap-3">
                <li className="d-flex align-items-center gap-3" style={{ color: "#aaaaaa" }}>
                  <Phone size={18} className="text-primary" />
                  <span>081-966-3121</span>
                </li>
                <li className="d-flex align-items-center gap-3" style={{ color: "#aaaaaa" }}>
                  <Mail size={18} className="text-primary" />
                  <span>จ.–ส. 08:30–18:00 น.</span>
                </li>
                <li className="d-flex align-items-center gap-3" style={{ color: "#aaaaaa" }}>
                  <FacebookIcon size={18} />
                  <span>จตุรโชคกรุ๊ป</span>
                </li>
                <li className="d-flex align-items-center gap-3" style={{ color: "#aaaaaa" }}>
                  <MapPin size={18} className="text-primary" />
                  <span>อ.เมือง จังหวัดศรีสะเกษ 33000</span>
                </li>
              </ul>
            </div>
          </div>

          <hr style={{ borderColor: "rgba(255,255,255,0.1)" }} />

          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="small mb-0" style={{ color: "#666666" }}>
                © 2026 บริษัท จตุรโชคกรุ๊ป จำกัด. สงวนลิขสิทธิ์ทั้งหมด.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
              <div className="d-flex gap-3 justify-content-center justify-content-md-end">
                <a href="#" style={{ color: "#666666" }}>
                  <FacebookIcon size={20} />
                </a>
                <a href="#contact" style={{ color: "#666666" }}>
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
