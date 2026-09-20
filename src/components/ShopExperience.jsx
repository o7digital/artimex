import { useEffect, useMemo, useState } from 'react';
import { freshProducts, wholesaleProducts } from '../data/products.js';

const spanishProducts = {
  conchas: ['Conchas', 'Vainilla · Chocolate · Rosa · Amarilla', 'Surtido fresco'],
  bolillo: ['Bolillos', 'Corteza crujiente · Centro suave y ligero', '12 piezas'],
  telera: ['Teleras', 'El auténtico pan para tortas', '12 piezas'],
  empanada: ['Empanadas', 'Masa dorada con relleno de piña', 'Para la vitrina'],
  'concha-rosa': ['Concha Rosa', 'Masa suave · Cubierta rosa', 'Favorita del público'],
  'concha-cacao': ['Concha de Chocolate', 'Masa suave · Cubierta de cacao', 'Receta tradicional'],
  'conchas-assorted-case': ['Conchas Surtidas', 'Masa congelada'],
  'bolillos-wholesale-case': ['Bolillos y Teleras', 'Congelados / completamente horneados'],
  'assorted-mexican-breads': ['Surtido de Pan Mexicano', 'Empacado individualmente'],
  'empanadas-foodservice-case': ['Empanadas', 'Congeladas / completamente horneadas']
};

const initialMode = () => typeof window !== 'undefined' && window.location.hash === '#frozen-products' ? 'wholesale' : 'fresh';

export default function ShopExperience({ lang = 'en' }) {
  const es = lang === 'es';
  const [mode, setMode] = useState(initialMode);
  const [category, setCategory] = useState('All');
  const [selection, setSelection] = useState({});
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const source = mode === 'fresh' ? freshProducts : wholesaleProducts;
  const categories = ['All', ...new Set(freshProducts.map((product) => product.category))];
  const visibleProducts = useMemo(() => category === 'All' ? freshProducts : freshProducts.filter((product) => product.category === category), [category]);
  const selectedProducts = source.filter((product) => selection[product.id]);
  const itemCount = selectedProducts.reduce((total, product) => total + selection[product.id], 0);

  const copy = es ? {
    fresh: 'Pan fresco', frozen: 'Mayoreo congelado', freshEye: 'La colección Artimex', freshTitle: 'Encuentra tu favorito.', frozenEye: 'Programa Artimex Bake-Off', frozenTitle: 'Variedad auténtica. Control operativo.', frozenBody: 'Abastece una panadería mexicana completa sin sumar panaderos especializados, equipo pesado ni riesgo de producción diaria.', filters: 'Filtros de producto', all: 'Todos', add: 'Agregar a la canasta', addCase: 'Agregar a la solicitud', basket: 'Canasta', inquiry: 'Solicitud mayorista', review: 'Revisar', close: 'Cerrar selección', selection: 'Selección demostrativa', request: 'Solicitar catálogo completo', case: 'Caja', pallet: 'Tarima', units: 'piezas', shelf: 'Hasta 6 meses de conservación congelada', formats: 'Formatos consistentes de caja y tarima', custom: 'Programas personalizados disponibles', send: 'Enviar solicitud mayorista', demo: 'Canasta demo — precios y pago se conectarán al futuro backend.'
  } : {
    fresh: 'Fresh bakery', frozen: 'Frozen wholesale', freshEye: 'The Artimex collection', freshTitle: 'Find your favorite.', frozenEye: 'Artimex bake-off program', frozenTitle: 'Authentic variety. Operational control.', frozenBody: 'Stock a complete Mexican bakery without adding specialized bakers, heavy equipment or daily production risk.', filters: 'Product filters', all: 'All', add: 'Add to basket', addCase: 'Add to inquiry', basket: 'Basket', inquiry: 'Wholesale inquiry', review: 'Review', close: 'Close selection', selection: 'Demonstration selection', request: 'Request full catalog', case: 'Case', pallet: 'Pallet', units: 'units', shelf: 'Up to 6-month frozen shelf life', formats: 'Consistent case and pallet formats', custom: 'Custom retail programs available', send: 'Send wholesale inquiry', demo: 'Demo basket — checkout and live pricing will connect to the future backend.'
  };

  const productText = (product, index = 0) => es && spanishProducts[product.id] ? spanishProducts[product.id][index] : [product.name, product.note, product.tag][index];
  const switchMode = (nextMode) => { setMode(nextMode); setCategory('All'); setSelection({}); setIsSummaryOpen(false); };
  const addProduct = (id) => setSelection((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  const removeProduct = (id) => setSelection((current) => { const next = { ...current }; if (next[id] > 1) next[id] -= 1; else delete next[id]; return next; });

  useEffect(() => {
    const sync = () => { if (location.hash === '#frozen-products') switchMode('wholesale'); if (location.hash === '#fresh-products') switchMode('fresh'); };
    addEventListener('hashchange', sync); sync(); return () => removeEventListener('hashchange', sync);
  }, []);

  const inquiryLines = selectedProducts.map((product) => `- ${selection[product.id]} × ${product.name}`).join('\n');
  const inquiryHref = `mailto:sales@artimex.com?subject=${encodeURIComponent('Artimex wholesale inquiry')}&body=${encodeURIComponent(`Hello Artimex,\n\nI would like information about:\n${inquiryLines}\n\nBusiness name:\nDelivery area:\n`)}`;

  return <div className="shop-shell">
    <div className="shop-mode" role="tablist" aria-label={es ? 'Modo de compra' : 'Shopping mode'}>
      <button id="fresh-products" role="tab" aria-selected={mode === 'fresh'} className={mode === 'fresh' ? 'active' : ''} onClick={() => switchMode('fresh')} type="button"><span className="mode-kicker">B2C</span>{copy.fresh}</button>
      <button id="frozen-products" role="tab" aria-selected={mode === 'wholesale'} className={mode === 'wholesale' ? 'active' : ''} onClick={() => switchMode('wholesale')} type="button"><span className="mode-kicker">B2B</span>{copy.frozen}</button>
    </div>

    {mode === 'fresh' ? <>
      <div className="shop-toolbar"><div><p className="eyebrow">{copy.freshEye}</p><h3>{copy.freshTitle}</h3></div><div className="category-list" aria-label={copy.filters}>{categories.map((item) => <button key={item} type="button" className={category === item ? 'active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>{item === 'All' ? copy.all : item}</button>)}</div></div>
      <div className="product-grid editorial-products">{visibleProducts.map((product) => <article className="product-card" key={product.id}>
        <div className="product-image-wrap"><span className="product-number">0{freshProducts.indexOf(product) + 1}</span><img src={product.image} alt={`${productText(product)} — Artimex Bakery`} width={product.imageWidth} height={product.imageHeight} loading="lazy" decoding="async"/><i aria-hidden="true">↘</i></div>
        <div className="product-copy"><div className="product-title-row"><div><h4>{productText(product)}</h4><p>{productText(product, 1)}</p></div><small>{productText(product, 2)}</small></div><button type="button" onClick={() => addProduct(product.id)}>{copy.add}<span aria-hidden="true">+</span></button></div>
      </article>)}</div>
    </> : <div className="frozen-program">
      <div className="frozen-intro"><p className="eyebrow light">{copy.frozenEye}</p><h3>{copy.frozenTitle}</h3><p>{copy.frozenBody}</p><ul><li>{copy.shelf}</li><li>{copy.formats}</li><li>{copy.custom}</li></ul><a className="button button-cream" href="mailto:sales@artimex.com?subject=Artimex%20full%20catalog">{copy.request}<span>→</span></a></div>
      <div className="frozen-list">{wholesaleProducts.map((product, index) => <button type="button" key={product.id} onClick={() => addProduct(product.id)}><span className="frozen-number">0{index + 1}</span><span className="frozen-name"><strong>{productText(product)}</strong><small>{productText(product, 1)}</small></span><span className="frozen-stat"><small>{copy.case}</small><strong>{product.caseQuantity}<br/>{product.unitWeight}</strong></span><span className="frozen-stat"><small>{copy.pallet}</small><strong>{product.pallet}</strong></span><b aria-hidden="true">›</b></button>)}</div>
    </div>}

    <div className="cart-dock" aria-live="polite"><span>{mode === 'fresh' ? copy.basket : copy.inquiry}</span><strong aria-label={`${itemCount} selected items`}>{itemCount}</strong><button type="button" onClick={() => setIsSummaryOpen((open) => !open)} disabled={itemCount === 0}>{isSummaryOpen ? copy.close : copy.review}</button></div>
    {isSummaryOpen && itemCount > 0 && <div className="selection-summary"><div><p className="eyebrow">{copy.selection}</p><h4>{mode === 'fresh' ? copy.basket : copy.inquiry}</h4></div><ul>{selectedProducts.map((product) => <li key={product.id}><span>{productText(product)}</span><div><button type="button" onClick={() => removeProduct(product.id)}>−</button><strong>{selection[product.id]}</strong><button type="button" onClick={() => addProduct(product.id)}>+</button></div></li>)}</ul>{mode === 'wholesale' ? <a className="button button-primary" href={inquiryHref}>{copy.send}<span>↗</span></a> : <p className="selection-note">{copy.demo}</p>}</div>}
  </div>;
}
