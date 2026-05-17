---
name: to-shopify-polaris
description: Convert Shopify design patterns and wireframes to React Polaris components with mockup data. Use this skill when the user wants to implement a UI based on wireframes in docs/design-patterns/ or convert design patterns to actual Polaris code.
---

# Shopify Polaris Implementation Skill

Convert design patterns and wireframes into production-ready React Polaris components with realistic mockup data.

## Input
- Wireframe files from `docs/design-patterns/*.html`
- Design patterns from `docs/design-patterns/README.md`

## Output
Generate React component files using Polaris components with mock data.

## Implementation Pattern

### 1. Page Structure

```tsx
import { Page, Layout, Card, BlockStack, InlineStack, Text, Button } from "@shopify/polaris";
import { PlusIcon, ExportIcon } from "@shopify/polaris-icons";

export default function DashboardPage() {
  return (
    <Page
      title="Dashboard"
      primaryAction={{content: 'Add Product', icon: PlusIcon, onAction: () => {}}}
    >
      <Layout>
        <Layout.Section>
          {/* Banner */}
          <Banner tone="info" onDismiss={() => {}}>
            <p>New: Improved bulk editing features are now available.</p>
          </Banner>

          {/* Stats Grid */}
          <InlineGrid columns={{xs: 1, sm: 2, md: 4}} gap="400">
            <StatCard label="Total Revenue" value="$12,847" trend="up" />
            <StatCard label="Orders" value="156" trend="up" />
            <StatCard label="Products" value="84" trend="down" />
            <StatCard label="Conversion" value="3.2%" trend="up" />
          </InlineGrid>

          {/* Table Card */}
          <Card padding="0">
            <ProductTable products={mockProducts} />
          </Card>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <QuickStatsCard stats={stats} />
          <QuickActionsCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
```

### 2. Component Architecture

```
app/components/
├── StatCard.tsx
├── ProductTable.tsx
├── QuickStatsCard.tsx
├── QuickActionsCard.tsx
└── Banner.tsx (if custom)
```

### 3. Mock Data Pattern

```tsx
// app/data/mock.ts
export const mockProducts = [
  {
    id: '1',
    title: 'Premium Widget',
    status: 'active',
    price: '$49.99',
    inventory: 142,
  },
  {
    id: '2',
    title: 'Basic Widget',
    status: 'active',
    price: '$29.99',
    inventory: 89,
  },
  {
    id: '3',
    title: 'Deluxe Bundle',
    status: 'draft',
    price: '$99.99',
    inventory: 0,
  },
];

export const mockStats = {
  totalRevenue: '$12,847',
  orders: 156,
  products: 84,
  conversion: '3.2%',
};
```

### 4. IndexTable Implementation

```tsx
import { IndexTable, Text, Badge, useIndexResourceState } from "@shopify/polaris";

interface Product {
  id: string;
  title: string;
  status: 'active' | 'draft' | 'archived';
  price: string;
  inventory: number;
}

export function ProductTable({ products }: { products: Product[] }) {
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
      <IndexTable.Cell>{product.price}</IndexTable.Cell>
      <IndexTable.Cell>{product.inventory} units</IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <IndexTable
      resourceName={{singular: 'product', plural: 'products'}}
      itemCount={products.length}
      selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
      onSelectionChange={handleSelectionChange}
      headings={[
        {title: 'Product'},
        {title: 'Status'},
        {title: 'Price'},
        {title: 'Inventory', alignment: 'end'},
      ]}
    >
      {rowMarkup}
    </IndexTable>
  );
}
```

### 5. StatCard Component

```tsx
import { Box, InlineStack, Text } from "@shopify/polaris";

interface StatCardProps {
  label: string;
  value: string;
  trend?: 'up' | 'down';
}

export function StatCard({ label, value, trend }: StatCardProps) {
  return (
    <Box padding="400" background="bg-surface-secondary" borderRadius="200">
      <InlineStack gap="200" align="block" blockAlign="center">
        <Text tone="subdued" variant="bodySm">{label}</Text>
        <Text as="p" variant="headingLg" fontWeight="bold">{value}</Text>
        {trend && (
          <Text tone={trend === 'up' ? 'success' : 'critical'} variant="bodySm">
            {trend === 'up' ? '↑' : '↓'} Change
          </Text>
        )}
      </InlineStack>
    </Box>
  );
}
```

## Implementation Steps

1. **Read wireframe** from `docs/design-patterns/dashboard.html` (or relevant wireframe)
2. **Identify components** - StatCard, ProductTable, QuickStatsCard, etc.
3. **Create mock data** in `app/data/mock.ts`
4. **Implement components** in `app/components/`
5. **Assemble in page** following Page > Layout > Card hierarchy

## Wireframe Reference

See `docs/design-patterns/dashboard.html` for the dashboard wireframe that maps to:

```
DashboardPage
├── Banner (Polaris Banner)
├── InlineGrid (stats)
│   └── StatCard × 4
├── Card (table)
│   └── ProductTable
└── Layout.Section (sidebar)
    ├── QuickStatsCard
    └── QuickActionsCard
```