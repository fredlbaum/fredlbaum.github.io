---
title: "Baofeng UV-5R with Diamond SRJ77CA"
category: "portable"
description: "The classic budget dual-band handheld, upgraded with a Diamond SRJ77CA antenna and programmed with CHIRP."
model: "Baofeng UV-5R + Diamond SRJ77CA"
bands: "2m / 70cm"
status: "In Service"
order: 1
menuLabel: "Baofeng UV-5R"
menuTagline: "+ Diamond SRJ77CA"
---

The **Baofeng UV-5R** is probably the most common first radio in amateur radio: a small, inexpensive dual-band handheld that covers the 2 meter and 70 centimeter bands. Mine rides along with a **Diamond SRJ77CA** antenna in place of the stock "rubber duck," and its channels are programmed with **CHIRP**.

### The Radio: Baofeng UV-5R

| Component | Details |
|---|---|
| **Bands** | VHF and UHF; ham coverage includes 2m (144–148 MHz) and 70cm (420–450 MHz) |
| **Mode** | Analog FM, with CTCSS/DCS tones for repeaters |
| **Power** | Honestly? Unknown. Anywhere from 4 to 8 W high, depending on who you ask (see below) |
| **Memory** | 128 channels |
| **Antenna connector** | SMA-male on the radio (takes SMA-female antennas) |
| **Battery** | 7.4 V Li-ion pack |

It's a lot of radio for the price, which is exactly why it's everywhere: hitting local repeaters, simplex with friends, emergency kits, and Field Day. It's no match for a premium handheld on receive filtering or audio, but as a first or "glovebox" radio it's hard to beat.

About that power row: I genuinely have no idea what this radio puts out. The specs I've found contradict each other. Wikipedia says 5 W, plenty of sellers list 4 W high and 1 W low, and some variants of the same model are sold as "8 W." Without a wattmeter to settle it, I'm calling it "enough to hit the local repeater."

My other gripe is memory. 128 channels fills up fast once you add local repeaters, simplex frequencies, and NOAA weather. Memory chips have gotten almost absurdly cheap over the years, yet so many budget handhelds still ship with the same 128 slots this radio had over a decade ago, and only a few newer models have finally caught up. I'd happily trade a flashlight feature for a few hundred more memory slots.

One responsibility comes with it: the UV-5R can transmit well outside the amateur bands. Transmitting on ham frequencies requires an amateur license, and the radio isn't certified for services like GMRS, so it's worth keeping the channels on bands you're licensed for.

### The Antenna: Diamond SRJ77CA

The stock antenna is the UV-5R's weakest link, and swapping it is the most common upgrade. The **Diamond SRJ77CA** is a 2m/70cm whip about 15 inches long, with an **SMA-female** connector, the version made for Baofeng-style radios. (Diamond's otherwise similar SRH77CA has an SMA-male connector for Yaesu and Icom handhelds, so the "J" matters.)

| Component | Details |
|---|---|
| **Bands** | 2m (144–148 MHz) / 70cm (430–450 MHz) transmit; wide receive coverage |
| **Length** | About 15 in (38 cm) |
| **Connector** | SMA-female |
| **Gain** | Rated by Diamond at +6 dB over typical stock HT antennas |
| **Power rating** | 10 W |
| **Impedance** | 50 Ω |

A longer, better-matched antenna is the cheapest way to get more range out of a handheld, on both transmit and receive.

### Programming It with CHIRP

Programming the UV-5R from the keypad is doable, just slow and fiddly: one menu number at a time for the frequency, offset, tone, and name of every channel. It was the same story with my Wouxun (now retired), and the same fix applies: CHIRP makes programming much more enjoyable. [CHIRP](https://chirpmyradio.com/) is free, open-source software (Windows, macOS, and Linux) that lets you edit every channel in a spreadsheet-like grid instead. You'll need a USB programming cable with the two-pin Kenwood-style plug; most use a CH340 or Prolific PL2303 chip, and the matching driver needs to be installed (older counterfeit Prolific cables are a common source of trouble). With the radio switched on and the plug pushed firmly all the way into the jack, choose **Radio → Download From Radio** in CHIRP, pick the cable's port, and select **Baofeng** and **UV-5R**. Save that download as a backup before changing anything. Then fill in frequencies, offsets, and tones (CHIRP can also import local repeater lists), and use **Radio → Upload To Radio** to send the new channel plan back. If it can't talk to the radio, the usual culprits are the cable not being fully seated, the wrong port, or the wrong driver.

### Sources

* [Baofeng UV-5R (Wikipedia)](https://en.wikipedia.org/wiki/Baofeng_UV-5R) and [RadioReference Wiki](https://wiki.radioreference.com/index.php/Baofeng_UV-5R)
* [Diamond SRJ77CA at DX Engineering](https://www.dxengineering.com/parts/DMN-SRJ77CA) and [Walcott Radio](https://www.walcottradio.com/diamond-antenna-srj77ca-p-2713.html)
* [CHIRP](https://chirpmyradio.com/) and [Radioddity: How to Program Baofeng UV-5R Series with Software](https://www.radioddity.com/blogs/all/how-to-program-baofeng-uv-5r-uv-5r-plus-with-software)
