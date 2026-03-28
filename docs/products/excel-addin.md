# DeukPack Excel Meta Tool (Schema-Driven Editor)

**DeukPack Excel Meta Tool** is a **productivity tool for Excel** designed to help game designers and balance designers manage complex data safely and quickly based on schemas.

<div class="dp-dynamic-notice-product" data-product="excel-addin"></div>

---

## Core Values

### 1. Schema-Based Header Auto-Generation
Automatically generates and synchronizes Excel sheet headers based on structures defined in the IDL (`*.deuk`).
- **Standard Type Mapping**: Intuitively maps integers, strings, lists, etc., to Excel columns.
- **Compact Header**: Supports optimized layouts (merging struct names, etc.) to make complex hierarchical structures easier to view in Excel.

### 2. Powerful Data Validation
Performs strong checks from the input stage to eliminate discrepancies between code and data.
- **Type Safety**: Instantly blocks text from being entered into integer fields or typos in enumerations.
- **Referential Integrity (TableLink)**: When referencing an ID from another table, it immediately verifies whether the value actually exists.

### 3. Designer-Friendly Workflow
Connects the engineer's language (IDL) to the designer's language (Excel) as smoothly as possible.
- **Comment Synchronization**: Links IDL field comments to Excel notes, allowing data meaning to be understood without separate specifications.
- **Selection UI**: Provides dropdowns and selection popups matching field types to improve input convenience.

---

## Feature Summary

| Category | Content |
|----------|---------|
| **Header Generation** | Automatically generates and syncs sheet headers (field names/types) based on schemas. |
| **Data Validation** | Real-time validation of types, requiredness, ranges, and referential (TableLink) integrity. |
| **Schema Reflection** | Safely applies schema changes to sheets without destroying existing data. |
| **Integrated Build** | Instantly converts Excel data into binary (`*.dpk`) or SQLite DBs. |

---

## Next Steps

- [Core Engine Introduction](core-engine.md)
- [DeukPack Pipeline Guide](pipeline-unity.md)
- [Tutorial: Managing Excel Data](../tutorial/index.md)
