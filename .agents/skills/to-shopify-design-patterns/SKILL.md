---
name: to-shopify-design-patterns
description: Design patterns guide for building Shopify embedded apps. Outputs documentation and wireframes for routes, components, and Polaris UI patterns. Use when building Shopify Admin interfaces.
---

# Shopify Design Patterns Guide

This skill provides design patterns and wireframe references for building Shopify embedded apps with Remix and Polaris.

## Outputs

When invoked, generate design patterns documentation to:
- `docs/design-patterns/README.md` - Main design patterns guide
- `docs/design-patterns/*.html` - Interactive wireframe examples

## Core Design Principles

### 1. Frontend Design Thinking
- Always think UX/UI before coding
- Consider merchant workflows and efficiency
- Group related actions logically
- Use progressive disclosure
- Maintain consistent visual hierarchy

### 2. Route Architecture
- Plan routes before coding
- Use Remix file-system routing conventions
- Add every route to `<ui-nav-menu>` in `app.tsx`
- Name routes clearly: `app.settings.tsx`, `app.products._index.tsx`

### 3. Component Reuse
- Extract reusable components to `app/components/`
- Single responsibility: `ProductCard.tsx`, `StatsCard.tsx`
- Compose with BlockStack, InlineStack, InlineGrid

## Route Structure Pattern

```
app/routes/
├── app._index.tsx           → Dashboard (/)
├── app.tsx                   → Layout with <ui-nav-menu>
├── app.settings.tsx          → Settings index
├── app.settings.profile.tsx  → Settings > Profile
├── app.products._index.tsx   → Products list
├── app.products.$id.tsx      → Product detail
└── app.orders._index.tsx     → Orders list
```

## NavMenu Integration

Every route must be registered in the app layout:

```tsx
// app/routes/app.tsx
import { NavMenu } from "@shopify/polaris";
import { Link } from "@remix-run/react";

export default function AppLayout() {
  return (
    <ui-nav-menu>
      <Link to="/app">Dashboard</Link>
      <Link to="/app/products">Products</Link>
      <Link to="/app/orders">Orders</Link>
      <Link to="/app/settings">Settings</Link>
    </ui-nav-menu>
  );
}
```

## Polaris Component Patterns

### Page > Layout > Card Hierarchy

```tsx
import { Page, Layout, Card, BlockStack, InlineStack, Text } from "@shopify/polaris";

export default function MyPage() {
  return (
    <Page title="Dashboard" primaryAction={{content: 'Add', onAction: handleAdd}}>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">Section Title</Text>
              {/* content */}
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>...</Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
```

### Layout.AnnotatedSection for Settings

```tsx
<Layout.AnnotatedSection
  title="General"
  description="Configure your app settings"
>
  <Card>
    <BlockStack gap="400">
      <TextField label="App Name" />
      <Checkbox label="Enable Feature X" />
    </BlockStack>
  </Card>
</Layout.AnnotatedSection>
```

### IndexTable for Lists

```tsx
import { IndexTable, Card, Text, Badge, useIndexResourceState } from "@shopify/polaris";

function ProductList({ products }) {
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(products);

  const rowMarkup = products.map((product, index) => (
    <IndexTable.Row
      id={product.id}
      key={product.id}
      selected={selectedResources.includes(product.id)}
      position={index}
    >
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="bold">{product.title}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Badge tone={product.status === 'active' ? 'success' : 'info'}>
          {product.status}
        </Badge>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <Card padding="0">
      <IndexTable
        resourceName={{singular: 'product', plural: 'products'}}
        itemCount={products.length}
        selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
        onSelectionChange={handleSelectionChange}
        headings={[{title: 'Product'}, {title: 'Status'}]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}
```

## Component Architecture

### Extract Reusable Components

```
app/components/
├── ui/
│   ├── StatCard.tsx        # InlineStack with icon, label, value
│   ├── SectionCard.tsx      # Card with BlockStack wrapper
│   └── PageHeader.tsx       # Title + description pattern
├── forms/
│   ├── SettingsForm.tsx     # FormLayout composition
│   └── ProductForm.tsx      # Full product form
└── lists/
    ├── ProductTable.tsx     # IndexTable wrapper
    └── OrderTable.tsx       # IndexTable for orders
```

### Component Composition Example

```tsx
// app/components/ui/StatCard.tsx
import { InlineStack, Text, Box } from "@shopify/polaris";

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: 'up' | 'down';
}

export function StatCard({ label, value, trend }: StatCardProps) {
  return (
    <Box padding="400" background="bg-surface-secondary" borderRadius="200">
      <InlineStack gap="200" align="center">
        <Text tone="subdued">{label}</Text>
        {trend && <Text tone={trend === 'up' ? 'success' : 'critical'}>↑</Text>}
      </InlineStack>
      <Text as="p" variant="headingLg" fontWeight="bold">{value}</Text>
    </Box>
  );
}
```

## Design Tokens

Use Polaris tokens for spacing, colors, typography:

| Token | Value | Usage |
|-------|-------|-------|
| `--p-space-400` | 16px | Default spacing |
| `--p-space-800` | 32px | Section spacing |
| `--p-border-radius-200` | 8px | Cards, buttons |
| `--p-color-bg-surface` | Card background | |

## Wireframe Output

When generating wireframes, create interactive HTML files that demonstrate:
- Layout structure with placeholders
- Component placement and hierarchy
- Responsive behavior

See `docs/design-patterns/dashboard.html` for example wireframe.