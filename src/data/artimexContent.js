/**
 * Content extraction prepared for the future Artimex BOS/CMS.
 *
 * `source: 'origin'` is content recovered from artimexbakery.com.
 * `source: 'current-site'` is already used or proposed by the new experience
 * and must be validated before becoming a client-facing claim.
 */
export const artimexContentExtract = {
  brand: {
    name: 'Artimex Artisan Mexican Bakery',
    shortName: 'Artimex',
    category: 'Artisan Mexican bakery',
    languages: ['en', 'es'],
    source: 'origin'
  },
  positioning: {
    headline: 'Authenticity. Tradition. Superior Ingredients.',
    promise: 'Authentic Mexican breads prepared in the spirit of the artisan baking tradition.',
    audience: ['Hispanic community', 'restaurants', 'markets', 'foodservice operators'],
    source: 'origin'
  },
  pages: {
    home: {
      sourceUrl: 'https://www.artimexbakery.com/',
      purpose: 'Brand introduction and product-quality promise',
      messages: [
        'Fresh, high-quality ingredients',
        'Authentic gourmet recipes and classic Mexican breads',
        'Products available through El Gallo Giro and Tina\'s Gourmet Pastries channels'
      ],
      source: 'origin'
    },
    about: {
      sourceUrl: 'https://www.artimexbakery.com/aboutus.html',
      purpose: 'Story, craft and operational value proposition',
      messages: [
        'Artimex was created to make the finest Mexican breads in an artisan tradition.',
        'The process emphasizes ingredients, mixing, baking time, oven temperature, color, texture and shape.',
        'Flash-frozen bakery technology supports reliability, consistency and dependability.',
        'Artimex helps operators simplify bakery operations, lower labor costs and control operating costs.',
        'El Gallo Giro is presented as a long-term relationship and reference customer.'
      ],
      source: 'origin'
    },
    products: {
      sourceUrl: 'https://www.artimexbakery.com/Our_Breads.html',
      purpose: 'Product range to be rebuilt from the original catalogue',
      categories: ['Empanadas', 'Bolillos', 'Puerquitos', 'Polvorones', 'Conchas', 'Teleras', 'Pan dulce'],
      extractionStatus: 'The legacy page is image-led; product names and SKUs require client confirmation.',
      source: 'origin'
    },
    news: {
      sourceUrl: 'https://www.artimexbakery.com/news.html',
      purpose: 'Press and brand credibility',
      items: [
        'Featured in BakingBusiness.com',
        'Satisfying The Hispanic Sweet Tooth'
      ],
      source: 'origin'
    },
    contact: {
      sourceUrl: 'https://www.artimexbakery.com/contact.html',
      salesEmail: 'sales@artimex.com',
      phone: '+1 562-777-0924',
      fax: '+1 562-777-9607',
      address: '12764 Florence Avenue, Santa Fe Springs, CA 90670, USA',
      source: 'origin'
    }
  },
  validationQueue: [
    { claim: '130+ authentic recipes', source: 'current-site', owner: 'Client', status: 'To validate' },
    { claim: '25M pieces produced annually', source: 'current-site', owner: 'Client', status: 'To validate' },
    { claim: '1M+ weekly production capacity', source: 'current-site', owner: 'Client', status: 'To validate' },
    { claim: '3 specialized production lines', source: 'current-site', owner: 'Client', status: 'To validate' },
    { claim: '6-month frozen shelf life', source: 'current-site', owner: 'Client', status: 'To validate' },
    { claim: 'Current El Gallo Giro relationship and scope', source: 'origin', owner: 'Client', status: 'To validate' },
    { claim: 'Complete product catalogue, formats, pack sizes and allergens', source: 'origin', owner: 'Client', status: 'Missing from legacy HTML' }
  ]
};

