import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const items = [
  {
    title: 'Intelligent Platform',
    links: [
      { href: '/docs/intro', children: 'Introduction' },
    ]
  },
  {
    title: 'Get started', 
    links: [
      { href: '/docs/zeenea-superadmin', children: 'Super Admin' },
      { href: '/docs/zeenea-data-steward', children: 'Data Steward' },
      { href: '/docs/zeenea-data-explorer', children: 'Data Explorer' },
      { href: '/docs/zeenea-definitions', children: 'Definitions' }
    ]
  },
  {
    title: 'APIs',
    links: [
      { href: '/docs/zeenea-access-request-api', children: 'Access Request' },
      { href: '/docs/zeenea-catalog-design-api', children: 'Catalog Design' },
      { href: '/docs/zeenea-data-product-api', children: 'Data Product' },
      { href: '/docs/zeenea-graphql-api-v2-limitations', children: 'GraphQL' },
    ]
  },
  {
    title: 'Connectors',
    links: [
      { href: '/docs/zeenea-connector-looker', children: 'Looker' },
      { href: '/docs/zeenea-connectors-list', children: 'List' },
      { href: '/docs/zeenea-dataset-detection', children: 'Dataset' },
    ]
  },
  
  {
    title: 'Markdoc',
    links: [
      { href: '/docs/overview', children: 'What is Markdoc?' },
      { href: '/docs/getting-started', children: 'Installation' },
      { href: '/docs/faq', children: 'FAQ' },
      { href: '/sandbox', children: 'Try it out' }
    ]
  },
  {
    title: 'Core concepts',
    links: [
      { href: '/docs/syntax', children: 'Syntax and schema' },
      { href: '/docs/nodes', children: 'Nodes' },
      { href: '/docs/tags', children: 'Tags' },
      { href: '/docs/partials', children: 'Partials' },
      { href: '/docs/attributes', children: 'Attributes' },
      { href: '/docs/variables', children: 'Variables' },
      { href: '/docs/functions', children: 'Functions' },
      {
        href: '/docs/render',
        children: 'Rendering'
      },
      {
        href: '/docs/config',
        children: 'Config objects'
      },
      { href: '/docs/validation', children: 'Validation' }
    ]
  },
  {
    title: 'Integration guides',
    links: [
      { href: '/docs/examples', children: 'Common examples' },
      { href: '/docs/examples/html', children: 'Using with HTML' },
      { href: '/docs/nextjs', children: 'Using with Next.js' },
      { href: '/docs/examples/react', children: 'Using with React' }
    ]
  },
  {
    title: 'Advanced concepts',
    links: [
      { href: '/docs/frontmatter', children: 'Frontmatter' },
      { href: '/docs/partials', children: 'Partials' },
      { href: '/docs/format', children: 'Formatting' }
    ]
  }
];

export function SideNav() {
  const router = useRouter();

  return (
    <nav className="sidenav">
      {items.map((item) => (
        <div key={item.title}>
          <h3>{item.title}</h3>
          <ul className="flex column">
            {item.links.map((link) => {
              const active = router.pathname === link.href;
              return (
                <li key={link.href} className={active ? 'active' : ''}>
                  <Link {...link}>{link.children}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <style jsx>
        {`
          nav {
            /* https://stackoverflow.com/questions/66898327/how-to-keep-footer-from-pushing-up-sticky-sidebar */
            position: sticky;
            top: var(--nav-height);
            height: calc(100vh - var(--nav-height));
            flex: 0 0 240px;
            overflow-y: auto;
            padding: 2rem 0 2rem 2rem;
          }
          h3 {
            font-weight: 500;
            margin: 0.5rem 0 0;
            padding-bottom: 0.5rem;
          }
          ul {
            margin: 0;
            padding: 0;
          }
          li {
            list-style-type: none;
            margin: 0 0 0.7rem 0.7rem;
            font-size: 14px;
            font-weight: 400;
          }
          li a {
            text-decoration: none;
          }
          li a:hover,
          li.active > a {
            text-decoration: underline;
          }
          @media screen and (max-width: 600px) {
            nav {
              display: none;
            }
          }
        `}
      </style>
    </nav>
  );
}
