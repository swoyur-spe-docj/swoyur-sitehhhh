import Link from 'next/link';
import type { Pkg } from '@/lib/types';
import { inr } from '@/lib/format';
import { ActionIcon } from '@/components/ActionIcon';

export function PackageCard({ p }: { p: Pkg }) {
  return (
    <article className={`card pkg tilt-card ${p.featured ? 'featured' : ''}`}>
      {p.featured && <span className="badge">Recommended</span>}
      <h3>{p.name}</h3>
      <p className="muted" style={{ margin: 0 }}>
        {p.durationMonths} {p.durationMonths === 1 ? 'month' : 'months'}
      </p>
      <p className="package-description">A focused monthly content plan with {p.videos} {p.videos === 1 ? 'video' : 'videos'} and {p.posters} {p.posters === 1 ? 'design' : 'designs'} to help your brand stay consistent and campaign-ready.</p>
      <div className="price">{inr(p.price)}</div>
      <p style={{ margin: '0 0 6px' }}>
        <strong>{p.videos}</strong> videos · <strong>{p.posters}</strong> posters
      </p>
      <ul className="list">
        {p.deliverables.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
      <Link className={`btn ${p.featured ? 'btn-primary' : 'btn-outline'}`} href={`/checkout?package=${p.slug}`}>
        <ActionIcon name="package" /> Choose package
      </Link>
    </article>
  );
}
