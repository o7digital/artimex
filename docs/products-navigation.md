# Products navigation and section visibility

The main menu contains one Products entry. Its desktop submenu and indented mobile links lead to two independent sections:

- Fresh bakery: `#fresh-products` — the existing product collection and its basket.
- Frozen Wholesale: `#frozen-products` — the wholesale program and its inquiry.

`#shop` remains the parent Products overview. The section anchors are real HTML sections rendered by Astro, so direct links work before React loads. Moving between sections preserves each selection independently.

`src/data/productSections.js` contains the current visibility settings:

```js
export const productVisibility = {
  fresh: true,
  wholesale: true
};
```

Setting either value to `false` omits that section and its desktop, mobile, overview, footer, hero and promotional links. Disabling wholesale also omits the business overview and bake process. Disabling both removes the Products menu entry and overview; the company and contact sections remain available.

DatoCMS is not connected yet. A future integration can map two Boolean fields to these settings before rendering the site. With the current static Astro build, a visibility change requires a new build and deployment. These are controls for public presentation, not access controls.

Delivery for this change is on branch `dev`, with a Vercel Preview deployment (`vercel deploy --yes --target=preview`), as requested. Do not promote it to production without a later user instruction.
