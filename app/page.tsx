"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/next";
import {
  Download,
  Code,
  Cpu,
  Award,
  Menu,
  X,
  Maximize2,
  Layers,
  Send,
  Sun,
  Moon,
  ChevronRight,
  ChevronLeft,
  User,
  Briefcase,
  FolderGit2,
  Wrench,
  Mail,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { FaLinkedinIn, FaGithub, FaTelegram, FaXTwitter } from "react-icons/fa6";

// --- CONFIGURATION & DATA ---
const PROFILE_DATA = {
  name: "ZEWDU",
  surname: "TESFAYE",
  role: "Full-Stack Software Engineer & AI Systems Developer",
  bio: "Experienced in building scalable web platforms, distributed architectures, and custom AI models. Passionate about engineering high-performance digital products that solve real-world problems through clean code and modern system design.",
  cvPath: "/zewdu_cv.pdf",
  avatar: "/profile0.jpg",
  socials: {
    linkedin: "https://www.linkedin.com/in/zewdu-taye-54b1b8366",
    github: "https://github.com/Zewdutaye",
    telegram: "https://t.me/ZiDOscar123",
    twitter: "https://x.com",
  },
} as const;

const NAV_ITEMS = [
  { id: "about", label: "ABOUT", icon: User },
  { id: "experience", label: "EXPERIENCE", icon: Briefcase },
  { id: "portfolio", label: "PORTFOLIO", icon: FolderGit2 },
  { id: "skills", label: "SKILLS", icon: Wrench },
  { id: "awards", label: "AWARDS", icon: Award },
  { id: "contact", label: "CONTACT", icon: Mail },
] as const;

type NavTab = (typeof NAV_ITEMS)[number]["id"];

const EXPERIENCES = [
  {
    company: "TECH CORP ETHIOPIA",
    period: "2024 - PRESENT",
    role: "Senior Full-Stack Engineer",
    description:
      "Architecting distributed microservices, Next.js web applications, and automated deployment pipelines.",
  },
  {
    company: "INNOVATE LABS",
    period: "2022 - 2024",
    role: "Software Developer & AI Specialist",
    description:
      "Integrated Machine Learning models into cloud applications and built responsive frontend dashboards.",
  },
] as const;

const SKILL_CATEGORIES = [
  {
    icon: Code,
    title: "Full-Stack Development",
    skills: "React, Next.js, TypeScript, Node.js, Tailwind CSS, REST & GraphQL APIs",
  },
  {
    icon: Cpu,
    title: "AI & Data Science",
    skills: "Python, PyTorch, Scikit-Learn, Pandas, Computer Vision, Model Deployment",
  },
  {
    icon: Layers,
    title: "DevOps & Cloud",
    skills: "Docker, Git, CI/CD Pipelines, PostgreSQL, Supabase, Vercel",
  },
] as const;

const AWARDS = [
  {
    title: "National Tech Innovation Award",
    organization: "Ministry of Innovation & Technology",
    year: "2025",
  },
  {
    title: "1st Place Hackathon Winner",
    organization: "Addis Developer Summit",
    year: "2024",
  },
] as const;

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<NavTab>("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedImgIndex, setSelectedImgIndex] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const isProgrammaticScroll = useRef(false);

  const galleryImages = useMemo(() => Array.from({ length: 8 }, (_, i) => `/${i + 1}.jpg`), []);

  // --- OPTIMIZED RIPPLE THEME TOGGLE WITH REQUESTANIMATIONFRAME ---
  const toggleThemeWithRipple = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (typeof window === "undefined") return;

      if ("vibrate" in navigator) {
        navigator.vibrate(15);
      }

      const x = e.clientX;
      const y = e.clientY;

      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const isTurningOff = darkMode;

      if ("startViewTransition" in document) {
        requestAnimationFrame(() => {
          if (isTurningOff) {
            document.documentElement.classList.add("theme-turning-off");
          } else {
            document.documentElement.classList.remove("theme-turning-off");
          }

          const transition = (
            document as unknown as {
              startViewTransition: (cb: () => void) => { ready: Promise<void> };
            }
          ).startViewTransition(() => {
            setDarkMode((prev) => !prev);
          });

          transition.ready.then(() => {
            requestAnimationFrame(() => {
              const animation = document.documentElement.animate(
                {
                  clipPath: isTurningOff
                    ? [
                        `circle(${endRadius}px at ${x}px ${y}px)`,
                        `circle(0px at ${x}px ${y}px)`,
                      ]
                    : [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${endRadius}px at ${x}px ${y}px)`,
                      ],
                },
                {
                  duration: 500,
                  easing: "ease-in-out",
                  pseudoElement: isTurningOff
                    ? "::view-transition-old(root)"
                    : "::view-transition-new(root)",
                }
              );

              animation.onfinish = () => {
                document.documentElement.classList.remove("theme-turning-off");
              };
            });
          });
        });
      } else {
        requestAnimationFrame(() => {
          setDarkMode((prev) => !prev);
        });
      }
    },
    [darkMode]
  );

  // --- PROGRAMMATIC SCROLLING TO PREVENT TAB FLICKER ---
  const scrollToSection = useCallback((id: NavTab) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    isProgrammaticScroll.current = true;

    const element = document.getElementById(id);
    if (element) {
      // Adjusted offset for mobile header
      const yOffset = -60; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 800);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
  }, [mobileMenuOpen]);

  // --- ACCURATE INTERSECTION OBSERVER ---
  useEffect(() => {
    const mainContainer = mainContainerRef.current;
    if (!mainContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;

        let maxRatio = 0;
        let visibleSection: NavTab | null = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            visibleSection = entry.target.id as NavTab;
          }
        });

        if (visibleSection) {
          setActiveTab(visibleSection);
        }
      },
      { root: null, rootMargin: "-20% 0px -60% 0px", threshold: [0.1, 0.5] } // Adjusted for window scroll
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // --- GALLERY MODAL KEYBOARD NAVIGATION ---
  const handleNextImage = useCallback(() => {
    setSelectedImgIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
  }, [galleryImages.length]);

  const handlePrevImage = useCallback(() => {
    setSelectedImgIndex((prev) =>
      prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
    );
  }, [galleryImages.length]);

  useEffect(() => {
    if (selectedImgIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImgIndex(null);
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImgIndex, handleNextImage, handlePrevImage]);

  // --- FORM SUBMISSION ---
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY",
          ...formData,
          subject: `Portfolio Message from ${formData.name}`,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setFormSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormSubmitted(false), 5000);
      }
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-[100dvh] md:h-screen w-full font-sans transition-colors duration-300 flex flex-col md:flex-row relative md:overflow-hidden ${
        darkMode
          ? "bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white"
          : "bg-white text-slate-800 selection:bg-sky-500 selection:text-white"
      }`}
    >
      <Analytics />

      {/* STATIC CSS FOR VIEW TRANSITION LAYER STACKING */}
      <style global jsx>{`
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
        ::view-transition-old(root) {
          z-index: 1;
        }
        ::view-transition-new(root) {
          z-index: 9999;
        }
        .theme-turning-off::view-transition-old(root) {
          z-index: 9999;
        }
        .theme-turning-off::view-transition-new(root) {
          z-index: 1;
        }
      `}</style>

      {/* MOBILE APP HEADER */}
      <header
        className={`md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between border-b backdrop-blur-xl transition-colors ${
          darkMode
            ? "bg-slate-950/90 border-slate-800/80 text-white"
            : "bg-white/90 border-slate-200/80 text-slate-900"
        }`}
      >
        <span className="font-black tracking-widest text-sm uppercase truncate max-w-[140px]">
          {PROFILE_DATA.name}{" "}
          <span className={darkMode ? "text-emerald-400" : "text-sky-500"}>
            {PROFILE_DATA.surname}
          </span>
        </span>
        
        <div className="flex items-center gap-1.5">
          {/* MOBILE THEME TOGGLE BUTTON */}
          <button
            onClick={toggleThemeWithRipple}
            aria-label="Toggle Theme Mode"
            className={`p-2.5 rounded-xl border transition-all active:scale-90 relative overflow-hidden ${
              darkMode
                ? "border-slate-800 bg-slate-900/60 text-amber-400"
                : "border-slate-200 bg-slate-50 text-slate-600"
            }`}
          >
            <motion.div
              key={darkMode ? "dark" : "light"}
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.div>
          </button>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className={`p-2.5 rounded-xl border transition-all active:scale-95 ${
              darkMode
                ? "border-slate-800 bg-slate-900/60 text-white"
                : "border-slate-200 bg-slate-50 text-slate-900"
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU DROPDOWN & OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`md:hidden fixed top-[57px] left-0 right-0 z-40 border-b shadow-2xl px-4 py-5 space-y-2 backdrop-blur-2xl ${
                darkMode ? "bg-slate-950/95 border-slate-800" : "bg-white/95 border-slate-200"
              }`}
            >
              <div className="space-y-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeTab === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border text-xs font-extrabold tracking-widest transition-all active:scale-[0.98] ${
                        isActive
                          ? darkMode
                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-sm"
                            : "border-sky-500 bg-sky-500/10 text-sky-500 shadow-sm"
                          : darkMode
                          ? "border-slate-800 bg-slate-900/40 text-slate-300"
                          : "border-slate-200 bg-slate-50/80 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-70" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside
        className={`hidden md:flex sticky top-0 left-0 z-40 h-screen flex-col items-center justify-between py-8 shrink-0 border-r transition-all duration-300 ease-in-out relative ${
          sidebarCollapsed ? "w-20 px-3" : "w-72 px-6"
        } ${
          darkMode
            ? "bg-slate-900/60 border-slate-800 text-slate-100"
            : "bg-slate-50/80 border-slate-200 text-slate-800"
        }`}
      >
        <button
          onClick={() => setSidebarCollapsed((prev) => !prev)}
          aria-label={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          className={`absolute -right-3.5 top-8 z-50 p-1.5 rounded-full border shadow-md transition-all duration-200 hover:scale-110 active:scale-95 ${
            darkMode
              ? "bg-slate-900 border-slate-700 text-slate-200 hover:text-emerald-400"
              : "bg-white border-slate-300 text-slate-700 hover:text-sky-600"
          }`}
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        <div className="flex flex-col items-center w-full">
          <div
            className={`relative rounded-full overflow-hidden border-4 shadow-lg shrink-0 transition-all duration-300 ${
              darkMode ? "border-emerald-500/30" : "border-sky-500/30"
            } ${sidebarCollapsed ? "w-10 h-10 mb-6 border-2" : "w-32 h-32 mb-8"}`}
          >
            <Image
              src={PROFILE_DATA.avatar}
              alt={PROFILE_DATA.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <nav
            className={`w-full rounded-2xl border backdrop-blur-md shadow-sm transition-all duration-300 ${
              sidebarCollapsed ? "p-1.5 space-y-2" : "p-2.5 space-y-1.5"
            } ${
              darkMode ? "bg-slate-950/80 border-slate-800/80" : "bg-white/90 border-slate-200/90"
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`w-full flex items-center rounded-xl border text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                    sidebarCollapsed ? "justify-center p-2.5" : "justify-between px-4 py-2.5"
                  } ${
                    isActive
                      ? darkMode
                        ? "border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                        : "border-sky-500 bg-sky-500 text-white shadow-md shadow-sky-500/20"
                      : darkMode
                      ? "border-slate-800/60 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800/60"
                      : "border-slate-200/60 bg-slate-50/50 text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-100/80"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={sidebarCollapsed ? "w-5 h-5" : "w-4 h-4"} />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </div>
                  {!sidebarCollapsed && (
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isActive ? "bg-white" : "bg-transparent"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            sidebarCollapsed ? "flex-col w-full gap-2" : "w-full"
          }`}
        >
          {!sidebarCollapsed && (
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href={PROFILE_DATA.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className={`p-2.5 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center ${
                  darkMode
                    ? "border-slate-800 bg-slate-950/80 text-slate-300 hover:text-emerald-400 hover:border-slate-700"
                    : "border-slate-200 bg-white text-slate-600 hover:text-sky-600 hover:border-slate-300"
                }`}
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href={PROFILE_DATA.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className={`p-2.5 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center ${
                  darkMode
                    ? "border-slate-800 bg-slate-950/80 text-slate-300 hover:text-emerald-400 hover:border-slate-700"
                    : "border-slate-200 bg-white text-slate-600 hover:text-sky-600 hover:border-slate-300"
                }`}
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href={PROFILE_DATA.socials.telegram}
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram Profile"
                className={`p-2.5 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center ${
                  darkMode
                    ? "border-slate-800 bg-slate-950/80 text-slate-300 hover:text-emerald-400 hover:border-slate-700"
                    : "border-slate-200 bg-white text-slate-600 hover:text-sky-600 hover:border-slate-300"
                }`}
              >
                <FaTelegram className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* DESKTOP THEME TOGGLE BUTTON */}
          <button
            onClick={toggleThemeWithRipple}
            aria-label="Toggle Theme Mode"
            className={`p-2.5 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-90 flex items-center justify-center relative overflow-hidden ${
              sidebarCollapsed ? "w-full" : "shrink-0"
            } ${
              darkMode
                ? "border-slate-800 bg-slate-950 text-amber-400 hover:bg-slate-800"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            <motion.div
              key={darkMode ? "dark" : "light"}
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </motion.div>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main
        ref={mainContainerRef}
        id="main-content"
        className="flex-1 h-full min-h-[100dvh] md:min-h-0 overflow-y-auto pt-[56px] md:pt-0 scroll-smooth w-full"
      >
        {/* HERO / ABOUT SECTION */}
        <section
          id="about"
          className="relative min-h-[calc(100dvh-56px)] md:min-h-[100dvh] flex items-center justify-start overflow-hidden border-b border-slate-200 dark:border-slate-800/80 px-5 sm:px-12 md:px-16 py-12 sm:py-16"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src={darkMode ? "/back1.jpg" : "/back7.jpg"}
              alt={`${PROFILE_DATA.name} Background`}
              fill
              className="object-cover object-center transition-all duration-500"
              priority
              sizes="100vw"
            />
            <div
              className={`absolute inset-0 transition-colors duration-300 ${
                darkMode
                  ? "bg-gradient-to-t md:bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/50 sm:to-transparent"
                  : "bg-gradient-to-t md:bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40 sm:to-transparent"
              }`}
            />
          </div>

          <div className="relative z-10 max-w-3xl space-y-6 text-white my-auto pt-6 md:pt-0">
            {/* MOBILE ONLY AVATAR IN FRONT */}
            <div className="md:hidden">
              <div
                className={`relative w-28 h-28 rounded-full overflow-hidden border-4 shadow-xl mb-4 ${
                  darkMode ? "border-emerald-500/40" : "border-sky-500/40"
                }`}
              >
                <Image
                  src={PROFILE_DATA.avatar}
                  alt={PROFILE_DATA.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-tight text-slate-100 drop-shadow-md">
                {PROFILE_DATA.name}{" "}
                <span className={darkMode ? "text-emerald-400 font-black" : "text-sky-400 font-black"}>
                  {PROFILE_DATA.surname}
                </span>
              </h1>
              <p
                className={`text-xs sm:text-sm font-mono tracking-wider font-bold uppercase drop-shadow ${
                  darkMode ? "text-emerald-400" : "text-sky-300"
                }`}
              >
                {PROFILE_DATA.role}
              </p>
            </div>

            <p className="text-slate-200 leading-relaxed text-sm sm:text-base drop-shadow-sm max-w-2xl">
              {PROFILE_DATA.bio}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={PROFILE_DATA.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className={`w-12 h-12 md:w-11 md:h-11 rounded-xl bg-slate-900/70 border border-slate-700/60 text-slate-200 flex items-center justify-center transition-all active:scale-95 shadow-md backdrop-blur-sm ${
                  darkMode
                    ? "hover:bg-emerald-500 hover:border-emerald-500 hover:text-white"
                    : "hover:bg-sky-500 hover:border-sky-500 hover:text-white"
                }`}
              >
                <FaLinkedinIn className="w-5 h-5 md:w-4 md:h-4" />
              </a>
              <a
                href={PROFILE_DATA.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className={`w-12 h-12 md:w-11 md:h-11 rounded-xl bg-slate-900/70 border border-slate-700/60 text-slate-200 flex items-center justify-center transition-all active:scale-95 shadow-md backdrop-blur-sm ${
                  darkMode
                    ? "hover:bg-emerald-500 hover:border-emerald-500 hover:text-white"
                    : "hover:bg-sky-500 hover:border-sky-500 hover:text-white"
                }`}
              >
                <FaGithub className="w-5 h-5 md:w-4 md:h-4" />
              </a>
              <a
                href={PROFILE_DATA.socials.telegram}
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className={`w-12 h-12 md:w-11 md:h-11 rounded-xl bg-slate-900/70 border border-slate-700/60 text-slate-200 flex items-center justify-center transition-all active:scale-95 shadow-md backdrop-blur-sm ${
                  darkMode
                    ? "hover:bg-emerald-500 hover:border-emerald-500 hover:text-white"
                    : "hover:bg-sky-500 hover:border-sky-500 hover:text-white"
                }`}
              >
                <FaTelegram className="w-5 h-5 md:w-4 md:h-4" />
              </a>
              <a
                href={PROFILE_DATA.socials.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className={`w-12 h-12 md:w-11 md:h-11 rounded-xl bg-slate-900/70 border border-slate-700/60 text-slate-200 flex items-center justify-center transition-all active:scale-95 shadow-md backdrop-blur-sm ${
                  darkMode
                    ? "hover:bg-emerald-500 hover:border-emerald-500 hover:text-white"
                    : "hover:bg-sky-500 hover:border-sky-500 hover:text-white"
                }`}
              >
                <FaXTwitter className="w-5 h-5 md:w-4 md:h-4" />
              </a>
            </div>

            <div className="pt-4">
              <a
                href={PROFILE_DATA.cvPath}
                download
                className={`w-full sm:w-auto inline-flex items-center justify-center space-x-2 text-white text-sm md:text-xs font-bold uppercase tracking-wider px-8 py-4 md:py-3.5 rounded-xl shadow-lg transition-all active:scale-95 ${
                  darkMode
                    ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/25"
                    : "bg-sky-500 hover:bg-sky-600 shadow-sky-500/25"
                }`}
              >
                <Download className="w-5 h-5 md:w-4 md:h-4" />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section
          id="experience"
          className="p-5 sm:p-12 md:p-16 max-w-4xl space-y-6 sm:space-y-8 border-b border-slate-200 dark:border-slate-800/80"
        >
          <h2 className="text-xl sm:text-3xl font-extrabold uppercase tracking-wider">
            Experience
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {EXPERIENCES.map((exp, idx) => (
              <div
                key={idx}
                className={`p-5 sm:p-6 rounded-2xl border shadow-sm space-y-2 transition-all ${
                  darkMode
                    ? "bg-slate-900/60 border-slate-800 hover:border-emerald-500/50"
                    : "bg-white border-slate-200 hover:border-sky-300"
                }`}
              >
                <div
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono font-bold ${
                    darkMode ? "text-emerald-400" : "text-sky-500"
                  }`}
                >
                  <span>{exp.company}</span>
                  <span className="text-slate-400 font-normal sm:font-bold">{exp.period}</span>
                </div>
                <h3 className="font-bold text-base sm:text-lg">{exp.role}</h3>
                <p
                  className={`text-sm leading-relaxed ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section
          id="portfolio"
          className="p-5 sm:p-12 md:p-16 space-y-6 sm:space-y-8 border-b border-slate-200 dark:border-slate-800/80"
        >
          <h2 className="text-xl sm:text-3xl font-extrabold uppercase tracking-wider">
            Portfolio
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {galleryImages.map((imgPath, index) => (
              <div
                key={index}
                onClick={() => setSelectedImgIndex(index)}
                className={`relative aspect-square rounded-2xl overflow-hidden border cursor-pointer group shadow-sm active:scale-95 transition-transform ${
                  darkMode ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-slate-100"
                }`}
              >
                <Image
                  src={imgPath}
                  alt={`Project ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="w-6 h-6 text-white" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section
          id="skills"
          className="p-5 sm:p-12 md:p-16 max-w-5xl space-y-6 sm:space-y-8 border-b border-slate-200 dark:border-slate-800/80"
        >
          <h2 className="text-xl sm:text-3xl font-extrabold uppercase tracking-wider">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className={`p-5 sm:p-6 rounded-2xl border shadow-sm space-y-3 transition-all ${
                    darkMode
                      ? "bg-slate-900/60 border-slate-800 hover:border-emerald-500/50"
                      : "bg-white border-slate-200 hover:border-sky-300"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    darkMode ? "bg-emerald-500/10 text-emerald-400" : "bg-sky-500/10 text-sky-500"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base">{cat.title}</h3>
                  <p className={`text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                    {cat.skills}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* AWARDS SECTION */}
        <section
          id="awards"
          className="p-5 sm:p-12 md:p-16 max-w-4xl space-y-6 sm:space-y-8 border-b border-slate-200 dark:border-slate-800/80"
        >
          <h2 className="text-xl sm:text-3xl font-extrabold uppercase tracking-wider">
            Awards
          </h2>
          <div className="space-y-4">
            {AWARDS.map((award, idx) => (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm transition-all ${
                  darkMode
                    ? "bg-slate-900/60 border-slate-800 hover:border-emerald-500/50"
                    : "bg-white border-slate-200 hover:border-sky-300"
                }`}
              >
                <div>
                  <h3 className="font-bold text-base">{award.title}</h3>
                  <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                    {award.organization}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold w-fit ${
                  darkMode ? "bg-emerald-500/10 text-emerald-400" : "bg-sky-500/10 text-sky-500"
                }`}>
                  {award.year}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section
          id="contact"
          className="p-5 sm:p-12 md:p-16 max-w-3xl space-y-6 sm:space-y-8 pb-24"
        >
          <h2 className="text-xl sm:text-3xl font-extrabold uppercase tracking-wider">
            Contact
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all ${
                  darkMode
                    ? "bg-slate-900/60 border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 placeholder:text-slate-500"
                    : "bg-slate-50 border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 placeholder:text-slate-400"
                }`}
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all ${
                  darkMode
                    ? "bg-slate-900/60 border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 placeholder:text-slate-500"
                    : "bg-slate-50 border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 placeholder:text-slate-400"
                }`}
              />
            </div>
            <textarea
              placeholder="Your Message..."
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full px-4 py-3.5 rounded-xl border outline-none resize-none transition-all ${
                darkMode
                  ? "bg-slate-900/60 border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 placeholder:text-slate-500"
                  : "bg-slate-50 border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 placeholder:text-slate-400"
              }`}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto inline-flex items-center justify-center space-x-2 text-white font-bold uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-70 ${
                darkMode
                  ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/25"
                  : "bg-sky-500 hover:bg-sky-600 shadow-sky-500/25"
              }`}
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : formSubmitted ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span>{formSubmitted ? "Sent!" : "Send Message"}</span>
            </button>
          </form>
        </section>
      </main>

      {/* GALLERY LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImgIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          >
            <button
              onClick={() => setSelectedImgIndex(null)}
              className="absolute top-6 right-6 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrevImage}
              className="absolute left-4 md:left-12 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full max-w-4xl max-h-[85vh] aspect-video md:aspect-auto md:h-[80vh] mx-4">
              <Image
                src={galleryImages[selectedImgIndex]}
                alt={`Expanded Project ${selectedImgIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            <button
              onClick={handleNextImage}
              className="absolute right-4 md:right-12 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}