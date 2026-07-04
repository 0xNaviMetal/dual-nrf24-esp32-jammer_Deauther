# ESP32 Dual-Channel 2.4GHz RF Jammer & Wi-Fi Deauther

## ⚠️ Legal Disclaimer
> **This project is for educational and research purposes only.** Operating RF jamming devices and Wi-Fi deauthers is **illegal** in most countries (FCC, EU regulations, etc.). You are solely responsible for complying with your local laws. The author assumes no liability for misuse.

---

## 🔍 What Is This?
A portable, battery-powered 2.4GHz band jammer built around an **ESP32** and **two nRF24L01+PA+LNA** modules. By utilizing both hardware SPI buses on the ESP32 (HSPI & VSPI), the device simultaneously broadcasts **constant carrier waves** and **deauthentication frames** across the entire 2.4GHz spectrum — disrupting Wi-Fi (channels 1–13), Bluetooth, Zigbee, and other protocols operating in the 2.400–2.480 GHz range.

The ESP32's own Wi-Fi and Bluetooth radios are **fully disabled** at boot to prevent self-interference.

---

## 🌐 Flash Firmware Online
**Flash pre-compiled firmware directly to your ESP32 from your browser — no Arduino IDE needed:**

### 👉 [https://jammer-and-deuther-project-254.created.app/](https://jammer-and-deuther-project-254.created.app/)

Just plug in your ESP32 via USB and click the flash button. Works in Chrome and Edge.

---

## 💻 Source Code
Full source code, schematics, and Arduino project files are available in the **`firmware/`** folder of this repository.

---



---

## 🔧 Radio Configuration

| Parameter | Value |
|-----------|-------|
| Auto-Acknowledge | Disabled |
| Data Rate | 2 Mbps |
| PA Level | MAX |
| CRC | Disabled |
| SPI Clock Speed | 16 MHz |
| Transmission Mode | Constant Carrier Wave |

---

## 🧩 Components

| Part | Qty | Notes |
|------|-----|-------|
| ESP32 DevKit V1 | 1 | Any ESP32 with HSPI + VSPI |
| nRF24L01+PA+LNA (with antenna) | 2 | Extended range version with SMA antenna |
| 10µF electrolytic capacitor | 2 | Soldered across VCC/GND of each nRF module — stabilizes power and prevents voltage drops during transmission bursts |
| 18650 Li-ion battery | 1 | 3.7V nominal |
| TP4056 battery charger module | 1 | Micro-USB charging |
| Jumper wires | — | For connections |
| nRF24L01 3.3V adapter (AMS1117) | 2 | **Optional** (see below) |

### 💡 About the 3.3V Adapters
The ESP32's onboard 3.3V regulator can technically supply enough current for both PA+LNA modules (~115mA each at max power, ~230mA total). However, the PA+LNA version can produce **current spikes** during high-power transmission that may cause instability or brownouts. The adapters provide a clean, dedicated 3.3V rail and are **recommended for reliability** — but if you prefer a simpler build, you can wire both modules directly to the ESP32's 3.3V pin and it should work.

---

## 🔌 Wiring

### HSPI — Radio 1
| nRF24L01 Pin | ESP32 GPIO |
|--------------|------------|
| SCK | 14 |
| MISO | 12 |
| MOSI | 13 |
| CSN (CS) | 15 |
| CE | 16 |
| VCC | 3.3V (or adapter) |
| GND | GND |

### VSPI — Radio 2
| nRF24L01 Pin | ESP32 GPIO |
|--------------|------------|
| SCK | 18 |
| MISO | 19 |
| MOSI | 23 |
| CSN (CS) | 21 |
| CE | 22 |
| VCC | 3.3V (or adapter) |
| GND | GND |



---

## 📦 Required Libraries
Install these in the Arduino IDE before compiling:

- **RF24** — by TMRh20
- **ezButton** — by ArduinoGetStarted.com

---

## 🔥 Flash Firmware

**You don't need to compile anything. Flash the pre-built firmware directly to your ESP32 from your browser:**

### 👉 **[Flash Here: https://jammer-and-deuther-project-254.created.app/](https://jammer-and-deuther-project-254.created.app/)**

**Or compile from source:**
- Full source code is available in the `firmware/` folder
- Open the `.ino` file in Arduino IDE
- Install the required libraries (RF24, ezButton)
- Select your ESP32 board and flash

---

## 📝 Notes
- The nRF24L01 covers channels 0–125 (2.400–2.525 GHz). This project uses channels 0–79 to focus on the standard Wi-Fi/Bluetooth band.
- ESP32 Wi-Fi and Bluetooth are **fully shut down** at startup (`esp_wifi_deinit`, `esp_bt_controller_deinit`) to avoid self-interference.
- SPI bus speed is set to 16 MHz (vs default 10 MHz) for faster channel hopping.
- **10µF capacitors are critical** — solder them directly across VCC/GND on each nRF24L01 module to prevent brownouts during transmission.

---

## 📸 Schematics & Reference Images

Full schematics, pinout diagrams, and assembly photos are available on the project website:

**[https://jammer-and-deuther-project-254.created.app/](https://jammer-and-deuther-project-254.created.app/)**

---

## 👤 Author

**Built by [0xNaviMetal](https://github.com/0xNaviMetal)**

Hardware hacker, embedded systems enthusiast, and RF tinkerer.

- GitHub: [https://github.com/0xNaviMetal](https://github.com/0xNaviMetal)
- Instagram: [https://www.instagram.com/slimane_boucetta_hw/](https://www.instagram.com/slimane_boucetta_hw/)
- LinkedIn: [https://www.linkedin.com/in/slimane-boucetta](https://www.linkedin.com/in/slimane-boucetta)

---

## 📄 License

This project is provided for **educational and research purposes only**. You are solely responsible for ensuring compliance with your local laws and regulations.
