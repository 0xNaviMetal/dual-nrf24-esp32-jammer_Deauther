'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import {
  Cpu,
  Radio,
  Zap,
  Shield,
  Download,
  AlertTriangle,
  Wifi,
  Cable,
  ExternalLink,
  WifiOff,
  Code2,
} from 'lucide-react';

function GithubIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function LinkedinIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const SCHEMATIC_IMG =
  'https://dtvoeevhaseb5.cloudfront.net/user-uploads/a6485306-21dc-4e2c-9977-6e40962a2d6c.png';
const ADAPTER_IMG =
  'https://dtvoeevhaseb5.cloudfront.net/user-uploads/ca688d64-baf4-4d20-9909-5e2a3424ccbd.png';
const PINOUT_IMG =
  'https://dtvoeevhaseb5.cloudfront.net/user-uploads/13bb7cdb-1697-4d21-84c3-05bad46c5c45.png';
const CAPACITOR_IMG =
  'https://dtvoeevhaseb5.cloudfront.net/user-uploads/e4414855-03cc-4dd4-877a-6c0f3ca5b405.png';

const GITHUB_URL = 'https://github.com/0xNaviMetal';
const INSTAGRAM_URL = 'https://www.instagram.com/slimane_boucetta_hw/';
const LINKEDIN_URL = 'https://www.linkedin.com/in/slimane-boucetta';

const COMPONENTS = [
  { part: 'ESP32 DevKit V1', qty: '1', note: 'Any ESP32 with HSPI + VSPI' },
  { part: 'nRF24L01+PA+LNA', qty: '2', note: 'Extended range with SMA antenna' },
  { part: '10µF Capacitor', qty: '2', note: 'Across VCC/GND of each nRF module' },
  { part: 'nRF24L01 3.3V Adapter', qty: '2', note: 'Optional — recommended for stability' },
  { part: '18650 Li-ion Battery', qty: '1', note: '3.7V nominal' },
  { part: 'TP4056 Charger Module', qty: '1', note: 'Micro-USB charging' },
  { part: 'Jumper Wires', qty: '—', note: 'For connections' },
];

const HSPI_PINS = [
  { nrf: 'SCK', gpio: '14' },
  { nrf: 'MISO', gpio: '12' },
  { nrf: 'MOSI', gpio: '13' },
  { nrf: 'CSN (CS)', gpio: '15' },
  { nrf: 'CE', gpio: '16' },
  { nrf: 'VCC', gpio: '3.3V' },
  { nrf: 'GND', gpio: 'GND' },
];

const VSPI_PINS = [
  { nrf: 'SCK', gpio: '18' },
  { nrf: 'MISO', gpio: '19' },
  { nrf: 'MOSI', gpio: '23' },
  { nrf: 'CSN (CS)', gpio: '21' },
  { nrf: 'CE', gpio: '22' },
  { nrf: 'VCC', gpio: '3.3V' },
  { nrf: 'GND', gpio: 'GND' },
];

const RADIO_CONFIG = [
  { param: 'Auto-Acknowledge', value: 'Disabled' },
  { param: 'Data Rate', value: '2 Mbps' },
  { param: 'PA Level', value: 'MAX' },
  { param: 'CRC', value: 'Disabled' },
  { param: 'SPI Clock', value: '16 MHz' },
  { param: 'TX Mode', value: 'Constant Carrier' },
];

const FEATURES = [
  {
    icon: Radio,
    title: 'Dual Radio Architecture',
    desc: 'Two nRF24L01+PA+LNA modules on HSPI and VSPI buses — double the coverage, zero blind spots.',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Zap,
    title: 'Random Hop Jamming',
    desc: 'Both radios hop to random channels at blazing speed — unpredictable for frequency-hopping protocols.',
    gradient: 'from-yellow-500/20 to-orange-500/20',
    border: 'border-yellow-500/20',
    iconColor: 'text-yellow-400',
  },
  {
    icon: WifiOff,
    title: 'Wi-Fi Deauther',
    desc: 'Also functions as a Wi-Fi deauthentication tool — disconnects devices from their access points across the 2.4GHz band.',
    gradient: 'from-red-500/20 to-pink-500/20',
    border: 'border-red-500/20',
    iconColor: 'text-red-400',
  },
  {
    icon: Shield,
    title: 'Self-Interference Protection',
    desc: "ESP32's own Wi-Fi & Bluetooth are fully killed at boot — no self-jamming, pure output.",
    gradient: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-500/20',
    iconColor: 'text-green-400',
  },
  {
    icon: Wifi,
    title: 'Full 2.4GHz Saturation',
    desc: 'Covers Wi-Fi (ch 1–13), Bluetooth, Zigbee, and all 2.400–2.480 GHz protocols simultaneously.',
    gradient: 'from-purple-500/20 to-violet-500/20',
    border: 'border-purple-500/20',
    iconColor: 'text-purple-400',
  },
  {
    icon: Cpu,
    title: '16 MHz SPI Overdrive',
    desc: 'SPI bus clocked at 16 MHz (vs default 10 MHz) for faster channel hopping and reduced sweep gaps.',
    gradient: 'from-pink-500/20 to-rose-500/20',
    border: 'border-pink-500/20',
    iconColor: 'text-pink-400',
  },
];

function SectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="font-inter text-2xl md:text-3xl font-bold text-white tracking-tight mb-2"
    >
      {children}
    </h2>
  );
}

function SectionSub({ children }: { children: React.ReactNode }) {
  return <p className="text-[#888888] text-sm mb-8">{children}</p>;
}

function PinTable({
  title,
  pins,
  accent,
}: {
  title: string;
  pins: typeof HSPI_PINS;
  accent: string;
}) {
  return (
    <div className={`border rounded-xl overflow-hidden ${accent}`}>
      <div className={`px-5 py-3 border-b ${accent} flex items-center gap-2`}>
        <span className="text-white font-semibold text-sm font-inter">{title}</span>
      </div>
      <table className="w-full">
        <thead>
          <tr className={`border-b ${accent}`}>
            <th className="text-left px-5 py-2.5 text-xs font-medium text-[#666666] font-inter">
              nRF24L01 Pin
            </th>
            <th className="text-left px-5 py-2.5 text-xs font-medium text-[#666666] font-inter">
              ESP32 GPIO
            </th>
          </tr>
        </thead>
        <tbody>
          {pins.map((pin, i) => (
            <tr key={pin.nrf} className={i < pins.length - 1 ? 'border-b border-[#1A1A1A]' : ''}>
              <td className="px-5 py-2.5 text-sm text-[#CCCCCC] font-inter font-mono">{pin.nrf}</td>
              <td className="px-5 py-2.5 text-sm text-white font-inter font-mono">{pin.gpio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GlowCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-[#111111] border border-[#222222] rounded-xl overflow-hidden group-hover:border-[#333333] transition-colors">
        {children}
      </div>
    </div>
  );
}

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'components', label: 'Components' },
    { id: 'wiring', label: 'Wiring' },
    { id: 'schematic', label: 'Schematic' },
    { id: 'source', label: 'Source' },
    { id: 'flash', label: 'Flash' },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    if (typeof document !== 'undefined') {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050508] text-white font-inter">
      <Script
        src="https://unpkg.com/esp-web-tools@10/dist/web/install-button.js?module"
        type="module"
      />

      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 border-b border-white/5 bg-[#050508]/80"
        style={{ WebkitBackdropFilter: 'blur(16px)', backdropFilter: 'blur(16px)' }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
              <Radio className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-sm tracking-tight bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              0xNaviMetal
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-white/10 text-white'
                    : 'text-[#666666] hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5 text-[#888888]" />
            </a>
            <button
              onClick={() => scrollTo('flash')}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Flash Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 w-[300px] h-[300px] bg-pink-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 relative">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Left — Text */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-xs text-cyan-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  ESP32
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-xs text-purple-400">
                  2× nRF24L01+PA+LNA
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/5 text-xs text-pink-400">
                  <WifiOff className="w-3 h-3" />
                  Jammer + Deauther
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Dual-Channel
                </span>
                <br />
                2.4GHz RF Jammer
                <br />
                <span className="text-[#555555]">& Wi-Fi Deauther</span>
              </h1>
              <p className="text-[#888888] text-base md:text-lg max-w-lg mb-8 leading-relaxed">
                Two PA+LNA radio modules driven by an ESP32, simultaneously broadcasting constant
                carrier waves and deauthentication frames across the full 2.4GHz spectrum.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <button
                  onClick={() => scrollTo('flash')}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity text-sm"
                >
                  <Download className="w-4 h-4" />
                  Flash Firmware
                </button>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#333333] text-[#CCCCCC] font-medium px-7 py-3.5 rounded-full hover:border-[#555555] hover:text-white transition-colors text-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                  View Source
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="border border-orange-500/20 bg-orange-500/5 rounded-xl px-5 py-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-orange-400 text-sm font-semibold mb-1">⚠️ Legal Disclaimer</p>
            <p className="text-orange-300/60 text-xs leading-relaxed">
              This project is for educational and research purposes only. Operating RF jamming
              devices and Wi-Fi deauthers is illegal in most countries (FCC, EU, etc.). You are
              solely responsible for complying with your local laws. The author assumes no liability
              for misuse.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <section id="overview" className="max-w-6xl mx-auto px-6 mb-24 scroll-mt-20">
        <SectionTitle>How It Works</SectionTitle>
        <SectionSub>
          Each module emits a continuous unmodulated carrier at max power, hopping across random
          channels. The device also sends deauthentication frames to disconnect Wi-Fi clients.
        </SectionSub>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`border ${f.border} rounded-xl p-5 bg-gradient-to-br ${f.gradient} hover:scale-[1.02] transition-transform duration-200`}
              >
                <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center mb-4 border border-white/5">
                  <Icon className={`w-5 h-5 ${f.iconColor}`} />
                </div>
                <h3 className="text-white font-bold text-sm mb-1.5">{f.title}</h3>
                <p className="text-[#888888] text-xs leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Radio Config */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <SectionTitle>Radio Configuration</SectionTitle>
        <SectionSub>Both modules share identical settings for maximum output power.</SectionSub>
        <GlowCard>
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3 text-xs font-medium text-[#555555]">
                  Parameter
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#555555]">Value</th>
              </tr>
            </thead>
            <tbody>
              {RADIO_CONFIG.map((row, i) => (
                <tr
                  key={row.param}
                  className={i < RADIO_CONFIG.length - 1 ? 'border-b border-white/5' : ''}
                >
                  <td className="px-5 py-3 text-sm text-[#CCCCCC]">{row.param}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400 font-mono">
                      {row.value}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlowCard>
      </section>

      {/* Components */}
      <section id="components" className="max-w-6xl mx-auto px-6 mb-24 scroll-mt-20">
        <SectionTitle>Required Components</SectionTitle>
        <SectionSub>Everything you need to build the jammer & deauther.</SectionSub>
        <GlowCard>
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3 text-xs font-medium text-[#555555]">Part</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#555555] w-16">Qty</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#555555] hidden sm:table-cell">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPONENTS.map((c, i) => (
                <tr
                  key={c.part}
                  className={i < COMPONENTS.length - 1 ? 'border-b border-white/5' : ''}
                >
                  <td className="px-5 py-3 text-sm text-white font-medium">{c.part}</td>
                  <td className="px-5 py-3 text-sm text-cyan-400 font-mono">{c.qty}</td>
                  <td className="px-5 py-3 text-xs text-[#666666] hidden sm:table-cell">
                    {c.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlowCard>
        <div className="mt-4 border border-green-500/20 bg-green-500/5 rounded-xl px-5 py-4">
          <p className="text-green-400/80 text-xs leading-relaxed">
            <span className="font-semibold text-green-400">💡 3.3V Adapters are optional:</span> The
            ESP32 can supply ~230mA at 3.3V for both modules. The adapters provide a cleaner power
            rail and are recommended for reliability, but both modules will work connected directly
            to the ESP32's 3.3V pin.
          </p>
        </div>
      </section>

      {/* Wiring */}
      <section id="wiring" className="max-w-6xl mx-auto px-6 mb-24 scroll-mt-20">
        <SectionTitle>Wiring</SectionTitle>
        <SectionSub>Pin connections for HSPI (Radio 1) and VSPI (Radio 2).</SectionSub>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PinTable title="⚡ HSPI — Radio 1" pins={HSPI_PINS} accent="border-cyan-500/20" />
          <PinTable title="⚡ VSPI — Radio 2" pins={VSPI_PINS} accent="border-purple-500/20" />
        </div>
      </section>

      {/* Schematic & Reference */}
      <section id="schematic" className="max-w-6xl mx-auto px-6 mb-24 scroll-mt-20">
        <SectionTitle>Schematic & Reference</SectionTitle>
        <SectionSub>Circuit diagram, adapter wiring, pinout, and capacitor placement.</SectionSub>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Circuit Schematic', src: SCHEMATIC_IMG },
            { label: '3.3V Adapter Wiring', src: ADAPTER_IMG },
            { label: 'nRF24L01+PA+LNA Pinout', src: PINOUT_IMG },
            { label: 'Capacitor Placement (10µF)', src: CAPACITOR_IMG },
          ].map((img) => (
            <GlowCard key={img.label}>
              <div className="px-5 py-3 border-b border-white/5">
                <span className="text-xs font-medium text-[#888888]">{img.label}</span>
              </div>
              <div className="p-3">
                <img src={img.src} alt={img.label} className="w-full rounded-lg" />
              </div>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* Creator section */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="relative border border-white/5 rounded-2xl overflow-hidden bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-cyan-500/5">
          <div className="flex flex-col items-center md:items-start gap-8 p-8 md:p-12">
            <div>
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Built by 0xNaviMetal ✨
              </h3>
              <p className="text-[#888888] text-sm leading-relaxed mb-5 max-w-lg">
                Hardware hacker, embedded systems enthusiast, and RF tinkerer. Follow my journey
                building cool (and slightly dangerous) hardware projects. Star the repo if you found
                this useful!
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-white/15 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  GitHub
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-pink-500/20 text-pink-400 text-xs font-semibold px-4 py-2.5 rounded-full hover:opacity-80 transition-opacity"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  Instagram
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-4 py-2.5 rounded-full hover:opacity-80 transition-opacity"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Source Code & Libraries */}
      <section id="source" className="max-w-6xl mx-auto px-6 mb-24 scroll-mt-20">
        <SectionTitle>Source Code & Libraries</SectionTitle>
        <SectionSub>
          Get the full source code from GitHub. Install the libraries below if compiling yourself.
        </SectionSub>

        {/* Source code card */}
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="block mb-6">
          <div className="relative group border border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-xl p-6 hover:border-cyan-500/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-white/5">
                  <Code2 className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base mb-0.5">
                    0xNaviMetal / ESP32-RF-Jammer
                  </h3>
                  <p className="text-[#666666] text-xs">
                    Full source code, schematic files, and documentation
                  </p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-[#555555] group-hover:text-cyan-400 transition-colors" />
            </div>
          </div>
        </a>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-[#222222] rounded-xl p-5 bg-[#0A0A0A]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3 py-1 text-cyan-400 font-semibold">
                RF24
              </span>
            </div>
            <p className="text-[#888888] text-xs mb-1">by TMRh20</p>
            <p className="text-[#555555] text-xs">nRF24L01 radio driver library</p>
          </div>
          <div className="border border-[#222222] rounded-xl p-5 bg-[#0A0A0A]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1 text-purple-400 font-semibold">
                SPI
              </span>
            </div>
            <p className="text-[#888888] text-xs mb-1">Built-in</p>
            <p className="text-[#555555] text-xs">Arduino SPI bus communication</p>
          </div>
        </div>
      </section>

      {/* Flash Firmware */}
      <section id="flash" className="max-w-6xl mx-auto px-6 mb-24 scroll-mt-20">
        <SectionTitle>Flash Firmware</SectionTitle>
        <SectionSub>
          Flash directly from your browser — no Arduino IDE needed. Just USB and Chrome.
        </SectionSub>
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-lg" />
          <div className="relative border border-white/10 bg-[#0A0A0D] rounded-2xl p-10 text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-6">
              <Cpu className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">ESP32 Web Flasher</h3>
            <p className="text-[#666666] text-sm max-w-md mx-auto mb-3 leading-relaxed">
              Connect your ESP32 via USB, click the button below, and the firmware will be flashed
              directly. Works in Chrome and Edge.
            </p>
            <p className="text-cyan-400/60 text-xs mb-8 font-mono">
              Firmware includes: RF Jammer + Wi-Fi Deauther
            </p>

            {/* @ts-expect-error - esp-web-install-button is a web component */}
            <esp-web-install-button manifest="/api/firmware-manifest">
              <button
                slot="activate"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold px-10 py-4 rounded-full hover:opacity-90 transition-opacity text-sm cursor-pointer"
              >
                <Cable className="w-5 h-5" />
                Connect & Flash ESP32
              </button>
              <span slot="unsupported" className="text-red-400 text-xs">
                Your browser does not support Web Serial. Please use Chrome or Edge.
              </span>
              <span slot="not-allowed" className="text-orange-400 text-xs">
                Web Serial access was denied. Please allow serial port access.
              </span>
              {/* @ts-expect-error - esp-web-install-button is a web component */}
            </esp-web-install-button>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5 text-xs text-[#555555]">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Chrome / Edge only
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                USB cable required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                No IDE installation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left — branding */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                <Radio className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  0xNaviMetal
                </span>
                <p className="text-[#444444] text-xs">ESP32 RF Jammer & Deauther</p>
              </div>
            </div>

            {/* Center — social links */}
            <div className="flex items-center gap-3">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4 text-[#888888]" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-500/10 hover:border-pink-500/30 transition-all"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4 text-[#888888]" />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500/10 hover:border-blue-500/30 transition-all"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4 text-[#888888]" />
              </a>
            </div>

            {/* Right — disclaimer */}
            <p className="text-xs text-[#333333]">For educational & research purposes only.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes glow-pulse {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
