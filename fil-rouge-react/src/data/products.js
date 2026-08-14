const products = [
  {
    id: "p01",
    name: "Sac cabas en toile brossee",
    category: "sacs",
    price: 68,
    stock: 12,
    rating: 4.6,
    description:
      "Un cabas structure en toile de coton brossee, doublure interieure en lin et poignees en cuir vegetal. Pense pour durer, saison apres saison.",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
  },
  {
    id: "p02",
    name: "Carafe en verre souffle",
    category: "maison",
    price: 42,
    stock: 20,
    rating: 4.8,
    description:
      "Carafe soufflee a la bouche, forme galbee et bec verseur affine. Chaque piece est legerement unique, comme le veut le travail du verre.",
    image: "https://decorzen.fr/img/p/4/0/0/7/0/40070.jpg",
  },
  {
    id: "p03",
    name: "Bougie parfumee",
    category: "maison",
    price: 29,
    stock: 34,
    rating: 4.5,
    description:
      "Cire vegetale et meche en coton, parfum bois de santal et cedre. Environ 45 heures de combustion dans un contenant en ceramique reutilisable.",
    image: "https://ceriseetvinaigrette.fr/wp-content/uploads/2023/01/bougies-parfumees-21.jpg",
  },
  {
    id: "p04",
    name: "Ceinture cuir femme",
    category: "accessoires",
    price: 54,
    stock: 18,
    rating: 4.7,
    description:
      "Ceinture en cuir pleine, boucle laiton brosse. Se patine avec le temps pour un rendu de plus en plus personnel.",
    image: "https://ceinture-cuir.com/2878-product_miniature/ceinture-en-cuir-femme-modele-rouzic.webp",
  },
  {
    id: "p05",
    name: "Plaid en laine merinos",
    category: "maison",
    price: 89,
    stock: 9,
    rating: 4.9,
    description:
      "Tisse en laine merinos, chaud sans etre lourd. Franges torsadees a la main, coloris naturel non teint.",
    image: "https://th.bing.com/th/id/OIP.RYzM93Jqk-SOovNciYMPlwHaHa?w=217&h=217&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },
  {
    id: "p06",
    name: "Lunettes de soleil acetate",
    category: "accessoires",
    price: 76,
    stock: 15,
    rating: 4.4,
    description:
      "Monture en acetate italien, verres polarises anti-reflets. Un dessin epure qui traverse les saisons sans se demoder.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
  },
  {
    id: "p07",
    name: "Trousse de toilette cuir",
    category: "sacs",
    price: 38,
    stock: 25,
    rating: 4.3,
    description:
      "Trousse compacte en cuir grain naturel, doublure impermeable et fermeture eclair laiton. Format ideal pour les courts sejours.",
    image: "https://tse3.mm.bing.net/th/id/OIP.yTryF8awjt3mZNnjpJ1ycwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: "p08",
    name: "Set de 4 verres souffles",
    category: "maison",
    price: 46,
    stock: 22,
    rating: 4.6,
    description:
      "Quatre verres souffles a la main, base epaisse et bord fin. Vendus en set, chacun legerement different de son voisin.",
    image: "https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=800&q=80",
  },
  {
    id: "p09",
    name: "Echarpe en laine et soie",
    category: "accessoires",
    price: 58,
    stock: 17,
    rating: 4.7,
    description:
      "Melange laine et soie, tissage leger toute saison. Bordure surpiquee main, coloris terreux intemporels.",
    image: "https://tse2.mm.bing.net/th/id/OIP.f9ImPLynfLOnaZRMAiFprwHaJ4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: "p10",
    name: "Sac a dos toile cirees",
    category: "sacs",
    price: 94,
    stock: 11,
    rating: 4.8,
    description:
      "Toile ciree resistante a l'eau, sangles en cuir reglables et compartiment ordinateur rembourre. Le compagnon du quotidien.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
  },
  {
    id: "p11",
    name: "Coussin en lin lave",
    category: "maison",
    price: 34,
    stock: 30,
    rating: 4.5,
    description:
      "Housse en lin lave, tombe souple et texture naturelle. Garnissage plume et duvet, fermeture invisible.",
    image: "https://www.decofundas.cl/wp-content/uploads/2023/08/fundas-para-sillon-cojin.jpeg",
  },
  {
    id: "p12",
    name: "Portefeuille cuir pleine fleur",
    category: "accessoires",
    price: 48,
    stock: 26,
    rating: 4.6,
    description:
      "Format compact, six emplacements carte et une poche billets. Cuir pleine fleur qui se patine avec l'usage.",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
  },
];

export const categories = [
  { value: "all", label: "Tout" },
  { value: "sacs", label: "Sacs" },
  { value: "maison", label: "Maison" },
  { value: "accessoires", label: "Accessoires" },
];

export default products;