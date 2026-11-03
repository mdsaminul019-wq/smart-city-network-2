import { NetworkLocation, HierarchicalLayer, CiscoConfig, TestCommand } from '../types/network';

export const LOCATIONS: NetworkLocation[] = [
  {
    id: 'cdc',
    name: 'City Data Centre',
    routerName: 'R1-CDC-CORE',
    addressBlock: '10.10.0.0/16',
    vlans: [10, 20, 30, 99],
    managementVlan: 99,
    description: 'Central municipal compute hub hosting smart governance servers, citizen portals, and critical municipal databases.',
    color: '#00E5FF',
    vlanDetails: [
      { id: 10, name: 'ADMIN', purpose: 'Municipal administration & management consoles', subnet: '10.10.10.0/24', gateway: '10.10.10.1', usableHosts: '254 hosts (10.10.10.2 - 10.10.10.254)' },
      { id: 20, name: 'SERVERS', purpose: 'Municipal application & database server cluster', subnet: '10.10.20.0/24', gateway: '10.10.20.1', usableHosts: '254 hosts (10.10.20.2 - 10.10.20.254)' },
      { id: 30, name: 'STORAGE_SAN', purpose: 'High-speed storage area network & backups', subnet: '10.10.30.0/24', gateway: '10.10.30.1', usableHosts: '254 hosts (10.10.30.2 - 10.10.30.254)' },
      { id: 99, name: 'MANAGEMENT', purpose: 'Out-of-band network device management (SSH)', subnet: '10.10.99.0/24', gateway: '10.10.99.1', usableHosts: '254 hosts (10.10.99.2 - 10.10.99.254)' },
    ]
  },
  {
    id: 'hosp',
    name: 'Smart Hospital',
    routerName: 'R2-HOSP-DIST',
    addressBlock: '10.20.0.0/16',
    vlans: [110, 120, 130, 199],
    managementVlan: 199,
    description: 'Healthcare campus interconnecting ICU telemetry, patient medical records, doctor workstations, and guest Wi-Fi.',
    color: '#38BDF8',
    vlanDetails: [
      { id: 110, name: 'MEDICAL_STAFF', purpose: 'Doctor and nursing clinical terminals', subnet: '10.20.10.0/24', gateway: '10.20.10.1', usableHosts: '254 hosts (10.20.10.2 - 10.20.10.254)' },
      { id: 120, name: 'ICU_TELEMETRY', purpose: 'Patient monitoring & life-support telemetry (High QoS)', subnet: '10.20.20.0/24', gateway: '10.20.20.1', usableHosts: '254 hosts (10.20.20.2 - 10.20.20.254)' },
      { id: 130, name: 'GUEST_WIFI', purpose: 'Isolated public visitor internet with ACL restrictions', subnet: '10.20.30.0/24', gateway: '10.20.30.1', usableHosts: '254 hosts (10.20.30.2 - 10.20.30.254)' },
      { id: 199, name: 'MANAGEMENT', purpose: 'Healthcare switch and router console management', subnet: '10.20.99.0/24', gateway: '10.20.99.1', usableHosts: '254 hosts (10.20.99.2 - 10.20.99.254)' },
    ]
  },
  {
    id: 'safety',
    name: 'Public Safety Centre',
    routerName: 'R3-SAFETY-DIST',
    addressBlock: '10.30.0.0/16',
    vlans: [210, 220, 230, 299],
    managementVlan: 299,
    description: 'Emergency response headquarters connecting police dispatch, CCTV surveillance streams, fire & rescue units.',
    color: '#818CF8',
    vlanDetails: [
      { id: 210, name: 'DISPATCH', purpose: 'Emergency 911 / 112 dispatch operators & CAD systems', subnet: '10.30.10.0/24', gateway: '10.30.10.1', usableHosts: '254 hosts (10.30.10.2 - 10.30.10.254)' },
      { id: 220, name: 'CCTV_SURV', purpose: 'City-wide IP security surveillance video feeds', subnet: '10.30.20.0/24', gateway: '10.30.20.1', usableHosts: '254 hosts (10.30.20.2 - 10.30.20.254)' },
      { id: 230, name: 'FIRST_RESPOND', purpose: 'Mobile vehicle gateway & radio telemetry', subnet: '10.30.30.0/24', gateway: '10.30.30.1', usableHosts: '254 hosts (10.30.30.2 - 10.30.30.254)' },
      { id: 299, name: 'MANAGEMENT', purpose: 'Command centre switch & firewall management', subnet: '10.30.99.0/24', gateway: '10.30.99.1', usableHosts: '254 hosts (10.30.99.2 - 10.30.99.254)' },
    ]
  },
  {
    id: 'traffic',
    name: 'Traffic and IoT Centre',
    routerName: 'R4-TRAFFIC-DIST',
    addressBlock: '10.40.0.0/16',
    vlans: [310, 320, 330, 399],
    managementVlan: 399,
    description: 'Urban mobility control facility synchronizing smart traffic signals, environmental sensors, and transit tracking.',
    color: '#06B6D4',
    vlanDetails: [
      { id: 310, name: 'SIGNAL_CTRL', purpose: 'Adaptive smart traffic light controllers & timers', subnet: '10.40.10.0/24', gateway: '10.40.10.1', usableHosts: '254 hosts (10.40.10.2 - 10.40.10.254)' },
      { id: 320, name: 'ENV_SENSORS', purpose: 'Air quality, noise, and weather IoT sensor nodes', subnet: '10.40.20.0/24', gateway: '10.40.20.1', usableHosts: '254 hosts (10.40.20.2 - 10.40.20.254)' },
      { id: 330, name: 'TOLL_PARKING', purpose: 'Automated RFID tolling & smart parking meters', subnet: '10.40.30.0/24', gateway: '10.40.30.1', usableHosts: '254 hosts (10.40.30.2 - 10.40.30.254)' },
      { id: 399, name: 'MANAGEMENT', purpose: 'Ruggedized field switch & IoT gateway management', subnet: '10.40.99.0/24', gateway: '10.40.99.1', usableHosts: '254 hosts (10.40.99.2 - 10.40.99.254)' },
    ]
  }
];

export const HIERARCHICAL_LAYERS: HierarchicalLayer[] = [
  {
    name: 'Access Layer',
    role: 'Endpoint Connectivity & Port Security',
    description: 'Connects PCs, IoT devices, medical sensors, CCTV cameras, and end users directly to the local network fabric.',
    equipment: 'Cisco Catalyst 2960 / 9200 Layer 2 Switches',
    features: [
      'Port Security with MAC limiting',
      '802.1Q VLAN tagging at switch ports',
      'DHCP Snooping to block rogue servers',
      'STP (Spanning Tree Protocol) BPDU Guard'
    ]
  },
  {
    name: 'Distribution Layer',
    role: 'VLAN Aggregation & Policy Enforcement',
    description: 'Performs inter-VLAN routing, applies security Access Control Lists (ACLs), aggregates access switches, and manages broadcast domains.',
    equipment: 'Cisco Catalyst 3850 / 9300 Multi-Layer Switches or Branch Routers',
    features: [
      'Inter-VLAN routing (Router-on-a-Stick / SVIs)',
      'Departmental firewall & ACL policies',
      'DHCP relay agent (ip helper-address)',
      'Subnet aggregation and route summarization'
    ]
  },
  {
    name: 'Core Layer',
    role: 'High-Speed WAN Transit & Resilient Backbone',
    description: 'Connects all city locations with ultra-high-speed routing, zero packet inspection overhead, and redundant link failovers.',
    equipment: 'Cisco ASR 1000 / Catalyst 9500 Core Routers',
    features: [
      'OSPF Area 0 dynamic link-state routing',
      'Sub-second convergence via BFD / Fast Hellos',
      'Non-blocking line-rate packet forwarding',
      'Dual redundant Metro Ethernet WAN links'
    ]
  }
];

export const CISCO_CONFIGS: CiscoConfig[] = [
  {
    id: 'vlan_trunk',
    title: 'VLAN and Trunk Configuration',
    category: 'Layer 2 Switching',
    description: 'Creates departmental VLAN 10 and sets up a high-bandwidth 802.1Q trunk port to transport multiple tagged VLAN frames across switches and routers.',
    code: `vlan 10
 name ADMIN
interface g0/1
 switchport mode trunk`
  },
  {
    id: 'router_subif',
    title: 'Router Subinterface (Inter-VLAN Routing)',
    category: 'Layer 3 Routing (Router-on-a-Stick)',
    description: 'Configures a logical subinterface on the router with IEEE 802.1Q encapsulation to act as the default gateway for VLAN 10 hosts.',
    code: `interface g0/0.10
 encapsulation dot1Q 10
 ip address 10.10.10.1 255.255.255.0`
  },
  {
    id: 'ospf',
    title: 'OSPF Dynamic Routing (Area 0)',
    category: 'Interior Gateway Protocol',
    description: 'Enables Open Shortest Path First (OSPF) process 1 on the local subnet and advertises the Metro Ethernet WAN transit link in the backbone Area 0.',
    code: `router ospf 1
 network 10.10.0.0 0.0.255.255 area 0
 network 10.255.0.0 0.0.0.7 area 0`
  },
  {
    id: 'dhcp',
    title: 'DHCP Automatic IP Addressing Pool',
    category: 'Network Infrastructure Services',
    description: 'Configures an automated Cisco IOS DHCP server pool to dynamically assign IP addresses, subnet masks, and default gateway pointers to endpoint devices.',
    code: `ip dhcp pool ADMIN_VLAN10
 network 10.10.10.0 255.255.255.0
 default-router 10.10.10.1`
  }
];

export const TEST_COMMANDS: TestCommand[] = [
  {
    command: 'show vlan brief',
    purpose: 'Confirms VLAN creation and port allocation across switches.',
    expectedOutput: `VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Fa0/5, Fa0/6, Fa0/7
10   ADMIN                            active    Fa0/1, Fa0/2
20   SERVERS                          active    Fa0/3, Fa0/4
30   STORAGE_SAN                      active    Fa0/8, Fa0/9
99   MANAGEMENT                       active    Fa0/24
1002 fddi-default                     act/unsup 
1003 token-ring-default               act/unsup`,
    keyVerification: 'All required VLAN IDs (10, 20, 30, 99) appear in active status with assigned access ports.'
  },
  {
    command: 'show interfaces trunk',
    purpose: 'Confirms 802.1Q trunk connections and allowed VLAN ranges.',
    expectedOutput: `Port        Mode             Encapsulation  Status        Native vlan
Gi0/1       on               802.1q         trunking      1

Port        Vlans allowed on trunk
Gi0/1       1-4094

Port        Vlans in spanning tree forwarding state and not pruned
Gi0/1       10,20,30,99`,
    keyVerification: 'Encapsulation is 802.1q, status is trunking, and VLANs are forwarding without unwanted pruning.'
  },
  {
    command: 'show ip ospf neighbor',
    purpose: 'Confirms OSPF neighbor relationships across the WAN transit network.',
    expectedOutput: `Neighbor ID     Pri   State           Dead Time   Address         Interface
10.255.0.2        1   FULL/BDR        00:00:36    10.255.0.2      GigabitEthernet0/1
10.255.0.3        1   FULL/DROTHER    00:00:38    10.255.0.3      GigabitEthernet0/1
10.255.0.4        1   FULL/DR         00:00:33    10.255.0.4      GigabitEthernet0/1`,
    keyVerification: 'Neighbor states reach FULL/DR or FULL/BDR over 10.255.0.0/29 transit network.'
  },
  {
    command: 'show ip route ospf',
    purpose: 'Confirms learned OSPF routing table entries for remote city branches.',
    expectedOutput: `      10.0.0.0/8 is variably subnetted, 14 subnets, 2 masks
O        10.20.0.0/16 [110/2] via 10.255.0.2, 01:14:28, GigabitEthernet0/1
O        10.30.0.0/16 [110/2] via 10.255.0.3, 01:14:28, GigabitEthernet0/1
O        10.40.0.0/16 [110/2] via 10.255.0.4, 01:14:28, GigabitEthernet0/1`,
    keyVerification: 'Routes to Hospital (10.20.0.0/16), Safety (10.30.0.0/16), and Traffic (10.40.0.0/16) are installed with AD 110.'
  },
  {
    command: 'show ip dhcp binding',
    purpose: 'Shows active IP addresses automatically assigned to client workstations.',
    expectedOutput: `Bindings from all pools :
IP address          Client-ID/              Lease expiration        Type
                    Hardware address/
                    User name
10.10.10.14         0100.5079.6668.00       Nov 04 2026 09:30 AM    Automatic
10.10.10.15         0100.5079.6668.01       Nov 04 2026 09:35 AM    Automatic
10.10.20.22         0100.5079.6668.02       Nov 04 2026 09:41 AM    Automatic`,
    keyVerification: 'Client MAC addresses are successfully bound to pool subnets with active lease times.'
  },
  {
    command: 'ping remote PC (10.20.10.14)',
    purpose: 'Checks end-to-end IP connectivity between City Data Centre and Smart Hospital.',
    expectedOutput: `Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 10.20.10.14, timeout is 2 seconds:
!!!!!
Success rate is 100 percent (5/5), round-trip min/avg/max = 1/2/4 ms`,
    keyVerification: 'Success rate is 100% (5/5 exclamation marks) verifying end-to-end inter-VLAN WAN routing.'
  }
];

export const KOTLIN_JETPACK_COMPOSE_SNIPPET = `package com.smartcity.network

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.*
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// ==========================================
// Smart City Network - Jetpack Compose
// College Project Based Learning (PBL)
// ==========================================

val NavyDarkest = Color(0xFF070C18)
val NavyMain    = Color(0xFF0B1329)
val NavySurface = Color(0xFF131D38)
val NavyCard    = Color(0xFF182444)
val NavyBorder  = Color(0xFF223259)
val ElectricBlue = Color(0xFF00E5FF)
val ElectricBlueSoft = Color(0xFF38BDF8)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            SmartCityNetworkTheme {
                SmartCityNetworkApp()
            }
        }
    }
}

@Composable
fun SmartCityNetworkTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = darkColorScheme(
            background = NavyDarkest,
            surface = NavyCard,
            primary = ElectricBlue,
            onBackground = Color.White,
            onSurface = Color.White
        ),
        content = content
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SmartCityNetworkApp() {
    val scrollState = rememberScrollState()
    var selectedLocationIndex by remember { mutableStateOf(0) }
    
    // Editable presentation metadata
    var studentName by remember { mutableStateOf("") }
    var department by remember { mutableStateOf("") }
    var collegeName by remember { mutableStateOf("Brainware University") }
    var guideName by remember { mutableStateOf("") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Hub,
                            contentDescription = "Logo",
                            tint = ElectricBlue,
                            modifier = Modifier.size(24.dp)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            "Smart City Network",
                            fontWeight = FontWeight.Bold,
                            color = Color.White,
                            fontSize = 18.sp
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = NavyDarkest
                )
            )
        },
        containerColor = NavyDarkest
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .padding(paddingValues)
                .fillMaxSize()
                .verticalScroll(scrollState)
                .padding(horizontal = 16.dp, vertical = 12.dp),
            verticalArrangement = Arrangement.spacedBy(24.dp)
        ) {
            // Section 1: Hero Section
            HeroCard(
                studentName = studentName,
                onStudentNameChange = { studentName = it },
                department = department,
                onDeptChange = { department = it },
                collegeName = collegeName,
                onCollegeChange = { collegeName = it },
                guideName = guideName,
                onGuideChange = { guideName = it }
            )

            // Section 2: Project Overview
            SectionTitle(number = "02", title = "Project Overview", subtitle = "Urban Multi-Service Infrastructure")
            ProjectOverviewCard()

            // Section 3: Objectives
            SectionTitle(number = "03", title = "Key Objectives", subtitle = "Architectural Goals & Standards")
            ObjectivesList()

            // Section 4: Interactive Network Topology
            SectionTitle(number = "04", title = "Interactive Network Topology", subtitle = "WAN Core & Departmental Edge")
            InteractiveTopology(
                selectedIndex = selectedLocationIndex,
                onSelectLocation = { selectedLocationIndex = it }
            )

            // Section 5: Hierarchical Network Design
            SectionTitle(number = "05", title = "Hierarchical Design", subtitle = "Cisco 3-Tier Enterprise Model")
            HierarchicalDesignCards()

            // Section 6: VLAN and IP Addressing Table
            SectionTitle(number = "06", title = "VLAN & IP Addressing", subtitle = "Subnet Segmentation Matrix")
            VlanAddressingTable()

            // Section 7: Technology Used
            SectionTitle(number = "07", title = "Technology Used", subtitle = "Protocols & Architectural Standards")
            TechnologyCards()

            // Section 8: Configuration Examples
            SectionTitle(number = "08", title = "Cisco IOS Configurations", subtitle = "Verified Implementation Scripts")
            ConfigurationCodeCards()

            // Section 9: Testing & Verification
            SectionTitle(number = "09", title = "Testing & Diagnostics", subtitle = "Verification Commands & Expected Output")
            TestingCommandCards()

            // Section 10: Security and Scalability
            SectionTitle(number = "10", title = "Security & Scalability", subtitle = "Hardening & Future Expansion")
            SecurityScalabilityCards()

            // Section 11: Footer
            FooterCard(college = collegeName)
        }
    }
}

// Reusable Components: SectionTitle, InfoCard, ObjectiveCard, CodeCard, TopologyLocationCard
@Composable
fun SectionTitle(number: String, title: String, subtitle: String? = null) {
    Column(modifier = Modifier.fillMaxWidth()) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text(
                text = number,
                color = ElectricBlue,
                fontWeight = FontWeight.ExtraBold,
                fontSize = 14.sp
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
                text = title,
                color = Color.White,
                fontWeight = FontWeight.Bold,
                fontSize = 19.sp
            )
        }
        if (subtitle != null) {
            Text(
                text = subtitle,
                color = Color(0xFF94A3B8),
                fontSize = 13.sp,
                modifier = Modifier.padding(top = 2.dp)
            )
        }
    }
}
`;
