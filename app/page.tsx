"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/next";
import {
  Star,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
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
  CheckCircle2,
  Loader2,
  Gamepad2,
  BookOpen,
  Film,
  GraduationCap,
} from "lucide-react";
import { FaLinkedinIn, FaGithub, FaTelegram, FaWhatsapp, FaFacebook, FaLinkedin } from "react-icons/fa6";


// Combined list of all certificates for seamless lightbox navigation
const ALL_CERTIFICATES = [
  {
    id: "fc1",
    title: "International Youth Fellowship Academy (Korea)",
    image: "/certificates/cc1.jpg",
    icon: "/certificates/ccc1.jpg",
    link: "https://www.iyf.org/",
    organization: "IYF Academy",
    isFeatured: true,
  },
  {
    id: "fc2",
    title: "Diploma for Web Design",
    image: "/certificates/cc2.jpg",
    icon: "/certificates/ccc2.jpg",
    link: "https://study.moe.gov.et/",
    organization: "Ministry of Education",
    isFeatured: true,
  },
  ...Array.from({ length: 23 }, (_, i) => ({
    id: `c${i + 1}`,
    title: `Certificate ${i + 1}`,
    image: `/certificates/c${i + 1}.jpg`,
    icon: null,
    link: null,
    organization: "Verified Credential",
    isFeatured: false,
  })),
] as const;

const FEATURED_CERTIFICATES = ALL_CERTIFICATES.filter((c) => c.isFeatured);
const CERTIFICATE_GALLERY = ALL_CERTIFICATES.filter((c) => !c.isFeatured);





const EXPERIENCES = [
  {
    type: "education",
    company: "Addis Ketema General Secondary School",
    role: "Grade 12 – Natural Science",
    period: "2024 – 2026",
    description:
      "Completed secondary education with a strong interest in Mathematics, Physics, Chemistry, technology and computer science.",
    logo: "/school.jpg",
    link: "https://addisketema.sims.addislearning.edu.et/",
  },
  {
    type: "learning",
    company: "Self-Learning",
    role: "Programming & Web Development",
    period: "2025 – Present",
    description:
      "Learning Python, HTML, CSS, JavaScript and modern web development through practical projects.",
    logo: null,
    link: null,
  },
  {
    type: "projects",
    company: "Personal Projects",
    role: "Technology Projects",
    period: "Ongoing",
    description:
      "Building practical software and web projects to improve programming skills and solve real-world problems.",
    logo: null,
    link: null,
  },
] as const;






const PROJECTS_LIST = [
  {
    id: "01",
    title: "Ethiopian Quiz Game",
    description:
      "An interactive quiz game about Ethiopian culture, history and general knowledge with scoring and question randomization.",
    tags: ["Python", "Game"],
    icon: Gamepad2,
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: "02",
    title: "Library Management System",
    description:
      "A modern library management interface for organizing books, members, borrowing and returning activities.",
    tags: ["HTML", "CSS", "JavaScript"],
    icon: BookOpen,
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: "03",
    title: "Movie Explorer",
    description:
      "A movie discovery application that allows users to search for movies and explore information through a modern interface.",
    tags: ["React", "API"],
    icon: Film,
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: "04",
    title: "School Website Project",
    description:
      "A responsive website concept designed to provide students and teachers with useful school information.",
    tags: ["HTML", "CSS"],
    icon: GraduationCap,
    github: "https://github.com",
    demo: "https://demo.com",
  },
] as const;




const SKILLS_LIST = [
  {
    name: "Python",
    description: "Programming, logic, games, and problem solving.",
    level: 85,
  },
  {
    name: "HTML",
    description: "Building structured and accessible websites.",
    level: 90,
  },
  {
    name: "CSS",
    description: "Modern responsive layouts and animations.",
    level: 85,
  },
  {
    name: "JavaScript",
    description: "Interactive and dynamic web experiences.",
    level: 70,
  },
  {
    name: "Git & GitHub",
    description: "Version control and project collaboration.",
    level: 70,
  },
  {
    name: "Web Development",
    description: "Creating responsive modern websites.",
    level: 80,
  },
] as const;


// --- CONFIGURATION & DATA ---
const PROFILE_DATA = {
  name: "Zewdu.T",
  surname: "Birhanu",
  role: "Student & Aspiring Software Developer",
  bio: "I am a Grade 12 student passionate about technology, programming, artificial intelligence, and building meaningful digital solutions that solve real-world problems.",
  avatar: "/profile3.jpg",
  cvPath: "cv.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/zewdu-taye-54b1b8366",
    github: "https://github.com/Zewdutaye",
    telegram: "https://t.me/ZiDOscar123",
    twitter: "https://x.com",
  },
} as const;

const NAV_ITEMS = [
  { id: "about", label: "Home", icon: Star },
  { id: "about-me", label: "About", icon: User },
  { id: "experience", label: "EXPERIENCE", icon: Briefcase },
  { id: "portfolio", label: "Projects", icon: FolderGit2 },
  { id: "skills", label: "SKILLS", icon: Wrench },
  { id: "awards", label: "AWARDS", icon: Award },
  { id: "contact", label: "CONTACT", icon: Mail },
] as const;

type NavTab = (typeof NAV_ITEMS)[number]["id"];

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




  // Inside your component function:
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeCert = lightboxIndex !== null ? ALL_CERTIFICATES[lightboxIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : ALL_CERTIFICATES.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! < ALL_CERTIFICATES.length - 1 ? prev! + 1 : 0));
    }
  };


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

  // --- DYNAMIC POSITION-AWARE RIPPLE THEME TOGGLE ---
  const toggleThemeWithRipple = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (typeof window === "undefined") return;

      if ("vibrate" in navigator) {
        navigator.vibrate(15);
      }

      // Calculate center of clicked element dynamically
      let x = window.innerWidth / 2;
      let y = window.innerHeight / 2;

      if (e && e.currentTarget) {
        const rect = e.currentTarget.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      } else if (e && typeof e.clientX === "number" && (e.clientX !== 0 || e.clientY !== 0)) {
        x = e.clientX;
        y = e.clientY;
      }

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
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 800);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
  }, [mobileMenuOpen]);

  // --- ACCURATE DUAL INTERSECTION OBSERVER ---
  useEffect(() => {
    const mainContainer = mainContainerRef.current;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
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
    };

    const containerObserver = new IntersectionObserver(handleIntersect, {
      root: mainContainer,
      threshold: [0.2, 0.5],
    });

    const windowObserver = new IntersectionObserver(handleIntersect, {
      root: null,
      threshold: [0.2, 0.5],
    });

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) {
        containerObserver.observe(el);
        windowObserver.observe(el);
      }
    });

    return () => {
      containerObserver.disconnect();
      windowObserver.disconnect();
    };
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
      className={`min-h-[100dvh] md:h-screen w-full font-sans transition-colors duration-300 flex flex-col md:flex-row relative md:overflow-hidden ${darkMode
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
        className={`md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between border-b backdrop-blur-xl transition-colors ${darkMode
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
            className={`p-2.5 rounded-xl border transition-all active:scale-90 relative overflow-hidden ${darkMode
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
            className={`p-2.5 rounded-xl border transition-all active:scale-95 ${darkMode
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
              className={`md:hidden fixed top-[57px] left-0 right-0 z-40 border-b shadow-2xl px-4 py-5 space-y-2 backdrop-blur-2xl ${darkMode ? "bg-slate-950/95 border-slate-800" : "bg-white/95 border-slate-200"
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
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border text-xs font-extrabold tracking-widest transition-all active:scale-[0.98] ${isActive
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
        className={`hidden md:flex sticky top-0 left-0 z-40 h-screen flex-col items-center justify-between py-8 shrink-0 border-r transition-all duration-300 ease-in-out relative ${sidebarCollapsed ? "w-20 px-3" : "w-72 px-6"
          } ${darkMode
            ? "bg-slate-900/60 border-slate-800 text-slate-100"
            : "bg-slate-50/80 border-slate-200 text-slate-800"
          }`}
      >
        <button
          onClick={() => setSidebarCollapsed((prev) => !prev)}
          aria-label={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          className={`absolute -right-3.5 top-8 z-50 p-1.5 rounded-full border shadow-md transition-all duration-200 hover:scale-110 active:scale-95 ${darkMode
            ? "bg-slate-900 border-slate-700 text-slate-200 hover:text-emerald-400"
            : "bg-white border-slate-300 text-slate-700 hover:text-sky-600"
            }`}
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        <div className="flex flex-col items-center w-full">
          <div
            className={`relative rounded-full overflow-hidden border-4 shadow-lg shrink-0 transition-all duration-300 ${darkMode ? "border-emerald-500/30" : "border-sky-500/30"
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
            className={`w-full rounded-2xl border backdrop-blur-md shadow-sm transition-all duration-300 ${sidebarCollapsed ? "p-1.5 space-y-2" : "p-2.5 space-y-1.5"
              } ${darkMode ? "bg-slate-950/80 border-slate-800/80" : "bg-white/90 border-slate-200/90"
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
                  className={`w-full flex items-center rounded-xl border text-xs font-bold tracking-wider uppercase transition-all duration-200 ${sidebarCollapsed ? "justify-center p-2.5" : "justify-between px-4 py-2.5"
                    } ${isActive
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
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? "bg-white" : "bg-transparent"
                        }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div
          className={`flex items-center justify-between transition-all duration-300 ${sidebarCollapsed ? "flex-col w-full gap-2" : "w-full"
            }`}
        >
          {!sidebarCollapsed && (
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href={PROFILE_DATA.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className={`p-2.5 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center ${darkMode
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
                className={`p-2.5 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center ${darkMode
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
                className={`p-2.5 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center ${darkMode
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
            className={`p-2.5 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-90 flex items-center justify-center relative overflow-hidden ${sidebarCollapsed ? "w-full" : "shrink-0"
              } ${darkMode
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
          className="relative min-h-[calc(100dvh-56px)] md:min-h-[100dvh] flex items-center justify-start overflow-hidden border-b border-slate-200 dark:border-slate-800/80 px-5 sm:px-12 md:px-16 py-12 sm:py-16 w-full"
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
              className={`absolute inset-0 transition-colors duration-300 ${darkMode
                ? "bg-gradient-to-t md:bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/50 sm:to-transparent"
                : "bg-gradient-to-t md:bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40 sm:to-transparent"
                }`}
            />
          </div>

          <div className="relative z-10 max-w-6xl w-full mx-auto space-y-6 text-white my-auto pt-6 md:pt-0">
            {/* MOBILE ONLY AVATAR IN FRONT */}
            <div className="md:hidden">
              <div
                className={`relative w-28 h-28 rounded-full overflow-hidden border-4 shadow-xl mb-4 ${darkMode ? "border-emerald-500/40" : "border-sky-500/40"
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
                className={`text-xs sm:text-sm font-mono tracking-wider font-bold uppercase drop-shadow ${darkMode ? "text-emerald-400" : "text-sky-300"
                  }`}
              >
                {PROFILE_DATA.role}
              </p>
            </div>

            <p className="text-slate-200 leading-relaxed text-sm sm:text-base drop-shadow-sm max-w-2xl">
              {PROFILE_DATA.bio}
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={PROFILE_DATA.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className={`w-12 h-12 md:w-11 md:h-11 rounded-xl bg-slate-900/70 border border-slate-700/60 text-slate-200 flex items-center justify-center transition-all active:scale-95 shadow-md backdrop-blur-sm ${darkMode
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
                className={`w-12 h-12 md:w-11 md:h-11 rounded-xl bg-slate-900/70 border border-slate-700/60 text-slate-200 flex items-center justify-center transition-all active:scale-95 shadow-md backdrop-blur-sm ${darkMode
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
                className={`w-12 h-12 md:w-11 md:h-11 rounded-xl bg-slate-900/70 border border-slate-700/60 text-slate-200 flex items-center justify-center transition-all active:scale-95 shadow-md backdrop-blur-sm ${darkMode
                  ? "hover:bg-emerald-500 hover:border-emerald-500 hover:text-white"
                  : "hover:bg-sky-500 hover:border-sky-500 hover:text-white"
                  }`}
              >
                <FaTelegram className="w-5 h-5 md:w-4 md:h-4" />
              </a>
              <a
                href="https://wa.me/251930417397"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className={`w-12 h-12 md:w-11 md:h-11 rounded-xl bg-slate-900/70 border border-slate-700/60 text-slate-200 flex items-center justify-center transition-all active:scale-95 shadow-md backdrop-blur-sm ${darkMode
                  ? "hover:bg-emerald-500 hover:border-emerald-500 hover:text-white"
                  : "hover:bg-sky-500 hover:border-sky-500 hover:text-white"
                  }`}
              >
                <FaWhatsapp className="w-5 h-5 md:w-4 md:h-4" />
              </a>
            </div>

            {/* CTA BUTTONS */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => scrollToSection("portfolio")}
                className={`inline-flex items-center justify-center space-x-2.5 text-white text-sm md:text-xs font-extrabold uppercase tracking-wider px-8 py-4 md:py-3.5 rounded-xl shadow-lg transition-all duration-200 active:scale-95 group ${darkMode
                  ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/25"
                  : "bg-sky-500 hover:bg-sky-600 shadow-sky-500/25"
                  }`}
              >
                <FolderGit2 className="w-5 h-5 md:w-4 md:h-4 transition-transform group-hover:scale-110" />
                <span>View My Projects</span>
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className={`inline-flex items-center justify-center space-x-2 text-sm md:text-xs font-bold uppercase tracking-wider px-8 py-4 md:py-3.5 rounded-xl border backdrop-blur-sm transition-all active:scale-95 ${darkMode
                  ? "bg-slate-900/80 border-slate-700/80 text-white hover:bg-slate-800 hover:border-emerald-500/50"
                  : "bg-white/90 border-slate-200/90 text-slate-800 hover:bg-slate-100 hover:border-sky-500/50"
                  }`}
              >
                <Mail className="w-5 h-5 md:w-4 md:h-4" />
                <span>Contact</span>
              </button>
            </div>
          </div>
        </section>


        {/* ABOUT ME DETAILED SECTION */}
        <section
          id="about-me"
          className="p-5 sm:p-12 md:p-16 min-h-[calc(100dvh-56px)] md:min-h-screen flex flex-col justify-center w-full border-b border-slate-200 dark:border-slate-800/80"
        >
          <div className="max-w-6xl w-full mx-auto space-y-8 sm:space-y-12">
            {/* SECTION HEADER */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-3xl font-extrabold uppercase tracking-wider">
                About Me
              </h2>
              <p
                className={`text-lg sm:text-xl font-bold ${darkMode ? "text-emerald-400" : "text-sky-500"
                  }`}
              >
                Turning curiosity into technology.
              </p>
            </div>

            {/* CONTENT & HIGHLIGHTS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* BIO PARAGRAPHS & DOWNLOAD CV BUTTON */}
              <div className="lg:col-span-7 space-y-6">
                <div
                  className={`space-y-4 text-sm sm:text-base leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                >
                  <p>
                    I'm a Grade 12 student from Ethiopia studying in the Natural Science stream. My curiosity for how things work led me to computer science, where I discovered a deep passion for programming, artificial intelligence, and web development.
                  </p>
                  <p>
                    I enjoy solving problems with clean code, exploring STEM concepts, and building projects that combine creativity with logic. My goal is to use technology to create meaningful solutions — from educational tools for Ethiopian students to intelligent systems that improve everyday life.
                  </p>
                  <p>
                    When I'm not coding, I'm learning about AI, contributing to technology communities, and preparing myself for a future in software engineering and computer science.
                  </p>
                </div>

                {/* DOWNLOAD CV BUTTON */}
                <div className="pt-2">
                  <a
                    href={PROFILE_DATA.cvPath}
                    download
                    className={`inline-flex items-center justify-center space-x-2.5 text-white text-sm md:text-xs font-bold uppercase tracking-wider px-8 py-4 md:py-3.5 rounded-xl shadow-lg transition-all active:scale-95 group ${darkMode
                      ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/25"
                      : "bg-sky-500 hover:bg-sky-600 shadow-sky-500/25"
                      }`}
                  >
                    <Download className="w-5 h-5 md:w-4 md:h-4 transition-transform group-hover:-translate-y-0.5" />
                    <span>Download CV</span>
                  </a>
                </div>
              </div>

              {/* STATS / HIGHLIGHT CARDS */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                {/* PROJECTS */}
                <div
                  className={`p-5 rounded-2xl border flex flex-col justify-between space-y-2 transition-all ${darkMode
                    ? "bg-slate-900/60 border-slate-800 hover:border-emerald-500/40"
                    : "bg-white border-slate-200 hover:border-sky-300"
                    }`}
                >
                  <span
                    className={`text-3xl sm:text-4xl font-black ${darkMode ? "text-emerald-400" : "text-sky-500"
                      }`}
                  >
                    5+
                  </span>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider opacity-80">
                    Projects
                  </span>
                </div>

                {/* TECHNOLOGIES */}
                <div
                  className={`p-5 rounded-2xl border flex flex-col justify-between space-y-2 transition-all ${darkMode
                    ? "bg-slate-900/60 border-slate-800 hover:border-emerald-500/40"
                    : "bg-white border-slate-200 hover:border-sky-300"
                    }`}
                >
                  <span
                    className={`text-3xl sm:text-4xl font-black ${darkMode ? "text-emerald-400" : "text-sky-500"
                      }`}
                  >
                    3+
                  </span>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider opacity-80">
                    Technologies
                  </span>
                </div>

                {/* EDUCATION */}
                <div
                  className={`p-5 rounded-2xl border flex flex-col justify-between space-y-2 transition-all ${darkMode
                    ? "bg-slate-900/60 border-slate-800 hover:border-emerald-500/40"
                    : "bg-white border-slate-200 hover:border-sky-300"
                    }`}
                >
                  <span
                    className={`text-2xl sm:text-3xl font-black ${darkMode ? "text-emerald-400" : "text-sky-500"
                      }`}
                  >
                    Grade 12
                  </span>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider opacity-80">
                    Education
                  </span>
                </div>

                {/* CURIOSITY */}
                <div
                  className={`p-5 rounded-2xl border flex flex-col justify-between space-y-2 transition-all ${darkMode
                    ? "bg-slate-900/60 border-slate-800 hover:border-emerald-500/40"
                    : "bg-white border-slate-200 hover:border-sky-300"
                    }`}
                >
                  <span
                    className={`text-3xl sm:text-4xl font-black ${darkMode ? "text-emerald-400" : "text-sky-500"
                      }`}
                  >
                    ∞
                  </span>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider opacity-80">
                    Curiosity
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* EDUCATION & EXPERIENCE SECTION */}
        <section
          id="experience"
          className="p-5 sm:p-12 md:p-16 min-h-[calc(100dvh-56px)] md:min-h-screen flex flex-col justify-center w-full border-b border-slate-200 dark:border-slate-800/80"
        >
          <div className="max-w-6xl w-full mx-auto space-y-8 sm:space-y-12">
            {/* SECTION HEADER */}
            <div className="space-y-2">
              <span
                className={`text-xs sm:text-sm font-mono font-bold tracking-widest uppercase ${darkMode ? "text-emerald-400" : "text-sky-600"
                  }`}
              >
                MY JOURNEY
              </span>
              <h2
                className={`text-2xl sm:text-4xl font-extrabold uppercase tracking-wider ${darkMode ? "text-white" : "text-slate-900"
                  }`}
              >
                Education &amp; Experience
              </h2>
            </div>

            {/* TIMELINE / EXPERIENCE CARDS */}
            <div className="space-y-4 sm:space-y-6">
              {EXPERIENCES.map((exp, idx) => (
                <div
                  key={idx}
                  className={`p-6 sm:p-8 rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 ${darkMode
                    ? "bg-slate-900/60 border-slate-800 hover:border-emerald-500/40"
                    : "bg-white border-slate-200 hover:border-sky-300"
                    }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      {/* TOP HEADER & PERIOD */}
                      <div
                        className={`flex flex-wrap items-center gap-2 text-xs font-mono font-bold ${darkMode ? "text-emerald-400" : "text-sky-600"
                          }`}
                      >
                        <span className="text-sm font-extrabold">{exp.company}</span>
                        <span className={darkMode ? "text-slate-600" : "text-slate-300"}>
                          •
                        </span>
                        <span
                          className={darkMode ? "text-slate-400" : "text-slate-500"}
                        >
                          {exp.period}
                        </span>
                      </div>

                      {/* ROLE TITLE - HIGH VISIBILITY IN BOTH LIGHT & DARK MODES */}
                      <h3
                        className={`font-black text-lg sm:text-xl ${darkMode ? "text-slate-100" : "text-slate-950"
                          }`}
                      >
                        {exp.role}
                      </h3>

                      {/* DESCRIPTION */}
                      <p
                        className={`text-sm sm:text-base leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-700 font-medium"
                          }`}
                      >
                        {exp.description}
                      </p>
                    </div>

                    {/* SCHOOL LOGO LINK */}
                    {exp.logo && exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${exp.company} Portal`}
                        className={`shrink-0 p-2 rounded-2xl border flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group shadow-md ${darkMode
                          ? "bg-slate-950 border-slate-800 hover:border-emerald-500/50 shadow-emerald-500/10"
                          : "bg-slate-50 border-slate-200 hover:border-sky-500/50 shadow-sky-500/10"
                          }`}
                      >
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden">
                          <Image
                            src={exp.logo}
                            alt={`${exp.company} Logo`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* PORTFOLIO / PROJECTS SECTION */}
        <section
          id="portfolio"
          className="p-5 sm:p-12 md:p-16 min-h-[calc(100dvh-56px)] md:min-h-screen flex flex-col justify-center w-full border-b border-slate-200 dark:border-slate-800/80"
        >
          <div className="max-w-6xl w-full mx-auto space-y-8 sm:space-y-12">
            {/* SECTION HEADER */}
            <div className="space-y-2">
              <span
                className={`text-xs sm:text-sm font-mono font-bold tracking-widest uppercase ${darkMode ? "text-emerald-400" : "text-sky-500"
                  }`}
              >
                MY RECENT WORK
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-wider">
                Featured Project
              </h2>
            </div>

            {/* PROJECTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS_LIST.map((project) => {
                const IconComponent = project.icon;
                return (
                  <div
                    key={project.id}
                    className={`p-6 sm:p-8 rounded-2xl border shadow-sm flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 ${darkMode
                      ? "bg-slate-900/60 border-slate-800 hover:border-emerald-500/40"
                      : "bg-white border-slate-200 hover:border-sky-300"
                      }`}
                  >
                    <div className="space-y-4">
                      {/* TOP BAR: NUMBER & ICON */}
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-2xl font-mono font-black ${darkMode ? "text-slate-600" : "text-slate-300"
                            }`}
                        >
                          {project.id}
                        </span>
                        <div
                          className={`p-3 rounded-xl border ${darkMode
                            ? "bg-slate-950 border-slate-800 text-emerald-400"
                            : "bg-slate-50 border-slate-200 text-sky-500"
                            }`}
                        >
                          <IconComponent className="w-6 h-6" />
                        </div>
                      </div>

                      {/* TECH TAGS */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-bold uppercase tracking-wider ${darkMode
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-sky-500/10 text-sky-600 border border-sky-500/20"
                              }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* TITLE & DESCRIPTION */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-extrabold">{project.title}</h3>
                        <p
                          className={`text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"
                            }`}
                        >
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex items-center space-x-3 pt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all active:scale-95 ${darkMode
                          ? "bg-slate-950 border-slate-800 text-slate-200 hover:border-emerald-500/50 hover:text-emerald-400"
                          : "bg-slate-100 border-slate-200 text-slate-800 hover:border-sky-500/50 hover:text-sky-600"
                          }`}
                      >
                        <FaGithub className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>

                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-95 text-white shadow-md ${darkMode
                          ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20"
                          : "bg-sky-500 hover:bg-sky-600 shadow-sky-500/20"
                          }`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Demo</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {/* SKILLS & EXPERIENCE SECTION */}
        <section
          id="skills"
          className="p-5 sm:p-12 md:p-16 min-h-[calc(100dvh-56px)] md:min-h-screen flex flex-col justify-center w-full border-b border-slate-200 dark:border-slate-800/80"
        >
          <div className="max-w-6xl w-full mx-auto space-y-8 sm:space-y-12">
            {/* SECTION HEADER */}
            <div className="space-y-2">
              <span
                className={`text-xs sm:text-sm font-mono font-bold tracking-widest uppercase ${darkMode ? "text-emerald-400" : "text-sky-500"
                  }`}
              >
                WHAT I WORK WITH
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-wider">
                My Skills
              </h2>
            </div>
            {/* EAII INTERNSHIP HIGHLIGHT BANNER */}
            <div
              className={`p-6 sm:p-8 rounded-2xl border shadow-sm relative overflow-hidden transition-all ${darkMode
                ? "bg-slate-900/80 border-slate-800 hover:border-emerald-500/40"
                : "bg-slate-50 border-slate-200 hover:border-sky-300"
                }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${darkMode
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-sky-500/10 text-sky-600 border border-sky-500/20"
                        }`}
                    >
                      Student Intern
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-semibold">
                      EAII
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">
                    Student Intern at Ethiopian Artificial Intelligence Institute (EAII)
                  </h3>
                  <p
                    className={`text-sm leading-relaxed max-w-2xl ${darkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                  >
                    Working as a Machine Learning student intern and building practical software and AI projects to solve real-world problems.
                  </p>
                </div>

                {/* CLICKABLE LOGO LINK */}
                <a
                  href="https://aii.et"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Ethiopian Artificial Intelligence Institute Website"
                  className={`shrink-0 p-2.5 rounded-2xl border flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group ${darkMode
                    ? "bg-slate-950 border-slate-800 hover:border-emerald-500/50 shadow-emerald-500/10"
                    : "bg-white border-slate-200 hover:border-sky-500/50 shadow-sky-500/10"
                    } shadow-lg`}
                >
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden">
                    <Image
                      src="/EAII.jpg"
                      alt="EAII Logo"
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </a>
              </div>
            </div>
            {/* SKILLS GRID WITH PROGRESS BARS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKILLS_LIST.map((skill, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border shadow-sm space-y-4 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 ${darkMode
                    ? "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                    : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-lg sm:text-xl">
                        {skill.name}
                      </h3>
                      <span
                        className={`text-sm font-mono font-black ${darkMode ? "text-emerald-400" : "text-sky-500"
                          }`}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                    >
                      {skill.description}
                    </p>
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="w-full space-y-1 pt-2">
                    <div
                      className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? "bg-slate-800" : "bg-slate-100"
                        }`}
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${darkMode ? "bg-emerald-500" : "bg-sky-500"
                          }`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AWARDS & CERTIFICATES SECTION */}
        <section
          id="awards"
          className="p-5 sm:p-12 md:p-16 min-h-[calc(100dvh-56px)] md:min-h-screen flex flex-col justify-center w-full border-b border-slate-200 dark:border-slate-800/80 relative"
        >
          <div className="max-w-6xl w-full mx-auto space-y-10 sm:space-y-12">

            {/* SECTION HEADER */}
            <div className="space-y-2">
              <span
                className={`text-xs sm:text-sm font-mono font-bold tracking-widest uppercase ${darkMode ? "text-emerald-400" : "text-sky-500"
                  }`}
              >
                Awards
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-wider">
                Certificates &amp; Awards
              </h2>
            </div>

            {/* FEATURED TOP CERTIFICATES */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-600 dark:text-slate-400">
                Featured Credentials
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {FEATURED_CERTIFICATES.map((cert, idx) => (
                  <div
                    key={cert.id}
                    className="p-6 sm:p-8 rounded-2xl border shadow-sm flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 bg-white border-slate-200 hover:border-sky-300 dark:bg-slate-900/60 dark:border-slate-800 dark:hover:border-emerald-500/40"
                  >
                    <div className="space-y-4">
                      {/* TOP ROW: LOGO & EXTERNAL LINK */}
                      <div className="flex items-center justify-between">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
                          <Image
                            src={cert.icon!}
                            alt={`${cert.organization} Icon`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Visit ${cert.organization}`}
                            className="p-2.5 rounded-xl border transition-all duration-300 active:scale-95 bg-slate-50 border-slate-200 text-sky-600 hover:border-sky-500/50 dark:bg-slate-950 dark:border-slate-800 dark:text-emerald-400 dark:hover:border-emerald-500/50"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>

                      {/* TITLE & ORGANIZATION */}
                      <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-emerald-400">
                          {cert.organization}
                        </span>
                        <h4 className="font-black text-lg sm:text-xl mt-1 text-slate-950 dark:text-slate-100">
                          {cert.title}
                        </h4>
                      </div>
                    </div>

                    {/* PREVIEW IMAGE - CLICK TO OPEN LIGHTBOX */}
                    <div
                      onClick={() => setLightboxIndex(idx)}
                      className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group cursor-pointer"
                    >
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-mono text-xs gap-2">
                        <span>Click to View Fullscreen</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CERTIFICATE GALLERY GRID (c1.jpg to c19.jpg) */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-600 dark:text-slate-400">
                All Certifications ({CERTIFICATE_GALLERY.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                {CERTIFICATE_GALLERY.map((item, galleryIdx) => {
                  const absoluteIndex = FEATURED_CERTIFICATES.length + galleryIdx;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setLightboxIndex(absoluteIndex)}
                      className="group p-3 rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 bg-white border-slate-200 hover:border-sky-300 dark:bg-slate-900/60 dark:border-slate-800 dark:hover:border-emerald-500/40 cursor-pointer"
                    >
                      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-950">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-2.5 px-1 flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-300">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-sky-600 dark:bg-slate-800 dark:text-emerald-400">
                          Verified
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* FULL-SCREEN LIGHTBOX MODAL */}
          {lightboxIndex !== null && activeCert && (
            <div
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            >
              {/* TOP CONTROLS */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between text-white z-10">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs sm:text-sm bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                    {lightboxIndex + 1} / {ALL_CERTIFICATES.length}
                  </span>
                  <span className="hidden sm:inline font-mono text-xs text-slate-400">
                    {activeCert.organization} — {activeCert.title}
                  </span>
                </div>
                <button
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close modal"
                  className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* PREVIOUS BUTTON */}
              <button
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-3 sm:left-6 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 transition-all hover:scale-110 z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* LIGHTBOX IMAGE CONTAINER */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl h-[75vh] sm:h-[80vh] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl flex items-center justify-center"
              >
                <Image
                  src={activeCert.image}
                  alt={activeCert.title}
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>

              {/* NEXT BUTTON */}
              <button
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-3 sm:right-6 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 transition-all hover:scale-110 z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </section>

        {/* CONTACT SECTION */}
        <section
          id="contact"
          className="p-5 sm:p-12 md:p-16 min-h-[calc(100dvh-56px)] md:min-h-screen flex flex-col justify-center w-full border-b border-slate-200 dark:border-slate-800/80"
        >
          <div className="max-w-6xl w-full mx-auto space-y-10 sm:space-y-12">

            {/* SECTION HEADER */}
            <div className="space-y-2">
              <span
                className={`text-xs sm:text-sm font-mono font-bold tracking-widest uppercase ${darkMode ? "text-emerald-400" : "text-sky-500"
                  }`}
              >
                Get In Touch
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-wider">
                Let&apos;s Connect
              </h2>
              <p className={`text-sm sm:text-base max-w-xl leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                Have a question, collaboration proposal, or project idea? Send a message below or connect directly.
              </p>
            </div>

            {/* CONTACT CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* LEFT: DIRECT INFO & SOCIALS */}
              <div className="lg:col-span-5 space-y-6">

                {/* INFO CARD */}
                <div
                  className={`p-6 sm:p-8 rounded-2xl border shadow-sm space-y-6 ${darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
                    }`}
                >
                  <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-600 dark:text-slate-400">
                    Direct Channels
                  </h3>

                  <div className="space-y-4">
                    {/* LOCATION */}
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-3 rounded-xl border shrink-0 ${darkMode ? "bg-slate-950 border-slate-800 text-emerald-400" : "bg-slate-50 border-slate-200 text-sky-600"
                          }`}
                      >
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-slate-500 font-semibold block">Location</span>
                        <span className="font-bold text-sm sm:text-base text-slate-950 dark:text-slate-200">
                          Addis Ababa, Ethiopia
                        </span>
                      </div>
                    </div>

                    {/* EMAIL */}
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-3 rounded-xl border shrink-0 ${darkMode ? "bg-slate-950 border-slate-800 text-emerald-400" : "bg-slate-50 border-slate-200 text-sky-600"
                          }`}
                      >
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-xs font-mono text-slate-500 font-semibold block">Email</span>
                        <a
                          href="mailto:zewdu.t.birhanu16@gmail.com"
                          className="font-bold text-sm sm:text-base text-slate-950 dark:text-slate-200 hover:underline break-all"
                        >
                          zewdu.t.birhanu16@gmail.com
                        </a>
                      </div>
                    </div>

                    {/* PHONE / WHATSAPP */}
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-3 rounded-xl border shrink-0 ${darkMode ? "bg-slate-950 border-slate-800 text-emerald-400" : "bg-slate-50 border-slate-200 text-sky-600"
                          }`}
                      >
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-slate-500 font-semibold block">Phone / WhatsApp</span>
                        <a
                          href="https://wa.me/251930417397"
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-sm sm:text-base text-slate-950 dark:text-slate-200 hover:underline"
                        >
                          +251 930 417 397
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* SOCIAL PROFILES */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-3">
                    <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-600 dark:text-slate-400">
                      Social Profiles
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://web.facebook.com/zd.rich.1?rdid=xYD2khrCNTJyDt8h&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F19LiPiohzh%2F%3F_rdc%3D1%26_rdr#"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Facebook"
                        className={`p-3 rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95 ${darkMode
                            ? "bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400"
                            : "bg-slate-50 border-slate-200 text-slate-900 hover:border-sky-500/50 hover:text-sky-600"
                          }`}
                      >
                        <FaFacebook className="w-5 h-5" />
                      </a>
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        className={`p-3 rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95 ${darkMode
                            ? "bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400"
                            : "bg-slate-50 border-slate-200 text-slate-900 hover:border-sky-500/50 hover:text-sky-600"
                          }`}
                      >
                        <FaGithub className="w-5 h-5" />
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        className={`p-3 rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95 ${darkMode
                            ? "bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400"
                            : "bg-slate-50 border-slate-200 text-slate-900 hover:border-sky-500/50 hover:text-sky-600"
                          }`}
                      >
                        <FaLinkedin className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              {/* RIGHT: CONTACT FORM */}
              <div className="lg:col-span-7">
                <form
                  action="https://api.web3forms.com/submit"
                  method="POST"
                  className={`p-6 sm:p-8 rounded-2xl border shadow-sm space-y-5 ${darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
                    }`}
                >
                  {/* Web3Forms Access Key */}
                  <input type="hidden" name="access_key" value="4ba11614-c621-4cf1-813d-2bbc41b3235d" />

                  <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-600 dark:text-slate-400">
                    Send a Message
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        className={`w-full p-4 rounded-xl border text-sm outline-none transition-colors ${darkMode
                            ? "bg-slate-950 border-slate-800 text-white focus:border-emerald-500"
                            : "bg-slate-50 border-slate-300 text-slate-950 placeholder:text-slate-500 focus:border-sky-600"
                          }`}
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        className={`w-full p-4 rounded-xl border text-sm outline-none transition-colors ${darkMode
                            ? "bg-slate-950 border-slate-800 text-white focus:border-emerald-500"
                            : "bg-slate-50 border-slate-300 text-slate-950 placeholder:text-slate-500 focus:border-sky-600"
                          }`}
                      />
                    </div>

                    <div>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Your Message"
                        required
                        className={`w-full p-4 rounded-xl border text-sm outline-none transition-colors resize-none ${darkMode
                            ? "bg-slate-950 border-slate-800 text-white focus:border-emerald-500"
                            : "bg-slate-50 border-slate-300 text-slate-950 placeholder:text-slate-500 focus:border-sky-600"
                          }`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`w-full flex items-center justify-center space-x-2 p-4 rounded-xl font-bold text-sm text-white transition-all active:scale-95 shadow-lg ${darkMode
                        ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20"
                        : "bg-sky-600 hover:bg-sky-700 shadow-sky-600/20"
                      }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* GALLERY LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImgIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImgIndex(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedImgIndex(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-slate-800/80 text-white hover:bg-slate-700"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-6 p-3 rounded-full bg-slate-800/80 text-white hover:bg-slate-700"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div
              className="relative max-w-4xl max-h-[85vh] w-full h-full aspect-square"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selectedImgIndex]}
                alt="Selected Project"
                fill
                className="object-contain"
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-6 p-3 rounded-full bg-slate-800/80 text-white hover:bg-slate-700"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
