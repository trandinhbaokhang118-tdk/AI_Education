"use client";

import type { SceneBg } from "@/lib/traffic-content";

type StorySceneBgProps = {
  sceneBg: SceneBg;
  accent: string;
  // Traffic light state for intersection scene
  lightState?: "red" | "yellow" | "green";
};

export function StorySceneBg({ sceneBg, accent, lightState = "red" }: StorySceneBgProps) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl">
      {sceneBg === "intersection" && <IntersectionScene lightState={lightState} />}
      {sceneBg === "sidewalk" && <SidewalkScene />}
      {sceneBg === "neighborhood" && <NeighborhoodScene accent={accent} />}
      {sceneBg === "road-with-signs" && <RoadWithSignsScene />}
      {sceneBg === "school-zone" && <SchoolZoneScene />}
    </div>
  );
}

function IntersectionScene({ lightState }: { lightState: "red" | "yellow" | "green" }) {
  const lightColors = {
    red: { r: "#ef4444", y: "#374151", g: "#374151" },
    yellow: { r: "#374151", y: "#f59e0b", g: "#374151" },
    green: { r: "#374151", y: "#374151", g: "#22c55e" },
  }[lightState];

  return (
    <svg viewBox="0 0 800 420" className="h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      {/* Sky gradient */}
      <defs>
        <linearGradient id="sky-int" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
        <linearGradient id="road-int" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="100%" stopColor="#1f2937" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="800" height="420" fill="url(#sky-int)" />

      {/* Clouds */}
      <ellipse cx="120" cy="60" rx="50" ry="22" fill="white" opacity="0.85" />
      <ellipse cx="150" cy="52" rx="35" ry="18" fill="white" opacity="0.85" />
      <ellipse cx="600" cy="80" rx="60" ry="25" fill="white" opacity="0.75" />
      <ellipse cx="650" cy="70" rx="40" ry="20" fill="white" opacity="0.75" />

      {/* Sun */}
      <circle cx="700" cy="55" r="32" fill="#fbbf24" opacity="0.9" />
      <circle cx="700" cy="55" r="24" fill="#fde68a" />

      {/* Buildings left */}
      <rect x="0" y="80" width="100" height="220" rx="4" fill="#94a3b8" />
      <rect x="10" y="90" width="80" height="200" rx="3" fill="#cbd5e1" />
      {[0,1,2,3,4].map(r => [0,1,2].map(c => (
        <rect key={`bl-${r}-${c}`} x={18+c*26} y={100+r*36} width="18" height="24" rx="2"
          fill={Math.random() > 0.3 ? "#fde68a" : "#64748b"} opacity="0.9" />
      )))}

      <rect x="110" y="110" width="80" height="190" rx="4" fill="#64748b" />
      <rect x="118" y="118" width="64" height="182" rx="3" fill="#94a3b8" />

      {/* Buildings right */}
      <rect x="620" y="90" width="110" height="210" rx="4" fill="#64748b" />
      <rect x="628" y="98" width="94" height="202" rx="3" fill="#94a3b8" />
      <rect x="740" y="70" width="60" height="230" rx="4" fill="#475569" />

      {/* Green strip / sidewalk */}
      <rect x="0" y="260" width="800" height="30" fill="#4ade80" opacity="0.4" />

      {/* Road */}
      <rect x="0" y="285" width="800" height="135" fill="url(#road-int)" />

      {/* Road marking - center yellow lines */}
      <rect x="0" y="348" width="800" height="5" fill="#fbbf24" opacity="0.8" />

      {/* Zebra crossing */}
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={i} x={340+i*18} y="285" width="12" height="60" rx="2" fill="white" opacity="0.9" />
      ))}

      {/* Sidewalk curb */}
      <rect x="0" y="280" width="800" height="8" rx="2" fill="#6b7280" />

      {/* Traffic light pole */}
      <rect x="540" y="175" width="10" height="110" rx="3" fill="#374151" />
      <rect x="524" y="155" width="42" height="90" rx="8" fill="#1f2937" />
      <circle cx="545" cy="175" r="13" fill={lightColors.r} />
      <circle cx="545" cy="200" r="13" fill={lightColors.y} />
      <circle cx="545" cy="225" r="13" fill={lightColors.g} />
      {/* Light glow */}
      {lightState === "green" && <circle cx="545" cy="225" r="18" fill="#22c55e" opacity="0.3" />}
      {lightState === "red" && <circle cx="545" cy="175" r="18" fill="#ef4444" opacity="0.3" />}

      {/* Trees */}
      <rect x="195" y="235" width="8" height="50" fill="#78350f" />
      <circle cx="199" cy="228" r="24" fill="#16a34a" />
      <circle cx="190" cy="220" r="18" fill="#22c55e" />

      <rect x="575" y="225" width="8" height="60" fill="#78350f" />
      <circle cx="579" cy="218" r="26" fill="#16a34a" />

      {/* Car on road */}
      <g transform="translate(50, 330)">
        <rect x="0" y="10" width="80" height="36" rx="6" fill="#3b82f6" />
        <rect x="8" y="0" width="64" height="26" rx="6" fill="#60a5fa" />
        <ellipse cx="18" cy="47" rx="12" ry="12" fill="#1f2937" />
        <ellipse cx="62" cy="47" rx="12" ry="12" fill="#1f2937" />
        <ellipse cx="18" cy="47" rx="7" ry="7" fill="#94a3b8" />
        <ellipse cx="62" cy="47" rx="7" ry="7" fill="#94a3b8" />
        <rect x="14" y="4" width="24" height="18" rx="3" fill="#bfdbfe" opacity="0.8" />
        <rect x="44" y="4" width="20" height="18" rx="3" fill="#bfdbfe" opacity="0.8" />
        <circle cx="76" cy="25" r="5" fill="#fde68a" />
        <circle cx="4" cy="25" r="4" fill="#fca5a5" />
      </g>
    </svg>
  );
}

function SidewalkScene() {
  return (
    <svg viewBox="0 0 800 420" className="h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky-sw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#f0f9ff" />
        </linearGradient>
      </defs>

      <rect width="800" height="420" fill="url(#sky-sw)" />

      {/* Clouds */}
      <ellipse cx="200" cy="70" rx="70" ry="28" fill="white" opacity="0.9" />
      <ellipse cx="500" cy="50" rx="55" ry="22" fill="white" opacity="0.85" />

      {/* Sun with rays */}
      <circle cx="680" cy="65" r="36" fill="#fbbf24" opacity="0.85" />
      {[0,45,90,135,180,225,270,315].map((angle, i) => (
        <line key={i}
          x1={680 + Math.cos(angle * Math.PI / 180) * 42}
          y1={65 + Math.sin(angle * Math.PI / 180) * 42}
          x2={680 + Math.cos(angle * Math.PI / 180) * 54}
          y2={65 + Math.sin(angle * Math.PI / 180) * 54}
          stroke="#fde68a" strokeWidth="3" strokeLinecap="round" />
      ))}

      {/* Building row */}
      <rect x="0" y="60" width="120" height="240" rx="6" fill="#94a3b8" />
      <rect x="8" y="70" width="104" height="230" rx="4" fill="#cbd5e1" />
      <rect x="130" y="90" width="90" height="210" rx="6" fill="#6366f1" />
      <rect x="138" y="98" width="74" height="202" rx="4" fill="#818cf8" />
      <rect x="240" y="100" width="70" height="200" rx="6" fill="#64748b" />
      <rect x="680" y="80" width="120" height="220" rx="6" fill="#4ade80" opacity="0.6" />
      <rect x="560" y="95" width="100" height="205" rx="6" fill="#94a3b8" />

      {/* Sidewalk / footpath */}
      <rect x="0" y="295" width="800" height="45" fill="#e2e8f0" />
      {[0,1,2,3,4,5,6,7,8,9].map(i => (
        <rect key={i} x={i * 90} y="295" width="88" height="45" rx="2" fill="none"
          stroke="#cbd5e1" strokeWidth="1.5" />
      ))}

      {/* Curb */}
      <rect x="0" y="338" width="800" height="6" rx="2" fill="#94a3b8" />

      {/* Road */}
      <rect x="0" y="344" width="800" height="76" fill="#374151" />
      <rect x="0" y="378" width="800" height="4" fill="#fbbf24" opacity="0.7" />

      {/* Trees on sidewalk */}
      {[80, 200, 350, 470, 620, 740].map((x, i) => (
        <g key={i}>
          <rect x={x - 3} y="250" width="6" height="48" fill="#92400e" />
          <circle cx={x} cy="242" r="28" fill="#16a34a" />
          <circle cx={x - 12} cy="234" r="20" fill="#22c55e" />
          <circle cx={x + 10} cy="230" r="16" fill="#4ade80" />
        </g>
      ))}

      {/* Motorcycle coming from right */}
      <g transform="translate(630, 348)" opacity="0.8">
        <rect x="0" y="8" width="55" height="22" rx="5" fill="#f97316" />
        <ellipse cx="12" cy="32" rx="10" ry="10" fill="#1f2937" />
        <ellipse cx="43" cy="32" rx="10" ry="10" fill="#1f2937" />
        <ellipse cx="12" cy="32" rx="6" ry="6" fill="#94a3b8" />
        <ellipse cx="43" cy="32" rx="6" ry="6" fill="#94a3b8" />
        <rect x="8" y="0" width="38" height="14" rx="4" fill="#fb923c" />
      </g>

      {/* Caution chevrons on road */}
      <text x="350" y="370" fontSize="28" opacity="0.4">←</text>
      <text x="420" y="370" fontSize="28" opacity="0.4">←</text>
    </svg>
  );
}

function NeighborhoodScene({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 800 420" className="h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky-nb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="60%" stopColor="#bfdbfe" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
      </defs>

      <rect width="800" height="420" fill="url(#sky-nb)" />

      {/* Morning sun */}
      <circle cx="150" cy="80" r="45" fill="#fbbf24" opacity="0.85" />
      <circle cx="150" cy="80" r="35" fill="#fde68a" />

      {/* Clouds */}
      <ellipse cx="380" cy="55" rx="65" ry="25" fill="white" opacity="0.9" />
      <ellipse cx="420" cy="45" rx="45" ry="20" fill="white" opacity="0.9" />
      <ellipse cx="650" cy="70" rx="50" ry="22" fill="white" opacity="0.8" />

      {/* House left */}
      <rect x="20" y="160" width="160" height="150" rx="4" fill="#fef3c7" />
      <polygon points="10,165 100,90 190,165" fill="#dc2626" />
      <rect x="70" y="230" width="60" height="80" rx="4" fill="#92400e" />
      {[0,1].map(r => [0,1].map(c => (
        <rect key={`hw${r}-${c}`} x={30+c*80} y={175+r*50} width="40" height="36" rx="4"
          fill="#bfdbfe" stroke="#94a3b8" strokeWidth="2" />
      )))}
      <rect x="58" y="155" width="24" height="6" rx="3" fill="#78350f" />

      {/* House right */}
      <rect x="600" y="170" width="180" height="140" rx="4" fill="#d1fae5" />
      <polygon points="590,175 690,95 790,175" fill="#0284c7" />
      <rect x="650" y="240" width="65" height="70" rx="4" fill="#78350f" />
      {[0].map(r => [0,1].map(c => (
        <rect key={`hr${r}-${c}`} x={615+c*90} y={185+r*45} width="50" height="40" rx="4"
          fill="#bfdbfe" stroke="#94a3b8" strokeWidth="2" />
      )))}

      {/* Fence */}
      {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
        <g key={i}>
          <rect x={200 + i * 38} y="288" width="5" height="40" rx="2" fill="white" stroke="#e2e8f0" strokeWidth="1" />
          <polygon points={`${200+i*38-3},288 ${200+i*38+2.5},280 ${200+i*38+8},288`} fill="white" stroke="#e2e8f0" strokeWidth="1" />
        </g>
      ))}
      <rect x="200" y="308" width="400" height="6" rx="3" fill="white" stroke="#e2e8f0" strokeWidth="1" />

      {/* Ground / driveway */}
      <rect x="0" y="310" width="800" height="110" fill="#d1d5db" />
      <rect x="0" y="308" width="800" height="5" rx="2" fill="#9ca3af" />

      {/* Road marking */}
      <rect x="0" y="370" width="800" height="4" fill="#fbbf24" opacity="0.7" />

      {/* Motorbike */}
      <g transform="translate(350, 320)">
        <rect x="0" y="8" width="60" height="26" rx="6" fill="#7c3aed" />
        <ellipse cx="14" cy="36" rx="12" ry="12" fill="#1f2937" />
        <ellipse cx="46" cy="36" rx="12" ry="12" fill="#1f2937" />
        <ellipse cx="14" cy="36" rx="7" ry="7" fill="#94a3b8" />
        <ellipse cx="46" cy="36" rx="7" ry="7" fill="#94a3b8" />
        <rect x="10" y="0" width="40" height="14" rx="5" fill="#8b5cf6" />
        <circle cx="55" cy="20" r="5" fill="#fde68a" />
      </g>

      {/* Helmet on ground near bike */}
      <g transform="translate(280, 330)">
        <ellipse cx="0" cy="0" rx="22" ry="18" fill={accent} />
        <ellipse cx="0" cy="-5" rx="18" ry="12" fill="#fbbf24" opacity="0.5" />
        <ellipse cx="0" cy="5" rx="20" ry="6" fill="#92400e" opacity="0.4" />
      </g>

      {/* Trees */}
      <rect x="490" y="240" width="8" height="72" fill="#78350f" />
      <circle cx="494" cy="232" r="32" fill="#16a34a" />
      <circle cx="482" cy="220" r="22" fill="#22c55e" />
    </svg>
  );
}

function RoadWithSignsScene() {
  return (
    <svg viewBox="0 0 800 420" className="h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky-rs" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0fdf4" />
          <stop offset="100%" stopColor="#dcfce7" />
        </linearGradient>
      </defs>

      <rect width="800" height="420" fill="url(#sky-rs)" />
      <ellipse cx="400" cy="60" rx="90" ry="35" fill="white" opacity="0.9" />
      <ellipse cx="450" cy="50" rx="65" ry="28" fill="white" opacity="0.9" />
      <circle cx="700" cy="60" r="38" fill="#fbbf24" opacity="0.8" />

      {/* Buildings */}
      <rect x="0" y="80" width="130" height="220" rx="5" fill="#94a3b8" />
      <rect x="8" y="88" width="114" height="212" rx="4" fill="#e2e8f0" />
      <rect x="650" y="100" width="150" height="200" rx="5" fill="#6366f1" />
      <rect x="658" y="108" width="134" height="192" rx="4" fill="#818cf8" />

      {/* Sidewalk */}
      <rect x="0" y="295" width="800" height="40" fill="#f3f4f6" />

      {/* Road */}
      <rect x="0" y="330" width="800" height="90" fill="#374151" />
      <rect x="0" y="370" width="800" height="5" fill="#fbbf24" opacity="0.8" />

      {/* === Traffic Signs === */}
      {/* Blue pedestrian sign */}
      <g transform="translate(130, 180)">
        <rect x="-5" y="0" width="10" height="120" rx="3" fill="#374151" />
        <rect x="-30" y="-50" width="60" height="60" rx="6" fill="#0284c7" />
        <text x="-18" y="-12" fontSize="32">🚶</text>
        <rect x="-34" y="-54" width="68" height="68" rx="8" fill="none" stroke="#0369a1" strokeWidth="3" />
      </g>

      {/* Warning triangle sign */}
      <g transform="translate(380, 160)">
        <rect x="-5" y="0" width="10" height="140" rx="3" fill="#374151" />
        <polygon points="0,-60 -42,20 42,20" fill="#fbbf24" stroke="#ef4444" strokeWidth="5" />
        <text x="-14" y="10" fontSize="28">⚠️</text>
      </g>

      {/* Prohibited round sign */}
      <g transform="translate(630, 175)">
        <rect x="-5" y="0" width="10" height="120" rx="3" fill="#374151" />
        <circle cx="0" cy="-36" r="40" fill="white" stroke="#ef4444" strokeWidth="6" />
        <rect x="-32" y="-42" width="64" height="14" rx="4" fill="#ef4444" />
      </g>

      {/* School sign */}
      <g transform="translate(260, 185)">
        <rect x="-5" y="0" width="10" height="110" rx="3" fill="#374151" />
        <rect x="-38" y="-55" width="76" height="65" rx="6" fill="#fbbf24" />
        <polygon points="-38,-55 38,-55 0,-80" fill="#fbbf24" />
        <text x="-22" y="-20" fontSize="16" fontWeight="bold" fill="#92400e">TRƯỜNG</text>
        <text x="-26" y="-5" fontSize="11" fill="#78350f">HỌC SINH QUA</text>
      </g>

      {/* Road dashes */}
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x={60 + i * 120} y="350" width="70" height="6" rx="3" fill="white" opacity="0.6" />
      ))}

      {/* Trees */}
      {[500, 560].map((x, i) => (
        <g key={i}>
          <rect x={x - 3} y="245" width="6" height="52" fill="#78350f" />
          <circle cx={x} cy="236" r="28" fill="#16a34a" />
          <circle cx={x - 12} cy="226" r="20" fill="#22c55e" />
        </g>
      ))}
    </svg>
  );
}

function SchoolZoneScene() {
  return (
    <svg viewBox="0 0 800 420" className="h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky-sc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ede9fe" />
          <stop offset="100%" stopColor="#ddd6fe" />
        </linearGradient>
      </defs>

      <rect width="800" height="420" fill="url(#sky-sc)" />

      {/* Rainbow */}
      {[0,1,2,3].map(i => (
        <path key={i}
          d={`M ${80 - i*10} 180 Q 400 ${-80 + i*15} ${720 + i*10} 180`}
          fill="none"
          stroke={["#ef4444","#f97316","#fbbf24","#4ade80"][i]}
          strokeWidth="8" opacity="0.5" />
      ))}

      {/* School building */}
      <rect x="200" y="80" width="380" height="230" rx="8" fill="#fef3c7" />
      <rect x="210" y="88" width="360" height="222" rx="6" fill="#fefce8" />

      {/* Roof */}
      <polygon points="180,80 400,15 620,80" fill="#7c3aed" />
      <polygon points="195,80 400,22 605,80" fill="#8b5cf6" />
      {/* Flag on roof */}
      <rect x="397" y="12" width="4" height="30" fill="#374151" />
      <polygon points="401,12 425,22 401,32" fill="#ef4444" />

      {/* School sign */}
      <rect x="280" y="88" width="220" height="50" rx="6" fill="#7c3aed" />
      <text x="390" y="122" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle">TRƯỜNG TIỂU HỌC</text>

      {/* Windows */}
      {[0,1,2].map(c => [0,1].map(r => (
        <g key={`sw-${c}-${r}`}>
          <rect x={235 + c*118} y={160 + r*60} width="64" height="52" rx="6" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="2" />
          <line x1={235 + c*118 + 32} y1={160 + r*60} x2={235 + c*118 + 32} y2={160 + r*60 + 52} stroke="#60a5fa" strokeWidth="1.5" />
          <line x1={235 + c*118} y1={160 + r*60 + 26} x2={235 + c*118 + 64} y2={160 + r*60 + 26} stroke="#60a5fa" strokeWidth="1.5" />
        </g>
      )))}

      {/* School gate */}
      <rect x="358" y="248" width="64" height="62" rx="6" fill="#92400e" />

      {/* Sidewalk to school */}
      <rect x="0" y="308" width="800" height="40" fill="#e2e8f0" />
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x={i * 105} y="308" width="103" height="40" rx="2" fill="none"
          stroke="#d1d5db" strokeWidth="1.5" />
      ))}

      {/* Road */}
      <rect x="0" y="345" width="800" height="75" fill="#374151" />

      {/* Zebra crossing at school gate */}
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={370 + i * 16} y="345" width="10" height="50" rx="2" fill="white" opacity="0.9" />
      ))}

      {/* "Học sinh qua đường" sign */}
      <g transform="translate(560, 200)">
        <rect x="-5" y="0" width="10" height="110" rx="3" fill="#374151" />
        <rect x="-42" y="-60" width="84" height="70" rx="6" fill="#fbbf24" />
        <text x="-28" y="-30" fontSize="12" fontWeight="bold" fill="#92400e">HỌC SINH</text>
        <text x="-28" y="-14" fontSize="12" fontWeight="bold" fill="#92400e">QUA ĐƯỜNG</text>
        <text x="-14" y="2" fontSize="22">🏫</text>
      </g>

      {/* Road centerline */}
      <rect x="0" y="378" width="800" height="4" fill="#fbbf24" opacity="0.7" />

      {/* Kids near school */}
      {[440, 480, 520].map((x, i) => (
        <g key={i} transform={`translate(${x}, 300)`}>
          <circle cx="0" cy="-24" r="10" fill={["#fde68a","#fcd34d","#fde68a"][i]} />
          <rect x="-7" y="-14" width="14" height="18" rx="3"
            fill={["#6366f1","#f97316","#22c55e"][i]} />
          <rect x="-4" y="4" width="4" height="14" rx="2" fill="#fbbf24" />
          <rect x="0" y="4" width="4" height="14" rx="2" fill="#fbbf24" />
        </g>
      ))}

      {/* Trees */}
      <rect x="145" y="248" width="7" height="62" fill="#78350f" />
      <circle cx="149" cy="240" r="30" fill="#16a34a" />
      <rect x="648" y="252" width="7" height="58" fill="#78350f" />
      <circle cx="652" cy="244" r="28" fill="#22c55e" />
    </svg>
  );
}
