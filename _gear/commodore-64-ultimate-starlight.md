---
title: "Commodore 64 Ultimate: Starlight Edition"
category: "computers"
description: "FPGA-powered, real-hardware recreation of the C64, the first new Commodore hardware in over 30 years, in a translucent, LED-lit case."
model: "Commodore 64 Ultimate (Starlight Edition)"
status: "In Service"
order: 1
menuLabel: "Commodore 64 Ultimate"
menuTagline: "Starlight Edition"
---

The Commodore 64 is back. Not as an emulator in a shrunken shell, but as a full-size, real-hardware recreation sold under the actual Commodore name. I picked up the **Starlight Edition**, the translucent one that lights up, and wanted to write down what this machine is and what's inside it.

<figure>
  <img src="https://commodore.net/content/uploads/2026/04/c64u_c64cu-starlight-homepage-scaled-1.png"
       alt="Commodore 64 Ultimate Starlight Edition (left) and Commodore 64C Ultimate (right), both in translucent cases glowing with rainbow LEDs"
       loading="lazy">
  <figcaption>The Commodore 64 Ultimate Starlight Edition (left) beside its newer sibling, the 64C Ultimate. Image: <a href="https://commodore.net/">Commodore International Corporation</a>.</figcaption>
</figure>

### Where It Came From

In 2025 the Commodore brand came under new ownership, led by Christian "Peri Fractic" Simpson of the *Retro Recipes* YouTube channel, with a team that includes original Commodore engineers like Bil Herd, Dave Haynie, and Al Charpentier (lead architect of the VIC-II and co-creator of the SID). In July 2025 they unveiled the Commodore 64 Ultimate, the first official Commodore hardware in more than three decades. Pre-orders started shipping in time for Christmas 2025.

Under the hood, the C64 Ultimate is built on Gideon Zweijtzer's **Ultimate 64**, a well-respected FPGA replacement motherboard for the C64, packaged in a new "breadbin" case and keyboard modeled on the 1982 original.

### Not an Emulator

The key word is **FPGA**. Instead of running software that pretends to be a C64, the Ultimate uses an AMD Xilinx Artix-7 FPGA configured with gate-level recreations of the original chips: the 6510 CPU, VIC-II video, SID sound, and I/O. The result is behavior very close to real hardware, with "virtually zero-lag" HDMI output, plus modern conveniences the original never had.

It also keeps the original **physical ports**, so real C64 hardware still plugs in: cartridges, joysticks, a Datasette, and IEC disk drives. Reviewers have tested original 1541/1571 drives, a 1530 Datasette, an Action Replay cartridge, and even a VIC-1520 plotter, all working.

### Specifications

| Component | Details |
|---|---|
| **Core** | AMD Xilinx Artix-7 FPGA, chip-level C64 recreation |
| **Memory** | 128 MB DDR2 (16 MB system, 16 MB REU, GeoRAM, remainder as RAM disk); 16 MB NOR flash |
| **Speed** | Stock 1 MHz, with Turbo Boost up to 64× |
| **Video** | HDMI 1080p @ 50 Hz (PAL) / 60 Hz (NTSC), DVI-compatible; 8-pin DIN analog (composite, S-Video, RGB) |
| **Audio** | 2 × real SID sockets (6581/8580) + "UltiSID" FPGA SIDs; 3.5 mm line out, optical S/PDIF; piezo speaker for disk-drive sounds |
| **Keyboard** | 66-key mechanical, Gateron Pro 3.0 55g switches, original C64 layout |
| **Classic ports** | Cartridge, 2 × DB-9 joystick/paddle, Datasette, IEC serial (disk drives/printers), internal 26-pin user port (adapter sold separately) |
| **Modern I/O** | USB-A 2.0 (storage), USB-C, microSD slot, 100 Mbps Ethernet, Wi-Fi |
| **Power** | 12 V DC external supply (100–240 V, worldwide adapters included) |
| **Warranty** | 1 year (3-year extended option) |

### The Starlight Edition

The C64 Ultimate came in three editions: the classic **BASIC Beige** ($299.99 at launch), the **Starlight Edition** ($349.99 at launch), and the gold **Founders Edition** ($499.99 at launch). Prices have since gone up; check the [Commodore store](https://commodore.net/store/commodore64/) for current pricing.

<figure>
  <img src="https://commodore.net/content/uploads/2026/04/glow_red_ckey-scaled.png"
       alt="Close-up of the Starlight Edition's transparent smoked keycaps, including RUN/STOP, SHIFT and the Commodore key, lit red"
       loading="lazy">
  <figcaption>The Starlight Edition's transparent keycaps and case. Image: <a href="https://commodore.net/">Commodore International Corporation</a>.</figcaption>
</figure>

What makes the Starlight different:

* **Translucent case.** You can see right through the breadbin to the hardware inside.
* **RGB lighting.** Banks of color-changing LEDs in the case and under the keyboard. They can be set to react to the SID music, with adjustable patterns, speeds, and brightness, all from the built-in menu. Case and keyboard lighting can be turned off independently.
* **Transparent keyboard PCB.** Commodore calls it the world's first transparent mechanical keyboard PCB; the beige model doesn't have it.
* **Smoked "Translucent Black & Red" keycaps.** They look black when the lights are off and glow when they're on. One trade-off: legends can be harder to read with the LEDs active.

### Living With It

The machine boots straight to the familiar blue `READY.` screen. A **multi-function switch**, styled after the original power switch, handles power, reset, and freeze. Flick it up and you're in the Ultimate menu, where you can:

* Browse USB or microSD storage and mount disk (`.D64`, `.D71`, `.D81`, `.G64`), tape (`.TAP`, `.T64`), and cartridge images, or just run a `.PRG`
* Switch between PAL and NTSC, enable Turbo Boost, and swap joystick ports
* Configure networking, use the built-in **CommoServe** search to download titles, or reach it over FTP and a web interface
* Emulate a printer to PNG or text, and dial into PETSCII BBSes with the bundled terminal

In the box: a spiral-bound user guide, an HDMI cable, the power supply, a sticker sheet, and a USB stick shaped like a cassette, *The Very Second*, loaded with 100+ games, demos, utilities, and music, including GEOS. There's no joystick, so bring your own DB-9 stick. USB gamepads aren't supported.

### What the Reviews Say

* **Time Extension** called it "The Gold Standard Of Retro Computer Revivals," and its Starlight review unit's LED lighting "really eye-catching." Its main complaint was keyboard flex on the Starlight unit.
* **Hackster.io** found it "attractive, robust, and happy to work with modern HDMI and DVI displays as well as classic CRT TVs." They noted that the "no missed inputs" N-key rollover claim is limited by how the original C64 KERNAL scans the keyboard, and that there's no C128 mode.

### What's Next

Commodore has followed up with the **Commodore 64C Ultimate**, a slimline version built from the original 1986 C64C molds, which began shipping in October 2026.

<!-- Add your own impressions here: unboxing, first boot, favorite LED mode, what you've loaded first, and your own photos (drop them in /assets/images/ and reference them like: <img src="/assets/images/c64u-starlight.jpg" alt="..."> ) -->

### Sources

* [Commodore: C64 Ultimate product page](https://commodore.net/computer/) and [team](https://commodore.net/team-commodore/)
* [C64 Ultimate Wiki: Technical Specifications](https://c64u.org/dokuwiki/technical_specifications)
* [Time Extension: Commodore 64 Ultimate review](https://www.timeextension.com/reviews/commodore-64-ultimate-the-gold-standard-of-retro-computer-revivals)
* [Hackster.io: A Hands-On Review of the Commodore 64 Ultimate](https://www.hackster.io/news/keeping-up-with-the-commodore-a-hands-on-review-of-the-commodore-64-ultimate-235da0c5e23a)
* [Hackster.io: The Commodore 64 Returns, As the FPGA-Powered Commodore 64 Ultimate](https://www.hackster.io/news/the-commodore-64-returns-as-the-fpga-powered-commodore-64-ultimate-4a8ea04e9dab)
* [Techaeris: Commodore 64C Ultimate ships today](https://techaeris.com/2026/10/27/commodore-64c-ultimate-ships-today/)
