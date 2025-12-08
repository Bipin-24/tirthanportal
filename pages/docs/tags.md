---
title: Tags
description: Use tags to extend Markdown. With tags you can use native Markdoc components or custom-built React components.
---

# {% $markdoc.frontmatter.title %}

Tags are a syntactic extension of standard Markdown. You can use native Markdoc tags, like [tables](#table), [conditionals](#if/else), and [partials](#partial), or create custom React components.

Similar to React components and HTML elements, tags are composable, and you can customize them with [attributes](/docs/attributes).

{% example %}

```md
{% if true %}

{% callout type="note" %}
Tags are composable!
{% /callout %}

{% else /%}

{% callout type="warning" %}
Tags aren't composable!
{% /callout %}

{% /if %}
```
{% /example %}

Tags can be self-closing (similar to HTML). In this example, you'll see that the content body is removed, and that the tag is closed with a `/`.

{% example %}

```
{% image width=40 /%}
```

{% /example %}

If your tag doesn't contain any new lines, then it's treated as an inline tag. Inline tags are automatically wrapped with a single `paragraph` [Node](/docs/nodes) (which renders a `<p>` element by default), to follow the [CommonMark paragraph spec](https://spec.commonmark.org/0.30/#paragraphs).

{% example %}

```
{% code %}

{% highlight %}Inline tag 1{% /highlight %}
{% highlight %}Inline tag 2{% /highlight %}

{% /code %}
```

{% /example %}




## Built-in tags

Markdoc comes out-of-the-box with four built-in tags: `if`, `else`, `table`, and `partial`.

### If/Else

Dynamically render content when specific conditions are met using the `{% if %}` and `{% else /%}` tags. Markdoc uses conditionals with [variables](/docs/syntax#variables) and [functions](/docs/functions).

{% callout type="warning" %}
Unlike JavaScript, Markdoc only considers `undefined`, `null`, and `false` to be falsey.
{% /callout %}

Use the `if` tag to render content when a condition evaluates to `true`.

{% example %}

```
This is shown no matter what.

{% if $myFunVar %}
Only appear if $myFunVar!
{% /if %}
```

{% /example %}

Use the `else` tag to render alternate content when the `if` condition isn't met. You can use multiple `else` statements, and the final `else` tag triggers when none of the other conditions are met.

{% example %}

```
{% if $myFunVar %}
Only appear if $myFunVar!
{% else /%}
This appears if not $myFunVar!
{% /if %}

{% if $myFunVar %}
Only appear if $myFunVar!
{% else $otherFunVar /%}
This appears if not $myFunVar and $otherFunVar!
{% else /%}
This appears if not $myFunVar and not $otherFunVar
{% /if %}
```

{% /example %}

### Table

While Markdoc supports [CommonMark](https://commonmark.org/) tables, it also supports a list based syntax that allows for easy injection of rich content, like bulleted lists and code samples.

#### Basic table

A basic Markdoc table uses list syntax with each row separated by three dashes `---`.

{% example %}

```
{% table %}
* Heading 1
* Heading 2
---
* Row 1 Cell 1
* Row 1 Cell 2
---
* Row 2 Cell 1
* Row 2 cell 2
{% /table %}
```

{% /example %}

#### Table with rich content

Markdoc tables support rich text, including code samples and lists.

{% example %}

````
{% table %}
* Foo
* Bar
* Baz
---
*
  ```
  puts "Some code here."
  ```
*
  {% list type="checkmark" %}
  * Bulleted list in table
  * Second item in bulleted list
  {% /list %}
* Text in a table
---
*
  A "loose" list with

  multiple line items
* Test 2
* Test 3
---
* Test 1
* A cell that spans two columns {% colspan=2 %}
{% /table %}
````

{% /example %}

#### Table without headings

{% example %}

```
{% table %}
---
* foo
* bar
---
* foo
* bar
{% /table %}
```

{% /example %}

#### Set column and row span

Explicitly set column and row span.

{% example %}

```
{% table %}
---
* foo
* bar
---
* foo {% colspan=2 %}
{% /table %}
```

{% /example %}

#### Text alignment

{% example %}

```
{% table %}
* Column 1 {% align="center" %}
* Column 2
* Column 3 {% align="right" %}
---
* foo
* bar
* baz
---
* foo
* bar {% align="right" %}
* baz
---
* foo {% align="center" %}
* bar
* baz
{% /table %}
```

{% /example %}

#### Table caveats

Markdoc uses the `table` tag to locate places to parse the Markdown list syntax as a table, but it uses the `table` [node](/docs/nodes) to render the actual table elements. To customize how the default `table` renders, you need to register a custom a table _node_.

{% example %}

```js
import { nodes } from '@markdoc/markdoc';

/** @type {import('@markdoc/markdoc').Config} */
const config = {
  nodes: {
    table: {
      ...nodes.table,
      render: 'Table' // your custom component goes here
    }
  }
};
```

{% /example %}

### Partial

Markdoc uses partials to reuse content across docs. The content is stored in a separate markdown file, and it's referenced from the `file` attribute in the `partial` tag, which includes the corresponding piece of content.

Here is an example of including the `header.md` file as a partial.
{% example %}

```
{% partial file="header.md" /%}
```

{% /example %}

For more information on partials, check out the full [partials docs](/docs/partials).


## Create a custom tag

To extend Markdoc with a custom tag, first, create a tag definition. In this example, you're creating a `callout` tag:

```js
// ./schema/Callout.markdoc.js

export const callout = {
  render: 'Callout',
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    type: {
      type: String,
      default: 'note',
      matches: ['caution', 'check', 'note', 'warning'],
      errorLevel: 'critical'
    },
    title: {
      type: String
    }
  }
};
```

Then, pass the tag definition to your [`config` object](/docs/config):

```js
import { callout } from './schema/Callout.markdoc';
import * as components from './components';

/** @type {import('@markdoc/markdoc').Config} */
const config = {
  tags: {
    callout
  }
};

const doc = `
# My first custom tag
`;

const ast = Markdoc.parse(doc);
const content = Markdoc.transform(ast, config);

const children = Markdoc.renderers.react(content, React, { components });
```

Next, pass your content to the Markdoc renderer. If you want to render a React component, specify which component should render this type of tag in the `components` mapping.

```jsx
import * as React from 'react';
import { Icon } from './Icon';

function Callout({ title, icon, children }) {
  return (
    <div className="callout">
      <div className="content">
        <Icon icon={icon} />
        <div className="copy">
          <span className="title">{title}</span>
          <span>{children}</span>
        </div>
      </div>
    </div>
  );
}

return Markdoc.renderers.react(content, React, {
  components: {
    // The key here is the same string as `tag` in the previous step
    Callout: Callout
  }
});
```

Now you can use your custom tag in your Markdoc content.

{% sideBySide %}

{% example %}

```md
{% callout title="Hey you!" icon="note" %}
I have a message for you
{% /callout %}
```

{% /example %}

{% callout title="Hey you!" type="note" %}
I have a message for you
{% /callout %}

{% /sideBySide %}

## Options

These are the optional fields you can use to customize your `Tag`:

{% table %}

- Option
- Type
- Description {% width="40%" %}

---

- `render`
- `string`
- Name of the output (for example, HTML tag, React component name) to render

---

- `children`
- `string[]`
- Specifies which node types can be rendered as children of this tag. Used in schema validation.

---

- `attributes`
- `{ [string]: SchemaAttribute }`
- Specifies which [values (and their types)](/docs/attributes) can be passed to this tag.

---

- `transform`
- ```js
  (Ast.Node, ?Options) =>
    | RenderableTreeNode
    | RenderableTreeNode[]
    | null
  ```
- Customize the Markdoc transform function for this tag, returning the custom output you want to eventually render. This is called during the [`transform` step](/docs/render#transform).

---

- `validate`
- ```js
  (Node, ?Options) => ValidationError[];
  ```
- Extend Markdoc validation. Used to validate that the content meets validation requirements. This is called during the [`validate` step](/docs/render#validate)

---

- `selfClosing`
- `boolean`
- Specifies whether a tag can contain children (`false`) or not (`true`). Used in schema validation.

{% /table %}

## Next steps

- [Customize tags with attributes](/docs/attributes)
- [Create custom functions](/docs/functions)



---

{% table %}
* Parameter
* Expected value
---
* `name`
* Specifies the display name for the connection.
---
* `code`
* Defines the unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner.
---
* `connector_id`
* The type of connector to be used for the connection. The value must be `looker` and must not be modified.
---
* `enabled`
* A boolean value to enable or disable the connection. The default value is `true`.
---
* `catalog_code`
* Defines the catalog code associated with the connection ("default" when empty).
---
* ```
  secret_manager {
     enabled =
     key =
  }
  ```
* Configuration for a secret manager.

  This configuration works only with Scanner version 73 or later and requires a functional secret manager configured in the scanner configuration file.
  
  Where:
  * `enabled`: A boolean value to enable or disable the secret manager. The default value is `true`.
  * `key`: Specifies the name of the secret.
---
* ```
  connection {
    tenant =
    oauth {
      client_id =
      client_secret =
    }
    timeout =
    fetch_offset_size =
  }
  ```
* Connection settings
  
  Where:
  * `tenant`: The tenant address. In URL address, it is the name of your server before `.cloud.looker.com`.
  * `client_id`: Token name obtained within the Looker account menu.
  * `client_secret`: Token secret
  * `timeout`: (Optional) Customizable HTTP client timeout depending on Looker repository volume, in ms. The default value is `10000` (10 sec).
  * `fetch_offset_size`: (Optional) Customizable offset size for the dashboard inventory. The default value is `100`.
---
* `lineage`
* (Optional) A boolean value to activate the automatic lineage feature. The default value is `true`.
---
* ```
  proxy {
    scheme =
    hostname =
    port =
    username =
    password =
  }
  ```
* Proxy configuration
  
  Where:
  * `scheme`: Defines the proxy protocol (`http` or `https`).
  * `hostname`: Specifies the proxy address.
  * `port`: Sets the proxy port.
  * `username`: Provides the proxy username.
  * `password`: Provides the proxy account password.
---
* ```
  tls {
    truststore {
      path =
      password =
      type =
    }
  }
  ```
* TLS Truststore settings
  
  Where:
  * `path`: Specifies the TLS trust store file path. This file must be provided in case TLS encryption is activated (protocol `https`) and when certificates of Looker servers (or/and configured proxy) are delivered by a specific authority. It must contain the certification chain.
  * `password`: Provides the password of the trust store file.
  * `type`: Defines the type of the trust store file (`PKCS12` or `JKS`). The default value is discovered from the file extension.
{% /table %}





## Operations

{% table %}
* Operation name
* Availability
* Description
* Comment
---
* item
* Ok
* Query one item from the catalog, using a unique reference
* 
---
* itemByname
* Ok
* Query one item from the catalog, using its name and type
* 
---
* items
* Ok
* Query a list of items of a given type from the catalog
* Limitations: Filters using "connections" or date type properties are not available yet.
---
* node
* Ok
* Direct query to a Node (to follow Relay conventions)
* 
---
* createContact
* Ok
* Create a contact
* 
---
* createItem
* Ok
* Create an item (all types EXCEPT contacts)
* 
---
* deleteContact
* Ok
* Delete a contact
* 
---
* deleteItem
* Ok
* Delete an item (all types EXCEPT contacts)
* Deleting Fields is limited to orphans.
---
* updateContact
* Ok
* Update a single contact
* 
---
* updateItem
* Ok
* Update a single item (all types EXCEPT contacts)
* 
{% /table %}


## Item Types

{% table %}
* Item type
* Value
* Read
* Write
---
* Dataset
* dataset
* Ok
* Ok
---
* Field
* field
* Ok
* Ok
---
* Visualization
* visualization
* Ok
* Ok
---
* Data process
* data-process
* Ok
* Ok
---
* Contact
* contact
* Ok
* Ok
---
* Datasource
* datasource
* Ok
* N/A
---
* Category
* category
* Ok
* Ok
---
* Custom Item Type
* Code of the custom item as defined in Zeenea metamodel
* Ok
* Ok
---
* Glossary Item Type
* Code of the glossary item as defined in Zeenea metamodel
* Ok
* Ok
{% /table %}


## Basic Attributes

{% table %}
* Attribute
* Available on
* Item type(s)
* Read
* Write
* Description
* Comment
---
* id
* String
* Any type
* Ok
* N/A
* Zeenea internal identifier of the Item
* 
---
* key
* String
* Any type
* Ok
* Ok
* Forgeable unique identifier of the Item
* key = email for contacts
---
* name
* String
* Any type
* Ok
* Ok
* Name of the Item in Zeenea
* Concatenation of firstName and lastName for contacts
---
* description
* String
* Any type
* Ok
* Ok
* Description of the Item in Zeenea
* 
---
* lastCatalogMetadataUpdate
* Date
* Any type
* Ok
* N/A
* Date of the last modification in Zeenea
* 
---
* type
* String
* Any type
* Ok
* N/A
* Item type value as defined above
* 
---
* completion
* Number
* Any type
* Ok
* N/A
* Completion rate of the documentation of the Item
* Not implemented for contacts and data sources
{% /table %}


## Built-in Properties

{% table %}
* Property
* Available on
* Item type(s)
* Read
* Write
* Description
---
* sourceName
* String
* Dataset, Field, Visualization, Data Process
* Ok
* N/A
* Name of the item in the source system
---
* sourceDescription
* String
* Dataset, Field, Visualization, Data Process
* Ok
* N/A
* Description of the item in the source system
---
* lastSourceMetadataUpdate
* Date
* Dataset, Field, Visualization, Data Process
* Ok
* N/A
* Last time there was a change in the item metadata in the source system
---
* orphan
* Boolean
* Dataset, Field, Visualization
* Ok
* N/A
* Item is missing from the last inventory
---
* deletionDate
* Date
* Dataset, Field, Visualization, Data Process
* Ok
* N/A
* The date at which the item has been deleted in the source system
---
* importDate
* Date
* Dataset, Field, Visualization, Data Process
* Ok
* N/A
* The date at which the item has been imported into the catalog
---
* fieldType
* String
* Field
* Ok
* N/A
* The normalized type of the field
---
* fieldNativeType
* String
* Field
* Ok
* N/A
* The native type of the field as defined in the source system
---
* canBeNull
* Boolean
* Field
* Ok
* N/A
* Whether the field is nullable
---
* multivalued
* Boolean
* Field
* Ok
* N/A
* Whether the field supports multiple values
---
* primaryKey
* Boolean
* Field
* Ok
* N/A
* Whether the field is a primary key
---
* foreignKey
* Boolean
* Field
* Ok
* N/A
* Whether the field is a foreign key
---
* businessKey
* Boolean
* Field
* Ok
* Ok
* Whether the field is a business key
---
* dataProfileEnabled
* Boolean
* Field
* Ok
* Ok
* Whether the data profile on the field is enabled
---
* dataProfilePublished
* Boolean
* Field
* Ok
* Ok
* Whether the data profile on the field is published
---
* alternativeNames
* [String]
* All glossary types
* Ok
* Ok
* List of alternatives names
---
* email
* String
* Contact
* Ok
* Ok
* Email of the contact
---
* firstName
* String
* Contact
* Ok
* Ok
* First name of the contact
---
* lastName
* String
* Contact
* Ok
* Ok
* Last name of the contact
---
* phone
* String
* Contact
* Ok
* Ok
* Phone number of the contact
{% /table %}


## Connections

{% table %}
* Source type
* Target type(s)
* Connection name
* Read
* Write
* Description
---
* dataset
* field
* fields
* Ok
* N/A
* Fields of a dataset
---
* dataset
* dataset
* relations
* Ok
* Ok
* Datasets linked through a foreign key
---
* dataset
* data-process
* ingesters
* Ok
* Ok
* All the data processes that have the dataset as input
---
* dataset
* data-process
* producers
* Ok
* Ok
* All the data processes that have the dataset as output
---
* dataset
* visualization
* visualization
* Ok
* Ok
* For the datasets that are embedded in a visualization, the visualization
---
* dataset
* Custom item type
* Code of the custom item type
* Ok
* Ok
* Custom items of a given type linked to the dataset
---
* dataset
* category
* category
* Ok
* Ok
* (DEPRECATED) Category of the dataset
---
* dataset
* contact
* curators
* Ok
* Ok
* Curators of the dataset
---
* dataset
* contact
* Responsibility name
* Ok
* Ok
* Contacts that have the given responsibility on the dataset
---
* dataset
* datasource
* datasource
* Ok
* N/A
* The datasource of the dataset
---
* dataset
* All glossary item types
* definitions
* Ok
* Ok
* All the glossary items linked to the dataset (can contain various types)
---
* field
* dataset
* dataset
* Ok
* N/A
* The dataset the field belongs to
---
* field
* Custom item type
* Code of the custom item type
* Ok
* Ok
* Custom items of a given type linked to the field
---
* field
* All glossary item types
* definitions
* Ok
* Ok
* All the glossary items linked to the field (can contain various types)
---
* field
* contact
* curators
* Ok
* Ok
* Curators of the field
---
* field
* contact
* Responsibility name
* Ok
* Ok
* Contacts that have the given responsibility on the field
---
* data-process
* dataset or Custom item type
* inputs
* Ok
* Ok
* Inputs of the data process
---
* data-process
* dataset or Custom item type
* outputs
* Ok
* Ok
* Outputs of the data process
---
* data-process
* Custom item type
* Code of the custom item type
* Ok
* Ok
* Custom items of a given type linked to the data process
---
* data-process
* contact
* curators
* Ok
* Ok
* Curators of the data process
---
* data-process
* contact
* Responsibility name
* Ok
* Ok
* Contacts that have the given responsibility on the data process
---
* data-process
* datasource
* datasource
* Ok
* N/A
* The datasource of the data process (if the data process has been harvested)
---
* data-process
* All glossary item types
* definitions
* Ok
* Ok
* All the glossary items linked to the data process (can contain various types)
---
* visualization
* Custom item type
* Code of the custom item type
* Ok
* Ok
* Custom items of a given type linked to the data process
---
* visualization
* dataset
* datasets
* Ok
* Ok
* Datasets embedded in the visualization
---
* visualization
* contact
* curators
* Ok
* Ok
* Curators of the data process
---
* visualization
* contact
* Responsibility name
* Ok
* Ok
* Contacts that have the given responsibility on the visualization
---
* visualization
* datasource
* datasource
* Ok
* N/A
* The datasource of the visualization
---
* visualization
* All glossary item types
* definitions
* Ok
* Ok
* All the glossary items linked to the visualization (can contain various types)
---
* Custom item type
* Any type
* members
* Ok
* Ok
* All the other items that are linked to this custom item
---
* Custom item type
* data-process
* ingesters
* Ok
* Ok
* All the data processes that have the custom item as input
---
* Custom item type
* data-process
* producers
* Ok
* Ok
* All the data processes that have the custom item as output
---
* Custom item type
* contact
* curators
* Ok
* Ok
* Curators of the custom item
---
* Custom item type
* contact
* Responsibility name
* Ok
* Ok
* Contacts that have the given responsibility on the custom item
---
* Custom item type
* All glossary item type
* definitions
* Ok
* Ok
* All the glossary items linked to the custom item (can contain various types)
---
* Glossary item type
* Any type
* implementations
* Ok
* Ok
* All the other items that are linked to the glossary item
---
* Glossary item type
* All glossary item type
* parents
* Ok
* Ok
* Parents of the glossary item in the glossary
---
* Glossary item type
* All glossary item type
* children
* Ok
* Ok
* Children of the glossary item in the glossary
---
* Glossary item type
* Any type
* implementations
* Ok
* Ok
* All the other items that are linked to the glossary item
---
* Glossary item type
* contact
* curators
* Ok
* Ok
* Curators of the glossary item
---
* Glossary item type
* contact
* Responsibility name
* Ok
* Ok
* Contacts that have the given responsibility on the glossary item
---
* contact
* Any type
* curator
* Ok
* Ok
* All the items the contact is curator of (various types)
---
* contact
* Any type
* Responsibility name
* Ok
* Ok
* All the items on which the contact has the given responsibility(various types)
---
* datasource
* dataset, field, visualization, data-process
* imports
* Ok
* N/A
* All the items that have been imported from the source
---
* category
* dataset
* members
* Ok
* Ok
* [DEPRECATED] Datasets of the category
---
* category
* contact
* curators
* Ok
* Ok
* [DEPRECATED] Curators of the custom item
---
* category
* contact
* Responsibility name
* Ok
* Ok
* [DEPRECATED] Contacts that have the given responsibility on the custom item
---
* category
* All glossary item type
* definitions
* Ok
* Ok
* [DEPRECATED] All the glossary items linked to the category (can contain various types)
{% /table %}


## Custom Properties

{% table %}
* Property type
* Read
* Write
* Description
---
* Template property
* Ok
* Ok
* All properties associated to the template of an Item type in the Studio
---
* Source property
* Ok
* N/A
* All properties harvested from a connector
{% /table %}