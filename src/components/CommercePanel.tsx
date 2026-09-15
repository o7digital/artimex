import { useMemo, useState, type SyntheticEvent } from 'react';
import { productFamilies, pickupLocations, currentOpenings, type Lang } from '../data/site';
import { RETAIL_LIMITS, deliveryAddressErrors, retailQuantityError, wholesaleQuantityError, type DeliveryAddress, type RetailFormat, type WholesaleUnit } from '../domain/commerce';
import { freightProvider } from '../services/freight';
import { formGateway } from '../services/forms';

type PanelKind = 'wholesale-order' | 'wholesale-contact' | 'retail-order' | 'careers' | 'contact';
interface Props { lang: Lang; kind: PanelKind; pageKey: string }

const emptyAddress: DeliveryAddress = { street: '', city: '', region: '', postalCode: '', country: 'US' };

function Field({ label, name, type = 'text', required = false, children }: { label: string; name: string; type?: string; required?: boolean; children?: React.ReactNode }) {
  return <label className="form-field"><span>{label}{required && <b aria-hidden="true"> *</b>}</span>{children ?? <input name={name} type={type} required={required} />}</label>;
}

function DemoNotice({ es, message }: { es: boolean; message?: string }) {
  return <p className="form-notice" role="status">{message || (es ? 'Demostración: todavía no hay un sistema de envío conectado.' : 'Demonstration: no submission system is connected yet.')}</p>;
}

export default function CommercePanel({ lang, kind, pageKey }: Props) {
  const es = lang === 'es';
  const [notice, setNotice] = useState('');
  const preventDemoSubmit = async (event: SyntheticEvent<HTMLFormElement>, formKind: 'wholesale' | 'careers' | 'contact') => {
    event.preventDefault();
    const result = await formGateway.submit(formKind, {});
    if (result.status === 'not-configured') setNotice(es ? 'Formulario preparado; el envío estará disponible cuando Artimex conecte un servicio aprobado.' : 'Form prepared; submission will be available after Artimex connects an approved service.');
  };

  if (kind === 'wholesale-order') return <WholesaleOrder es={es} unit={pageKey.includes('pallet') ? 'pallet' : 'case'} />;
  if (kind === 'retail-order') return <RetailOrder es={es} />;

  if (kind === 'wholesale-contact') return <form className="business-form" onSubmit={(event) => preventDemoSubmit(event, 'wholesale')}>
    <div className="form-grid"><Field label={es ? 'Empresa' : 'Company name'} name="company" required/><Field label={es ? 'Persona de contacto' : 'Contact name'} name="contact" required/><Field label="Email" name="email" type="email" required/><Field label={es ? 'Teléfono' : 'Phone'} name="phone" type="tel" required/><Field label={es ? 'Dirección completa de entrega' : 'Full delivery address'} name="address" required/><Field label={es ? 'Volumen estimado' : 'Estimated volume'} name="volume"/><Field label={es ? 'Tipo de compra' : 'Purchase type'} name="purchaseType" required><select name="purchaseType" required defaultValue=""><option value="" disabled>{es ? 'Seleccione' : 'Select'}</option><option value="truckload">{es ? 'Camión completo' : 'Full truckload'}</option><option value="contract">{es ? 'Precios por contrato' : 'Contract pricing'}</option><option value="case">{es ? 'Por caja' : 'By case'}</option><option value="pallet">{es ? 'Por pallet' : 'By pallet'}</option></select></Field></div>
    <div className="check-row"><label><input type="checkbox" name="credit"/> {es ? 'Solicitar cuenta de crédito' : 'Request a credit account'}</label><label><input type="checkbox" name="copacking"/> {es ? 'Interés en co-packing para nuestra marca' : 'Co-packing interest for our brand'}</label></div>
    <Field label={es ? 'Mensaje' : 'Message'} name="message"><textarea name="message" rows={5}></textarea></Field><button className="button button-primary" type="submit">{es ? 'Preparar solicitud' : 'Prepare request'}</button>{notice && <DemoNotice es={es} message={notice}/>}<DemoNotice es={es}/>
  </form>;

  if (kind === 'careers') return <div><section className="data-state"><h2>{es ? 'Vacantes actuales' : 'Current openings'}</h2>{currentOpenings.length === 0 && <p>{es ? '¿Ninguna vacante actual corresponde a su perfil? Envíenos su información para futuras oportunidades.' : 'No current opening matches your profile? Send us your information for future opportunities.'}</p>}</section><form className="business-form" onSubmit={(event) => preventDemoSubmit(event, 'careers')}><div className="form-grid"><Field label={es ? 'Nombre' : 'First name'} name="firstName" required/><Field label={es ? 'Apellido' : 'Last name'} name="lastName" required/><Field label="Email" name="email" type="email" required/><Field label={es ? 'Teléfono' : 'Phone'} name="phone" type="tel"/><Field label={es ? 'Ciudad' : 'City'} name="city"/><Field label={es ? 'Ubicación o zona preferida' : 'Preferred location or work area'} name="location"/><Field label={es ? 'Puesto o departamento deseado' : 'Desired position or department'} name="position"/><Field label={es ? 'Disponibilidad' : 'Availability'} name="availability"/></div><Field label={es ? 'Mensaje' : 'Message'} name="message"><textarea name="message" rows={5}></textarea></Field><label className="consent"><input type="checkbox" required/> {es ? 'Acepto que Artimex revise la información proporcionada para oportunidades de empleo.' : 'I agree that Artimex may review the information provided for employment opportunities.'}</label><button className="button button-primary" type="submit">{es ? 'Preparar candidatura' : 'Prepare application'}</button>{notice && <DemoNotice es={es} message={notice}/>}<p className="form-help">{es ? 'La carga de CV estará disponible cuando se conecte una solución aprobada de almacenamiento.' : 'Resume upload will become available when an approved storage solution is connected.'}</p></form></div>;

  return <form className="business-form" onSubmit={(event) => preventDemoSubmit(event, 'contact')}><div className="form-grid"><Field label={es ? 'Nombre' : 'Name'} name="name" required/><Field label="Email" name="email" type="email" required/><Field label={es ? 'Teléfono' : 'Phone'} name="phone" type="tel"/><Field label={es ? 'Motivo' : 'How can we help?'} name="topic" required><select name="topic" required defaultValue=""><option value="" disabled>{es ? 'Seleccione' : 'Select'}</option>{['general information','wholesale by case','wholesale by pallet','full truckload','contract pricing','credit account','co-packing','retail order support','careers'].map(topic => <option value={topic} key={topic}>{topic}</option>)}</select></Field></div><Field label={es ? 'Mensaje' : 'Message'} name="message"><textarea name="message" rows={6} required></textarea></Field><button className="button button-primary" type="submit">{es ? 'Preparar mensaje' : 'Prepare message'}</button>{notice && <DemoNotice es={es} message={notice}/>}<DemoNotice es={es}/></form>;
}

function WholesaleOrder({ es, unit }: { es: boolean; unit: WholesaleUnit }) {
  const [productId, setProductId] = useState<string>(productFamilies[0].slug);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState(emptyAddress);
  const [errors, setErrors] = useState<string[]>([]);
  const submit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const quantityError = wholesaleQuantityError(quantity);
    const addressIssues = Object.values(deliveryAddressErrors(address));
    const nextErrors = [...(quantityError ? [quantityError] : []), ...addressIssues];
    setErrors(nextErrors);
    if (nextErrors.length) return;
    await freightProvider.quote({ lines: [{ productId, unit, quantity }], deliveryAddress: address });
  };
  return <form className="business-form calculator" onSubmit={submit} noValidate><div className="form-grid"><Field label={es ? 'Producto congelado' : 'Frozen product'} name="product"><select value={productId} onChange={(event) => setProductId(event.target.value)}>{productFamilies.map(product => <option key={product.slug} value={product.slug}>{es ? product.esName : product.name}</option>)}</select></Field><Field label={unit === 'case' ? (es ? 'Número de cajas' : 'Number of cases') : (es ? 'Número de pallets' : 'Number of pallets')} name="quantity"><input type="number" min="1" step="1" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))}/></Field></div><fieldset><legend>{es ? 'Dirección completa de entrega' : 'Full delivery address'}</legend><div className="form-grid">{(['street','city','region','postalCode','country'] as const).map(key => <Field key={key} label={({street: es ? 'Calle' : 'Street',city: es ? 'Ciudad' : 'City',region: es ? 'Estado' : 'State / region',postalCode: es ? 'Código postal' : 'Postal code',country: es ? 'País' : 'Country'})[key]} name={key}><input value={address[key]} onChange={(event) => setAddress(current => ({...current, [key]: event.target.value}))}/></Field>)}</div></fieldset>{errors.length > 0 && <div className="error-summary" role="alert"><strong>{es ? 'Revise los campos requeridos.' : 'Review the required fields.'}</strong><ul>{errors.map((error, index) => <li key={index}>{error}</li>)}</ul></div>}<button className="button button-primary" type="submit">{es ? 'Solicitar estimación' : 'Request estimate'}</button><div className="quote-breakdown" aria-live="polite"><div><span>{es ? 'Subtotal FOB de productos' : 'FOB product subtotal'}</span><strong>{es ? 'Precio pendiente del cliente' : 'Client pricing required'}</strong></div><div><span>{es ? 'Transporte estimado' : 'Estimated freight'}</span><strong>{es ? 'Cotización requerida' : 'Quote required'}</strong></div><div><span>{es ? 'Total estimado' : 'Estimated total'}</span><strong>{es ? 'Pendiente de cotización' : 'Pending quote'}</strong></div></div><DemoNotice es={es} message={es ? 'Se requiere una cotización de transporte. Envíe la información de entrega para recibir una estimación precisa.' : 'Freight quote required. Submit your delivery information to receive an accurate shipping estimate.'}/><p className="form-help">{es ? 'Todos los productos mayoristas son congelados. No se muestra ningún importe hasta contar con precios FOB y tarifas de transporte aprobados.' : 'All wholesale products are frozen. No amount is shown until approved FOB pricing and freight rates are available.'}</p></form>;
}

function RetailOrder({ es }: { es: boolean }) {
  const [format, setFormat] = useState<RetailFormat>('baked');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const maximum = format === 'baked' ? RETAIL_LIMITS.bakedUnits : RETAIL_LIMITS.unbakedBoxes;
  const selected = useMemo(() => Object.values(quantities).some(value => value > 0), [quantities]);
  const update = (id: string, value: number) => { const error = retailQuantityError(format, value); setErrors(current => ({ ...current, [id]: error || '' })); if (!error) setQuantities(current => ({ ...current, [id]: value })); };
  return <div className="retail-builder"><div className="pickup-banner"><strong>{es ? 'Solo para recoger' : 'Pickup only'}</strong><span>{es ? 'La entrega no está disponible para pedidos al público.' : 'Delivery is not available for retail orders.'}</span></div><div className="format-switch" role="group" aria-label={es ? 'Formato del producto' : 'Product format'}><button type="button" className={format === 'baked' ? 'active' : ''} onClick={() => { setFormat('baked'); setQuantities({}); setErrors({}); }}>{es ? 'Horneado · por unidad' : 'Baked · by unit'}</button><button type="button" className={format === 'unbaked' ? 'active' : ''} onClick={() => { setFormat('unbaked'); setQuantities({}); setErrors({}); }}>{es ? 'Sin hornear · por caja' : 'Un-baked · by box'}</button></div><p className="limit-copy">{format === 'baked' ? (es ? 'Máximo 2 docenas (24 unidades) por producto.' : 'Maximum 2 dozen (24 units) per product.') : (es ? 'Máximo 2 cajas por producto.' : 'Maximum 2 boxes per product.')}</p><div className="order-products">{productFamilies.map(product => <article key={product.slug}><img src={product.image} alt={es ? product.esName : product.name}/><div><h2>{es ? product.esName : product.name}</h2><label>{format === 'baked' ? (es ? 'Unidades' : 'Units') : (es ? 'Cajas' : 'Boxes')}<input type="number" min="0" max={maximum} step="1" value={quantities[product.slug] || 0} onChange={(event) => update(product.slug, Number(event.target.value))} aria-describedby={`${product.slug}-error`}/></label>{errors[product.slug] && <p id={`${product.slug}-error`} className="field-error" role="alert">{errors[product.slug]}</p>}</div></article>)}</div><section className="data-state"><h2>{es ? 'Ubicación para recoger' : 'Pickup location'}</h2>{pickupLocations.length === 0 && <p>{es ? 'Las ubicaciones de El Gallo Giro estarán disponibles cuando Artimex confirme las direcciones y horarios.' : 'El Gallo Giro locations will appear after Artimex confirms addresses and hours.'}</p>}</section><button className="button button-primary" type="button" disabled={!selected || pickupLocations.length === 0}>{es ? 'Continuar con el pedido demo' : 'Continue demo order'}</button><DemoNotice es={es} message={es ? 'Recorrido demostrativo: no se ha registrado ningún pedido ni pago.' : 'Demonstration flow: no order or payment has been recorded.'}/></div>;
}
