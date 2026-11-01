import React from 'react';
import { Link } from 'react-router-dom';
import { NavBar } from '../../components/NavBar/NavBar';
import { SEO } from '../../components/SEO/SEO';

// Rendered by the catch-all `*` route. react-snap pre-renders this into the
// build's 404.html, which GitHub Pages serves (with a real 404 status) for any
// unknown URL. It is marked noindex so search engines don't index "not found"
// responses as thin/duplicate pages.
//
// /404.html is listed in reactSnap.include on purpose: react-snap only adds it
// by itself once a site has two or more URLs, which a one-page site never reaches.
export const NotFound = () => (
  <>
    <SEO
      title="Page Not Found"
      description="The page you were looking for could not be found on Anabasis."
      noindex
    />
    <NavBar />
    <section className="section1" style={{ justifyContent: 'center' }}>
      <div className="header_section1">
        <h1>404</h1>
      </div>
      <p>This page could not be found.</p>
      <Link
        to="/"
        style={{
          marginTop: '2rem',
          color: '#A81330',
          fontFamily: '"Cinzel", serif',
          fontSize: '1.4rem',
          letterSpacing: '4px',
          textDecoration: 'none',
          textTransform: 'uppercase',
        }}
      >
        Return Home
      </Link>
    </section>
  </>
);
