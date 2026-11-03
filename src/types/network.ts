export interface VLANItem {
  id: number;
  name: string;
  purpose: string;
  subnet: string;
  gateway: string;
  usableHosts: string;
}

export interface NetworkLocation {
  id: string;
  name: string;
  routerName: string;
  addressBlock: string;
  vlans: number[];
  managementVlan: number;
  description: string;
  vlanDetails: VLANItem[];
  color: string;
}

export interface HierarchicalLayer {
  name: string;
  role: string;
  description: string;
  equipment: string;
  features: string[];
}

export interface CiscoConfig {
  id: string;
  title: string;
  category: string;
  description: string;
  code: string;
}

export interface TestCommand {
  command: string;
  purpose: string;
  expectedOutput: string;
  keyVerification: string;
}

export interface PresenterDetails {
  studentName: string;
  department: string;
  collegeName: string;
  guideName: string;
}
