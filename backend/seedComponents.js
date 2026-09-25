import dotenv from 'dotenv';
dotenv.config({ override: true });
import mongoose from 'mongoose';
import ComponentModel from './app/model/ComponentModel.js';

const componentsData = [
  // ==================== 1. PROCESSORS (10) ====================
  {
    category: "Processor",
    name: "Intel Core i3-1215U",
    description: "6 Cores (2P + 4E), 8 Threads, Up to 4.40 GHz Turbo, 10MB Cache",
    currentPrice: 8500,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80"
  },
  {
    category: "Processor",
    name: "Intel Core i5-12450H",
    description: "8 Cores (4P + 4E), 12 Threads, Up to 4.40 GHz, 45W TDP, 12MB Cache",
    currentPrice: 14000,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80"
  },
  {
    category: "Processor",
    name: "Intel Core i5-13500H",
    description: "12 Cores (4P + 8E), 16 Threads, Up to 4.70 GHz, 18MB Intel Smart Cache",
    currentPrice: 19500,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80"
  },
  {
    category: "Processor",
    name: "Intel Core i7-13700H",
    description: "14 Cores (6P + 8E), 20 Threads, Up to 5.00 GHz Max Turbo, 24MB Cache",
    currentPrice: 28000,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80"
  },
  {
    category: "Processor",
    name: "Intel Core i9-13900HX",
    description: "24 Cores (8P + 16E), 32 Threads, Up to 5.40 GHz, 36MB Intel Smart Cache",
    currentPrice: 42000,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80"
  },
  {
    category: "Processor",
    name: "AMD Ryzen 3 7320U",
    description: "4 Cores, 8 Threads, 2.4 GHz Base, Up to 4.1 GHz Boost, 4MB L3 Cache",
    currentPrice: 7800,
    image: "https://images.unsplash.com/photo-1555617778-02518510b9fa?w=400&q=80"
  },
  {
    category: "Processor",
    name: "AMD Ryzen 5 7530U",
    description: "6 Cores, 12 Threads, 2.0 GHz Base, Up to 4.5 GHz Boost, 16MB L3 Cache",
    currentPrice: 13500,
    image: "https://images.unsplash.com/photo-1555617778-02518510b9fa?w=400&q=80"
  },
  {
    category: "Processor",
    name: "AMD Ryzen 7 7735HS",
    description: "8 Cores, 16 Threads, 3.2 GHz Base, Up to 4.75 GHz Boost, Radeon 680M",
    currentPrice: 24000,
    image: "https://images.unsplash.com/photo-1555617778-02518510b9fa?w=400&q=80"
  },
  {
    category: "Processor",
    name: "AMD Ryzen 7 7840HS",
    description: "8 Cores, 16 Threads, Zen 4 Architecture, Up to 5.1 GHz Boost, Ryzen AI",
    currentPrice: 29500,
    image: "https://images.unsplash.com/photo-1555617778-02518510b9fa?w=400&q=80"
  },
  {
    category: "Processor",
    name: "AMD Ryzen 9 7945HX",
    description: "16 Cores, 32 Threads, 2.5 GHz Base, Up to 5.4 GHz Max Boost, 64MB Cache",
    currentPrice: 46000,
    image: "https://images.unsplash.com/photo-1555617778-02518510b9fa?w=400&q=80"
  },

  // ==================== 2. RAM (10) ====================
  {
    category: "RAM",
    name: "Crucial 8GB DDR4 3200MHz",
    description: "8GB DDR4 3200MHz CL22 SO-DIMM Non-ECC 1.2V Laptop Memory",
    currentPrice: 1800,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80"
  },
  {
    category: "RAM",
    name: "Kingston Fury Impact 8GB DDR4",
    description: "8GB DDR4 3200MHz CL20 High Performance Gaming SO-DIMM",
    currentPrice: 2100,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80"
  },
  {
    category: "RAM",
    name: "Crucial 16GB DDR4 3200MHz",
    description: "16GB Single DDR4 3200MHz CL22 SO-DIMM 260-Pin Laptop RAM",
    currentPrice: 3400,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80"
  },
  {
    category: "RAM",
    name: "Corsair Vengeance 16GB DDR4",
    description: "16GB DDR4 3200MHz CL22 Performance Tuned Laptop Memory",
    currentPrice: 3600,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80"
  },
  {
    category: "RAM",
    name: "Samsung 32GB DDR4 3200MHz",
    description: "32GB Dual Rank DDR4 3200MHz SO-DIMM 2Rx8 Non-ECC Memory",
    currentPrice: 6800,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80"
  },
  {
    category: "RAM",
    name: "Crucial 8GB DDR5 4800MHz",
    description: "8GB Next-Gen DDR5 4800MHz CL40 SO-DIMM 1.1V Laptop RAM",
    currentPrice: 2400,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80"
  },
  {
    category: "RAM",
    name: "Kingston Fury Impact 16GB DDR5",
    description: "16GB DDR5 5600MHz CL40 Intel XMP 3.0 / AMD EXPO Certified",
    currentPrice: 4800,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80"
  },
  {
    category: "RAM",
    name: "Corsair Vengeance 32GB DDR5 Kit",
    description: "32GB (2x16GB) DDR5 4800MHz CL40 High-Speed Dual Channel Kit",
    currentPrice: 8900,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80"
  },
  {
    category: "RAM",
    name: "Crucial 32GB DDR5 5600MHz",
    description: "32GB Single Module DDR5 5600MHz CL46 Ultra-Fast SO-DIMM",
    currentPrice: 9200,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80"
  },
  {
    category: "RAM",
    name: "G.Skill Ripjaws 64GB DDR5 Kit",
    description: "64GB (2x32GB) DDR5 5200MHz CL38 Extreme Performance Mobile RAM",
    currentPrice: 17500,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80"
  },

  // ==================== 3. STORAGE (10) ====================
  {
    category: "Storage",
    name: "Western Digital Green 240GB SSD",
    description: "240GB M.2 2280 SATA III 6Gb/s Internal Solid State Drive",
    currentPrice: 1600,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80"
  },
  {
    category: "Storage",
    name: "Crucial P3 500GB NVMe SSD",
    description: "500GB PCIe 3.0 NVMe M.2 SSD, Up to 3500MB/s Read, 1900MB/s Write",
    currentPrice: 3100,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80"
  },
  {
    category: "Storage",
    name: "Kingston NV2 500GB Gen4 SSD",
    description: "500GB PCIe 4.0 NVMe M.2 2280 SSD, Up to 3500MB/s Read Speed",
    currentPrice: 3200,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80"
  },
  {
    category: "Storage",
    name: "Crucial P3 Plus 1TB Gen4 SSD",
    description: "1TB PCIe 4.0 NVMe M.2 SSD, Up to 5000MB/s Read, 4200MB/s Write",
    currentPrice: 5600,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80"
  },
  {
    category: "Storage",
    name: "WD Blue SN580 1TB NVMe SSD",
    description: "1TB PCIe Gen4 x4 NVMe M.2 SSD, Up to 4150MB/s, nCache 4.0",
    currentPrice: 5800,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80"
  },
  {
    category: "Storage",
    name: "Samsung 980 1TB NVMe SSD",
    description: "1TB PCIe 3.0 NVMe M.2 SSD, Up to 3500MB/s Read, V-NAND Technology",
    currentPrice: 6900,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80"
  },
  {
    category: "Storage",
    name: "Samsung 980 PRO 1TB Gen4 SSD",
    description: "1TB PCIe 4.0 NVMe M.2 SSD with DRAM Cache, Up to 7000MB/s Read",
    currentPrice: 8900,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80"
  },
  {
    category: "Storage",
    name: "WD Black SN850X 1TB Gen4 SSD",
    description: "1TB PCIe Gen4 NVMe Gaming SSD with Game Mode 2.0, Up to 7300MB/s",
    currentPrice: 9400,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80"
  },
  {
    category: "Storage",
    name: "Crucial P3 Plus 2TB Gen4 SSD",
    description: "2TB PCIe 4.0 NVMe M.2 SSD, Up to 5000MB/s Read, High Capacity",
    currentPrice: 11200,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80"
  },
  {
    category: "Storage",
    name: "Samsung 990 PRO 2TB Gen4 SSD",
    description: "2TB PCIe 4.0 NVMe M.2 SSD, Up to 7450MB/s Read, Top Tier Speed",
    currentPrice: 16800,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80"
  },

  // ==================== 4. GRAPHICS CARD (10) ====================
  {
    category: "Graphics Card",
    name: "Intel Iris Xe Graphics",
    description: "Integrated 96 Execution Units (EUs), Up to 1.40 GHz Graphics Max Dynamic",
    currentPrice: 3000,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80"
  },
  {
    category: "Graphics Card",
    name: "AMD Radeon 680M Graphics",
    description: "Integrated RDNA 2 Architecture, 12 Compute Units, Up to 2200 MHz",
    currentPrice: 4200,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80"
  },
  {
    category: "Graphics Card",
    name: "NVIDIA GeForce MX550 2GB",
    description: "2GB GDDR6 Dedicated Video Memory, NVIDIA Optimus Supported",
    currentPrice: 9500,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80"
  },
  {
    category: "Graphics Card",
    name: "NVIDIA GeForce RTX 2050 4GB",
    description: "4GB GDDR6, Ray Tracing Cores, Tensor Cores, DLSS Support, 70W TGP",
    currentPrice: 16000,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80"
  },
  {
    category: "Graphics Card",
    name: "NVIDIA GeForce RTX 3050 4GB",
    description: "4GB GDDR6 128-bit, 2048 CUDA Cores, 95W Max TGP, DLSS & Ray Tracing",
    currentPrice: 22000,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80"
  },
  {
    category: "Graphics Card",
    name: "NVIDIA GeForce RTX 4050 6GB",
    description: "6GB GDDR6 Ada Lovelace, 2560 CUDA Cores, 105W Max TGP, DLSS 3 Support",
    currentPrice: 31000,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80"
  },
  {
    category: "Graphics Card",
    name: "NVIDIA GeForce RTX 4060 8GB",
    description: "8GB GDDR6 Ada Lovelace, 3072 CUDA Cores, 140W Max TGP, DLSS 3 Frame Gen",
    currentPrice: 42000,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80"
  },
  {
    category: "Graphics Card",
    name: "NVIDIA GeForce RTX 4070 8GB",
    description: "8GB GDDR6 Ada Lovelace, 4608 CUDA Cores, 140W Max TGP, 4th Gen Tensor",
    currentPrice: 58000,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80"
  },
  {
    category: "Graphics Card",
    name: "NVIDIA GeForce RTX 4080 12GB",
    description: "12GB GDDR6X, 7424 CUDA Cores, 175W Max TGP, Ultimate 1440p / 4K Gaming",
    currentPrice: 89000,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80"
  },
  {
    category: "Graphics Card",
    name: "NVIDIA GeForce RTX 4090 16GB",
    description: "16GB GDDR6X, 9728 CUDA Cores, 175W Max TGP, Elite Flagship Laptop GPU",
    currentPrice: 125000,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80"
  },

  // ==================== 5. DISPLAY (10) ====================
  {
    category: "Display",
    name: "14.0\" HD Anti-Glare Panel",
    description: "14.0-inch HD (1366x768), 60Hz Refresh Rate, 220 nits, Anti-Glare Coating",
    currentPrice: 3500,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80"
  },
  {
    category: "Display",
    name: "14.0\" FHD 60Hz IPS Display",
    description: "14.0-inch FHD (1920x1080), IPS Level, 60Hz, 250 nits, 45% NTSC Gamut",
    currentPrice: 5200,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80"
  },
  {
    category: "Display",
    name: "14.0\" 2.8K 90Hz OLED Display",
    description: "14.0-inch 2.8K (2880x1800), 16:10, 90Hz, 100% DCI-P3, HDR 600 True Black",
    currentPrice: 12500,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80"
  },
  {
    category: "Display",
    name: "15.6\" FHD 60Hz IPS Panel",
    description: "15.6-inch FHD (1920x1080), 60Hz, IPS-Level, Micro-Edge, Anti-Glare 250 nits",
    currentPrice: 5500,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80"
  },
  {
    category: "Display",
    name: "15.6\" FHD 144Hz Gaming IPS",
    description: "15.6-inch FHD (1920x1080), 144Hz Fast Refresh, IPS, 300 nits, Adaptive-Sync",
    currentPrice: 7800,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80"
  },
  {
    category: "Display",
    name: "15.6\" FHD 165Hz 100% sRGB",
    description: "15.6-inch FHD (1920x1080), 165Hz 3ms, 100% sRGB Color Accuracy, 350 nits",
    currentPrice: 9200,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80"
  },
  {
    category: "Display",
    name: "15.6\" QHD 165Hz G-Sync Panel",
    description: "15.6-inch QHD (2560x1440), 165Hz, NVIDIA G-Sync, 100% DCI-P3, 400 nits",
    currentPrice: 14000,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80"
  },
  {
    category: "Display",
    name: "16.0\" WQXGA 165Hz 16:10 IPS",
    description: "16.0-inch 2.5K (2560x1600), 16:10 Aspect, 165Hz, 500 nits, Dolby Vision",
    currentPrice: 13500,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80"
  },
  {
    category: "Display",
    name: "16.0\" 3.2K 120Hz OLED Display",
    description: "16.0-inch 3.2K (3200x2000), 120Hz 0.2ms, OLED 100% DCI-P3, 550 nits Peak",
    currentPrice: 18000,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80"
  },
  {
    category: "Display",
    name: "17.3\" QHD 240Hz Pro Esports",
    description: "17.3-inch QHD (2560x1440), 240Hz Ultra-Fast, 3ms Response, G-Sync, 100% DCI-P3",
    currentPrice: 19500,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80"
  },

  // ==================== 6. BATTERY (9) ====================
  {
    category: "Battery",
    name: "3-Cell 41Wh Li-Ion Battery",
    description: "3-Cell 41Wh Lithium-Ion Standard Battery Pack for ultrabooks",
    currentPrice: 2500,
    image: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=400&q=80"
  },
  {
    category: "Battery",
    name: "3-Cell 45Wh Fast Charge Battery",
    description: "3-Cell 45Wh Lithium-Ion with 50% charge in 30 minutes Fast Charging",
    currentPrice: 2800,
    image: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=400&q=80"
  },
  {
    category: "Battery",
    name: "4-Cell 54Wh Extended Battery",
    description: "4-Cell 54Wh Lithium-Ion Polymer Battery for all-day productivity",
    currentPrice: 3600,
    image: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=400&q=80"
  },
  {
    category: "Battery",
    name: "4-Cell 60Wh RapidCharge Battery",
    description: "4-Cell 60Wh High Density Battery with RapidCharge Support (80% in 1h)",
    currentPrice: 4200,
    image: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=400&q=80"
  },
  {
    category: "Battery",
    name: "4-Cell 70Wh Gaming Battery",
    description: "4-Cell 70Wh High Discharge Rate Battery engineered for gaming laptops",
    currentPrice: 5100,
    image: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=400&q=80"
  },
  {
    category: "Battery",
    name: "6-Cell 80Wh Dual-Core Battery",
    description: "6-Cell 80Wh Heavy-Duty Extended Life Battery with Smart Thermal Sensors",
    currentPrice: 6200,
    image: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=400&q=80"
  },
  {
    category: "Battery",
    name: "4-Cell 86Wh Enterprise Battery",
    description: "4-Cell 86Wh Commercial Grade Long-Cycle Life Li-Ion Battery",
    currentPrice: 6800,
    image: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=400&q=80"
  },
  {
    category: "Battery",
    name: "6-Cell 90Wh Extreme Capacity",
    description: "6-Cell 90Wh Maximum Performance Battery for enthusiast rigs",
    currentPrice: 7500,
    image: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=400&q=80"
  },
  {
    category: "Battery",
    name: "4-Cell 99.9Wh Flight-Safe Battery",
    description: "4-Cell 99.9Wh TSA-Compliant Maximum Allowable Carry-On Capacity",
    currentPrice: 8800,
    image: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=400&q=80"
  },

  // ==================== 7. KEYBOARD (8) ====================
  {
    category: "Keyboard",
    name: "Standard Chiclet Keyboard",
    description: "Full-size Chiclet membrane keyboard with numeric keypad, quiet typing",
    currentPrice: 1200,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80"
  },
  {
    category: "Keyboard",
    name: "White LED Backlit Keyboard",
    description: "Ergonomic island-style keyboard with 2-level clean white LED backlighting",
    currentPrice: 1800,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80"
  },
  {
    category: "Keyboard",
    name: "Single-Zone Blue Backlit Keyboard",
    description: "Gaming chiclet keyboard with 1.7mm key travel and vibrant blue backlight",
    currentPrice: 2200,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80"
  },
  {
    category: "Keyboard",
    name: "Spill-Resistant Corporate Keyboard",
    description: "Reinforced drain-through membrane keyboard with anti-wear keycaps",
    currentPrice: 2600,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80"
  },
  {
    category: "Keyboard",
    name: "4-Zone RGB Gaming Keyboard",
    description: "Dynamic 4-zone customizable RGB backlight with highlighted WASD cluster",
    currentPrice: 3200,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80"
  },
  {
    category: "Keyboard",
    name: "Precision Ergonomic TrackPoint Keyboard",
    description: "Curved dish keycaps, center TrackPoint pointing device, scissors-mechanism",
    currentPrice: 4500,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80"
  },
  {
    category: "Keyboard",
    name: "Per-Key RGB Mechanical Keyboard",
    description: "Ultra-low profile mechanical switches with per-key RGB illumination",
    currentPrice: 5500,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80"
  },
  {
    category: "Keyboard",
    name: "Optical Mechanical Linear Switch Keyboard",
    description: "0.2ms actuation optical mechanical switches, N-key rollover, full anti-ghosting",
    currentPrice: 6200,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80"
  },

  // ==================== 8. OPERATING SYSTEM (8) ====================
  {
    category: "Operating System",
    name: "FreeDOS 3.0",
    description: "Open-source DOS-compatible operating system for custom OS deployment",
    currentPrice: 0,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&q=80"
  },
  {
    category: "Operating System",
    name: "Ubuntu Linux 24.04 LTS",
    description: "Long Term Support 64-bit Linux distribution with hardware-accelerated drivers",
    currentPrice: 0,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&q=80"
  },
  {
    category: "Operating System",
    name: "Fedora Workstation 40",
    description: "Leading-edge developer and workstation Linux with GNOME 46 desktop",
    currentPrice: 0,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&q=80"
  },
  {
    category: "Operating System",
    name: "Red Hat Enterprise Linux Desktop",
    description: "RHEL Workstation edition 1-Year Self-Support Subscription License",
    currentPrice: 5000,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&q=80"
  },
  {
    category: "Operating System",
    name: "Windows 11 Home 64-bit",
    description: "Microsoft Windows 11 Home Edition 64-bit OEM Lifetime License",
    currentPrice: 6500,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&q=80"
  },
  {
    category: "Operating System",
    name: "Windows 10 IoT Enterprise LTSC",
    description: "Long-term servicing channel license with 10-year support lifecycle",
    currentPrice: 8500,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&q=80"
  },
  {
    category: "Operating System",
    name: "Windows 11 Pro 64-bit",
    description: "BitLocker encryption, Remote Desktop, Hyper-V, Domain join commercial license",
    currentPrice: 9800,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&q=80"
  },
  {
    category: "Operating System",
    name: "Windows 11 Pro for Workstations",
    description: "Advanced data resiliency with ReFS, persistent memory, and SMB Direct",
    currentPrice: 14500,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&q=80"
  }
];

async function seed() {
  try {
    const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/LaptopConfiguration";
    console.log("Connecting to:", dbUrl);
    await mongoose.connect(dbUrl, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected to MongoDB!");

    // Clear existing components so catalog is clean with exactly 75 components
    await ComponentModel.deleteMany({});
    console.log("Cleared existing components.");

    // Format components with priceHistory
    const docs = componentsData.map((item) => ({
      ...item,
      priceHistory: [{ price: item.currentPrice, updatedAt: new Date() }],
    }));

    const result = await ComponentModel.insertMany(docs);
    console.log(`Successfully seeded ${result.length} hardware components!`);

    const count = await ComponentModel.countDocuments();
    console.log(`Total components in database: ${count}`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
}

seed();
