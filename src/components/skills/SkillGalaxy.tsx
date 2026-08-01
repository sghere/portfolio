import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { resumeData, CATEGORY_COLORS } from '../../utils/resumeData';
import { SkillsData, SkillNode } from '../../types/resume';
import { Search, RotateCcw } from 'lucide-react';

export function SkillGalaxy() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Flatten skills into SkillNodes
  const allNodes: SkillNode[] = [];
  const categories = Object.keys(resumeData.skills) as (keyof SkillsData)[];

  categories.forEach((cat) => {
    resumeData.skills[cat].forEach((skillName) => {
      allNodes.push({
        id: skillName,
        name: skillName,
        category: cat,
        radius: cat === 'frontend' ? 24 : cat === 'architecture' ? 22 : 18,
      });
    });
  });

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const width = svgEl.clientWidth || 800;
    const height = 520;

    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    // Container for zoom/pan
    const container = svg.append('g').attr('class', 'galaxy-container');

    // Zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
      });

    svg.call(zoom as any);

    // Initial node positions in orbiting rings per category
    const categoryAngles: Record<string, number> = {};
    const catKeys = Object.keys(CATEGORY_COLORS);
    catKeys.forEach((key, idx) => {
      categoryAngles[key] = (idx * 2 * Math.PI) / catKeys.length;
    });

    const nodesData: SkillNode[] = JSON.parse(JSON.stringify(allNodes));

    nodesData.forEach((d) => {
      const angle = categoryAngles[d.category] + (Math.random() - 0.5) * 0.8;
      const dist = 120 + Math.random() * 140;
      d.x = width / 2 + Math.cos(angle) * dist;
      d.y = height / 2 + Math.sin(angle) * dist;
    });

    // Orbiting rings background
    const rings = [90, 160, 230];
    rings.forEach((r) => {
      container
        .append('circle')
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .attr('r', r)
        .attr('fill', 'none')
        .attr('stroke', 'currentColor')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '3 5')
        .attr('class', 'text-slate-300 dark:text-slate-800 opacity-60');
    });

    // Force simulation
    const simulation = d3
      .forceSimulation<SkillNode>(nodesData)
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('charge', d3.forceManyBody().strength(-180))
      .force('collide', d3.forceCollide().radius((d: any) => d.radius + 12))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05));

    // Draw node elements
    const nodeGroup = container
      .selectAll<SVGGElement, SkillNode>('g.node')
      .data(nodesData)
      .enter()
      .append('g')
      .attr('class', 'node cursor-pointer')
      .call(
        d3
          .drag<SVGGElement, SkillNode>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }) as any
      );

    // Node Outer Glow / Circle
    const circles = nodeGroup
      .append('circle')
      .attr('r', (d) => d.radius)
      .attr('fill', (d) => CATEGORY_COLORS[d.category]?.hex || '#6366f1')
      .attr('fill-opacity', 0.85)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .attr('class', 'transition-all duration-200');

    // Node Text Label
    nodeGroup
      .append('text')
      .text((d) => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', '#ffffff')
      .attr('font-size', (d) => (d.radius > 20 ? '11px' : '9.5px'))
      .attr('font-weight', '600')
      .attr('pointer-events', 'none');

    // Hover & Click events
    nodeGroup
      .on('mouseenter', (_e, d) => {
        setHoveredSkill(`${d.name} (${d.category.toUpperCase()})`);
        d3.select(_e.currentTarget)
          .select('circle')
          .transition()
          .duration(150)
          .attr('r', d.radius * 1.35)
          .attr('fill-opacity', 1);
      })
      .on('mouseleave', (_e, d) => {
        setHoveredSkill(null);
        d3.select(_e.currentTarget)
          .select('circle')
          .transition()
          .duration(150)
          .attr('r', d.radius)
          .attr('fill-opacity', 0.85);
      })
      .on('click', (_e, d) => {
        setSelectedSkill(d.name);
      });

    simulation.on('tick', () => {
      nodeGroup.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="relative p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl overflow-hidden">
      {/* Top Galaxy Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skill (e.g. Next.js, Redux)..."
            className="w-full pl-9 pr-4 py-2 rounded-full text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-slate-500">Active Node:</span>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            {hoveredSkill || selectedSkill || 'Hover / Drag Node'}
          </span>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative w-full h-[520px] bg-slate-950/5 dark:bg-slate-950/50 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
        <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      </div>

      {/* Category Color Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
        {Object.entries(CATEGORY_COLORS).map(([cat, config]) => (
          <div key={cat} className="flex items-center gap-1.5 text-xs font-mono capitalize">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: config.hex }} />
            <span className="text-slate-600 dark:text-slate-400">{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
