import React, { useState, useRef } from 'react';
import {
  LOCATIONS,
  HIERARCHICAL_LAYERS,
  CISCO_CONFIGS,
  TEST_COMMANDS
} from './data/networkData';
import { PresenterDetails } from './types/network';
import { SectionTitle } from './components/SectionTitle';
import { InfoCard } from './components/InfoCard';
import { ObjectiveCard } from './components/ObjectiveCard';
import { CodeCard } from './components/CodeCard';
import { HeroSection } from './components/HeroSection';
import { NetworkTopologyInteractive } from './components/NetworkTopologyInteractive';
import { ComposeCodeModal } from './components/ComposeCodeModal';

import {
  Network,
  Layers,
  Route,
  Server,
  ShieldCheck,
  Terminal,
  CheckCircle,
  Cpu,
  Lock,
  Workflow,
  Smartphone,
  Monitor,
  Wifi,
  Copy,
  Check
} from 'lucide-react';

export default function App() {
  // Presenter details initialized blank for live editing during presentation
  const [presenter, setPresenter] = useState<PresenterDetails>({
    studentName: '',
    department: '',
    collegeName: '',
    guideName: ''
  });

  // Device view mode: 'presentation' (full wide desktop/projector) vs 'phone' (Android Studio Pixel 8 simulator)
  const [viewMode, setViewMode] = useState<'presentation' | 'phone'>('presentation');

  // Modal for Jetpack Compose source code
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  // Active testing tab for section 9
  const [activeTestIndex, setActiveTestIndex] = useState(0);

  // Copy feedback for individual test outputs
  const [copiedTestCmd, setCopiedTestCmd] = useState<string | null>(null);

  const topologyRef = useRef<HTMLDivElement>(null);

  const scrollToTopology = () => {
    topologyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopyTestCmd = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedTestCmd(cmd);
    setTimeout(() => setCopiedTestCmd(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070c18] text-slate-100 flex flex-col selection:bg-[#00E5FF] selection:text-slate-950">
      {/* Top Application Bar (Clean 3-zone contract) */}
      <header className="sticky top-0 z-40 bg-[#070c18]/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Zone 1: Brand wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-[#00E5FF] shadow-sm shadow-cyan-500/20">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Smart City Network</span>
                <span className="hidden sm:inline-block font-mono text-[11px] px-2 py-0.5 rounded bg-cyan-950/80 text-[#00E5FF] border border-cyan-500/30">
                  PBL Presentation
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block">
                Jetpack Compose · VLANs · Inter-VLAN · OSPF · DHCP
              </p>
            </div>
          </div>

          {/* Zone 2: Presentation Navigation shortcuts */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-400">
            <a href="#hero" className="hover:text-[#00E5FF] transition-colors whitespace-nowrap">Overview</a>
            <a href="#topology-section" className="hover:text-[#00E5FF] transition-colors whitespace-nowrap">Topology</a>
            <a href="#hierarchy" className="hover:text-[#00E5FF] transition-colors whitespace-nowrap">Hierarchy</a>
            <a href="#addressing" className="hover:text-[#00E5FF] transition-colors whitespace-nowrap">Addressing</a>
            <a href="#configs" className="hover:text-[#00E5FF] transition-colors whitespace-nowrap">Cisco Configs</a>
            <a href="#testing" className="hover:text-[#00E5FF] transition-colors whitespace-nowrap">Verification</a>
          </nav>

          {/* Zone 3: Interactive Controls (Device Switch + Kotlin Code Modal) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Viewport switch: Web Presentation vs Android Phone Frame */}
            <div className="flex items-center p-1 rounded-xl bg-[#131d38] border border-slate-800">
              <button
                onClick={() => setViewMode('presentation')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                  viewMode === 'presentation'
                    ? 'bg-[#00E5FF] text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Full Screen Projector / Desktop Presentation"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Presentation</span>
              </button>
              <button
                onClick={() => setViewMode('phone')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                  viewMode === 'phone'
                    ? 'bg-[#00E5FF] text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Android Phone Frame Simulator"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Android View</span>
              </button>
            </div>

            {/* Kotlin Jetpack Compose Code Inspector Button */}
            <button
              onClick={() => setIsCodeModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/80 text-[#00E5FF] text-xs font-semibold border border-cyan-500/40 shadow-sm transition-all hover:scale-105 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">Kotlin Code</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        {/* If Phone Mode is enabled, wrap in an authentic Android device mockup */}
        <div
          className={
            viewMode === 'phone'
              ? 'max-w-[420px] mx-auto my-4 rounded-[42px] border-8 border-slate-800 bg-[#070c18] shadow-2xl overflow-hidden ring-1 ring-cyan-500/30'
              : 'max-w-6xl mx-auto'
          }
        >
          {/* Android Status Bar (Only visible in Phone Mode) */}
          {viewMode === 'phone' && (
            <div className="bg-[#0b1329] px-6 py-2.5 flex items-center justify-between text-xs text-slate-400 border-b border-slate-800">
              <span className="font-mono text-[11px] font-semibold text-white">10:45</span>
              <div className="w-16 h-3 rounded-full bg-slate-900 border border-slate-700/80 mx-auto" />
              <div className="flex items-center gap-1.5 text-[11px]">
                <Wifi className="w-3 h-3 text-[#00E5FF]" />
                <span className="font-mono">5G</span>
                <span className="font-mono text-emerald-400">98%</span>
              </div>
            </div>
          )}

          <div className="space-y-16 p-2 sm:p-4">
            {/* ========================================================
                1. HERO SECTION
               ======================================================== */}
            <div id="hero">
              <HeroSection
                presenter={presenter}
                onChangePresenter={(updated) => setPresenter((prev) => ({ ...prev, ...updated }))}
                onExploreClick={scrollToTopology}
              />
            </div>

            {/* ========================================================
                2. PROJECT OVERVIEW
               ======================================================== */}
            <section id="overview" className="scroll-mt-20">
              <SectionTitle
                number="02"
                title="Project Overview"
                subtitle="High-density municipal services connected over a segmented and fault-tolerant infrastructure"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <InfoCard
                  title="Multi-Service City Fabric"
                  subtitle="Unified Municipal Services"
                  icon={<Cpu className="w-5 h-5" />}
                  highlight
                >
                  <p>
                    A modern smart city integrates mission-critical services under one communication infrastructure, including:
                  </p>
                  <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 mt-1">
                    <li><strong className="text-white">Smart Hospitals:</strong> ICU telemetry and patient records</li>
                    <li><strong className="text-white">Public Safety:</strong> Emergency dispatch and CCTV video</li>
                    <li><strong className="text-white">Traffic Control:</strong> Adaptive signals and IoT sensors</li>
                    <li><strong className="text-white">City Data Centre:</strong> Central database and citizen portals</li>
                  </ul>
                </InfoCard>

                <InfoCard
                  title="VLAN Traffic Separation"
                  subtitle="Layer 2 Logical Isolation"
                  icon={<ShieldCheck className="w-5 h-5" />}
                >
                  <p>
                    Without segmentation, broadcast storms from IoT sensors would flood hospital patient monitoring systems.
                  </p>
                  <p>
                    <strong>Virtual Local Area Networks (VLANs)</strong> isolate each department into its own broadcast domain, preventing unauthorized access and ensuring confidential patient and police data remains private.
                  </p>
                </InfoCard>

                <InfoCard
                  title="OSPF Pathfinding & Convergence"
                  subtitle="Layer 3 Dynamic Routing"
                  icon={<Route className="w-5 h-5" />}
                >
                  <p>
                    The <strong>Open Shortest Path First (OSPF)</strong> protocol runs in Area 0 across the Metro Ethernet WAN transit network.
                  </p>
                  <p>
                    OSPF dynamically detects link failures, calculates the shortest path using Dijkstra’s algorithm, and guarantees sub-second failover for emergency services.
                  </p>
                </InfoCard>
              </div>
            </section>

            {/* ========================================================
                3. OBJECTIVES
               ======================================================== */}
            <section id="objectives" className="scroll-mt-20">
              <SectionTitle
                number="03"
                title="Project Objectives"
                subtitle="Key academic goals and engineering deliverables realized in this network simulation"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <ObjectiveCard
                  index={1}
                  title="Hierarchical Network Design"
                  protocolBadge="Cisco 3-Tier"
                  description="Deploy Access, Distribution, and Core layers to ensure high modularity, high throughput, and fault isolation across municipal districts."
                  keyFeature="Core / Dist / Access separation"
                  icon={<Layers className="w-5 h-5" />}
                />

                <ObjectiveCard
                  index={2}
                  title="VLAN Configuration"
                  protocolBadge="IEEE 802.1Q"
                  description="Partition switch broadcast domains for administration, servers, telemetry, and visitor traffic using distinct 802.1Q VLAN IDs."
                  keyFeature="Secure Departmental Segmentation"
                  icon={<Lock className="w-5 h-5" />}
                />

                <ObjectiveCard
                  index={3}
                  title="Inter VLAN Routing"
                  protocolBadge="Router-on-a-Stick"
                  description="Configure logical 802.1Q subinterfaces with default gateway assignments to enable controlled routed communication between separate VLANs."
                  keyFeature="Subinterface Encapsulation"
                  icon={<Workflow className="w-5 h-5" />}
                />

                <ObjectiveCard
                  index={4}
                  title="OSPF Routing"
                  protocolBadge="OSPFv2 Area 0"
                  description="Establish dynamic multi-district routing over the Metro Ethernet WAN with fast convergence and autonomous neighbor adjacency."
                  keyFeature="Dijkstra Shortest Path First"
                  icon={<Route className="w-5 h-5" />}
                />

                <ObjectiveCard
                  index={5}
                  title="DHCP Automatic IP Addressing"
                  protocolBadge="IOS DHCP Pool"
                  description="Eliminate manual static addressing errors by deploying centralized DHCP pools that lease IP addresses, masks, and gateways automatically."
                  keyFeature="Zero-Touch Host Onboarding"
                  icon={<Server className="w-5 h-5" />}
                />
              </div>
            </section>

            {/* ========================================================
                4. INTERACTIVE NETWORK TOPOLOGY
               ======================================================== */}
            <section id="topology-section" ref={topologyRef} className="scroll-mt-20">
              <SectionTitle
                number="04"
                title="Interactive Network Topology"
                subtitle="Four municipal branches linked through the central Metro Ethernet WAN (10.255.0.0/29 · OSPF Area 0)"
              />

              <NetworkTopologyInteractive />
            </section>

            {/* ========================================================
                5. HIERARCHICAL NETWORK DESIGN
               ======================================================== */}
            <section id="hierarchy" className="scroll-mt-20">
              <SectionTitle
                number="05"
                title="Hierarchical Network Design"
                subtitle="Structured Cisco 3-Tier Enterprise model preventing bottlenecks and isolating faults"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {HIERARCHICAL_LAYERS.map((layer, idx) => (
                  <div
                    key={layer.name}
                    className="rounded-xl border border-slate-800 bg-[#131d38] p-5 sm:p-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-[#00E5FF] font-bold">
                          Tier 0{idx + 1}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {idx === 0 ? 'Edge Tier' : idx === 1 ? 'Aggregation Tier' : 'Backbone Tier'}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-1">
                        {layer.name}
                      </h3>
                      <div className="text-xs font-semibold text-[#38BDF8] mb-3">
                        {layer.role}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                        {layer.description}
                      </p>

                      <div className="p-2.5 rounded-lg bg-[#0b1329] border border-slate-800 mb-4">
                        <div className="text-[11px] text-slate-400 font-medium">Standard Hardware:</div>
                        <div className="text-xs font-mono font-bold text-slate-200 mt-0.5">
                          {layer.equipment}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 space-y-1.5">
                      <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2">
                        Key Capabilities:
                      </div>
                      {layer.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ========================================================
                6. VLAN AND IP ADDRESSING
               ======================================================== */}
            <section id="addressing" className="scroll-mt-20">
              <SectionTitle
                number="06"
                title="VLAN and IP Addressing"
                subtitle="Structured Classless Inter-Domain Routing (CIDR) matrix allocating unique subnets per department"
              />

              <div className="rounded-xl border border-slate-800 bg-[#131d38] overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#0b1329] text-slate-300 uppercase tracking-wider text-[11px] border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4 font-semibold">Location</th>
                        <th className="py-3 px-4 font-semibold">Configured VLANs</th>
                        <th className="py-3 px-4 font-semibold">Management VLAN</th>
                        <th className="py-3 px-4 font-semibold">Address Block</th>
                        <th className="py-3 px-4 font-semibold">Router Subnet Gateway</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {LOCATIONS.map((loc) => (
                        <tr key={loc.id} className="hover:bg-[#182444]/60 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: loc.color }} />
                            <span>{loc.name}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex flex-wrap gap-1.5">
                              {loc.vlans.map((vid) => (
                                <span
                                  key={vid}
                                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200"
                                >
                                  VLAN {vid}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded bg-amber-950/70 border border-amber-500/40 text-amber-300 font-bold">
                              VLAN {loc.managementVlan}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-[#00E5FF]">
                            {loc.addressBlock}
                          </td>
                          <td className="py-3.5 px-4 text-emerald-300">
                            {loc.addressBlock.replace('.0.0/16', '.10.1')} (g0/0.10)
                          </td>
                        </tr>
                      ))}
                      {/* WAN Transit Row */}
                      <tr className="bg-cyan-950/20 font-bold">
                        <td className="py-3.5 px-4 text-[#00E5FF] flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
                          <span>Metro Ethernet WAN Transit</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400">Point-to-Point Transit</td>
                        <td className="py-3.5 px-4 text-slate-400">N/A (Routed Core)</td>
                        <td className="py-3.5 px-4 text-[#00E5FF]">10.255.0.0/29</td>
                        <td className="py-3.5 px-4 text-emerald-300">10.255.0.1 - 10.255.0.6 (Area 0)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-[#0c142b] border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
                  <span>Subnet Mask: 255.255.0.0 (/16 Supernet) · WAN Transit Mask: 255.255.255.248 (/29)</span>
                  <span className="text-[#38BDF8]">All gateways configure VRRP / HSRP redundancy in production</span>
                </div>
              </div>
            </section>

            {/* ========================================================
                7. TECHNOLOGY USED
               ======================================================== */}
            <section id="technologies" className="scroll-mt-20">
              <SectionTitle
                number="07"
                title="Technology Used"
                subtitle="Industry-standard network protocols and architectural techniques powering the smart city"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InfoCard
                  title="Virtual Local Area Networks (VLANs)"
                  subtitle="IEEE 802.1Q Frame Tagging"
                  icon={<Layers className="w-5 h-5" />}
                >
                  <p>
                    VLANs break a single physical switch into multiple isolated logical broadcast domains. Each Ethernet frame is tagged with a 12-bit VLAN identifier (IEEE 802.1Q) as it crosses trunk links.
                  </p>
                  <p>
                    <strong>Why it matters:</strong> Guarantees that public Wi-Fi or IoT traffic cannot snoop on ICU hospital telemetry or municipal tax databases.
                  </p>
                </InfoCard>

                <InfoCard
                  title="Router-on-a-Stick & Inter-VLAN"
                  subtitle="Layer 3 Subinterface Routing"
                  icon={<Workflow className="w-5 h-5" />}
                >
                  <p>
                    Because VLANs are separate Layer 2 networks, hosts in different VLANs cannot communicate without a Layer 3 routing engine.
                  </p>
                  <p>
                    <strong>Router-on-a-Stick (ROAS)</strong> utilizes a single physical GigabitEthernet link partitioned into logical subinterfaces (e.g. <code className="font-mono text-[#00E5FF]">g0/0.10</code>), each serving as the default gateway for its respective VLAN.
                  </p>
                </InfoCard>

                <InfoCard
                  title="Open Shortest Path First (OSPF)"
                  subtitle="Interior Gateway Protocol (IGP) Area 0"
                  icon={<Route className="w-5 h-5" />}
                >
                  <p>
                    OSPF is an open-standard link-state routing protocol using Dijkstra’s Shortest Path First (SPF) algorithm. It builds an exact topology map of all municipal branch routers.
                  </p>
                  <p>
                    <strong>Key Benefit:</strong> Automatic route discovery, metric-based cost calculations, and zero routing loops across the Metro Ethernet WAN transit link.
                  </p>
                </InfoCard>

                <InfoCard
                  title="Dynamic Host Configuration Protocol (DHCP)"
                  subtitle="Automated IP Address Management"
                  icon={<Server className="w-5 h-5" />}
                >
                  <p>
                    DHCP automatically dispenses IP addresses, subnet masks, default gateways, and DNS server pointers to thousands of municipal endpoints (workstations, IoT sensors, cameras).
                  </p>
                  <p>
                    <strong>Advantage:</strong> Eliminates manual static configuration mistakes and speeds up device deployment across hospitals and traffic poles.
                  </p>
                </InfoCard>
              </div>
            </section>

            {/* ========================================================
                8. CONFIGURATION EXAMPLES
               ======================================================== */}
            <section id="configs" className="scroll-mt-20">
              <SectionTitle
                number="08"
                title="Configuration Examples"
                subtitle="Production-ready Cisco IOS CLI configuration scripts with one-click copy"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {CISCO_CONFIGS.map((cfg) => (
                  <CodeCard
                    key={cfg.id}
                    title={cfg.title}
                    category={cfg.category}
                    description={cfg.description}
                    code={cfg.code}
                  />
                ))}
              </div>
            </section>

            {/* ========================================================
                9. TESTING & DIAGNOSTICS
               ======================================================== */}
            <section id="testing" className="scroll-mt-20">
              <SectionTitle
                number="09"
                title="Testing & Verification"
                subtitle="Verification commands, execution checks, and expected Cisco IOS CLI outputs"
              />

              <div className="rounded-xl border border-slate-800 bg-[#131d38] overflow-hidden shadow-xl">
                {/* Command Selector Tabs */}
                <div className="flex overflow-x-auto p-2 bg-[#0b1329] border-b border-slate-800 gap-1.5 scrollbar-thin">
                  {TEST_COMMANDS.map((cmd, idx) => (
                    <button
                      key={cmd.command}
                      onClick={() => setActiveTestIndex(idx)}
                      className={`px-3 py-2 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all cursor-pointer ${
                        activeTestIndex === idx
                          ? 'bg-[#00E5FF] text-slate-950 font-bold shadow-md'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      {cmd.command}
                    </button>
                  ))}
                </div>

                {/* Active Test Execution Card */}
                <div className="p-5 sm:p-6 bg-[#0e172e]">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
                    <div>
                      <div className="text-xs font-mono text-[#00E5FF] mb-1 font-semibold">
                        DIAGNOSTIC TEST 0{activeTestIndex + 1}
                      </div>
                      <h4 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                        <span># {TEST_COMMANDS[activeTestIndex].command}</span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {TEST_COMMANDS[activeTestIndex].purpose}
                      </p>
                    </div>

                    <button
                      onClick={() => handleCopyTestCmd(TEST_COMMANDS[activeTestIndex].command)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                        copiedTestCmd === TEST_COMMANDS[activeTestIndex].command
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      {copiedTestCmd === TEST_COMMANDS[activeTestIndex].command ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Command</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Terminal Output Window */}
                  <div className="rounded-lg bg-[#070c18] border border-slate-800 p-4 font-mono text-xs overflow-x-auto shadow-inner">
                    <div className="flex items-center gap-1.5 mb-3 text-slate-600 select-none pb-2 border-b border-slate-800/80">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 text-[11px] text-slate-400 font-sans">
                        Cisco IOS Terminal Output Simulator
                      </span>
                    </div>
                    <pre className="text-emerald-400/90 leading-relaxed font-mono whitespace-pre">
                      {TEST_COMMANDS[activeTestIndex].expectedOutput}
                    </pre>
                  </div>

                  {/* Key Verification Criteria */}
                  <div className="mt-4 p-3.5 rounded-lg bg-[#14203d] border border-cyan-500/30 flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Validation Criteria: </strong>
                      {TEST_COMMANDS[activeTestIndex].keyVerification}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================
                10. SECURITY AND SCALABILITY
               ======================================================== */}
            <section id="security" className="scroll-mt-20">
              <SectionTitle
                number="10"
                title="Security and Scalability"
                subtitle="Hardening strategies and modular scaling architecture for municipal growth"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InfoCard
                  title="Network Security Hardening"
                  subtitle="Protection & Access Control"
                  icon={<ShieldCheck className="w-5 h-5" />}
                >
                  <ul className="space-y-2.5 text-xs text-slate-300 mt-1">
                    <li className="flex items-start gap-2">
                      <span className="text-[#00E5FF] font-bold">·</span>
                      <span>
                        <strong className="text-white">Use ACLs to limit guest Wi-Fi:</strong> Access Control Lists prevent hospital visitor devices on VLAN 130 from pinging or accessing internal medical databases on VLAN 120.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00E5FF] font-bold">·</span>
                      <span>
                        <strong className="text-white">Protect the management VLAN:</strong> Dedicate VLANs 99, 199, 299, and 399 exclusively for network administrators with strict firewall filters.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00E5FF] font-bold">·</span>
                      <span>
                        <strong className="text-white">Use SSH instead of Telnet:</strong> Enforce SSHv2 with RSA 2048-bit encryption for all remote switch and router CLI sessions, eliminating plaintext password sniffing.
                      </span>
                    </li>
                  </ul>
                </InfoCard>

                <InfoCard
                  title="Future Scalability & High Availability"
                  subtitle="Modular Municipal Expansion"
                  icon={<Workflow className="w-5 h-5" />}
                >
                  <ul className="space-y-2.5 text-xs text-slate-300 mt-1">
                    <li className="flex items-start gap-2">
                      <span className="text-[#00E5FF] font-bold">·</span>
                      <span>
                        <strong className="text-white">Add more VLANs when needed:</strong> The hierarchical switch structure accommodates up to 4094 VLANs without altering physical campus cabling.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00E5FF] font-bold">·</span>
                      <span>
                        <strong className="text-white">Add new locations easily:</strong> New districts (e.g., Smart Education Campus 10.50.0.0/16) can be attached to the Metro Ethernet WAN transit by adding an OSPF neighbor statement.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00E5FF] font-bold">·</span>
                      <span>
                        <strong className="text-white">Add redundant WAN links for reliability:</strong> Dual Metro Ethernet fiber rings prevent single points of failure, converging instantly under OSPF Cost tuning.
                      </span>
                    </li>
                  </ul>
                </InfoCard>
              </div>
            </section>

            {/* ========================================================
                11. FOOTER
               ======================================================== */}
            <footer className="mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-400 space-y-3">
              <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300 font-medium">
                <span className="text-[#00E5FF] font-bold">Brainware University</span>
                <span>·</span>
                <span>Project Based Learning (PBL)</span>
                <span>·</span>
                <span>Department of Computer Science & Engineering</span>
              </div>

              {presenter.studentName && (
                <div className="p-3 rounded-lg bg-[#101b38] border border-slate-800 max-w-md mx-auto text-slate-300 font-mono text-xs">
                  <div>Presenter: <span className="text-white font-bold">{presenter.studentName}</span></div>
                  {presenter.department && <div>{presenter.department}</div>}
                  {presenter.guideName && <div className="text-slate-400">Project Guide: {presenter.guideName}</div>}
                </div>
              )}

              <p className="text-slate-400 text-[11px]">
                Smart City Communication Network · Offline Interactive Presentation Applet · Developed with Jetpack Compose & React
              </p>
            </footer>
          </div>
        </div>
      </main>

      {/* Kotlin Jetpack Compose Code Modal */}
      <ComposeCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    </div>
  );
}
