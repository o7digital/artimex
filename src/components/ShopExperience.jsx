import { useEffect, useMemo, useState } from 'react';
import { freshProducts, productFamilies, wholesaleProducts } from '../data/products.js';

const spanishProducts = {
  'conchas-assorted-case': ['Conchas Surtidas', 'Masa congelada'],
  'bolillos-wholesale-case': ['Bolillos y Teleras', 'Congelados / completamente horneados'],
  'assorted-mexican-breads': ['Surtido de Pan Mexicano', 'Empacado individualmente'],
  'empanadas-foodservice-case': ['Empanadas', 'Congeladas / completamente horneadas']
};

export default function ShopExperience({ lang = 'en' }) {
  const es = lang === 'es';
  const [mode, setMode] = useState('fresh');
  const [category, setCategory] = useState('All');
  const [selection, setSelection] = useState({});
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const source = mode === 'fresh' ? freshProducts : wholesaleProducts;
  const categories = ['All', ...productFamilies.map((family) => family.id)];
  const visibleProducts = useMemo(() => category === 'All' ? freshProducts : freshProducts.filter((product) => product.category === category), [category]);
  const selectedProducts = source.filter((product) => selection[product.id]);
  const itemCount = selectedProducts.reduce((total, product) => total + selection[product.id], 0);

  const copy = es ? {
    fresh: 'Pan fresco', frozen: 'Mayoreo congelado', freshEye: 'La colección Artimex', freshTitle: 'Encuentra tu favorito.', frozenEye: 'Programa Artimex Bake-Off', frozenTitle: 'Variedad auténtica. Control operativo.', frozenBody: 'Abastece una panadería mexicana completa sin sumar panaderos especializados, equipo pesado ni riesgo de producción diaria.', filters: 'Filtros de producto', all: 'Todos', add: 'Agregar a la canasta', addCase: 'Agregar a la solicitud', basket: 'Canasta', inquiry: 'Solicitud mayorista', review: 'Revisar', close: 'Cerrar selección', selection: 'Selección demostrativa', request: 'Solicitar catálogo completo', case: 'Caja', pallet: 'Tarima', units: 'piezas', shelf: 'Hasta 6 meses de conservación congelada', formats: 'Formatos consistentes de caja y tarima', custom: 'Programas personalizados disponibles', send: 'Enviar solicitud mayorista', demo: 'Canasta demo — precios y pago se conectarán al futuro backend.'
  } : {
    fresh: 'Fresh bakery', frozen: 'Frozen wholesale', freshEye: 'The Artimex collection', freshTitle: 'Find your favorite.', frozenEye: 'Artimex bake-off program', frozenTitle: 'Authentic variety. Operational control.', frozenBody: 'Stock a complete Mexican bakery without adding specialized bakers, heavy equipment or daily production risk.', filters: 'Product filters', all: 'All', add: 'Add to basket', addCase: 'Add to inquiry', basket: 'Basket', inquiry: 'Wholesale inquiry', review: 'Review', close: 'Close selection', selection: 'Demonstration selection', request: 'Request full catalog', case: 'Case', pallet: 'Pallet', units: 'units', shelf: 'Up to 6-month frozen shelf life', formats: 'Consistent case and pallet formats', custom: 'Custom retail programs available', send: 'Send wholesale inquiry', demo: 'Demo basket — checkout and live pricing will connect to the future backend.'
  };

  const freshCopy = es ? {
    intro: 'De las conchas al hojaldre: descubre los sabores, colores y formas de nuestra panadería mexicana. Elige una familia y encuentra tu favorito.',
    availability: 'La selección puede variar.', contact: 'Consulta disponibilidad con la panadería', products: 'productos'
  } : {
    intro: 'From conchas to puff pastries, discover the flavors, colors and shapes of our Mexican bakery. Choose a family and find your favorite.',
    availability: 'Selection may vary.', contact: 'Ask the bakery about availability', products: 'products'
  };
  const productText = (product, index = 0) => {
    if (es && product.nameEs) return [product.nameEs, product.noteEs, product.tagEs][index];
    return es && spanishProducts[product.id] ? spanishProducts[product.id][index] : [product.name, product.note, product.tag][index];
  };
  const familyText = (id) => {
    const family = productFamilies.find((item) => item.id === id);
    return family ? family[lang] : id;
  };
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
      <div className="shop-toolbar shop-catalog-toolbar">
        <div><p className="eyebrow">{copy.freshEye}</p><h3>{copy.freshTitle}</h3><p className="catalog-intro">{freshCopy.intro}</p><p className="catalog-availability">{freshCopy.availability} <a href="#contact">{freshCopy.contact} <span aria-hidden="true">↗</span></a></p></div>
        <div className="category-list" aria-label={copy.filters}>{categories.map((item) => <button key={item} type="button" className={category === item ? 'active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>{item === 'All' ? copy.all : familyText(item)}</button>)}</div>
      </div>
      <p className="catalog-count" aria-live="polite">{visibleProducts.length} {freshCopy.products} <span aria-hidden="true">/</span> {category === 'All' ? copy.freshEye : familyText(category)}</p>
      <div className="product-grid editorial-products">{visibleProducts.map((product) => <article className="product-card" key={product.id}>
        <div className={`product-image-wrap${product.catalogCrop ? ' catalog-image-wrap' : ''}`}>
          <span className="product-number">{String(freshProducts.indexOf(product) + 1).padStart(2, '0')}</span>
          {product.catalogCrop ? <div className="catalog-product-crop" style={{ aspectRatio: `${product.catalogCrop.width} / ${product.catalogCrop.height}` }}>
            <img src={product.image} alt={`${product.imageCaption ? (es ? product.imageCaptionEs : product.imageCaption) : productText(product)} — Artimex Bakery`} width={product.imageWidth} height={product.imageHeight} loading="lazy" decoding="async" style={{ width: `${product.imageWidth / product.catalogCrop.width * 100}%`, left: `${-product.catalogCrop.x / product.catalogCrop.width * 100}%`, top: `${-product.catalogCrop.y / product.catalogCrop.height * 100}%` }}/>
          </div> : <img src={product.image} alt={`${productText(product)} — Artimex Bakery`} width={product.imageWidth} height={product.imageHeight} loading="lazy" decoding="async"/>}
          {product.imageCaption && <span className="catalog-image-caption">{es ? product.imageCaptionEs : product.imageCaption}</span>}
        </div>
        <div className="product-copy"><div className="product-title-row"><div><p className="product-category">{familyText(product.category)}</p><h4>{productText(product)}</h4><p>{productText(product, 1)}</p></div></div><button type="button" onClick={() => addProduct(product.id)} aria-label={`${copy.add}: ${productText(product)}`}>{copy.add}<span aria-hidden="true">+</span></button></div>
      </article>)}</div>
    </> : <div className="frozen-program">
      <div className="frozen-intro"><p className="eyebrow light">{copy.frozenEye}</p><h3>{copy.frozenTitle}</h3><p>{copy.frozenBody}</p><ul><li>{copy.shelf}</li><li>{copy.formats}</li><li>{copy.custom}</li></ul><a className="button button-cream" href="mailto:sales@artimex.com?subject=Artimex%20full%20catalog">{copy.request}<span>→</span></a></div>
      <div className="frozen-list">{wholesaleProducts.map((product, index) => <button type="button" key={product.id} onClick={() => addProduct(product.id)}><span className="frozen-number">0{index + 1}</span><span className="frozen-name"><strong>{productText(product)}</strong><small>{productText(product, 1)}</small></span><span className="frozen-stat"><small>{copy.case}</small><strong>{product.caseQuantity}<br/>{product.unitWeight}</strong></span><span className="frozen-stat"><small>{copy.pallet}</small><strong>{product.pallet}</strong></span><b aria-hidden="true">›</b></button>)}</div>
    </div>}

    <div className="cart-dock" aria-live="polite"><span>{mode === 'fresh' ? copy.basket : copy.inquiry}</span><strong aria-label={`${itemCount} selected items`}>{itemCount}</strong><button type="button" onClick={() => setIsSummaryOpen((open) => !open)} disabled={itemCount === 0}>{isSummaryOpen ? copy.close : copy.review}</button></div>
    {isSummaryOpen && itemCount > 0 && <div className="selection-summary"><div><p className="eyebrow">{copy.selection}</p><h4>{mode === 'fresh' ? copy.basket : copy.inquiry}</h4></div><ul>{selectedProducts.map((product) => <li key={product.id}><span>{productText(product)}</span><div><button type="button" onClick={() => removeProduct(product.id)}>−</button><strong>{selection[product.id]}</strong><button type="button" onClick={() => addProduct(product.id)}>+</button></div></li>)}</ul>{mode === 'wholesale' ? <a className="button button-primary" href={inquiryHref}>{copy.send}<span>↗</span></a> : <p className="selection-note">{copy.demo}</p>}</div>}
  </div>;
}
