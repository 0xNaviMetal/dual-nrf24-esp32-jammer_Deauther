'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import {
  Cpu,
  Radio,
  Zap,
  Shield,
  ChevronDown,
  Download,
  AlertTriangle,
  Wifi,
  Cable,
} from 'lucide-react';

const SCHEMATIC_IMG =
  'https://dtvoeevhaseb5.cloudfront.net/user-uploads/a6485306-21dc-4e2c-9977-6e40962a2d6c.png';
const ADAPTER_IMG =
  'https://dtvoeevhaseb5.cloudfront.net/user-uploads/ca688d64-baf4-4d20-9909-5e2a3424ccbd.png';
const PINOUT_IMG =
  'https://dtvoeevhaseb5.cloudfront.net/user-uploads/13bb7cdb-1697-4d21-84c3-05bad46c5c45.png';
const CAPACITOR_IMG =
  'https://dtvoeevhaseb5.cloudfront.net/user-uploads/e4414855-03cc-4dd4-877a-6c0f3ca5b405.png';

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
    desc: 'Two nRF24L01+PA+LNA modules operating simultaneously on HSPI and VSPI buses for maximum spectrum coverage.',
  },
  {
    icon: Zap,
    title: 'Random Hop Jamming',
    desc: 'Both radios jump to random channels across the 2.4GHz band as fast as possible, making it unpredictable for frequency-hopping protocols.',
  },
  {
    icon: Shield,
    title: 'Self-Interference Protection',
    desc: "ESP32's own Wi-Fi and Bluetooth radios are fully disabled at boot to prevent self-interference.",
  },
  {
    icon: Wifi,
    title: 'Full 2.4GHz Coverage',
    desc: 'Disrupts Wi-Fi (ch 1–13), Bluetooth, Zigbee, and all protocols in the 2.400–2.480 GHz range.',
  },
];

function SectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="font-inter text-2xl font-semibold text-white tracking-tight mb-2">
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
    <div className="border border-[#222222] rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-[#222222] flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${accent}`} />
        <span className="text-white font-semibold text-sm font-inter">{title}</span>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#222222]">
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

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [_espToolsLoaded, setEspToolsLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'components', label: 'Components' },
    { id: 'wiring', label: 'Wiring' },
    { id: 'schematic', label: 'Schematic' },
    { id: 'flash', label: 'Flash' },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    if (typeof document !== 'undefined') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-inter">
      <Script
        src="https://unpkg.com/esp-web-tools@10/dist/web/install-button.js?module"
        type="module"
        onLoad={() => setEspToolsLoaded(true)}
      />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-[#1A1A1A] bg-[#0A0A0A]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
              <Radio className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-sm tracking-tight">RF Jammer</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-white/10 text-white'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo('flash')}
            className="bg-white text-black text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#E0E0E0] transition-colors"
          >
            Flash Firmware
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/40 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 relative">
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#333333] text-xs text-[#888888]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              ESP32
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#333333] text-xs text-[#888888]">
              2× nRF24L01+PA+LNA
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#333333] text-xs text-[#888888]">
              2.4GHz
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-4">
            Dual-Channel 2.4GHz
            <br />
            <span className="text-[#888888]">RF Signal Jammer</span>
          </h1>
          <p className="text-[#888888] text-base md:text-lg max-w-xl mb-10 leading-relaxed">
            Two nRF24L01+PA+LNA modules driven by an ESP32, simultaneously broadcasting constant
            carrier waves across the full 2.4GHz spectrum using both SPI buses.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <button
              onClick={() => scrollTo('flash')}
              className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-[#E0E0E0] transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              Flash Firmware to ESP32
            </button>
            <button
              onClick={() => scrollTo('overview')}
              className="inline-flex items-center gap-2 border border-[#333333] text-[#CCCCCC] font-medium px-6 py-3 rounded-full hover:border-[#555555] hover:text-white transition-colors text-sm"
            >
              Learn More
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <div className="border border-[#3D1F00] bg-[#1A1000] rounded-xl px-5 py-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-orange-400 text-sm font-semibold mb-1">Legal Disclaimer</p>
            <p className="text-orange-300/70 text-xs leading-relaxed">
              This project is for educational and research purposes only. Operating RF jamming
              devices is illegal in most countries. You are solely responsible for complying with
              your local laws. The author assumes no liability for misuse.
            </p>
          </div>
        </div>
      </div>

      {/* Overview / Features */}
      <section id="overview" className="max-w-5xl mx-auto px-6 mb-20 scroll-mt-20">
        <SectionTitle>How It Works</SectionTitle>
        <SectionSub>
          Each module emits a continuous unmodulated carrier signal at max power, hopping across
          random channels to saturate the 2.4GHz band.
        </SectionSub>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="border border-[#222222] rounded-xl p-5 hover:border-[#333333] transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                  <Icon className="w-4.5 h-4.5 text-[#CCCCCC]" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1.5 font-inter">{f.title}</h3>
                <p className="text-[#888888] text-xs leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Radio Config */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <SectionTitle>Radio Configuration</SectionTitle>
        <SectionSub>Both nRF24L01 modules share identical settings for maximum output.</SectionSub>
        <div className="border border-[#222222] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#222222]">
                <th className="text-left px-5 py-3 text-xs font-medium text-[#666666] font-inter">
                  Parameter
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#666666] font-inter">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {RADIO_CONFIG.map((row, i) => (
                <tr
                  key={row.param}
                  className={i < RADIO_CONFIG.length - 1 ? 'border-b border-[#1A1A1A]' : ''}
                >
                  <td className="px-5 py-2.5 text-sm text-[#CCCCCC] font-inter">{row.param}</td>
                  <td className="px-5 py-2.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/5 border border-[#333333] text-xs text-white font-mono">
                      {row.value}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Components */}
      <section id="components" className="max-w-5xl mx-auto px-6 mb-20 scroll-mt-20">
        <SectionTitle>Required Components</SectionTitle>
        <SectionSub>Everything you need to assemble the jammer.</SectionSub>
        <div className="border border-[#222222] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#222222]">
                <th className="text-left px-5 py-3 text-xs font-medium text-[#666666] font-inter">
                  Part
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#666666] font-inter w-16">
                  Qty
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#666666] font-inter hidden sm:table-cell">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPONENTS.map((c, i) => (
                <tr
                  key={c.part}
                  className={i < COMPONENTS.length - 1 ? 'border-b border-[#1A1A1A]' : ''}
                >
                  <td className="px-5 py-3 text-sm text-white font-inter font-medium">{c.part}</td>
                  <td className="px-5 py-3 text-sm text-[#CCCCCC] font-inter font-mono">{c.qty}</td>
                  <td className="px-5 py-3 text-xs text-[#888888] font-inter hidden sm:table-cell">
                    {c.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 border border-[#1A2A1A] bg-[#0A1A0A] rounded-xl px-5 py-4">
          <p className="text-green-400/80 text-xs leading-relaxed">
            <span className="font-semibold text-green-400">Note on 3.3V Adapters:</span> The ESP32's
            onboard 3.3V regulator can supply enough current for both PA+LNA modules (~230mA total).
            However, the adapters provide a dedicated 3.3V rail and are recommended for reliability
            during high-power transmission. They are optional for a simpler build.
          </p>
        </div>
      </section>

      {/* Wiring */}
      <section id="wiring" className="max-w-5xl mx-auto px-6 mb-20 scroll-mt-20">
        <SectionTitle>Wiring Diagram</SectionTitle>
        <SectionSub>
          Pin connections for both SPI buses — HSPI (Radio 1) and VSPI (Radio 2).
        </SectionSub>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PinTable title="HSPI — Radio 1" pins={HSPI_PINS} accent="bg-blue-500" />
          <PinTable title="VSPI — Radio 2" pins={VSPI_PINS} accent="bg-purple-500" />
        </div>
      </section>

      {/* Schematic & Reference Images */}
      <section id="schematic" className="max-w-5xl mx-auto px-6 mb-20 scroll-mt-20">
        <SectionTitle>Schematic & Reference</SectionTitle>
        <SectionSub>
          Circuit diagram, adapter wiring, nRF24L01 pinout, and capacitor placement.
        </SectionSub>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-[#222222] rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-[#222222]">
              <span className="text-xs font-medium text-[#888888]">Circuit Schematic</span>
            </div>
            <div className="p-3 bg-[#111111]">
              <img src={SCHEMATIC_IMG} alt="Schematic" className="w-full rounded-lg" />
            </div>
          </div>
          <div className="border border-[#222222] rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-[#222222]">
              <span className="text-xs font-medium text-[#888888]">3.3V Adapter Wiring</span>
            </div>
            <div className="p-3 bg-[#111111]">
              <img src={ADAPTER_IMG} alt="Adapter" className="w-full rounded-lg" />
            </div>
          </div>
          <div className="border border-[#222222] rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-[#222222]">
              <span className="text-xs font-medium text-[#888888]">nRF24L01+PA+LNA Pinout</span>
            </div>
            <div className="p-3 bg-[#111111]">
              <img src={PINOUT_IMG} alt="Pinout" className="w-full rounded-lg" />
            </div>
          </div>
          <div className="border border-[#222222] rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-[#222222]">
              <span className="text-xs font-medium text-[#888888]">Capacitor Placement (10µF)</span>
            </div>
            <div className="p-3 bg-[#111111]">
              <img src={CAPACITOR_IMG} alt="Capacitor" className="w-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Required Libraries */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <SectionTitle>Required Libraries</SectionTitle>
        <SectionSub>
          Install these in the Arduino IDE if you plan to compile from source.
        </SectionSub>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-[#222222] rounded-xl p-5 hover:border-[#333333] transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono bg-white/5 border border-[#333333] rounded-full px-2.5 py-0.5 text-[#CCCCCC]">
                RF24
              </span>
            </div>
            <p className="text-[#888888] text-xs">by TMRh20 — nRF24L01 driver library</p>
          </div>
          <div className="border border-[#222222] rounded-xl p-5 hover:border-[#333333] transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono bg-white/5 border border-[#333333] rounded-full px-2.5 py-0.5 text-[#CCCCCC]">
                SPI
              </span>
            </div>
            <p className="text-[#888888] text-xs">Built-in Arduino SPI library</p>
          </div>
        </div>
      </section>

      {/* Flash Firmware */}
      <section id="flash" className="max-w-5xl mx-auto px-6 mb-20 scroll-mt-20">
        <SectionTitle>Flash Firmware</SectionTitle>
        <SectionSub>
          Flash the pre-compiled firmware directly to your ESP32 from your browser. No IDE required.
          Connect your ESP32 via USB and click the button below.
        </SectionSub>
        <div className="border border-[#222222] rounded-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-[#333333] flex items-center justify-center mb-6">
            <Cpu className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2 font-inter">ESP32 Web Flasher</h3>
          <p className="text-[#888888] text-xs max-w-md mx-auto mb-8 leading-relaxed">
            Requires Google Chrome or Microsoft Edge. Connect your ESP32 board via USB cable, then
            click the button to begin flashing.
          </p>

          {/* @ts-expect-error - esp-web-install-button is a web component */}
          <esp-web-install-button manifest="/manifest.json">
            <button
              slot="activate"
              className="inline-flex items-center gap-2.5 bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:bg-[#E0E0E0] transition-colors text-sm cursor-pointer"
            >
              <Cable className="w-4 h-4" />
              Connect & Flash
            </button>
            <span slot="unsupported" className="text-red-400 text-xs">
              Your browser does not support Web Serial. Please use Chrome or Edge.
            </span>
            <span slot="not-allowed" className="text-orange-400 text-xs">
              Web Serial access was denied. Please allow serial port access.
            </span>
            {/* @ts-expect-error - esp-web-install-button is a web component */}
          </esp-web-install-button>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[#666666]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Chrome / Edge required
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              USB connection needed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              No installation needed
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1A1A1A] py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
              <Radio className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs text-[#666666] font-inter">ESP32 Dual-Channel RF Jammer</span>
          </div>
          <p className="text-xs text-[#444444] font-inter">
            For educational & research purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}
