import * as React from 'react';

export function Section({ children, className }) {
  // If no className is provided, assume it's a docs card grid
  // If className is provided, it's a landing page section (e.g., .hero, .value-props)
  const isDocsCardGrid = !className;

  // If it's a docs page without className, render as a grid of cards
  if (isDocsCardGrid) {
    return (
      <div className="docs-section">
        <div className="docs-grid">
          {children}
        </div>
        <style jsx>
          {`
            .docs-section {
              margin: 1.5rem 0;
            }

            .docs-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
              gap: 1rem;
              width: 100%;
            }

            @media screen and (max-width: 768px) {
              .docs-grid {
                grid-template-columns: 1fr;
                gap: 0.875rem;
              }
            }

            @media screen and (min-width: 769px) and (max-width: 1024px) {
              .docs-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }
          `}
        </style>
      </div>
    );
  }

  // Default behavior for landing pages
  return (
    <div className={['section', className].filter(Boolean).join(' ')}>
      <section>{children}</section>
      <style jsx>
        {`
          div {
            width: 100%;
            background: var(--light);
            padding: 130px 0 150px;
          }
          section {
            margin: 0 auto;
            max-width: var(--landing-page-max-width);
          }
          @media screen and (max-width: 1000px) {
            div {
              padding: 4rem 0 5.3125rem;
            }
          }
          @media screen and (max-width: 600px) {
            div {
              padding: 3.75rem 0 3.75rem;
            }
          }
        `}
      </style>
    </div>
  );
}

