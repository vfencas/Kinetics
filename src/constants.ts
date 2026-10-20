import { Solution, AssessmentQuestion } from './types';

export const SOLUTIONS: Solution[] = [
  {
    id: 'sol-claroty',
    name: 'Claroty CTD',
    provider: 'Claroty',
    description: 'Deep visibility into Cyber-Physical Systems (CPS) for large enterprises needing exposure management.',
    price: 3500,
    category: 'Vulnerability Management',
    riskMitigation: ['Asset Visibility', 'Exposure Management', 'Threat Detection'],
    features: ['CPS Visibility', 'Vulnerability Prioritization', 'Network Mapping'],
    pros: ['Deepest visibility into proprietary OT protocols', 'Strong vulnerability management', 'Enterprise-scale'],
    cons: ['Higher complexity for small teams', 'Premium pricing'],
    rating: 4.9,
    image: 'https://picsum.photos/seed/claroty/400/300'
  },
  {
    id: 'sol-dragos',
    name: 'Dragos Platform',
    provider: 'Dragos',
    description: 'Specialized OT incident response and threat hunting for critical infrastructure facilities.',
    price: 4200,
    category: 'Incident Response',
    riskMitigation: ['Threat Hunting', 'Incident Response', 'Industrial Intel'],
    features: ['Threat Intelligence', 'Playbook Automation', 'Expert IR Support'],
    pros: ['Industry-leading threat intelligence', 'Specialized industrial IR playbooks', 'Expert support'],
    cons: ['Requires skilled operators', 'Focuses more on response than prevention'],
    rating: 4.8,
    image: 'https://picsum.photos/seed/dragos/400/300'
  },
  {
    id: 'sol-nozomi',
    name: 'Guardian AI',
    provider: 'Nozomi Networks',
    description: 'Scalable, AI-powered monitoring for global, distributed industrial environments.',
    price: 3100,
    category: 'Monitoring',
    riskMitigation: ['Anomaly Detection', 'Global Visibility', 'Asset Tracking'],
    features: ['AI-Powered Detection', 'Global Console', 'Passive Monitoring'],
    pros: ['Excellent scalability for global sites', 'Advanced AI anomaly detection', 'Broad protocol support'],
    cons: ['AI requires tuning to avoid false positives', 'Deployment can be complex'],
    rating: 4.7,
    image: 'https://picsum.photos/seed/nozomi/400/300'
  },
  {
    id: 'sol-armis',
    name: 'Armis Centrix',
    provider: 'Armis',
    description: 'Asset intelligence for heterogeneous environments with "Shadow IoT" and unmanaged devices.',
    price: 2800,
    category: 'Monitoring',
    riskMitigation: ['Shadow IoT Detection', 'Unmanaged Device Risk', 'Asset Inventory'],
    features: ['Agentless Discovery', 'Device Behavior Tracking', 'Risk Scoring'],
    pros: ['Best-in-class for unmanaged/IoT devices', 'Completely agentless', 'Fast time-to-value'],
    cons: ['Less deep into specific PLC protocols than Claroty', 'Cloud-heavy architecture'],
    rating: 4.6,
    image: 'https://picsum.photos/seed/armis/400/300'
  },
  {
    id: 'sol-fortinet',
    name: 'FortiGate Rugged',
    provider: 'Fortinet',
    description: 'Industrial firewalls designed to enforce the Purdue Model through hardware-based network segmentation.',
    price: 2200,
    category: 'Network',
    riskMitigation: ['Network Segmentation', 'Purdue Model Enforcement', 'DDoS'],
    features: ['Industrial IPS', 'Hardware Ruggedization', 'Protocol Filtering'],
    pros: ['Cost-effective segmentation', 'Ruggedized for factory floors', 'Unified IT/OT management'],
    cons: ['Requires physical installation', 'Limited visibility compared to passive tools'],
    rating: 4.5,
    image: 'https://picsum.photos/seed/fortinet/400/300'
  },
  {
    id: 'sol-elisity',
    name: 'Elisity Identity',
    provider: 'Elisity',
    description: 'Rapid, non-disruptive Zero Trust deployment using existing network gear for identity microsegmentation.',
    price: 1900,
    category: 'Access Control',
    riskMitigation: ['Microsegmentation', 'Zero Trust', 'Lateral Movement'],
    features: ['Identity-Based Access', 'Cloud-Native Control', 'Non-Disruptive'],
    pros: ['No new hardware required', 'Extremely fast deployment', 'Software-defined security'],
    cons: ['Requires compatible existing switches', 'Subscription-based model'],
    rating: 4.8,
    image: 'https://picsum.photos/seed/elisity/400/300'
  },
  {
    id: 'sol-tenable',
    name: 'Tenable OT Security',
    provider: 'Tenable',
    description: 'Unified vulnerability management platform for teams managing both IT and OT risks.',
    price: 2500,
    category: 'Vulnerability Management',
    riskMitigation: ['Vulnerability Prioritization', 'IT/OT Convergence', 'Compliance'],
    features: ['Unified Dashboard', 'Active Querying', 'Compliance Reporting'],
    pros: ['Single pane of glass for IT and OT', 'Strong compliance reporting', 'Active and passive discovery'],
    cons: ['Active querying requires careful config', 'IT-centric interface'],
    rating: 4.7,
    image: 'https://picsum.photos/seed/tenable/400/300'
  },
  {
    id: 'sol-1',
    name: 'Industrial Guard Pro',
    provider: 'CyberShield OT',
    description: 'Next-generation firewall specifically designed for industrial protocols like Modbus and PROFINET.',
    price: 2499,
    category: 'Network',
    riskMitigation: ['DDoS Protection', 'Protocol Inspection', 'Segmentation'],
    features: ['Deep Packet Inspection', 'Ruggedized Hardware', 'PLC Protection'],
    pros: ['High performance', 'Supports legacy protocols', 'Ruggedized for harsh environments'],
    cons: ['Higher initial cost', 'Requires specialized configuration'],
    rating: 4.8,
    image: 'https://picsum.photos/seed/firewall/400/300'
  },
  {
    id: 'sol-2',
    name: 'AssetTracker AI',
    provider: 'FactoryVision',
    description: 'Real-time asset discovery and vulnerability management for legacy OT environments.',
    price: 1800,
    category: 'Monitoring',
    riskMitigation: ['Unauthorized Access', 'Shadow OT Detection'],
    features: ['Passive Monitoring', 'Automated Inventory', 'Risk Scoring'],
    pros: ['Non-intrusive monitoring', 'Automated asset mapping', 'Early threat detection'],
    cons: ['May require network taps', 'Requires initial baseline period'],
    rating: 4.6,
    image: 'https://picsum.photos/seed/monitoring/400/300'
  },
  {
    id: 'sol-3',
    name: 'SecureGate Zero Trust',
    provider: 'AccessPoint',
    description: 'Zero Trust Network Access (ZTNA) for remote maintenance and vendor access to factory floors.',
    price: 1200,
    category: 'Access Control',
    riskMitigation: ['Remote Access Risk', 'Credential Theft'],
    features: ['MFA for OT', 'Session Recording', 'Granular Permissions'],
    pros: ['Eliminates VPN vulnerabilities', 'Full audit trail of vendor actions', 'Granular access control'],
    cons: ['Requires client software on some devices', 'Learning curve for legacy vendors'],
    rating: 4.9,
    image: 'https://picsum.photos/seed/access/400/300'
  },
  {
    id: 'sol-4',
    name: 'Endpoint Sentinel',
    provider: 'NodeSecure',
    description: 'Lightweight endpoint protection for HMIs and engineering workstations without impacting performance.',
    price: 950,
    category: 'Endpoint',
    riskMitigation: ['Malware', 'Ransomware', 'USB Attacks'],
    features: ['Application Whitelisting', 'Device Control', 'Offline Protection'],
    pros: ['Ultra-low CPU usage', 'Works without internet connection', 'Prevents unauthorized USB devices'],
    cons: ['Manual updates for air-gapped systems', 'Limited to Windows/Linux HMIs'],
    rating: 4.7,
    image: 'https://picsum.photos/seed/endpoint/400/300'
  }
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // Section A: Inventory & Scale
  {
    id: 'q-inv-1',
    text: 'Roughly how many IP-connected devices are on your shop floor (PLCs, HMIs, Sensors, I/O modules)?',
    category: 'Inventory',
    options: [
      { text: '< 100', score: 10 },
      { text: '100–500', score: 7 },
      { text: '500+', score: 4 }
    ]
  },
  {
    id: 'q-inv-2',
    text: 'Do you have a real-time automated tool to detect new devices, or is your inventory updated manually via spreadsheets?',
    category: 'Inventory',
    riskInfo: 'Manual inventories are usually 30%–40% inaccurate in real-world audits.',
    options: [
      { text: 'Real-time automated tool', score: 10 },
      { text: 'Manual via spreadsheets', score: 2 }
    ]
  },
  {
    id: 'q-inv-3',
    text: 'Can you see the firmware version and Serial Number of every PLC on your network right now?',
    category: 'Inventory',
    options: [
      { text: 'Yes', score: 10 },
      { text: 'No', score: 0 }
    ]
  },
  // Section B: Operating Systems & Legacy Debt
  {
    id: 'q-leg-1',
    text: 'Approximately what percentage of your workstations (HMIs/Engineering PCs) run "End-of-Life" systems like Windows 7, XP, or Server 2008?',
    category: 'Legacy Systems',
    options: [
      { text: '0%', score: 10 },
      { text: '1%–20%', score: 5 },
      { text: '>20%', score: 0 }
    ]
  },
  {
    id: 'q-leg-2',
    text: 'How do you handle vulnerabilities on critical controllers that cannot be rebooted or patched for months?',
    category: 'Legacy Systems',
    options: [
      { text: 'We have "Compensating Controls" (Virtual patching/isolation)', score: 10 },
      { text: 'We just accept the risk until the next scheduled downtime.', score: 0 }
    ]
  },
  // Section C: Network Architecture
  {
    id: 'q-net-1',
    text: 'Is there a "Flat Network" where a virus on an office laptop could theoretically reach a PLC on the production line?',
    category: 'Network',
    options: [
      { text: 'No (Segmented with Industrial Firewalls)', score: 10 },
      { text: 'Yes (Flat)', score: 0 }
    ]
  },
  {
    id: 'q-acc-1',
    text: 'How do vendors/contractors access your machines for maintenance?',
    category: 'Access Control',
    options: [
      { text: 'Secure OT Access Gateway with MFA and Session Recording (Low Risk)', score: 10 },
      { text: 'Traditional VPN/TeamViewer (High Risk)', score: 2 }
    ]
  },
  {
    id: 'q-pol-1',
    text: 'Do you have a formal incident response plan specifically for OT?',
    category: 'Policy',
    options: [
      { text: 'Yes, tested regularly', score: 10 },
      { text: 'Yes, but not tested', score: 6 },
      { text: 'In development', score: 3 },
      { text: 'No plan exists', score: 0 }
    ]
  }
];
