import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import DomeGallery from "./components/reactbits/DomeGallery";
import SpotlightCard from "./components/reactbits/SpotlightCard";
import TiltedCard from "./components/reactbits/TiltedCard";
import SplitText from "./components/reactbits/SplitText";
import Magnet from "./components/reactbits/Magnet";
import CountUp from "./components/reactbits/CountUp";
import ScrollVelocity from "./components/reactbits/ScrollVelocity";
import {
  capabilityItems,
  marqueeRows,
  statItems,
  approachItems,
  testimonialItems,
  annotationItems,
  projects,
  experienceItems,
  toolItems,
  getProject,
  getNextProject,
} from "./data";

const reveal = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] }
};

const previewImages = [
  { src: "/assets/gallery/gallery-01.jpg", alt: "占位作品 01" },
  { src: "/assets/gallery/gallery-02.jpg", alt: "占位作品 02" },
  { src: "/assets/gallery/gallery-03.jpg", alt: "占位作品 03" },
  { src: "/assets/gallery/gallery-04.jpg", alt: "占位作品 04" },
  { src: "/assets/gallery/gallery-05.jpg", alt: "占位作品 05" },
  { src: "/assets/gallery/gallery-06.jpg", alt: "占位作品 06" },
  { src: "/assets/gallery/gallery-07.jpg", alt: "占位作品 07" },
  { src: "/assets/gallery/gallery-08.jpg", alt: "占位作品 08" },
  { src: "/assets/gallery/gallery-09.jpg", alt: "占位作品 09" },
  { src: "/assets/gallery/gallery-10.jpg", alt: "占位作品 10" },
  { src: "/assets/gallery/gallery-11.jpg", alt: "占位作品 11" },
  { src: "/assets/gallery/gallery-12.jpg", alt: "占位作品 12" },
];

function Arrow() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
}

const CAP_ICONS = [
  <path key="i" d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z" />,
  <g key="g"><rect x="4" y="4" width="16" height="16" rx="4" /><path d="M9 12l2 2 4-4" /></g>,
  <g key="m"><circle cx="12" cy="12" r="3" /><path d="M12 4v3M12 17v3M4 12h3M17 12h3" /></g>,
  <g key="t"><path d="M12 3v18M3 12h18" /><circle cx="12" cy="12" r="8" /></g>,
];

function CapIcon({ index }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{CAP_ICONS[index % CAP_ICONS.length]}</svg>;
}

function Header({ active = "home" }) {
  return (
    <header className="portfolio-nav">
      <a className="portfolio-brand" href="/index.html"><span className="brand-dot" />Noah</a>
      <nav aria-label="主导航">
        <a className={active === "home" ? "is-active" : ""} href="/index.html">首页</a>
        <a className={active === "projects" ? "is-active" : ""} href="/projects.html">我的项目</a>
        <a className={active === "about" ? "is-active" : ""} href="/about.html">关于我</a>
      </nav>
      <a className="nav-cta" href="mailto:623195118@qq.com">联系我 <Arrow /></a>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer-v2">
      <div className="footer-v2-inner">
        <div className="footer-v2-top">
          <div className="footer-v2-brand">
            <a className="footer-v2-mark" href="/index.html">Noah</a>
            <p>UI / UX · 品牌表达 · 数字体验<br />郭睿聪 · 成都</p>
          </div>
          <div className="footer-v2-cols">
            <div>
              <span>导航 / MENU</span>
              <a href="/index.html">首页</a>
              <a href="/projects.html">我的项目</a>
              <a href="/about.html">关于我</a>
            </div>
            <div>
              <span>联系 / CONTACT</span>
              <a href="mailto:623195118@qq.com">623195118@qq.com</a>
              <span>WECHAT / 15534144873</span>
              <span>成都 · CHENGDU</span>
            </div>
          </div>
        </div>
        <div className="footer-v2-word" aria-hidden="true">NOAH</div>
        <div className="footer-v2-bottom">
          <span>© 2026 郭睿聪 · Noah Portfolio</span>
          <button type="button" className="footer-v2-totop" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            回到顶部 <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

function Pattern({ inverted = false }) {
  return (
    <div className={`mimo-pattern ${inverted ? "is-inverted" : ""}`} aria-hidden="true">
      {Array.from({ length: 20 }, (_, row) => (
        <div className="mimo-pattern-row" key={row}>
          {Array.from({ length: 14 }, (_, index) => <span key={index}>N O A H</span>)}
        </div>
      ))}
    </div>
  );
}

function MimoHero() {
  const stageRef = useRef(null);
  const [pointer, setPointer] = useState({ x: -300, y: -300, visible: false });
  const [flipped, setFlipped] = useState(false);

  const move = (event) => {
    const rect = stageRef.current.getBoundingClientRect();
    setPointer({ x: event.clientX - rect.left, y: event.clientY - rect.top, visible: true });
  };

  const radius = pointer.visible ? "clamp(118px, 15vw, 215px)" : "0px";

  return (
    <section className={`mimo-shell ${flipped ? "is-flipped" : ""}`}>
      <div className="mimo-flip-inner">
        <div className="mimo-face mimo-front">
          <div
            className="mimo-stage"
            ref={stageRef}
            onMouseMove={move}
            onMouseEnter={move}
            onMouseLeave={() => setPointer((value) => ({ ...value, visible: false }))}
          >
            <Pattern />
            <h1>你好，我是郭睿聪</h1>
            <div
              className="mimo-alt-layer"
              style={{ clipPath: `circle(${radius} at ${pointer.x}px ${pointer.y}px)` }}
              aria-hidden="true"
            >
              <Pattern inverted />
              <h2>HELLO, I'M Noah</h2>
              <span>关于我</span>
            </div>
            <button className="mimo-flip-zone" onClick={() => setFlipped(true)} aria-label="翻转查看个人介绍" />
          </div>
        </div>

        <div className="mimo-face mimo-back">
          <div className="mimo-back-content">
            <span className="mimo-back-index">ABOUT / NOAH</span>
            <p>我是郭睿聪，也可以叫我 Noah。专注于 UI 视觉、品牌表达与数字体验。工作中主要负责视觉产出，同时理解产品与交互逻辑，从用户需求和业务目标之间寻找更准确的表达方式。</p>
            <div>
              <span>UI / UX DESIGN</span>
              <span>VISUAL SYSTEM</span>
              <span>MOTION / AIGC</span>
            </div>
            <button onClick={() => setFlipped(false)}>返回正面 <Arrow /></button>
          </div>
        </div>
      </div>
      <div className="mimo-meta">
        <span>Move your cursor / 移动鼠标</span>
        <span>Spotlight / Identity / Flip</span>
      </div>
    </section>
  );
}

function SectionHead({ index, title, lead }) {
  return (
    <div className="section-head">
      <span className="section-eyebrow">{index}</span>
      <SplitText text={title} tag="h2" className="section-title" splitType="chars" delay={24} />
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}

function SkillsMarquee() {
  return (
    <section className="marquee-v1" aria-hidden="true">
      <ScrollVelocity texts={marqueeRows} velocity={42} numCopies={6} />
    </section>
  );
}

function ProfileSection() {
  return (
    <section className="profile-section-v3" id="profile">
      <motion.div {...reveal}>
        <SectionHead index="01 / PROFILE" title="设计身份" lead="基于真实履历整理，聚焦视觉传达、UI 设计、品牌表达与产品体验优化。" />
      </motion.div>
      <div className="profile-body-v3">
        <motion.div {...reveal} className="profile-copy-v3">
          <p className="profile-lead-v3">我是郭睿聪（Noah）<br />专注于 UI 视觉、品牌表达与数字体验。</p>
          <p>项目经验覆盖移动端、PC 端、B 端界面、品牌 IP、运营 H5 与 Banner。除了常规界面设计，也具备 C4D、AIGC 与 AE 动效能力。</p>
          <div className="profile-facts-v3">
            <span>本科 / 视觉传达设计</span>
            <span>2021.03—2024.03 / 云雅信息技术（成都）</span>
            <span>15534144873</span>
            <span>623195118@qq.com</span>
          </div>
        </motion.div>
        <TiltedCard imageSrc="/assets/portrait.png" altText="郭睿聪个人照" className="profile-portrait-v3" rotateAmplitude={5} scaleOnHover={1.018}>
          <div className="portrait-overlay-v3"><span>PORTRAIT / GRC</span><strong>NOAH</strong><small>UI / UX DESIGNER</small></div>
        </TiltedCard>
      </div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="stats-dark">
      <div className="stats-dark-inner">
        <motion.div {...reveal} className="stats-dark-quote">
          <span className="section-eyebrow">BY THE NUMBERS / 数据</span>
          <p>“好的设计让复杂的事情变简单。”<br />这是我在每个项目里坚持的标准。</p>
        </motion.div>
        <div className="stats-dark-grid">
          {statItems.map((s) => (
            <motion.div {...reveal} className="stat-cell-d" key={s.label}>
              <strong><CountUp to={s.to} duration={1.8} /><span>{s.suffix}</span></strong>
              <span>{s.label}</span>
              <small>{s.sub}</small>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilitiesDark() {
  return (
    <section className="caps-dark" id="capabilities">
      <div className="caps-dark-inner">
        <div className="caps-dark-head">
          <div className="caps-dark-head-l">
            <span className="section-eyebrow caps-dark-eyebrow">CAPABILITIES / 核心能力</span>
            <SplitText text="聚焦产品视觉的核心能力" tag="h2" className="caps-dark-title" splitType="words" delay={40} />
          </div>
          <p>覆盖从界面、视觉系统到动态表达的完整设计能力，帮助产品建立清晰、统一、有质感的体验。</p>
        </div>
        <div className="caps-dark-grid">
          {capabilityItems.map(([n, t, d], i) => (
            <motion.div {...reveal} className="caps-dark-card" key={n}>
              <div className="caps-dark-card-top">
                <span className="caps-dark-icon"><CapIcon index={i} /></span>
                <span className="caps-dark-num">{n}</span>
              </div>
              <div className="caps-dark-card-text">
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApproachSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="approach-v1" id="approach">
      <div className="approach-grid">
        <div className="approach-left">
          <motion.div {...reveal}>
            <SectionHead index="02 / HOW I WORK" title="我的设计方法" lead="从理解问题到打磨细节的三个阶段。" />
          </motion.div>
          <div className="approach-acc">
            {approachItems.map((a, i) => (
              <button
                key={a.key}
                type="button"
                className={`approach-item${i === active ? " is-open" : ""}`}
                onClick={() => setActive(i)}
              >
                <div className="approach-item-head">
                  <span className="approach-item-num">{String(i + 1).padStart(2, "0")}</span>
                  <strong>{a.title}</strong>
                </div>
                <div className="approach-item-body"><p>{a.text}</p></div>
              </button>
            ))}
          </div>
          <a className="approach-more" href="/about.html">了解我的工作方式 <Arrow /></a>
        </div>
        <div className="approach-media">
          <div className="approach-media-main">
            {approachItems.map((a, i) => (
              <img key={a.key} src={a.image} alt={a.title} className={i === active ? "is-active" : ""} loading="lazy" />
            ))}
          </div>
          <div className="approach-media-sub">
            <img
              src={approachItems[(active + 1) % approachItems.length].image}
              alt=""
              aria-hidden="true"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ApexSection() {
  return (
    <section className="apex-v1" id="apex">
      <div className="apex-head">
        <span className="section-eyebrow">THE PROCESS / 设计工程</span>
        <SplitText text="从概念到落地的完整能力" tag="h2" className="apex-title" splitType="words" delay={40} />
      </div>
      <div className="apex-stage">
        <div className="apex-image">
          <img src="/assets/gallery/gallery-07.jpg" alt="设计工作流展示" loading="lazy" />
        </div>
        {annotationItems.map((a) => (
          <div className={`apex-anno apex-anno-${a.pos}`} key={a.label}>
            <span className="apex-anno-pill"><strong>{a.label}</strong><em>{a.sub}</em></span>
            <span className="apex-anno-line" />
            <span className="apex-anno-dot" />
          </div>
        ))}
      </div>
      <a className="apex-cta" href="/projects.html">查看项目案例 <Arrow /></a>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonialItems[active];
  const go = (d) => setActive((active + d + testimonialItems.length) % testimonialItems.length);
  return (
    <section className="testi-v1">
      <div className="testi-inner">
        <div className="testi-head">
          <SplitText text="客户怎么说" tag="h2" className="testi-title" splitType="chars" delay={28} />
          <p>来自合作过的产品、团队与客户的真实反馈。当前为占位内容，后续替换为真实评价。</p>
        </div>
        <div className="testi-body">
          <div className="testi-avatars">
            {testimonialItems.map((it, i) => (
              <button
                key={it.name}
                type="button"
                className={`testi-av${i === active ? " is-active" : ""}`}
                onClick={() => setActive(i)}
                aria-label={it.name}
              >
                <span>{it.initials}</span>
              </button>
            ))}
          </div>
          <div className="testi-quote">
            <span className="testi-brand">{t.brand}</span>
            <blockquote>{t.quote}</blockquote>
            <div className="testi-person"><strong>{t.name}</strong><span>{t.role}</span></div>
          </div>
          <div className="testi-nav">
            <button type="button" onClick={() => go(-1)} aria-label="上一条"><span className="testi-arrow-up"><Arrow /></span></button>
            <button type="button" onClick={() => go(1)} aria-label="下一条"><span className="testi-arrow-down"><Arrow /></span></button>
          </div>
        </div>
        <div className="testi-stats">
          {statItems.map((s) => (
            <div className="testi-stat" key={s.label}>
              <strong><CountUp to={s.to} duration={1.8} /><span>{s.suffix}</span></strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsPreview() {
  return (
    <section className="projects-preview-v4" id="projects">
      <motion.div {...reveal}>
        <SectionHead index="03 / GALLERY" title="项目预览" lead="拖动球面画廊探索作品，点击任意图片查看大图。下方为精选案例。" />
      </motion.div>
      <motion.div {...reveal} className="projects-dome-v4">
        <div className="projects-dome-word-v4" aria-hidden="true">WORKS</div>
        <DomeGallery
          images={previewImages}
          fit={0.9}
          minRadius={800}
          maxVerticalRotationDeg={20}
          segments={30}
          dragDampening={2.4}
          grayscale={true}
          overlayBlurColor="#e7e7e9"
        />
        <div className="projects-dome-meta-v4">
          <span>DRAG TO EXPLORE / 拖拽浏览</span>
          <span>CLICK TO VIEW / 点击查看</span>
        </div>
      </motion.div>
    </section>
  );
}

function WorkCard({ p }) {
  return (
    <motion.a {...reveal} className="work-card" href={`/project.html?id=${p.id}`}>
      <div className="work-card-media"><img src={p.cover} alt={p.title} loading="lazy" /></div>
      <div className="work-card-body">
        <div className="work-card-top"><span>{p.index}</span><span>{p.year}</span></div>
        <h3>{p.title}</h3>
        <span className="work-card-cat">{p.category}</span>
        <p>{p.summary}</p>
        <div className="work-card-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
      </div>
    </motion.a>
  );
}

function SelectedWork() {
  return (
    <section className="work-v1" id="work">
      <motion.div {...reveal}>
        <SectionHead index="04 / SELECTED WORK" title="精选作品" lead="挑选了几个有代表性的项目方向，点击查看完整案例。当前为占位内容，后续替换为真实作品。" />
      </motion.div>
      <div className="work-grid">
        {projects.slice(0, 4).map((p) => <WorkCard p={p} key={p.id} />)}
      </div>
      <a className="work-all-link" href="/projects.html">查看全部项目 <Arrow /></a>
    </section>
  );
}

function ContactCTA() {
  return (
    <motion.section {...reveal} className="cta-v2" id="contact">
      <div className="cta-v2-row">
        <span className="section-eyebrow">05 / GET IN TOUCH</span>
        <span className="cta-v2-status"><i />目前可接洽新项目</span>
      </div>
      <SplitText text="一起做点好设计" tag="h2" className="cta-v2-title" splitType="chars" delay={26} />
      <p className="cta-v2-sub">有合作、外包或全职机会？欢迎随时联系，我会尽快回复。</p>
      <Magnet padding={80} magnetStrength={4}>
        <a className="cta-v2-btn" href="mailto:623195118@qq.com">
          <span>623195118@qq.com</span>
          <span className="cta-v2-btn-circle"><Arrow /></span>
        </a>
      </Magnet>
      <div className="cta-v2-meta">
        <span>WECHAT / 15534144873</span>
        <span>BASED IN CHENGDU / 成都</span>
        <span>UI · UX · VISUAL</span>
      </div>
    </motion.section>
  );
}

function HomePage() {
  return (
    <>
      <Header active="home" />
      <main className="home-v3">
        <MimoHero />
        <SkillsMarquee />
        <ProfileSection />
        <CapabilitiesDark />
        <ApproachSection />
        <ApexSection />
        <ProjectsPreview />
        <Testimonials />
        <SelectedWork />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

function ProjectsListPage() {
  const disciplines = ["全部", ...Array.from(new Set(projects.map((p) => p.discipline)))];
  const [filter, setFilter] = useState("全部");
  const list = filter === "全部" ? projects : projects.filter((p) => p.discipline === filter);
  return (
    <>
      <Header active="projects" />
      <main className="projects-page">
        <section className="projects-page-hero">
          <span className="section-eyebrow">PROJECTS / 项目</span>
          <SplitText text="我的项目" tag="h1" className="projects-page-title" splitType="chars" delay={26} />
          <p>从移动端、B 端到品牌与动效——这里汇总了我参与的代表性项目方向。当前为占位内容，后续替换为真实作品。</p>
        </section>
        <div className="projects-filter">
          {disciplines.map((d) => (
            <button key={d} className={d === filter ? "is-active" : ""} onClick={() => setFilter(d)}>{d}</button>
          ))}
        </div>
        <div className="proj-list">
          {list.map((p) => (
            <motion.a key={p.id} {...reveal} className="proj-row" href={`/project.html?id=${p.id}`}>
              <span className="proj-row-index">{p.index}</span>
              <div className="proj-row-main">
                <h3>{p.title}</h3>
                <span className="proj-row-cat">{p.category}</span>
              </div>
              <div className="proj-row-thumb"><img src={p.cover} alt={p.title} loading="lazy" /></div>
              <span className="proj-row-year">{p.year}</span>
              <span className="proj-row-arrow"><Arrow /></span>
            </motion.a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

function ProjectDetailPage() {
  const id = new URLSearchParams(window.location.search).get("id");
  const p = getProject(id) || projects[0];
  const next = getNextProject(p.id);
  return (
    <>
      <Header active="projects" />
      <main className="project-detail">
        <a className="detail-back" href="/projects.html"><span className="detail-back-arrow"><Arrow /></span> 返回项目列表</a>
        <section className="detail-hero">
          <div className="detail-hero-top"><span>{p.index} / {p.category}</span><span>{p.year}</span></div>
          <SplitText text={p.title} tag="h1" className="detail-title" splitType="chars" delay={22} />
          <p className="detail-summary">{p.summary}</p>
        </section>
        <div className="detail-cover"><img src={p.cover} alt={p.title} /></div>
        <section className="detail-meta">
          <div><span>角色 / ROLE</span><strong>{p.role}</strong></div>
          <div><span>客户 / CLIENT</span><strong>{p.client}</strong></div>
          <div><span>年份 / YEAR</span><strong>{p.year}</strong></div>
          <div><span>周期 / DURATION</span><strong>{p.duration}</strong></div>
          <div className="detail-meta-deliver">
            <span>交付 / DELIVERABLES</span>
            <div>{p.deliverables.map((d) => <em key={d}>{d}</em>)}</div>
          </div>
        </section>
        <section className="detail-body">
          <motion.div {...reveal} className="detail-block">
            <span className="section-eyebrow">OVERVIEW / 项目概述</span>
            <p>{p.overview}</p>
          </motion.div>
          <div className="detail-two">
            <motion.div {...reveal} className="detail-block">
              <span className="section-eyebrow">CHALLENGE / 挑战</span>
              <p>{p.challenge}</p>
            </motion.div>
            <motion.div {...reveal} className="detail-block">
              <span className="section-eyebrow">SOLUTION / 方案</span>
              <p>{p.solution}</p>
            </motion.div>
          </div>
        </section>
        <section className="detail-gallery">
          {p.gallery.map((g, i) => (
            <motion.div key={i} {...reveal} className="detail-shot"><img src={g} alt={`${p.title} 图 ${i + 1}`} loading="lazy" /></motion.div>
          ))}
        </section>
        <a className="detail-next" href={`/project.html?id=${next.id}`}>
          <span className="section-eyebrow">NEXT PROJECT / 下一个项目</span>
          <h2>{next.title} <Arrow /></h2>
        </a>
      </main>
      <Footer />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <Header active="about" />
      <main className="about-v4">
        <section className="about-hero-v4">
          <motion.div {...reveal} className="about-hero-copy">
            <span className="section-eyebrow">GUO RUI CONG / UI · UX · VISUAL DESIGNER</span>
            <SplitText text="你好，我是郭睿聪" tag="h1" className="about-hero-title" splitType="chars" delay={24} />
            <p>也可以叫我 Noah。一名专注于 UI 视觉、品牌表达与数字体验的设计师，喜欢在用户需求与业务目标之间找到更准确的表达方式。</p>
            <div className="about-hero-facts">
              <span>BASED IN 成都</span>
              <span>3 年设计经验</span>
              <span>UI · UX · VISUAL</span>
            </div>
          </motion.div>
          <TiltedCard imageSrc="/assets/portrait.png" altText="郭睿聪个人照" className="about-portrait-v4" rotateAmplitude={5} scaleOnHover={1.02}>
            <div className="portrait-overlay-v3"><span>PORTRAIT / GRC</span><strong>NOAH</strong><small>UI / UX DESIGNER</small></div>
          </TiltedCard>
        </section>

        <motion.section {...reveal} className="about-manifesto">
          <span className="section-eyebrow">DESIGN MANIFESTO / 设计理念</span>
          <p>好的设计是 <em>清晰</em> 的——让复杂的事情变简单，让信息找到合适的层级，让每一次交互都有 <em>恰当的反馈</em>。视觉不只是好看，更是表达与沟通。</p>
        </motion.section>

        <StatsBand />

        <section className="about-exp">
          <motion.div {...reveal}>
            <SectionHead index="EXPERIENCE / 经历" title="工作与教育" lead="一条从系统学习到项目实践的设计成长路径。" />
          </motion.div>
          <div className="exp-timeline">
            {experienceItems.map((e, i) => (
              <motion.div key={i} {...reveal} className="exp-row">
                <span className="exp-period">{e.period}</span>
                <div className="exp-main">
                  <h3>{e.role}</h3>
                  <span className="exp-org">{e.org}</span>
                  <p>{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="about-cap">
          <motion.div {...reveal}>
            <SectionHead index="CAPABILITIES / 能力" title="我能做什么" lead="围绕产品视觉的四个核心方向。" />
          </motion.div>
          <div className="about-capability-grid-v3">
            {capabilityItems.map(([number, title, text]) => (
              <SpotlightCard key={number} className="about-capability-card-v3" spotlightColor="rgba(182,141,87,.2)">
                <span>{number}</span><h3>{title}</h3><p>{text}</p>
              </SpotlightCard>
            ))}
          </div>
        </section>

        <section className="about-tools">
          <motion.div {...reveal}>
            <SectionHead index="TOOLKIT / 工具" title="软件能力" lead="日常使用的主力工具与熟练度。" />
          </motion.div>
          <div className="tools-list">
            {toolItems.map((t) => (
              <motion.div key={t.name} {...reveal} className="tool-row">
                <div className="tool-head"><strong>{t.name}</strong><span>{t.note}</span></div>
                <div className="tool-bar"><i style={{ width: `${t.level}%` }} /></div>
              </motion.div>
            ))}
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  useEffect(() => window.scrollTo(0, 0), []);
  const path = window.location.pathname;
  if (path.endsWith("about.html")) return <AboutPage />;
  if (path.endsWith("project.html")) return <ProjectDetailPage />;
  if (path.endsWith("projects.html")) return <ProjectsListPage />;
  return <HomePage />;
}
