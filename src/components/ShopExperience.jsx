import { useEffect, useMemo, useState } from 'react';
import { freshProducts, wholesaleProducts } from '../data/products.js';

const modeFromHash = () => (
  typeof window !== 'undefined' && window.location.hash === '#frozen-products' ? 'wholesale' : 'fresh'
);

export default function ShopExperience() {
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

  return (
    <div className="shop-shell">
      <div className="shop-mode" role="tablist" aria-label="Shopping mode">
        <button id="fresh-products" role="tab" aria-selected={mode === 'fresh'} className={mode === 'fresh' ? 'active' : ''} onClick={() => switchMode('fresh')} type="button">
          <span className="mode-kicker">B2C</span> Fresh bakery
        </button>
        <button id="frozen-products" role="tab" aria-selected={mode === 'wholesale'} className={mode === 'wholesale' ? 'active' : ''} onClick={() => switchMode('wholesale')} type="button">
          <span className="mode-kicker">B2B</span> Frozen wholesale
        </button>
      </div>

      <div className="shop-toolbar">
        <div>
          <p className="eyebrow">{mode === 'fresh' ? 'Fresh today' : 'Ready to scale'}</p>
          <h3>{mode === 'fresh' ? 'Choose from the bakery case.' : 'Build your wholesale program.'}</h3>
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
              <img src={product.image} alt={`${product.name} by Artimex Bakery`} width={product.imageWidth} height={product.imageHeight} loading="lazy" decoding="async" />
              <span>{product.tag}</span>
            </div>
            <div className="product-copy">
              <p className="product-category">{product.category}</p>
              <h4>{product.name}</h4>
              <p>{product.note}</p>
              {mode === 'wholesale' && (
                <dl className="product-specs">
                  <div><dt>Case</dt><dd>{product.caseQuantity}</dd></div>
                  <div><dt>Conservation</dt><dd>{product.storage}</dd></div>
                  <div><dt>Preparation</dt><dd>{product.preparation}</dd></div>
                </dl>
              )}
              <button type="button" onClick={() => addProduct(product.id)}>
                {mode === 'fresh' ? 'Add to basket' : 'Add case to inquiry'} <span aria-hidden="true">↗</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="cart-dock" aria-live="polite">
        <span>{mode === 'fresh' ? 'Basket' : 'Wholesale inquiry'}</span>
        <strong aria-label={`${itemCount} selected items`}>{itemCount}</strong>
        <button type="button" onClick={() => setIsSummaryOpen((open) => !open)} disabled={itemCount === 0}>
          {isSummaryOpen ? 'Close selection' : mode === 'fresh' ? 'Review order' : 'Review inquiry'}
        </button>
      </div>

      {isSummaryOpen && itemCount > 0 && (
        <div className="selection-summary">
          <div><p className="eyebrow">Demonstration selection</p><h4>{mode === 'fresh' ? 'Your bakery basket' : 'Your wholesale inquiry'}</h4></div>
          <ul>
            {selectedProducts.map((product) => (
              <li key={product.id}>
                <span>{product.name}</span>
                <div>
                  <button type="button" onClick={() => removeProduct(product.id)} aria-label={`Remove one ${product.name}`}>−</button>
                  <strong>{selection[product.id]}</strong>
                  <button type="button" onClick={() => addProduct(product.id)} aria-label={`Add one ${product.name}`}>+</button>
                </div>
              </li>
            ))}
          </ul>
          {mode === 'wholesale' ? (
            <a className="button button-primary" href={inquiryHref}>Send wholesale inquiry <span>↗</span></a>
          ) : (
            <p className="selection-note">Demo basket — checkout and live pricing will connect to the future commerce backend.</p>
          )}
        </div>
      )}
    </div>
  );
}
