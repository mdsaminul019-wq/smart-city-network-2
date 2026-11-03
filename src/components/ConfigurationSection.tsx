import React from 'react';
import { SectionTitle } from './SectionTitle';
import { CodeCard } from './CodeCard';
import { CISCO_CONFIGS } from '../data/networkData';

export const ConfigurationSection: React.FC = () => {
  return (
    <section id="configuration" className="space-y-6">
      <SectionTitle
        number="08"
        title="Cisco Configuration Examples"
        subtitle="Production-grade Cisco IOS command scripts ready for Cisco Packet Tracer simulation or physical Catalyst hardware."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {CISCO_CONFIGS.map((config) => (
          <CodeCard
            key={config.id}
            title={config.title}
            category={config.category}
            description={config.description}
            code={config.code}
          />
        ))}
      </div>
    </section>
  );
};
