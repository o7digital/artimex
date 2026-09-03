import { useEffect, useMemo, useState } from 'react';
import { freshProducts, wholesaleProducts } from '../data/products.js';

const modeFromHash = () => (
  typeof window !== 'undefined' && window.location.hash === '#frozen-products' ? 'wholesale' : 'fresh'
);

const spanishProducts = {
  'concha-vanilla': ['Concha de vainilla', 'Miga suave y mantecosa con una delicada cubierta de vainilla.', 'Fresca cada día'],
  'concha-rosa': ['Concha rosa', 'Pan dulce mexicano clásico con su característica cubierta rosa.', 'Favorita del público'],
  empanada: ['Empanada', 'Masa dorada, tierna y hojaldrada con un relleno generoso.', 'Para la vitrina'],
  campechana: ['Campechana', 'Capas caramelizadas, bordes crujientes y acabado brillante.', 'Hojaldrado artesanal'],
  bolillo: ['Bolillo', 'Corteza crujiente e interior ligero, ideal para tortas y comidas diarias.', 'Clásico cotidiano'],
  'concha-cacao': ['Concha de cacao', 'Cubierta de cacao intenso sobre una masa enriquecida, suave y ligeramente dulce.', 'Receta tradicional'],
  'conchas-assorted-case': ['Caja surtida de conchas', 'Congeladas, fermentadas y listas para tu programa de horneado.', 'Congelado • Listo para hornear'],
  'empanadas-foodservice-case': ['Caja foodservice de empanadas', 'Porciones consistentes para restaurantes, mercados y comisariatos.', 'Consistencia operativa'],
  'bolillos-wholesale-case': ['Caja mayorista de bolillos', 'Calidad de panadería a gran volumen sin aumentar la mano de obra.', 'Listo para volumen'],
  'laminated-pastry-case': ['Caja de hojaldres', 'Acabado premium con rendimiento y horneado predecibles.', 'Programa congelado']
};

export default function ShopExperience({ lang = 'en' }) {
  const es = lang === 'es';
  const [mode, setMode] = useState(modeFromHash);
  const [category, setCategory] = useState('All');
  const [selection, setSelection] = useState({});
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const source = mode === 'fresh' ? freshProducts : wholesaleProducts;
  const categories = ['All', ...new Set(source.map((product) => product.category))];
  const visibleProducts = useMemo(
    () => category === 'All' ? source : source.filter((product) => product.category === category),
    [source, category]
  );
  const selectedProducts = source.filter((product) => selection[product.id]);
  const itemCount = selectedProducts.reduce((total, product) => total + selection[product.id], 0);

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setCategory('All');
    setSelection({});
    setIsSummaryOpen(false);
  };

  useEffect(() => {
    const syncModeWithHash = () => {
      if (window.location.hash === '#frozen-products') switchMode('wholesale');
      if (window.location.hash === '#fresh-products') switchMode('fresh');
    };
    window.addEventListener('hashchange', syncModeWithHash);
    syncModeWithHash();
    return () => window.removeEventListener('hashchange', syncModeWithHash);
  }, []);

  const addProduct = (productId) => {
    setSelection((current) => ({ ...current, [productId]: (current[productId] || 0) + 1 }));
  };

  const removeProduct = (productId) => {
    setSelection((current) => {
      const next = { ...current };
      if (next[productId] > 1) next[productId] -= 1;
      else delete next[productId];
      return next;
    });
  };

  const inquiryBody = selectedProducts
    .map((product) => `- ${selection[product.id]} × ${product.name}`)
    .join('\n');
  const inquiryHref = `mailto:sales@artimex.com?subject=${encodeURIComponent('Artimex wholesale inquiry')}&body=${encodeURIComponent(`Hello Artimex,\n\nI would like information about:\n${inquiryBody}\n\nBusiness name:\nDelivery area:\n`)}`;
  const label = (product, field) => {
    if (!es || !spanishProducts[product.id]) return product[field];
    const position = { name: 0, note: 1, tag: 2 }[field];
    return spanishProducts[product.id][position];
  };

  return (
    <div className="shop-shell">
      <div className="shop-mode" role="tablist" aria-label={es ? 'Modo de compra' : 'Shopping mode'}>
        <button id="fresh-products" role="tab" aria-selected={mode === 'fresh'} className={mode === 'fresh' ? 'active' : ''} onClick={() => switchMode('fresh')} type="button">
          <span className="mode-kicker">B2C</span> {es ? 'Pan fresco' : 'Fresh bakery'}
        </button>
        <button id="frozen-products" role="tab" aria-selected={mode === 'wholesale'} className={mode === 'wholesale' ? 'active' : ''} onClick={() => switchMode('wholesale')} type="button">
          <span className="mode-kicker">B2B</span> {es ? 'Mayoreo congelado' : 'Frozen wholesale'}
        </button>
      </div>

      <div className="shop-toolbar">
        <div>
          <p className="eyebrow">{mode === 'fresh' ? (es ? 'Fresco hoy' : 'Fresh today') : (es ? 'Listo para crecer' : 'Ready to scale')}</p>
          <h3>{mode === 'fresh' ? (es ? 'Elige de la vitrina.' : 'Choose from the bakery case.') : (es ? 'Construye tu programa mayorista.' : 'Build your wholesale program.')}</h3>
        </div>
        <div className="category-list" aria-label="Product filters">
          {categories.map((item) => (
            <button key={item} type="button" className={category === item ? 'active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {visibleProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-image-wrap">
              <img src={product.image} alt={`${label(product, 'name')} — Artimex Bakery`} width={product.imageWidth} height={product.imageHeight} loading="lazy" decoding="async" />
              <span>{label(product, 'tag')}</span>
            </div>
            <div className="product-copy">
              <p className="product-category">{product.category}</p>
              <h4>{label(product, 'name')}</h4>
              <p>{label(product, 'note')}</p>
              {mode === 'wholesale' && (
                <dl className="product-specs">
                  <div><dt>{es ? 'Caja' : 'Case'}</dt><dd>{es ? 'Configuración bajo solicitud' : product.caseQuantity}</dd></div>
                  <div><dt>{es ? 'Conservación' : 'Conservation'}</dt><dd>{es ? 'Mantener congelado' : product.storage}</dd></div>
                  <div><dt>{es ? 'Preparación' : 'Preparation'}</dt><dd>{es ? 'Descongelar y hornear según la ficha' : product.preparation}</dd></div>
                </dl>
              )}
              <button type="button" onClick={() => addProduct(product.id)}>
                {mode === 'fresh' ? (es ? 'Agregar a la canasta' : 'Add to basket') : (es ? 'Agregar caja a la solicitud' : 'Add case to inquiry')} <span aria-hidden="true">↗</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="cart-dock" aria-live="polite">
        <span>{mode === 'fresh' ? (es ? 'Canasta' : 'Basket') : (es ? 'Solicitud mayorista' : 'Wholesale inquiry')}</span>
        <strong aria-label={`${itemCount} selected items`}>{itemCount}</strong>
        <button type="button" onClick={() => setIsSummaryOpen((open) => !open)} disabled={itemCount === 0}>
          {isSummaryOpen ? (es ? 'Cerrar selección' : 'Close selection') : mode === 'fresh' ? (es ? 'Revisar pedido' : 'Review order') : (es ? 'Revisar solicitud' : 'Review inquiry')}
        </button>
      </div>

      {isSummaryOpen && itemCount > 0 && (
        <div className="selection-summary">
          <div><p className="eyebrow">{es ? 'Selección demostrativa' : 'Demonstration selection'}</p><h4>{mode === 'fresh' ? (es ? 'Tu canasta' : 'Your bakery basket') : (es ? 'Tu solicitud mayorista' : 'Your wholesale inquiry')}</h4></div>
          <ul>
            {selectedProducts.map((product) => (
              <li key={product.id}>
                <span>{label(product, 'name')}</span>
                <div>
                  <button type="button" onClick={() => removeProduct(product.id)} aria-label={`Remove one ${product.name}`}>−</button>
                  <strong>{selection[product.id]}</strong>
                  <button type="button" onClick={() => addProduct(product.id)} aria-label={`Add one ${product.name}`}>+</button>
                </div>
              </li>
            ))}
          </ul>
          {mode === 'wholesale' ? (
            <a className="button button-primary" href={inquiryHref}>{es ? 'Enviar solicitud mayorista' : 'Send wholesale inquiry'} <span>↗</span></a>
          ) : (
            <p className="selection-note">{es ? 'Canasta demo — el pago y los precios se conectarán al futuro backend de comercio.' : 'Demo basket — checkout and live pricing will connect to the future commerce backend.'}</p>
          )}
        </div>
      )}
    </div>
  );
}
