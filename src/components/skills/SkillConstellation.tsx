import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { resumeData } from '../../utils/resumeData';
import { SkillNode, SkillLink } from '../../types/resume';

export function SkillConstellation() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Core constellation nodes & links
  const featuredSkills = [
    'React.js',
    'Next.js',
    'TypeScript',
    'Redux Toolkit',
    'RTK Query',
    'React Query',
    'Zustand',
    'Tailwind CSS',
    'Material UI (MUI)',
    'Framer Motion',
    'D3.js',
    'Node.js',
    'Express.js',
    'REST APIs',
    'GraphQL',
    'Webpack',
    'Module Federation',
    'Jest',
    'Cypress',
    'Vite',
    'CI/CD',
    'Docker',
  ];

  const linksData: { source: string; target: string }[] = [
    { source: 'React.js', target: 'Next.js' },
    { source: 'React.js', target: 'TypeScript' },
    { source: 'React.js', target: 'Redux Toolkit' },
    { source: 'Redux Toolkit', target: 'RTK Query' },
    { source: 'React.js', target: 'React Query' },
    { source: 'React.js', target: 'Zustand' },
    { source: 'React.js', target: 'Tailwind CSS' },
    { source: 'React.js', target: 'Framer Motion' },
    { source: 'React.js', target: 'D3.js' },
    { source: 'Next.js', target: 'Node.js' },
    { source: 'Node.js', target: 'Express.js' },
    { source: 'Express.js', target: 'REST APIs' },
    { source: 'Express.js', target: 'GraphQL' },
    { source: 'React.js', target: 'Webpack' },
    { source: 'Webpack', target: 'Module Federation' },
    { source: 'React.js', target: 'Vite' },
    { source: 'TypeScript', target: 'Jest' },
    { source: 'Jest', target: 'Cypress' },
    { source: 'Vite', target: 'CI/CD' },
    { source: 'CI/CD', target: 'Docker' },
  ];

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const width = svgEl.clientWidth || 800;
    const height = 500;

    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    const nodes: SkillNode[] = featuredSkills.map((s) => ({
      id: s,
      name: s,
      category: 'frontend',
      radius: s === 'React.js' || s === 'Next.js' ? 24 : 18,
    }));

    const links: SkillLink[] = linksData.map((l) => ({ ...l }));

    const simulation = d3
      .forceSimulation<SkillNode>(nodes)
      .force('link', d3.forceLink<SkillNode, SkillLink>(links).id((d) => d.id).distance(90))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(32));

    // Draw links
    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#6366f1')
      .attr('stroke-opacity', 0.25)
      .attr('stroke-width', 1.5);

    // Draw nodes
    const node = svg
      .append('g')
      .selectAll<SVGGElement, SkillNode>('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'cursor-pointer')
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

    node
      .append('circle')
      .attr('r', (d) => d.radius)
      .attr('fill', '#0f172a')
      .attr('stroke', '#6366f1')
      .attr('stroke-width', 2);

    node
      .append('text')
      .text((d) => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', '#f8fafc')
      .attr('font-size', '10px')
      .attr('font-weight', '600')
      .attr('pointer-events', 'none');

    node
      .on('mouseenter', (_e, d) => {
        setActiveNode(d.name);
        // Highlight links connected to d
        link
          .attr('stroke-opacity', (l: any) =>
            l.source.id === d.id || l.target.id === d.id ? 0.9 : 0.1
          )
          .attr('stroke-width', (l: any) =>
            l.source.id === d.id || l.target.id === d.id ? 3 : 1
          );
      })
      .on('mouseleave', () => {
        setActiveNode(null);
        link.attr('stroke-opacity', 0.25).attr('stroke-width', 1.5);
      });

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-sans">
            Technology Constellation
          </h3>
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
            Connected dependency network & force repulsion graph
          </p>
        </div>
        <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
          {activeNode ? `Focusing: ${activeNode}` : 'Hover node to view links'}
        </div>
      </div>

      <div className="w-full h-[500px] bg-slate-950/90 rounded-2xl border border-slate-800 overflow-hidden">
        <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      </div>
    </div>
  );
}
