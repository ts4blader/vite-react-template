# Formatter Utilities

## Overview

This directory contains utility functions for formatting data using the JavaScript `Intl` API, providing consistent and locale-aware formatting for dates and numbers.

## Available Formatters

### Date Formatter (`date.ts`)

#### `formatDate`
Formats dates according to specified patterns using `Intl.DateTimeFormat`.

```typescript
formatDate(date: Date | string | number, format?: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD"): string
```

**Parameters:**
- `date`: Date object, string, or number to format
- `format`: Optional format pattern (defaults to "DD/MM/YYYY")

**Supported Formats:**
- `"DD/MM/YYYY"`: Day/Month/Year (e.g., "23/02/2026")
- `"MM/DD/YYYY"`: Month/Day/Year (e.g., "02/23/2026") 
- `"YYYY-MM-DD"`: ISO format (e.g., "2026-02-23")

**Returns:** Formatted date string or "Invalid Date" for invalid inputs

**Examples:**
```typescript
formatDate(new Date()) // "23/02/2026"
formatDate("2024-01-15", "MM/DD/YYYY") // "01/15/2024"
formatDate(1642248000000, "YYYY-MM-DD") // "2022-01-15"
```

### Number Formatters (`number.ts`)

#### `formatNumber`
General decimal number formatting using `Intl.NumberFormat`.

```typescript
formatNumber(value: number | string, options?: Intl.NumberFormatOptions): string
```

**Default Options:**
- Style: "decimal"
- Minimum fraction digits: 0
- Maximum fraction digits: 2

**Examples:**
```typescript
formatNumber(1234.567) // "1,234.57"
formatNumber("1234.5", { maximumFractionDigits: 0 }) // "1,235"
formatNumber(1234567, { useGrouping: false }) // "1234567"
```

#### `formatCurrency`
Currency formatting with customizable currency code.

```typescript
formatCurrency(value: number | string, currency?: string, options?: Omit<Intl.NumberFormatOptions, "style" | "currency">): string
```

**Parameters:**
- `value`: Number or string to format
- `currency`: Currency code (defaults to "USD")
- `options`: Additional Intl.NumberFormatOptions (excluding style and currency)

**Examples:**
```typescript
formatCurrency(1234.56) // "$1,234.56"
formatCurrency(1234.56, "EUR") // "€1,234.56"
formatCurrency(1234.56, "JPY") // "¥1,235"
formatCurrency(1234.56, "USD", { minimumFractionDigits: 0 }) // "$1,235"
```

#### `formatPercentage`
Percentage formatting using `Intl.NumberFormat`.

```typescript
formatPercentage(value: number | string, options?: Omit<Intl.NumberFormatOptions, "style">): string
```

**Default Options:**
- Style: "percent"
- Minimum fraction digits: 0
- Maximum fraction digits: 2

**Examples:**
```typescript
formatPercentage(0.1234) // "12%"
formatPercentage(0.4567, { maximumFractionDigits: 1 }) // "45.7%"
formatPercentage("0.789") // "79%"
```

## Error Handling

All formatter functions include robust error handling:
- Invalid inputs return descriptive error messages ("Invalid Date" or "Invalid Number")
- String inputs are safely parsed using `parseFloat()` for numbers
- Date inputs are validated using `isNaN()` and `isFinite()` checks
- All operations are wrapped in try-catch blocks

## Usage Patterns

### Importing
```typescript
import { formatDate } from '@/utils/formatter/date'
import { formatNumber, formatCurrency, formatPercentage } from '@/utils/formatter/number'
```

### Common Combinations
```typescript
// Format a price display
const price = formatCurrency(product.price, "USD", { minimumFractionDigits: 0 })

// Format a date with currency
const transactionDate = formatDate(transaction.date, "MM/DD/YYYY")
const transactionAmount = formatCurrency(transaction.amount, transaction.currency)

// Format statistics
const completionRate = formatPercentage(stats.completed / stats.total)
const userCount = formatNumber(stats.userCount, { notation: "compact" })
```

## Benefits

- **Locale-aware**: Uses browser's locale settings automatically
- **Consistent**: Unified error handling and input validation
- **Flexible**: Customizable options for each formatter
- **Type-safe**: Full TypeScript support with proper type definitions
- **Performance**: Leverages native browser `Intl` API
- **Accessible**: Properly formatted numbers and dates for screen readers

## Notes

- All functions accept both number/string inputs for flexibility
- Default locale is `undefined` (uses browser's locale)
- Currency formatting requires valid ISO 4217 currency codes
- Date formatting supports common patterns but can be extended for additional formats
