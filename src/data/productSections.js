// Replace these two settings with DatoCMS fields when its integration is ready.
export const productVisibility = {
  fresh: true,
  wholesale: true
};

const productSections = [
  {
    key: 'fresh', anchor: 'fresh-products', audience: 'B2C',
    en: { label: 'Fresh bakery', description: 'Mexican breads and pastries for your table.' },
    es: { label: 'Pan fresco', description: 'Panes y pasteles mexicanos para tu mesa.' }
  },
  {
    key: 'wholesale', anchor: 'frozen-products', audience: 'B2B',
    en: { label: 'Frozen Wholesale', description: 'Ready-to-bake programs for retail and foodservice.' },
    es: { label: 'Mayoreo congelado', description: 'Programas listos para hornear para retail y foodservice.' }
  }
];

export function getProductSections(visibility = productVisibility) {
  return productSections.filter(section => visibility[section.key]);
}
