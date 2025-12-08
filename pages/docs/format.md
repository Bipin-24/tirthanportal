---
title: Formatting
description: Use Markdoc.format to prettify documents or generate source content
---

# {% $markdoc.frontmatter.title %}

Markdoc comes with the ability to take a Markdoc abstract syntax tree (AST) and generate the source content. This is useful for generating Markdoc files from data, or prettifying documents.

## Examples

Take for example you want to generate a Markdoc file from from some JSON:

```json
// ./data.json
[
  [34.0522, -118.2437],
  [40.7128, -74.0060],
  [48.8566, 2.3522]
]
```

You can call `Markdoc.format` with an AST `Node` to generate the source content:

{% sideBySide %}

```js
const Markdoc = require('@markdoc/markdoc')
const DATA = require('./data.json')

const list = new Markdoc.Ast.Node(
  'list',
  {ordered: false},
  DATA.map(point => new Markdoc.Ast.Node(
    'item',
    {},
    [
      new Markdoc.Ast.Node('inline', {}, [
        new Markdoc.Ast.Node(
          'text', 
          {content: point.join(', ')}, 
          []
        )
      ])
    ]
  ))
)

Markdoc.format(list)
```

```md
- 34.0522, -118.2437
- 40.7128, -74.006
- 48.8566, 2.3522
```

{% /sideBySide %}




---


---
title: Quick Links
description: Explore key features and resources to get started quickly
---

# {% $markdoc.frontmatter.title %}

Get started with our platform by exploring the most popular resources and features below.

---

## 🚀 Most Popular

{% section %}
{% item href="/docs/overview" title="Introduction" %}
Learn about the Intelligent Platform and its core capabilities.
{% /item %}

{% item href="/docs/zeenea-superadmin" title="Super Admin Guide" %}
Complete guide for platform administrators and system configuration.
{% /item %}

{% item href="/docs/zeenea-data-explorer" title="Data Explorer" %}
Discover and explore your data catalog with powerful search tools.
{% /item %}
{% /section %}

---

## 📚 Getting Started

{% section %}
{% item href="/docs/zeenea-data-steward" title="Data Steward" %}
Manage and govern your data assets effectively.
{% /item %}

{% item href="/docs/zeenea-definitions" title="Definitions" %}
Understand key concepts and terminology used throughout the platform.
{% /item %}

{% item href="/docs/syntax" title="Syntax and Schema" %}
Learn about the syntax and schema structures for advanced configurations.
{% /item %}
{% /section %}

---

## 🔌 API Integration

{% section %}
{% item href="/docs/zeenea-access-request-api" title="Access Request API" %}
Manage data access requests programmatically.
{% /item %}

{% item href="/docs/zeenea-catalog-design-api" title="Catalog Design API" %}
Build and customize your data catalog structure.
{% /item %}

{% item href="/docs/zeenea-data-product-api" title="Data Product API" %}
Create and manage data products through API endpoints.
{% /item %}
{% /section %}

---

## 📖 Documentation Resources

{% section %}
{% item href="/docs/markdoc-features-guide" title="Markdoc Features Guide" %}
Comprehensive guide to creating beautiful documentation with Markdoc.
{% /item %}

{% item href="/docs/nodes" title="Nodes Introduction" %}
Learn about nodes and their role in the platform architecture.
{% /item %}

{% item href="/docs/attributes" title="Attributes Examples" %}
Practical examples of using attributes in your implementation.
{% /item %}
{% /section %}

---

## 🎯 Use Cases

Explore common use cases and implementation patterns:

- **Data Governance**: Set up policies, roles, and permissions
- **Catalog Management**: Organize and structure your data assets
- **Access Control**: Manage user permissions and data access requests
- **API Integration**: Connect external systems and automate workflows

---

## 💡 Need Help?

{% callout type="note" %}
**Can't find what you're looking for?** Check out our [community forum](https://communities.actian.com/s/?language=en_US) or browse the complete [API documentation](/api-docs).
{% /callout %}

{% callout type="check" %}
**New to the platform?** Start with the [Introduction](/docs/overview) to understand the core concepts, then explore the guides above based on your role.
{% /callout %}

---

## 🔗 External Resources

- 📘 [Community Forum](https://communities.actian.com/s/?language=en_US) - Ask questions and connect with other users
- 💻 [Downloads](https://esd.actian.com/) - Get the latest software releases
- 📞 [Support](https://www.actian.com/support-services/) - Contact our support team

---

*Last updated: December 2025*
