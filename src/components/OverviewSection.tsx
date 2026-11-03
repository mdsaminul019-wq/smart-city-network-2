import React from 'react';
import { SectionTitle } from './SectionTitle';
import { InfoCard } from './InfoCard';
import { Building2, Shield, Compass } from 'lucide-react';

export const OverviewSection: React.FC = () => {
  return (
    <section id="overview" className="space-y-6">
      <SectionTitle
        number="02"
        title="Project Overview"
        subtitle="A high-level understanding of how modern municipalities build secure, high-speed digital infrastructure."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <InfoCard
          title="Diverse Smart City Services"
          subtitle="Hospital, Traffic, Safety & Data Centres"
          icon={<Building2 className="w-5 h-5" />}
          badge="Urban Scale"
        >
          A smart city connects many critical services—including intensive care hospital telemetry, adaptive traffic control lights, emergency police dispatch, and central municipal data centres. Each service has different bandwidth, latency, and uptime requirements.
        </InfoCard>

        <InfoCard
          title="Secure VLAN Separation"
          subtitle="Preventing Unauthorized Cross-Talk"
          icon={<Shield className="w-5 h-5" />}
          badge="802.1Q Isolation"
          highlight
        >
          Virtual Local Area Networks (VLANs) divide one physical switch network into separate logical departments. This ensures hospital patient monitors and police dispatch records remain completely insulated from public guest Wi-Fi and general traffic sensors.
        </InfoCard>

        <InfoCard
          title="Intelligent OSPF Pathfinding"
          subtitle="Dynamic Route Discovery & Failover"
          icon={<Compass className="w-5 h-5" />}
          badge="Link-State IGP"
        >
          Open Shortest Path First (OSPF Area 0) dynamically monitors network links. It automatically calculates the fastest, lowest-cost route between municipal branches, instantly rerouting critical packets if a physical fiber line is severed.
        </InfoCard>
      </div>
    </section>
  );
};
