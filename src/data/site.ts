export type Lang = 'en' | 'es';
export type PageKind =
  | 'about'
  | 'products'
  | 'product'
  | 'wholesale'
  | 'wholesale-order'
  | 'wholesale-contact'
  | 'retail'
  | 'retail-order'
  | 'locations'
  | 'careers'
  | 'contact'
  | 'legal';

export interface LocalizedPage {
  kind: PageKind;
  en: { path: string; title: string; description: string; eyebrow: string; heading: string; intro: string };
  es: { path: string; title: string; description: string; eyebrow: string; heading: string; intro: string };
  key: string;
}

const page = (
  key: string,
  kind: PageKind,
  en: [string, string, string, string, string],
  es: [string, string, string, string, string]
): LocalizedPage => ({
  key,
  kind,
  en: { path: en[0], title: en[1], description: en[2], eyebrow: en[3], heading: en[4], intro: en[2] },
  es: { path: es[0], title: es[1], description: es[2], eyebrow: es[3], heading: es[4], intro: es[2] }
});

export const pages: LocalizedPage[] = [
  page('about', 'about', ['/about', 'About Artimex', 'Discover the craft, production capabilities and Mexican bakery tradition behind Artimex.', 'Our company', 'Craft at scale, rooted in tradition.'], ['/es/acerca-de-artimex', 'Acerca de Artimex', 'Conozca el oficio, la capacidad de producción y la tradición panadera mexicana de Artimex.', 'Nuestra empresa', 'Oficio a escala, arraigado en la tradición.']),
  page('products', 'products', ['/products', 'Artimex Products', 'Explore the existing Artimex baked and frozen product families.', 'Product collection', 'Authentic products for every counter.'], ['/es/productos', 'Productos Artimex', 'Explore las familias existentes de productos horneados y congelados Artimex.', 'Colección de productos', 'Productos auténticos para cada vitrina.']),
  page('wholesale', 'wholesale', ['/wholesale', 'Frozen Wholesale', 'Choose a frozen wholesale purchasing path for cases, pallets or contract programs.', 'Wholesale · All products frozen', 'A simpler frozen bakery program.'], ['/es/mayoreo', 'Mayoreo congelado', 'Elija un modo de compra mayorista de productos congelados por caja, pallet o contrato.', 'Mayoreo · Todos los productos congelados', 'Un programa de panadería congelada más simple.']),
  page('wholesale-case', 'wholesale-order', ['/wholesale/by-case', 'Frozen Products by Case', 'Build a frozen wholesale case inquiry with delivery details.', 'Frozen wholesale · By case', 'Plan an order by case.'], ['/es/mayoreo/por-caja', 'Productos congelados por caja', 'Prepare una solicitud mayorista por caja con los datos de entrega.', 'Mayoreo congelado · Por caja', 'Prepare un pedido por caja.']),
  page('wholesale-pallet', 'wholesale-order', ['/wholesale/by-pallet', 'Frozen Products by Pallet', 'Build a frozen wholesale pallet inquiry with delivery details.', 'Frozen wholesale · By pallet', 'Plan an order by pallet.'], ['/es/mayoreo/por-pallet', 'Productos congelados por pallet', 'Prepare una solicitud mayorista por pallet con los datos de entrega.', 'Mayoreo congelado · Por pallet', 'Prepare un pedido por pallet.']),
  page('wholesale-contract', 'wholesale-contact', ['/wholesale/contract-pricing', 'Contract & Truckload Pricing', 'Request full truckload, contract, credit-account or co-packing information.', 'Custom wholesale programs', 'Let’s build the right program.'], ['/es/mayoreo/precios-por-contrato', 'Precios por contrato y camión completo', 'Solicite información sobre camión completo, contratos, crédito o co-packing.', 'Programas mayoristas personalizados', 'Construyamos el programa adecuado.']),
  page('wholesale-info', 'wholesale-contact', ['/wholesale/request-information', 'Request Wholesale Information', 'Contact Artimex about frozen wholesale products and custom programs.', 'Wholesale information', 'Tell us what your business needs.'], ['/es/mayoreo/solicitar-informacion', 'Solicitar información de mayoreo', 'Contacte a Artimex sobre productos congelados y programas personalizados.', 'Información de mayoreo', 'Cuéntenos qué necesita su negocio.']),
  page('retail', 'retail', ['/retail', 'Retail Bakery Pickup', 'Explore Artimex retail ordering for pickup at an available El Gallo Giro location.', 'Retail · Pickup only', 'Fresh and un-baked, ready for pickup.'], ['/es/venta-al-publico', 'Recogida de pedidos al público', 'Explore pedidos Artimex para recoger en una ubicación disponible de El Gallo Giro.', 'Venta al público · Solo para recoger', 'Horneado y sin hornear, listo para recoger.']),
  page('retail-order', 'retail-order', ['/retail/order-online', 'Order Online for Pickup', 'Build a demonstration Artimex retail pickup order.', 'Retail order · Pickup only', 'Build your pickup order.'], ['/es/venta-al-publico/ordenar', 'Ordenar en línea para recoger', 'Prepare un pedido demostrativo Artimex para recoger.', 'Pedido al público · Solo para recoger', 'Prepare su pedido para recoger.']),
  page('locations', 'locations', ['/retail/locations', 'Pickup Locations', 'View approved El Gallo Giro pickup locations as they become available.', 'Retail · Pickup only', 'Choose a pickup location.'], ['/es/venta-al-publico/ubicaciones', 'Ubicaciones para recoger', 'Consulte las ubicaciones aprobadas de El Gallo Giro cuando estén disponibles.', 'Venta al público · Solo para recoger', 'Elija una ubicación para recoger.']),
  page('careers', 'careers', ['/careers', 'Careers at Artimex', 'Share your experience and interest in future opportunities at Artimex.', 'Careers', 'Bring your craft to Artimex.'], ['/es/empleo', 'Empleo en Artimex', 'Comparta su experiencia e interés en futuras oportunidades en Artimex.', 'Empleo', 'Traiga su oficio a Artimex.']),
  page('contact', 'contact', ['/contact', 'Contact Artimex', 'Route your retail, wholesale, careers or general inquiry to Artimex.', 'Contact', 'Start the right conversation.'], ['/es/contacto', 'Contacto Artimex', 'Dirija su consulta de venta, mayoreo, empleo o información general a Artimex.', 'Contacto', 'Inicie la conversación adecuada.']),
  page('privacy', 'legal', ['/privacy', 'Privacy', 'Artimex privacy information structure pending approved client copy.', 'Legal', 'Privacy.'], ['/es/privacidad', 'Privacidad', 'Estructura de privacidad Artimex pendiente del texto aprobado por el cliente.', 'Legal', 'Privacidad.']),
  page('terms', 'legal', ['/terms', 'Terms', 'Artimex terms structure pending approved client copy.', 'Legal', 'Terms.'], ['/es/terminos', 'Términos', 'Estructura de términos Artimex pendiente del texto aprobado por el cliente.', 'Legal', 'Términos.'])
];

export const productFamilies = [
  { slug: 'conchas', name: 'Conchas', esName: 'Conchas', note: 'Vanilla · Chocolate · Pink · Yellow', esNote: 'Vainilla · Chocolate · Rosa · Amarilla', image: '/images/original/artimex-conchas-portrait.webp' },
  { slug: 'bolillos', name: 'Bolillos', esName: 'Bolillos', note: 'Crisp crust · Soft, airy center', esNote: 'Corteza crujiente · Centro suave y aireado', image: '/images/products/Bolillo-color.webp' },
  { slug: 'teleras', name: 'Teleras', esName: 'Teleras', note: 'The authentic bread for tortas', esNote: 'El pan auténtico para tortas', image: '/images/products/Telera-color.webp' },
  { slug: 'empanadas', name: 'Empanadas', esName: 'Empanadas', note: 'Golden pastry with pineapple filling', esNote: 'Pan dorado con relleno de piña', image: '/images/products/Empanada-pineapple-color.webp' },
  { slug: 'concha-rosa', name: 'Concha Rosa', esName: 'Concha Rosa', note: 'Soft enriched dough · Pink shell', esNote: 'Masa suave enriquecida · Cubierta rosa', image: '/images/products/Concha-Rosa-Colort.webp' },
  { slug: 'concha-chocolate', name: 'Concha Chocolate', esName: 'Concha de Chocolate', note: 'Soft enriched dough · Cocoa shell', esNote: 'Masa suave enriquecida · Cubierta de cacao', image: '/images/products/Concha-Chocolate-color.webp' }
] as const;

export const pickupLocations: Array<{ name: string; address: string; hours?: string }> = [];
export const currentOpenings: Array<{ title: string; location: string; department?: string }> = [];

export function pageEntries() {
  const entries = pages.flatMap((item) => (['en', 'es'] as const).map((lang) => ({ item, lang, content: item[lang] })));
  const products = productFamilies.flatMap((product) => ([
    { lang: 'en' as const, product, path: `/products/${product.slug}` },
    { lang: 'es' as const, product, path: `/es/productos/${product.slug}` }
  ]));
  return { entries, products };
}

export function translatedPath(pathname: string): string {
  for (const item of pages) {
    if (item.en.path === pathname) return item.es.path;
    if (item.es.path === pathname) return item.en.path;
  }
  for (const product of productFamilies) {
    if (`/products/${product.slug}` === pathname) return `/es/productos/${product.slug}`;
    if (`/es/productos/${product.slug}` === pathname) return `/products/${product.slug}`;
  }
  return pathname.startsWith('/es') ? '/' : '/es/';
}
