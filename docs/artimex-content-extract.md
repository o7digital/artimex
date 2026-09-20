# Artimex content extraction

Prepared from the legacy Artimex website on 19 September 2026 to support a client validation workshop and the future BOS/CMS. The structured source is [`src/data/artimexContent.js`](../src/data/artimexContent.js).

## Source inventory

| Area | Legacy source | Extracted value | Confidence |
| --- | --- | --- | --- |
| Brand | Home | Artimex Artisan Mexican Bakery | Confirmed |
| Positioning | Home / About | Authenticity, tradition, superior ingredients | Confirmed |
| Craft | About | Ingredients, mixing, bake time, oven temperature, color, texture and shape | Confirmed |
| Production | About | Flash-frozen bakery technology; reliability and consistency | Confirmed |
| Business value | About | Lower labor and operating costs; less waste; simpler bakery operations | Confirmed as legacy positioning |
| Products | Our Breads | Empanadas, bolillos, puerquitos, polvorones and image-led assortment | Partial; catalogue needs client input |
| Press | News | BakingBusiness.com feature and “Satisfying The Hispanic Sweet Tooth” | Confirmed |
| Contact | Contact | Sales email, phone, fax and Santa Fe Springs address | Confirmed |

## Recommended BOS content objects

The content should be manageable as records rather than embedded in page components:

- `BrandProfile`: name, tagline, story, audiences, proof points and approved claims.
- `Product`: name, category, description, image, pack size, format, storage, preparation, allergens and availability.
- `Channel`: fresh retail, wholesale, foodservice and distribution; each with CTA and qualification fields.
- `StoryBlock`: page, order, eyebrow, title, body, image and locale.
- `ProofPoint`: metric or customer/reference statement with source, date and approval status.
- `PressItem`: title, publication, date, URL, excerpt and image.
- `ContactPoint`: sales email, phone, address and routing label.

## Content rules

1. Legacy copy is the factual baseline; rewrite only for clarity, SEO or the approved brand voice.
2. Every metric, customer name, production capacity, shelf-life statement and certification requires client approval.
3. Product records must be completed before exposing a definitive catalogue: SKU, pack quantity, weight, frozen/fresh state, bake instructions, allergens and image.
4. Keep English and Spanish as separate editable fields; do not rely on automatic translation for product or compliance information.
5. Preserve the original image archive as provenance, while adding usage rights and alt text to every published asset.

## Approval checklist

- [ ] Approve positioning and brand story.
- [ ] Confirm current El Gallo Giro relationship and permitted wording.
- [ ] Confirm production metrics shown on the new site.
- [ ] Supply the authoritative product catalogue, pack sizes and allergens.
- [ ] Confirm wholesale territories, minimum orders and delivery model.
- [ ] Confirm contact details and preferred lead-routing process.
- [ ] Approve English and Spanish copy before CMS publication.

