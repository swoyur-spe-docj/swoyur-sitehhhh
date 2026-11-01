'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ContactIcon } from '@/components/ContactIcon';
import { EmailBrandIcon, InstagramBrandIcon } from '@/components/MenuBrandIcons';

const LINKS = [
  ['/about', 'About', 'Who we are and how we work'],
  ['/services', 'Services', 'Video, design, creators and Meta Ads'],
  ['/packages', 'Packages', 'Clear monthly plans to start with'],
  ['/portfolio', 'Work', 'Campaigns and content we have made'],
  ['/blog', 'Journal', 'Ideas on content and growth'],
  ['/careers', 'Careers', 'Join a small, focused team'],
  ['/contact', 'Contact', 'Tell us your goals, we reply personally'],
] as const;

function activePath(pathname: string, href: string) {
  if (pathname === href || pathname.startsWith(href + '/')) return true;
  return href === '/packages' && (pathname === '/checkout' || pathname.startsWith('/order/'));
}

export function PublicNavigation({ emailHref = '', whatsappHref = '', instagramHref = '' }: { emailHref?: string; whatsappHref?: string; instagramHref?: string }) {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  const links = (mobile = false) => LINKS.map(([href, label, desc]) => {
    const active = activePath(pathname, href);
    return <Link key={href} href={href} className={active ? 'nav-link is-active' : 'nav-link'} aria-current={active ? 'page' : undefined} onClick={mobile ? closeMenu : undefined}>{label}<span className="nav-link-arrow" aria-hidden="true">↗</span>{mobile && <small className="nav-link-desc">{desc}</small>}</Link>;
  });

  return <>
    <div className="public-desktop-navigation">
      <nav className="nav-links nav-desktop" aria-label="Main navigation">{links()}</nav>
      {instagramHref && <a className="header-instagram-action" href={instagramHref} target="_blank" rel="noopener noreferrer" aria-label="Visit Padmaarc on Instagram" title="Instagram"><InstagramBrandIcon /><span>Instagram</span></a>}
      {emailHref && <a className="header-email-action" href={emailHref}><EmailBrandIcon /> Email our team</a>}
    </div>
    <div className={`mobile-menu${open ? ' is-open' : ''}`}>
      <button className="mobile-menu-trigger" type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-site-navigation" onClick={() => setOpen((value) => !value)}><span className="mobile-menu-icon" aria-hidden="true"><i/><i/><i/></span><span>{open ? 'Close' : 'Menu'}</span></button>
      {open && <><button className="mobile-menu-backdrop" type="button" aria-label="Close navigation menu" onClick={closeMenu}/><div className="mobile-menu-drawer" id="mobile-site-navigation"><div className="mobile-menu-heading"><span>Explore Padmaarc</span><button type="button" onClick={closeMenu} aria-label="Close navigation menu">×</button></div><nav aria-label="Mobile navigation">{links(true)}</nav><div className="mobile-menu-actions">{emailHref && <a className="menu-contact-button menu-contact-email" href={emailHref} onClick={closeMenu}><EmailBrandIcon /> Email our team <span aria-hidden="true">↗</span></a>}{whatsappHref && <a className="menu-contact-button menu-contact-whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={closeMenu}><ContactIcon name="whatsapp" /> WhatsApp us <span aria-hidden="true">↗</span></a>}{instagramHref && <a className="menu-instagram-link" href={instagramHref} target="_blank" rel="noopener noreferrer" onClick={closeMenu} aria-label="Visit Padmaarc on Instagram"><InstagramBrandIcon /> Instagram <span aria-hidden="true">↗</span></a>}</div></div></>}
    </div>
  </>;
}
