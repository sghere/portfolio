import { motion } from 'motion/react';

interface RadarAxis {
  label: string;
  value: number; // 0 to 100
}

export function SkillRadar() {
  const axes: RadarAxis[] = [
    { label: 'Frontend Architecture', value: 98 },
    { label: 'React & Next.js Ecosystem', value: 96 },
    { label: 'Performance & Web Vitals', value: 95 },
    { label: 'State Management & Caching', value: 94 },
    { label: 'Testing & Code Quality', value: 88 },
    { label: 'REST / Node.js Backend', value: 86 },
    { label: 'CI/CD & Dev Tools', value: 90 },
  ];

  const size = 480;
  const center = size / 2;
  const radius = 170;
  const totalAxes = axes.length;

  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / totalAxes - Math.PI / 2;
    const r = (radius * value) / 100;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const polygonPoints = axes
    .map((axis, i) => {
      const { x, y } = getCoordinates(i, axis.value);
      return `${x},${y}`;
    })
    .join(' ');

  // Grid levels (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl flex flex-col items-center">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-sans">
          Domain Proficiency Radar
        </h3>
        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
          Relative mastery score across enterprise engineering verticals
        </p>
      </div>

      <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
          {/* Grid Level Polygons */}
          {levels.map((level, lvlIdx) => {
            const levelPoints = axes
              .map((_, i) => {
                const { x, y } = getCoordinates(i, 100 * level);
                return `${x},${y}`;
              })
              .join(' ');

            return (
              <polygon
                key={lvlIdx}
                points={levelPoints}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-slate-200 dark:text-slate-800"
              />
            );
          })}

          {/* Axis Spoke Lines */}
          {axes.map((_, i) => {
            const { x, y } = getCoordinates(i, 100);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="currentColor"
                strokeWidth="1"
                className="text-slate-200 dark:text-slate-800"
              />
            );
          })}

          {/* Data Polygon */}
          <motion.polygon
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            points={polygonPoints}
            fill="rgba(99, 102, 241, 0.25)"
            stroke="#6366f1"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Data Vertex Points & Labels */}
          {axes.map((axis, i) => {
            const { x, y } = getCoordinates(i, axis.value);
            const labelPos = getCoordinates(i, 118);

            return (
              <g key={i}>
                <motion.circle
                  initial={{ r: 0 }}
                  animate={{ r: 5 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  cx={x}
                  cy={y}
                  fill="#6366f1"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-slate-700 dark:fill-slate-300 text-[10px] font-mono font-semibold"
                >
                  {axis.label} ({axis.value}%)
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
