# Smart City Network - PBL Interactive Presentation App

An interactive college Project Based Learning (PBL) presentation application simulating the design and architecture of a resilient Smart City Communication Network using Jetpack Compose design principles, dark navy & electric-blue visual hierarchy, and live packet-flow topology simulations.

## User Review & Critical Decisions

> [!IMPORTANT]
> Based on your preferences from Turn 1:
> - **Delivery Format**: An interactive web presentation featuring a toggleable **Android Device Frame Preview Switch** (Full Presentation Mode ↔ Android Phone Simulator Mode) plus a dedicated **Jetpack Compose Source Viewer / Export Drawer** containing clean, reusable Kotlin Jetpack Compose code for Android Studio.
> - **Editable Placeholders**: Hero presentation metadata (Student Name, Department, College Name, Guide Name) will start blank with clean placeholder prompts and live inline editing with local persistence so presenters can type their details in real-time.
> - **Topology Interactivity**: Clickable location nodes with dynamic subnet breakdowns, CIDR math, and an animated SVG packet simulation showing transit between WAN Transit (`10.255.0.0/29`), OSPF Area 0, and city departments.

---

## 1. Overview & Core Concept

- **What It Does**: Provides a college presentation platform for demonstrating modern enterprise network engineering. It illustrates how a smart municipality structures traffic segmentation (VLANs), route calculation (OSPF Area 0), inter-VLAN routing (Router-on-a-Stick / SVI), and dynamic host assignment (DHCP).
- **Target Audience & Presentation Persona**: Engineering students, faculty evaluators, and network lab examiners at Brainware University reviewing network topology design, addressing schemes, and deployment configurations.
- **Key Value**: Bridges theoretical computer networking (802.1Q tags, transit subnets, wildcard masks) with a visual presentation tool that can be projected on a seminar screen or viewed in an Android phone frame.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Presenter Setup & Launch**:
   - Presenter lands on the dark navy stage.
   - Enters their Name, Department, College Name ("Brainware University"), and Guide Name into the editable hero badges.
   - Clicks "Explore Network Design" to trigger a smooth scroll down to the Interactive Network Topology.

2. **Interactive Topology Exploration & Packet Flow**:
   - The user views the central Metro Ethernet WAN (`10.255.0.0/29`, OSPF Area 0) connected to four city branches:
     - **City Data Centre** (VLANs 10, 20, 30, 99 · `10.10.0.0/16`)
     - **Smart Hospital** (VLANs 110, 120, 130, 199 · `10.20.0.0/16`)
     - **Public Safety Centre** (VLANs 210, 220, 230, 299 · `10.30.0.0/16`)
     - **Traffic & IoT Centre** (VLANs 310, 320, 330, 399 · `10.40.0.0/16`)
   - Clicking any location card reveals its dedicated detail inspector with Router Hostname, Gateway IP, VLAN ID breakdown, purpose, subnet mask, and an interactive **Simulate Ping / Packet Route** trigger that animates data packets pulsing from that location across the WAN core.

3. **Curriculum Section Walkthrough**:
   - **Project Overview & Objectives**: Clean cards explaining multi-service separation, VLAN boundaries, and OSPF convergence.
   - **3-Tier Hierarchical Model**: Access, Distribution, and Core layers with role descriptions and port types.
   - **Addressing Matrix Table**: Tabular breakdown with monospace tabular-nums for subnet addresses, usable hosts, and management VLANs.
   - **Technology Cards**: Router-on-a-stick, 802.1Q encapsulation, link-state routing, and DHCP pool leases.
   - **Cisco CLI Configuration Examples**: 4 formatted code blocks with single-click "Copy Command" feedback.
   - **Validation & Troubleshooting**: Cisco verification commands (`show vlan brief`, `show interfaces trunk`, `show ip ospf neighbor`, `show ip route ospf`, `show ip dhcp binding`, `ping remote PC`) with simulated terminal output tabs.
   - **Security & Scalability**: Best-practice guidelines (ACLs, management plane security, SSH v2, modular growth).

4. **Android Frame & Kotlin Compose Source Mode**:
   - Presenters can toggle between **Full Presentation Mode** and **Android Pixel 8 Simulator Mode** to see how the Jetpack Compose layout behaves on mobile touch devices.
   - An "Android Studio Source Code" button opens an inspector containing production-grade Kotlin files (`MainActivity.kt`, `SmartCityScreen.kt`, `Components.kt`) matching Compose idioms.

### Visual Identity & Theme

- **Palette**:
  - Dominant Neutral Canvas (60%): Deep Navy Midnight (`#090E17`, `#0F172A`)
  - Structural Surfaces (30%): Dark Slate (`#1E293B`, `#162032`) with hairline borders (`#2A3B53`)
  - Electric-Blue Focal Accent (10%): Electric Blue (`#00E5FF`, `#38BDF8`, `#0284C7`) for glowing active states, packet pulses, and button highlights
  - Typography: Clean sans-serif display typography (`Outfit` / `Plus Jakarta Sans`) paired with crisp monospace (`JetBrains Mono` / `IBM Plex Mono`) for network addresses and Cisco CLI blocks.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Responsive Dual-View (Web Presentation + Android Simulator Frame)**:
  - *Chosen Approach*: Deliver a desktop-ready wide presentation view with a top toggle to switch into an Android smartphone frame (390px viewport with status bar, dynamic navigation, and gesture scroll).
  - *Why*: Allows students to project on a large screen during their defense while simultaneously proving responsive mobile ergonomics and showing how it runs as an Android app.
- **Decision 2: Live-Editable Presentation Placeholders with Storage**:
  - *Chosen Approach*: Reactive input fields initialized blank as requested, with immediate visual feedback and persistent saving so students can rehearse their live talk without losing entered details on page refresh.
- **Decision 3: Complete Offline Autonomy**:
  - *Chosen Approach*: Zero external network dependencies, no backend DB or payment SDKs, pure client-side reactive state and SVG animation for rock-solid reliability in university lecture halls.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        App Root (App.tsx)                              │
│   ├── View Mode Controller (Full Web Presentation vs Android Device)   │
│   └── Presenter State (Student, Dept, College, Guide)                  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┴───────────────────────────────┐
    ▼                                                               ▼
┌───────────────────────────────────────┐   ┌───────────────────────────────────┐
│     Hero & Presenter Section          │   │  Android Studio Source Inspector  │
│  - Presentation Titles                │   │  - MainActivity.kt                │
│  - Live-Editable Presenter Credentials│   │  - SmartCityScreen.kt (Compose)   │
│  - Smooth-Scroll CTA                  │   │  - Direct Copy & Export           │
└───────────────────┬───────────────────┘   └───────────────────────────────────┘
                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│              Interactive Network Topology (TopologySection)           │
│  - Metro Ethernet WAN Card (10.255.0.0/29 · OSPF Area 0)              │
│  - 4 Branch Location Nodes (Data Centre, Hospital, Safety, Traffic)   │
│  - Animated SVG Packet Simulator (Transit Flow & Ping Latency)        │
│  - Selected Location Details Card (VLAN Breakdown & Addressing)       │
└───────────────────┬───────────────────────────────────────────────────┘
                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│              Academic Curriculum Modules (Cards & Tables)             │
│  - Section 2: Project Overview (Segmentation, OSPF, Services)         │
│  - Section 3: Objectives (5 Compose-styled ObjectiveCards)            │
│  - Section 5: Hierarchical Network Design (Core, Distribution, Access)│
│  - Section 6: VLAN & IP Addressing Table (Tabular Monospace View)     │
│  - Section 7: Technology Stack Cards (ROAS, 802.1Q, OSPF, DHCP)       │
│  - Section 8: Cisco Configuration Code Cards with 1-Click Copy        │
│  - Section 9: Verification & Diagnostic Test Cards with Output View   │
│  - Section 10: Security & Scalability Strategies                      │
│  - Section 11: University Footer (Brainware University)               │
└───────────────────────────────────────────────────────────────────────┘
```

### Component Structure
- `HeroSection`: Editable presentation metadata fields, title lockup, and smooth scroll trigger.
- `OverviewSection` & `ObjectivesSection`: Reusable `ObjectiveCard` components with clear icons and bullet points.
- `TopologySection`: SVG interactive canvas with animated packet transmission, 4 location cards, and active subnet drawer.
- `HierarchySection`: 3-layer architecture visualizer (Access, Distribution, Core).
- `AddressingTableSection`: Clean tabular presentation of subnet masks, VLAN IDs, and gateway IPs.
- `TechnologySection`: In-depth concept cards explaining Inter-VLAN routing, OSPF Dijkstra SPF algorithm, and DHCP leases.
- `ConfigurationSection`: Reusable `CodeCard` components featuring Cisco IOS syntax highlighting and copy confirmation.
- `TestingSection`: Diagnostic command execution cards with terminal-style outputs (`show ip route ospf`, etc.).
- `SecuritySection`: Best practices for enterprise and municipal IoT hardening.
- `ComposeCodeDrawer`: Full Kotlin Jetpack Compose code viewer with tabs for `MainActivity.kt`, `SmartCityScreen.kt`, and `Components.kt`.
- `Footer`: Academic attribution and university branding.
