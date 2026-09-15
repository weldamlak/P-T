import React from 'react';
import Image from 'next/image';
import { FaLinkedinIn, FaGithub, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { FolderGit2, Download } from 'lucide-react';

interface ProfileData {
  name?: string;
  surname?: string;
  role?: string;
  bio?: string;
  avatar?: string;
  socials?: {
    linkedin?: string;
    github?: string;
    telegram?: string;
    [key: string]: any;
  };
  cvPath?: string;
  [key: string]: any;
}
interface AboutSectionProps {
  darkMode: boolean;
  profileData: ProfileData;
  scrollToSection: (sectionId: any) => void; 
}

export default function AboutSection({ darkMode, profileData, scrollToSection }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="relative h-auto md:h-[calc(100vh-56px)] min-h-[600px] flex items-center justify-start overflow-hidden border-b border-slate-200 dark:border-slate-800/80 px-5 sm:px-12 md:px-16 py-12 md:py-0 w-full"
    >
      {/* Background Image & Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={darkMode ? "/back1.jpg" : "/back7.jpg"}
          alt={`${profileData?.name || "Profile"} Background`}
          fill
          className="object-cover object-right transition-all duration-500"
          priority
          sizes="100vw"
        />
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            darkMode
              ? "bg-gradient-to-t md:bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/60 sm:to-slate-950/30"
              : "bg-gradient-to-t md:bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/50 sm:to-slate-900/20"
          }`}
        />
      </div>

      {/* Main Content Grid (Strict 12-column split layout) */}
      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-6 md:py-0 h-full">
        
        {/* Left Column: Text, Tickers & Action Buttons */}
        <div className="md:col-span-6 lg:col-span-7 space-y-6 text-white z-10">
          <div className="md:hidden">
            <div
              className={`relative w-28 h-28 rounded-full overflow-hidden border-4 shadow-xl mb-4 ${
                darkMode ? "border-emerald-500/40" : "border-sky-500/40"
              }`}
            >
              <Image
                src={profileData?.avatar || ""}
                alt={profileData?.name || "Avatar"}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-tight text-slate-100 drop-shadow-md">
              {profileData?.name}{" "}
              <span className={darkMode ? "text-emerald-400 font-black" : "text-sky-400 font-black"}>
                {profileData?.surname}
              </span>
            </h1>
            <p
              className={`text-xs sm:text-sm font-mono tracking-wider font-bold uppercase drop-shadow ${
                darkMode ? "text-emerald-400" : "text-sky-300"
              }`}
            >
              {profileData?.role}
            </p>
          </div>

          <p className="text-slate-200 leading-relaxed text-sm sm:text-base drop-shadow-sm max-w-xl">
            {profileData?.bio}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-1">
            {profileData?.socials?.linkedin && (
              <a
                href={profileData.socials.linkedin}
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
            )}
            {profileData?.socials?.github && (
              <a
                href={profileData.socials.github}
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
            )}
            {profileData?.socials?.telegram && (
              <a
                href={profileData.socials.telegram}
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
            )}
            <a
              href="https://wa.me/251930417397"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className={`w-12 h-12 md:w-11 md:h-11 rounded-xl bg-slate-900/70 border border-slate-700/60 text-slate-200 flex items-center justify-center transition-all active:scale-95 shadow-md backdrop-blur-sm ${
                darkMode
                  ? "hover:bg-emerald-500 hover:border-emerald-500 hover:text-white"
                  : "hover:bg-sky-500 hover:border-sky-500 hover:text-white"
              }`}
            >
              <FaWhatsapp className="w-5 h-5 md:w-4 md:h-4" />
            </a>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => scrollToSection("portfolio")}
              className={`inline-flex items-center justify-center space-x-2.5 text-white text-sm md:text-xs font-extrabold uppercase tracking-wider px-8 py-4 md:py-3.5 rounded-xl shadow-lg transition-all duration-200 active:scale-95 group ${
                darkMode
                  ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/25"
                  : "bg-sky-500 hover:bg-sky-600 shadow-sky-500/25"
              }`}
            >
              <FolderGit2 className="w-5 h-5 md:w-4 md:h-4 transition-transform group-hover:scale-110" />
              <span>View My Projects</span>
            </button>

            <a
              href="/cv.pdf"
              download="cv.pdf"
              className={`inline-flex items-center justify-center space-x-2 text-sm md:text-xs font-bold uppercase tracking-wider px-8 py-4 md:py-3.5 rounded-xl border backdrop-blur-sm transition-all active:scale-95 ${
                darkMode
                  ? "bg-slate-900/80 border-slate-700/80 text-white hover:bg-slate-800 hover:border-emerald-500/50"
                  : "bg-white/90 border-slate-200/90 text-slate-800 hover:bg-slate-100 hover:border-sky-500/50"
              }`}
            >
              <Download className="w-5 h-5 md:w-4 md:h-4" />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        {/* Right Column: Full-Height Profile Background Image */}
        <div className="hidden md:block md:col-span-6 lg:col-span-5 relative h-full min-h-[520px] pointer-events-none">
          <div 
            className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 bottom-12 right-12 ${
              darkMode ? "bg-emerald-500" : "bg-sky-500"
            }`} 
          />
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/profilebg.jpg"
              alt={`${profileData?.name || "Profile"} Body`}
              fill
              className="object-cover object-bottom drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
              priority
              sizes="(max-width: 1024px) 50vw, 40vw"
            />
          </div>
        </div>

      </div>
    </section>
  );
}