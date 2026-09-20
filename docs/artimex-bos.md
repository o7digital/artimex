# Artimex BOS — validation draft

This is the first content operating model for client validation. It follows the extraction-to-editable-model approach used on Vialterna: a structured content boundary, explicit fallback/source status and a validation queue before publication.

## Proposed sitemap

| Route | Role | Primary CTA |
| --- | --- | --- |
| `/` | Brand, fresh offer and first conversion | Shop fresh |
| `/es/` | Spanish equivalent | Comprar fresco |
| `/about/` | Story, craft and credibility | Talk to sales |
| `/products/` | Approved product catalogue | Request catalogue |
| `/wholesale/` | Retail, restaurant and foodservice offer | Request wholesale access |
| `/news/` | Press and company updates | Read article |
| `/contact/` | Lead routing and location | Email sales |

## Homepage content blocks

1. Hero: authenticity, tradition, superior ingredients; distinguish fresh and frozen journeys.
2. Brand story: hands, head and heart; Mexican baking as a craft.
3. Product discovery: curated fresh assortment, then wholesale catalogue.
4. Business value: labor, consistency, waste and operational simplicity.
5. Process: stock → prepare → bake → sell, with product-specific instructions.
6. Proof: approved metrics, references, press and production capability.
7. Contact: sales email, phone, location and wholesale qualification.

## Editorial workflow

`Draft → Internal review → Client validation → Published → Periodic review`

Each record should carry `status`, `source`, `owner`, `lastReviewedAt` and `locale`. A claim without a source or client approval stays out of public proof sections.

## Decisions required from the client

- Is the main commercial priority fresh retail, wholesale, foodservice or a split journey?
- Which products are available today, in which formats and territories?
- Which production metrics are current and publishable?
- Which customer references, certifications and press links may be public?
- What is the lead-to-order process after `sales@artimex.com`?

