# EcoDrive+
## Drive Green. Earn Green. Grow Green.

**Team Name:** Team EcoDrive+  
**Hackathon:** MBOT Fuel Not Found Hackathon 2026  
**Theme:** EV Dashboard: Smart Carbon Savings and Eco-Driving Assistant

---

## 1. Problem Statement

Electric vehicle drivers often purchase EVs because they want to reduce environmental impact, yet the daily driving experience rarely shows that impact clearly. Current EV dashboards mostly display operational information such as battery percentage, speed, remaining range, and charging status. These values are necessary, but they do not help drivers understand how much carbon they are saving or how their driving habits affect energy consumption.

This creates a behaviour gap. A driver may accelerate too aggressively, brake too late, drive at high drag speeds, or choose routes that waste energy without receiving immediate feedback. The environmental benefit of the EV is still present, but the driver cannot see it, learn from it, or improve it. Carbon savings remain abstract, and abstract impact is difficult to turn into motivation.

The challenge is therefore not only to build a better dashboard. The real challenge is to create a system that makes carbon savings visible, understandable, rewarding, and actionable in real time.

Our target users are EV drivers, new EV owners, student drivers, campus shuttle operators, and institutions such as UTAR that may want to track fleet-level sustainability performance.

---

## 2. Solution Description

EcoDrive+ is a real-time EV sustainability platform that combines a live driving dashboard, embedded hardware feedback, carbon impact analytics, and gamified behaviour change. The system uses an ESP32-based sensor unit to detect driving behaviour and sends telemetry to a web dashboard where users can see their eco-score, carbon savings, route efficiency, rewards, and community progress.

The solution is built around five core modules.

**Live Drive Dashboard:** The main dashboard shows a real-time eco-score, speed, distance, energy estimate, carbon saved, EcoCoins earned, and instant driving advice. The driver can immediately see whether their behaviour is efficient, risky, or wasteful.

**ESP32 Eco-Feedback Unit:** The ESP32 reads motion data from an MPU6050 accelerometer/gyroscope and optional GPS data from a NEO-6M module. It calculates a local eco-score and provides feedback through an OLED screen, RGB LED strip, and buzzer. This allows the driver to receive feedback without needing to stare at a phone.

**Impact Engine:** The platform converts driving data into meaningful sustainability metrics, including kWh used, kg CO2 saved compared with a petrol vehicle baseline, range impact, and EcoCoins. The formulas are transparent so judges and users can understand how the result is produced.

**CarbonTwin and Eco-City:** Efficient driving grows a virtual forest and earns EcoCoins that can be spent in an 8x8 sustainable city builder. Users can place solar farms, parks, wind turbines, EV charging hubs, recycling centres, and eco-schools. Strategic adjacency bonuses teach sustainability concepts, such as pairing solar farms with EV charging hubs.

**Community and Fleet Mode:** Users can compare eco-scores, join campus challenges, and contribute to collective carbon reduction goals. A fleet dashboard shows how the same system could be used for campus shuttle EVs or institutional sustainability reporting.

---

## 3. Technical Explanation and Architecture

EcoDrive+ uses both software and embedded systems. The website and backend are designed for a polished pitch demonstration, while the ESP32 firmware proves that the idea is connected to real sensor data rather than only a simulation.

**Recommended implementation stack:**

| Layer | Technology |
|---|---|
| Firmware | C++ using Arduino framework or PlatformIO |
| Hardware | ESP32, MPU6050, NEO-6M GPS, SSD1306 OLED, WS2812B LED strip, buzzer |
| Web app | Next.js, React, TypeScript, Tailwind CSS |
| Backend | Node.js, TypeScript, WebSocket server, REST APIs |
| Database | SQLite for local demo persistence |
| Visualization | Recharts, Leaflet/OpenStreetMap, optional Three.js for forest/city |

**System architecture:**

```text
ESP32 Sensor Unit
  reads motion/GPS data
  calculates local eco-score
  updates OLED, LEDs, buzzer
        |
        | JSON telemetry over WiFi
        v
Realtime Gateway
  validates packets
  stores trip events
  broadcasts updates
        |
        v
Impact Engine
  calculates kWh estimate
  calculates CO2 saved
  awards EcoCoins
  updates city, forest, leaderboard
        |
        v
Next.js Dashboard
  live drive view
  route planner
  CarbonTwin forest
  Eco-City builder
  community and fleet views
```

The eco-score is calculated locally using a weighted formula:

```text
eco_score =
  smoothness_score x 0.40 +
  braking_score    x 0.25 +
  speed_score      x 0.20 +
  cornering_score  x 0.15
```

This approach is intentionally explainable. Smooth acceleration, gentle braking, stable speed, and safe cornering produce a higher score. Harsh braking or aggressive acceleration immediately lowers the score and triggers visible feedback.

The ESP32 sends a telemetry packet such as:

```json
{
  "deviceId": "ecodrive-demo-01",
  "speedKmh": 48.2,
  "ecoScore": 84,
  "event": "smooth_segment",
  "energyKwh": 0.18,
  "co2SavedKg": 0.92
}
```

The web dashboard receives this data in real time and updates the score gauge, event feed, carbon savings, EcoCoin balance, virtual forest, city state, and leaderboard.

---

## 4. Expected Demo: Live Demonstration

The final demonstration will use a physical ESP32 prototype placed beside a laptop running the EcoDrive+ website.

First, we will show the problem by comparing a normal EV dashboard with EcoDrive+. A normal dashboard can show battery and range, but it does not show the driver's real carbon impact or guide better behaviour.

Next, we will start the live dashboard and connect the ESP32 unit. When the sensor board is held steadily, the dashboard will show a high eco-score, the LED strip will stay green, and the OLED will display a positive message such as "Excellent driving." The website will show smooth driving, rising CO2 savings, and EcoCoins being earned.

Then, we will jolt or tilt the board to simulate harsh acceleration, hard braking, or sharp turning. The ESP32 will detect the event, the LED strip will change to red or amber, the buzzer will beep, and the OLED will show a warning. At the same time, the website will show the eco-score dropping, an event appearing in the live feed, and advice such as "Brake earlier to recover more energy."

After returning to smooth movement, the score will recover. The dashboard will award EcoCoins for a smooth streak. We will then switch to the CarbonTwin and Eco-City screens to show the reward becoming visible: a tree grows, coins are added, and the user can place a sustainable building such as a solar-powered charging hub.

Finally, we will show the community and fleet views. This demonstrates that EcoDrive+ can scale beyond one driver into campus challenges, team leaderboards, carbon reporting, and fleet management for campus EVs.

If GPS signal or WiFi is unstable during the presentation, the system will include an indoor simulator mode and a recorded backup demo. We will clearly explain which parts are live and which parts are simulated.

---

## 5. Impact, Future Improvements, and Conclusion

EcoDrive+ creates impact by changing how drivers understand their EV behaviour. Instead of treating sustainability as a hidden number, the system translates each trip into visible carbon savings, energy efficiency, rewards, and progress. This can encourage smoother driving, reduce wasted energy, and make EV ownership more educational and engaging.

For individual drivers, EcoDrive+ provides immediate awareness and positive reinforcement. For students and campus communities, the leaderboard and community goals make sustainability social. For institutions, the fleet mode can support reporting by showing total CO2 saved, average eco-score, harsh braking zones, and vehicle behaviour trends.

The project also has strong educational value. Users learn how acceleration, braking, speed, route choice, and charging decisions affect energy consumption. The Eco-City builder reinforces sustainability concepts by connecting gameplay decisions to real-world ideas such as renewable energy, green infrastructure, and circular economy.

Future improvements include a machine learning coaching model, more accurate route energy prediction, weather-aware driving tips, real EV charging station integration, real reward partnerships, and monthly downloadable carbon certificates. The platform could also expand into campus fleet deployment, insurance eco-driving programmes, or city-level road behaviour analytics.

In conclusion, EcoDrive+ is more than an EV dashboard. It is a complete sustainability feedback loop that senses driving behaviour, explains carbon impact, rewards improvement, and turns individual eco-driving into community progress. By combining ESP32 hardware, C++ firmware, a real-time web dashboard, and gamified sustainability, EcoDrive+ directly addresses the hackathon theme while offering a creative and technically convincing path toward greener driving behaviour.
