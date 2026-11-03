import React from 'react';
import { SectionTitle } from './SectionTitle';
import { ObjectiveCard } from './ObjectiveCard';

export const ObjectivesSection: React.FC = () => {
  const OBJECTIVES = [
    {
      id: 'hierarchy',
      title: 'Hierarchical Network Design',
      category: 'Architecture & Scalability',
      description: 'Implement Cisco 3-layer architecture (Core, Distribution, Access) to simplify troubleshooting, contain broadcast traffic, and enable painless municipal expansion.',
      protocolBadge: '3-Layer Model',
      keyBenefit: 'Modular Scalability'
    },
    {
      id: 'vlan',
      title: 'VLAN Configuration',
      category: 'Layer 2 Segmentation',
      description: 'Configure IEEE 802.1Q tagged Virtual LANs across departmental switches to partition broadcast domains and isolate municipal government operations.',
      protocolBadge: 'IEEE 802.1Q',
      keyBenefit: 'Zero Cross-Talk'
    },
    {
      id: 'roas',
      title: 'Inter VLAN Routing',
      category: 'Layer 3 Routing',
      description: 'Deploy Router-on-a-Stick subinterfaces with dot1Q encapsulation to inspect, route, and policy-filter communication between authorized city VLANs.',
      protocolBadge: 'Subinterfaces',
      keyBenefit: 'Controlled Access'
    },
    {
      id: 'ospf',
      title: 'OSPF Dynamic Routing',
      category: 'Backbone WAN Convergence',
      description: 'Configure OSPF Area 0 across the Metro Ethernet WAN transit network (10.255.0.0/29) for rapid convergence, dynamic neighbor adjacency, and loop-free forwarding.',
      protocolBadge: 'OSPF Area 0',
      keyBenefit: 'Sub-Second Failover'
    },
    {
      id: 'dhcp',
      title: 'DHCP Automatic IP Addressing',
      category: 'Network Auto-Configuration',
      description: 'Establish automated Cisco IOS DHCP pools for departmental subnets so medical equipment, IoT sensors, and workstations receive valid IP parameters instantly without manual labor.',
      protocolBadge: 'RFC 2131 DHCP',
      keyBenefit: 'Zero-Touch Onboarding'
    }
  ];

  return (
    <section id="objectives" className="space-y-6">
      <SectionTitle
        number="03"
        title="Project Objectives"
        subtitle="Five foundational engineering milestones powering the smart city network architecture."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {OBJECTIVES.map((obj) => (
          <ObjectiveCard
            key={obj.id}
            id={obj.id}
            title={obj.title}
            category={obj.category}
            description={obj.description}
            protocolBadge={obj.protocolBadge}
            keyBenefit={obj.keyBenefit}
          />
        ))}
      </div>
    </section>
  );
};
