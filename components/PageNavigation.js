import React from 'react';
import { AppLink as Link } from './AppLink';

// Define the documentation structure for navigation
const DOCS_STRUCTURE = [
  { path: '/docs/intro', title: 'Introduction' },
  { path: '/docs/zeenea-superadmin', title: 'Super Admin' },
  { path: '/docs/zeenea-data-steward', title: 'Data Steward' },
  { path: '/docs/zeenea-data-explorer', title: 'Data Explorer' },
  { path: '/docs/zeenea-definitions', title: 'Definitions' },
  { path: '/docs/zeenea-access-request-api', title: 'Access Request API' },
  { path: '/docs/zeenea-catalog-design-api', title: 'Catalog Design API' },
  { path: '/docs/zeenea-data-product-api', title: 'Data Product API' },
  { path: '/docs/overview', title: 'What is Markdoc?' },
  { path: '/docs/getting-started', title: 'Installation' },
  { path: '/docs/faq', title: 'FAQ' },
  { path: '/docs/syntax', title: 'Syntax and schema' },
  { path: '/docs/nodes', title: 'Nodes' },
  { path: '/docs/tags', title: 'Tags' },
  { path: '/docs/attributes', title: 'Attributes' },
  { path: '/docs/variables', title: 'Variables' },
  { path: '/docs/functions', title: 'Functions' },
  { path: '/docs/render', title: 'Rendering' },
  { path: '/docs/config', title: 'Config objects' },
  { path: '/docs/validation', title: 'Validation' },
  { path: '/docs/examples', title: 'Common examples' },
  { path: '/docs/examples/html', title: 'Using with HTML' },
  { path: '/docs/nextjs', title: 'Using with Next.js' },
  { path: '/docs/examples/react', title: 'Using with React' },
  { path: '/docs/frontmatter', title: 'Frontmatter' },
  { path: '/docs/partials', title: 'Partials' },
  { path: '/docs/format', title: 'Formatting' },
];

export function PageNavigation({ currentPath }) {
  const currentIndex = DOCS_STRUCTURE.findIndex(
    (page) => page.path === currentPath
  );

  if (currentIndex === -1) return null;

  const prevPage = currentIndex > 0 ? DOCS_STRUCTURE[currentIndex - 1] : null;
  const nextPage =
    currentIndex < DOCS_STRUCTURE.length - 1
      ? DOCS_STRUCTURE[currentIndex + 1]
      : null;

  return (
    <nav className="page-navigation">
      <div className="nav-container">
        {prevPage ? (
          <Link href={prevPage.path} className="nav-link prev">
            <div className="nav-arrow">←</div>
            <div className="nav-content">
              <div className="nav-label">Previous</div>
              <div className="nav-title">{prevPage.title}</div>
            </div>
          </Link>
        ) : (
          <div className="nav-placeholder" />
        )}

        {nextPage ? (
          <Link href={nextPage.path} className="nav-link next">
            <div className="nav-content">
              <div className="nav-label">Next</div>
              <div className="nav-title">{nextPage.title}</div>
            </div>
            <div className="nav-arrow">→</div>
          </Link>
        ) : (
          <div className="nav-placeholder" />
        )}
      </div>

      <style jsx>{`
        .page-navigation {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--gray-medium);
        }

        .nav-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .page-navigation :global(.nav-link) {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          border: 1px solid var(--gray-medium);
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
          background: var(--light);
        }

        .page-navigation :global(.nav-link:hover) {
          border-color: var(--theme);
          background: var(--gray-light);
        }

        .page-navigation :global(.nav-link.prev) {
          justify-content: flex-start;
        }

        .page-navigation :global(.nav-link.next) {
          justify-content: flex-end;
          text-align: right;
        }

        .nav-arrow {
          font-size: 24px;
          color: var(--dark);
          flex-shrink: 0;
        }

        .nav-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .nav-label {
          font-size: 12px;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--gray);
          letter-spacing: 0.5px;
        }

        .nav-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--dark);
        }

        .nav-placeholder {
          visibility: hidden;
        }

        :global(.dark) .page-navigation :global(.nav-link) {
          background: var(--black-medium);
          border-color: var(--gray);
        }

        :global(.dark) .page-navigation :global(.nav-link:hover) {
          border-color: var(--theme);
        }

        :global(.dark) .nav-arrow,
        :global(.dark) .nav-title {
          color: var(--white);
        }

        @media screen and (max-width: 600px) {
          .nav-container {
            grid-template-columns: 1fr;
          }

          .page-navigation :global(.nav-link.next) {
            justify-content: flex-start;
            text-align: left;
          }
        }
      `}</style>
    </nav>
  );
}
