export const productFamilies = [
  { id: 'conchas', en: 'Conchas', es: 'Conchas' },
  { id: 'danes', en: 'Mexican Danish', es: 'Danés' },
  { id: 'pan-fino', en: 'Pan fino', es: 'Pan fino' },
  { id: 'empanadas', en: 'Traditional empanadas', es: 'Empanadas caseras' },
  { id: 'galletas', en: 'Cookies', es: 'Galletas' },
  { id: 'feite', en: 'Puff pastries', es: 'Feite · Hojaldre' },
  { id: 'guayabas', en: 'Guayabas', es: 'Guayabas' },
  { id: 'mantecadas', en: 'Mantecadas', es: 'Mantecadas' },
  { id: 'breads', en: 'Bolillos & teleras', es: 'Bolillos y teleras' }
];

// Original photographs from https://www.artimexbakery.com/Our_Breads.html.
// CSS shows each photograph from the unmodified catalogue sheet. Its frozen
// weights, cases and preparation instructions do not describe this Fresh list.
const catalogProduct = (product, centerY, centerX = 323) => ({
  image: '/images/original/artimex-frozen-catalog.jpg',
  imageWidth: 900,
  imageHeight: 3581,
  catalogCrop: { x: centerX - 64, y: centerY - 58, width: 128, height: 116 },
  ...product
});

const polvoronesPhoto = {
  imageCaption: 'Polvorones assortment pictured',
  imageCaptionEs: 'Foto del surtido de polvorones'
};

export const freshProducts = [
  catalogProduct({ id: 'concha-blanca', name: 'White Conchas', nameEs: 'Conchas Blancas', category: 'conchas', note: 'Soft sweet bread with a white, shell-patterned topping.', noteEs: 'Pan dulce suave con cubierta blanca en forma de concha.', catalogCodes: ['20101', '40011'] }, 258),
  catalogProduct({ id: 'concha-cacao', name: 'Chocolate Conchas', nameEs: 'Conchas de Chocolate', category: 'conchas', note: 'The traditional concha with a chocolate sugar-paste shell.', noteEs: 'La concha tradicional con cubierta dulce de chocolate.', catalogCodes: ['20102', '40012'] }, 386),
  catalogProduct({ id: 'concha-amarilla', name: 'Yellow Conchas', nameEs: 'Conchas Amarillas', category: 'conchas', note: 'A golden-yellow shell over soft Mexican sweet bread.', noteEs: 'Cubierta amarilla sobre un suave pan dulce mexicano.', catalogCodes: ['20103', '40013'] }, 515),
  catalogProduct({ id: 'concha-rosa', name: 'Pink Conchas', nameEs: 'Conchas Rosas', category: 'conchas', note: 'A pink sugar-paste shell with the classic concha pattern.', noteEs: 'Cubierta dulce rosa con el dibujo clásico de la concha.', catalogCodes: ['20104', '40014'] }, 644),

  catalogProduct({ id: 'garras-danes', name: 'Cream Cheese Bear Claws', nameEs: 'Garras de Danés', category: 'danes', note: 'Mexican Danish pastry with a cream cheese filling.', noteEs: 'Pan danés mexicano con relleno de queso crema.', catalogCodes: ['10306'] }, 773),
  catalogProduct({ id: 'cuernos-danes', name: 'Mexican Danish Croissants', nameEs: 'Cuernos de Danés', category: 'danes', note: 'Laminated sweet dough shaped into a traditional cuerno.', noteEs: 'Masa dulce laminada en forma de cuerno tradicional.', catalogCodes: ['10301'] }, 902),
  catalogProduct({ id: 'corbatas-danes', name: 'Bow Tie Danish', nameEs: 'Corbatas de Danés', category: 'danes', note: 'A sweet Danish pastry folded into a bow-tie shape.', noteEs: 'Pan danés dulce doblado en forma de corbata.', catalogCodes: ['10303'] }, 1031),
  catalogProduct({ id: 'bigotes-danes', name: 'Moustache Danish', nameEs: 'Bigotes de Danés', category: 'danes', note: 'A traditional moustache-shaped Mexican Danish pastry.', noteEs: 'Pan danés mexicano con la forma tradicional de bigote.', catalogCodes: ['10302'] }, 1160),

  catalogProduct({ id: 'elotes-fino', name: 'Elotes de Fino', nameEs: 'Elotes de Fino', category: 'pan-fino', note: 'Paste-filled pan fino shaped like an ear of corn.', noteEs: 'Pan fino relleno de pasta dulce, con forma de elote.', catalogCodes: ['20403'] }, 1289),
  catalogProduct({ id: 'cuernos-fino', name: 'Cuernos de Fino', nameEs: 'Cuernos de Fino', category: 'pan-fino', note: 'Crescent-shaped pan fino decorated with sweet paste.', noteEs: 'Pan fino en forma de cuerno, decorado con pasta dulce.', catalogCodes: ['20401'] }, 1418),
  catalogProduct({ id: 'panaderos-fino', name: 'Panaderos de Fino', nameEs: 'Panaderos de Fino', category: 'pan-fino', note: 'A round pan fino pastry topped with white sweet paste.', noteEs: 'Pan fino redondo con una cubierta de pasta dulce blanca.', catalogCodes: ['30405'] }, 1547),
  catalogProduct({ id: 'lenos-fino', name: 'Leños de Fino', nameEs: 'Leños de Fino', category: 'pan-fino', note: 'Traditional pan fino bars finished with pink sweet paste.', noteEs: 'Barras de pan fino decoradas con pasta dulce rosa.', catalogCodes: ['20402'] }, 1676),
  catalogProduct({ id: 'empanada-calabaza', name: 'Pumpkin Pockets', nameEs: 'Empanadas de Calabaza', category: 'pan-fino', note: 'Pan fino empanadas with a pumpkin filling.', noteEs: 'Empanadas de pan fino con relleno de calabaza.', catalogCodes: ['40015'] }, 1805),
  catalogProduct({ id: 'empanada-fino-pina', name: 'Pineapple Pockets', nameEs: 'Empanadas de Fino de Piña', category: 'pan-fino', note: 'Pan fino empanadas with a pineapple filling.', noteEs: 'Empanadas de pan fino con relleno de piña.', catalogCodes: ['40017'] }, 1934),
  catalogProduct({ id: 'empanada-fino-manzana', name: 'Apple Pockets', nameEs: 'Empanadas de Fino de Manzana', category: 'pan-fino', note: 'Pan fino empanadas with an apple filling.', noteEs: 'Empanadas de pan fino con relleno de manzana.', catalogCodes: ['40018'] }, 2063),

  catalogProduct({ id: 'empanada-crema', name: 'Bavarian Cream Empanadas', nameEs: 'Empanadas Caseras de Crema', category: 'empanadas', note: 'A traditional folded empanada filled with Bavarian cream.', noteEs: 'Empanada tradicional con relleno de crema bávara.', catalogCodes: ['10805'] }, 2193),
  catalogProduct({ id: 'empanada', name: 'Pineapple Empanadas', nameEs: 'Empanadas Caseras de Piña', category: 'empanadas', note: 'A golden, folded empanada with a pineapple filling.', noteEs: 'Empanada dorada, doblada a mano, con relleno de piña.', catalogCodes: ['10801'] }, 2322),

  catalogProduct({ id: 'galletas', name: 'Mexican Cookies', nameEs: 'Galletas Mexicanas', category: 'galletas', note: 'A colorful assortment of traditional Mexican cookies.', noteEs: 'Un surtido de galletas mexicanas tradicionales y coloridas.', catalogCodes: ['10601'] }, 2451, 330),
  catalogProduct({ id: 'puerquitos', name: 'Puerquitos', nameEs: 'Puerquitos', category: 'galletas', note: 'Traditional pig-shaped Mexican cookies.', noteEs: 'Galletas mexicanas con la tradicional forma de puerquito.', catalogCodes: ['40007B'] }, 2580, 330),
  catalogProduct({ id: 'polvorones-rosas', name: 'Pink Polvorones', nameEs: 'Polvorones Rosas', category: 'galletas', note: 'The pink sugar-cookie variety in the polvorones collection.', noteEs: 'La variedad rosa del surtido de polvorones de azúcar.', catalogCodes: ['21002B'], ...polvoronesPhoto }, 2709, 330),
  catalogProduct({ id: 'polvorones-amarillos', name: 'Yellow Polvorones', nameEs: 'Polvorones Amarillos', category: 'galletas', note: 'The yellow sugar-cookie variety in the polvorones collection.', noteEs: 'La variedad amarilla del surtido de polvorones de azúcar.', catalogCodes: ['21001B'], ...polvoronesPhoto }, 2709, 330),
  catalogProduct({ id: 'polvorones-chocolate', name: 'Chocolate Chip Polvorones', nameEs: 'Polvorones de Chocolate', category: 'galletas', note: 'The chocolate chip sugar-cookie variety of polvorones.', noteEs: 'La variedad de polvorones de azúcar con chocolate.', catalogCodes: ['21005B'], ...polvoronesPhoto }, 2709, 330),

  catalogProduct({ id: 'orejas-feite', name: 'Orejas de Feite', nameEs: 'Orejas de Feite', category: 'feite', note: 'Crisp, layered puff pastry in the classic elephant-ear shape.', noteEs: 'Hojaldre crujiente en capas, con la forma clásica de oreja.', catalogCodes: ['40002'] }, 2838, 330),
  catalogProduct({ id: 'banderillas-feite', name: 'Banderillas de Feite', nameEs: 'Banderillas de Feite', category: 'feite', note: 'Puff pastry bars, in flat or twisted shapes.', noteEs: 'Barras de hojaldre en formas planas o torcidas.', catalogCodes: ['40005'] }, 2967, 330),
  catalogProduct({ id: 'empanada-feite-manzana', name: 'Apple Puff Pastry Empanadas', nameEs: 'Empanadas de Feite de Manzana', category: 'feite', note: 'An apple filling inside a layered puff pastry pocket.', noteEs: 'Relleno de manzana dentro de una empanada de hojaldre.', catalogCodes: ['40008'] }, 3096, 330),

  catalogProduct({ id: 'guayabas', name: 'Guayabas', nameEs: 'Guayabas', category: 'guayabas', note: 'Traditional Mexican sweet scones.', noteEs: 'Panecillos dulces mexicanos de la familia de los scones.', catalogCodes: ['11101'] }, 3225, 330),
  catalogProduct({ id: 'mantecadas', name: 'Mantecadas', nameEs: 'Mantecadas', category: 'mantecadas', note: 'Traditional Mexican cupcakes in a paper baking cup.', noteEs: 'Panquecitos mexicanos tradicionales horneados en capacillo.', catalogCodes: ['39040'] }, 3354, 330),

  { id: 'bolillo', name: 'Bolillos', nameEs: 'Bolillos', category: 'breads', image: '/images/products/Bolillo-color.webp', imageWidth: 746, imageHeight: 514, note: 'Crisp crust with a soft, airy center.', noteEs: 'Corteza crujiente con un centro suave y ligero.' },
  { id: 'telera', name: 'Teleras', nameEs: 'Teleras', category: 'breads', image: '/images/products/Telera-color.webp', imageWidth: 730, imageHeight: 633, note: 'The traditional Mexican bread for tortas.', noteEs: 'El pan mexicano tradicional para preparar tortas.' }
];

export const wholesaleProducts = [
  { id: 'conchas-assorted-case', name: 'Assorted Conchas', category: 'Frozen dough', note: 'Frozen dough', caseQuantity: '72–80 units', unitWeight: '3–3.75 oz', pallet: '80 cases', storage: 'Up to 6 months frozen', preparation: 'Thaw, proof and bake' },
  { id: 'bolillos-wholesale-case', name: 'Bolillos & Teleras', category: 'Frozen / fully baked', note: 'Frozen / fully baked', caseQuantity: '12 units', unitWeight: '4 oz', pallet: '80 cases', storage: 'Keep frozen', preparation: 'Thaw or bake to finish' },
  { id: 'assorted-mexican-breads', name: 'Assorted Mexican Breads', category: 'Individually wrapped', note: 'Individually wrapped', caseQuantity: 'Custom program', unitWeight: 'Varies', pallet: 'On request', storage: 'Keep frozen', preparation: 'Thaw or bake to finish' },
  { id: 'empanadas-foodservice-case', name: 'Empanadas', category: 'Frozen / fully baked', note: 'Frozen / fully baked', caseQuantity: '60 units', unitWeight: '4 oz', pallet: 'Custom', storage: 'Keep frozen', preparation: 'Bake from prepared state' }
];
