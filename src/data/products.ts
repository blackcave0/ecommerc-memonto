import { Product, Review } from "@/types/product";
export const products: Product[] = [{
  id: 1,
  slug: "minimalist-jacket",
  name: "Minimalist Jacket",
  description: "Premium cotton blend with modern silhouette",
  price: "$189",
  image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
  category: "JACKET",
  detailedDescription: "Our Minimalist Jacket combines sleek design with exceptional functionality. Crafted from premium cotton blend fabric, it features a modern silhouette that effortlessly transitions from casual to formal settings. The clean lines and subtle detailing make this a versatile addition to any wardrobe.",
  features: ["Water-resistant outer shell", "Breathable fabric technology", "Hidden interior pockets", "Adjustable cuffs", "Reinforced stitching for durability"],
  material: "65% Cotton, 30% Polyester, 5% Elastane",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: [{
    name: "Black",
    hex: "#000000"
  }, {
    name: "Navy",
    hex: "#0a192f"
  }, {
    name: "Olive",
    hex: "#556b2f"
  }, {
    name: "Sand",
    hex: "#c2b280"
  }],
  care: ["Machine wash cold with similar colors", "Do not bleach", "Tumble dry low", "Cool iron if needed", "Do not dry clean"],
  images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea", "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126", "https://images.unsplash.com/photo-1548126032-079a0fb0099d", "https://images.unsplash.com/photo-1551028719-00167b16eac5"],
  rating: 4.8,
  reviewCount: 124,
  stock: 45,
  sku: "MJ-001-BLK",
  relatedProducts: [2, 3, 4]
}, {
  id: 2,
  slug: "structured-blazer",
  name: "Structured Blazer",
  description: "Tailored fit with subtle texture detail",
  price: "$245",
  image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8",
  category: "BLAZER",
  detailedDescription: "The Structured Blazer redefines contemporary elegance with its impeccable tailoring and subtle texture. Designed to create a refined silhouette, this blazer features precision cuts and thoughtful details that elevate any outfit. Perfect for professional settings or sophisticated casual occasions.",
  features: ["Half-canvas construction for shape retention", "Notched lapels with pick stitching", "Four-button functional cuffs", "Double-vented back for ease of movement", "Interior pocket system"],
  material: "78% Wool, 20% Polyester, 2% Elastane",
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: [{
    name: "Charcoal",
    hex: "#36454f"
  }, {
    name: "Navy",
    hex: "#0a192f"
  }, {
    name: "Burgundy",
    hex: "#800020"
  }, {
    name: "Forest",
    hex: "#228b22"
  }],
  images: ["https://images.unsplash.com/photo-1552374196-1ab2a1c593e8", "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7", "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc", "https://images.unsplash.com/photo-1598522325074-042db73aa4e6"],
  rating: 4.6,
  reviewCount: 86,
  stock: 32,
  sku: "SB-002-CHR",
  relatedProducts: [1, 3, 5]
}, {
  id: 3,
  slug: "casual-overshirt",
  name: "Casual Overshirt",
  description: "Versatile layering piece for any season",
  price: "$120",
  image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
  category: "SHIRT",
  detailedDescription: "Our Casual Overshirt is the ultimate versatile layering piece, designed to transition seamlessly between seasons. With its relaxed fit and premium fabric, it works equally well as a light jacket or a statement shirt. The thoughtful details and expert construction ensure both style and longevity.",
  features: ["Brushed cotton fabric for softness", "Reinforced button placket", "Chest and side pockets", "Adjustable cuffs", "Extended back hem"],
  material: "100% Organic Cotton",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: [{
    name: "Indigo",
    hex: "#3f5d9d"
  }, {
    name: "Rust",
    hex: "#b7410e"
  }, {
    name: "Sage",
    hex: "#b2ac88"
  }, {
    name: "Stone",
    hex: "#928e85"
  }],
  images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f", "https://images.unsplash.com/photo-1626497764746-6dc36546b388", "https://images.unsplash.com/photo-1589310243389-96a5483213a8", "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e"],
  rating: 4.9,
  reviewCount: 215,
  stock: 78,
  sku: "CO-003-IND",
  relatedProducts: [1, 2, 4]
}, {
  id: 4,
  slug: "statement-coat",
  name: "Statement Coat",
  description: "Bold silhouette with premium wool blend",
  price: "$320",
  image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b",
  category: "COAT",
  detailedDescription: "The Statement Coat makes a bold impression with its distinctive silhouette and luxurious wool blend. Designed to be both a functional winter layer and a fashion statement, this coat features architectural lines and premium details. The oversized fit allows for comfortable layering while maintaining an elegant drape.",
  features: ["Premium wool blend for warmth", "Satin lining for comfort and ease", "Concealed front closure", "Deep side pockets", "Dropped shoulder design"],
  material: "70% Wool, 20% Polyester, 10% Cashmere",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: [{
    name: "Camel",
    hex: "#c19a6b"
  }, {
    name: "Black",
    hex: "#000000"
  }, {
    name: "Charcoal",
    hex: "#36454f"
  }, {
    name: "Burgundy",
    hex: "#800020"
  }],
  care: ["Dry clean only", "Use garment bag for storage", "Steam to remove wrinkles", "Avoid direct sunlight when drying"],
  images: ["https://images.unsplash.com/photo-1539109136881-3be0616acf4b", "https://images.unsplash.com/photo-1591369822096-ffd140ec948f", "https://images.unsplash.com/photo-1608063615781-e2ef8c73d114", "https://images.unsplash.com/photo-1604644401890-0bd678c83788"],
  rating: 4.7,
  reviewCount: 92,
  stock: 24,
  sku: "SC-004-CML",
  relatedProducts: [1, 2, 5]
}, {
  id: 5,
  slug: "premium-sweater",
  name: "Premium Sweater",
  description: "Luxurious cashmere blend for ultimate comfort",
  price: "$175",
  image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
  category: "KNITWEAR",
  detailedDescription: "Our Premium Sweater combines timeless design with exceptional comfort. Crafted from a luxurious cashmere blend, it offers unparalleled softness and warmth. The classic silhouette ensures versatility, making it perfect for both casual and formal occasions.",
  features: ["Cashmere blend for exceptional softness", "Ribbed collar, cuffs, and hem", "Relaxed fit for comfort", "Temperature regulating properties", "Pill-resistant fabric"],
  material: "70% Merino Wool, 30% Cashmere",
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: [{
    name: "Cream",
    hex: "#F5F5DC"
  }, {
    name: "Charcoal",
    hex: "#36454f"
  }, {
    name: "Navy",
    hex: "#0a192f"
  }, {
    name: "Burgundy",
    hex: "#800020"
  }],
  care: ["Hand wash cold", "Lay flat to dry", "Do not bleach", "Do not iron directly", "Store folded to maintain shape"],
  images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27", "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8", "https://images.unsplash.com/photo-1599447292180-45fd84092ef0", "https://images.unsplash.com/photo-1604644401890-0bd678c83788"],
  rating: 4.9,
  reviewCount: 156,
  stock: 38,
  sku: "PS-005-CRM",
  relatedProducts: [2, 3, 4]
}, {
  id: 6,
  slug: "designer-denim-jeans",
  name: "Designer Denim Jeans",
  description: "Premium selvedge denim with perfect fit",
  price: "$210",
  image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
  category: "JEANS",
  detailedDescription: "Our Designer Denim Jeans represent the pinnacle of denim craftsmanship. Made from premium selvedge denim sourced from renowned mills, these jeans feature meticulous construction and thoughtful details. The result is a pair that not only fits perfectly but develops a unique character with wear, becoming truly yours over time.",
  features: ["Premium selvedge denim", "Reinforced stitching at stress points", "Copper rivets and buttons", "Chain-stitched hems", "Custom leather patch"],
  material: "100% Cotton Selvedge Denim",
  sizes: ["28", "30", "32", "34", "36", "38"],
  colors: [{
    name: "Indigo",
    hex: "#3f5d9d"
  }, {
    name: "Washed Blue",
    hex: "#6e8caf"
  }, {
    name: "Black",
    hex: "#000000"
  }, {
    name: "Raw Denim",
    hex: "#4a556b"
  }],
  care: ["Wash inside out in cold water", "Wash separately for first few washes", "Hang dry when possible", "Wash infrequently to develop character"],
  images: ["https://images.unsplash.com/photo-1542272604-787c3835535d", "https://images.unsplash.com/photo-1565084888279-aca607ecce0c", "https://images.unsplash.com/photo-1582552938357-32b906df40cb", "https://images.unsplash.com/photo-1541099649105-f69ad21f3246"],
  rating: 4.7,
  reviewCount: 108,
  stock: 42,
  sku: "DJ-006-IND",
  relatedProducts: [7, 8, 12]
}, {
  id: 7,
  slug: "leather-chelsea-boots",
  name: "Leather Chelsea Boots",
  description: "Handcrafted Italian leather with elastic gussets",
  price: "$295",
  image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76",
  category: "SHOES",
  detailedDescription: "Our Leather Chelsea Boots combine timeless style with exceptional craftsmanship. Handmade in Italy from premium full-grain leather, these boots feature elastic side panels for easy on-off and a comfortable fit. The Blake-stitched construction ensures durability while maintaining a sleek profile that pairs well with both casual and formal attire.",
  features: ["Full-grain Italian leather", "Blake-stitched construction", "Elastic side panels", "Leather-lined interior", "Rubber-injected leather sole"],
  material: "Full-grain Italian Leather",
  sizes: ["7", "8", "9", "10", "11", "12", "13"],
  colors: [{
    name: "Black",
    hex: "#000000"
  }, {
    name: "Brown",
    hex: "#5b3a29"
  }, {
    name: "Oxblood",
    hex: "#4e0d09"
  }, {
    name: "Tan",
    hex: "#d2b48c"
  }],
  care: ["Clean with a damp cloth", "Apply leather conditioner regularly", "Use shoe trees when not worn", "Allow 24 hours between wears", "Protect from water and salt"],
  images: ["https://images.unsplash.com/photo-1638247025967-b4e38f787b76", "https://picsum.photos/200", "https://images.unsplash.com/photo-1542838132-92c53300491e", "https://images.unsplash.com/photo-1531310197839-ccf54634509e"],
  rating: 4.8,
  reviewCount: 76,
  stock: 28,
  sku: "CB-007-BLK",
  relatedProducts: [6, 8, 11]
}, {
  id: 8,
  slug: "cotton-chino-pants",
  name: "Cotton Chino Pants",
  description: "Versatile slim-fit chinos for everyday wear",
  price: "$95",
  image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80",
  category: "PANTS",
  detailedDescription: "Our Cotton Chino Pants offer the perfect balance of comfort and style for everyday wear. Made from premium cotton twill with a touch of stretch, these slim-fit chinos provide excellent mobility while maintaining their shape. The versatile design transitions seamlessly from casual to business casual settings, making them a wardrobe essential.",
  features: ["Premium cotton twill with stretch", "Slim fit with tapered leg", "Hidden coin pocket", "Reinforced belt loops", "Pre-washed for softness"],
  material: "98% Cotton, 2% Elastane",
  sizes: ["28", "30", "32", "34", "36", "38", "40"],
  colors: [{
    name: "Khaki",
    hex: "#c3b091"
  }, {
    name: "Navy",
    hex: "#0a192f"
  }, {
    name: "Olive",
    hex: "#556b2f"
  }, {
    name: "Stone",
    hex: "#928e85"
  }],
  care: ["Machine wash cold", "Tumble dry low", "Warm iron if needed", "Do not bleach"],
  images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80", "https://images.unsplash.com/photo-1473966968600-fa801b869a1a", "https://images.unsplash.com/photo-1584865288642-42078afe6942", "https://images.unsplash.com/photo-1541099649105-f69ad21f3246"],
  rating: 4.6,
  reviewCount: 132,
  stock: 56,
  sku: "CP-008-KHK",
  relatedProducts: [6, 7, 9]
}, {
  id: 9,
  slug: "oxford-button-down",
  name: "Oxford Button-Down",
  description: "Classic oxford cloth shirt with perfect roll collar",
  price: "$85",
  image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10",
  category: "SHIRT",
  detailedDescription: "Our Oxford Button-Down is a timeless wardrobe essential crafted from premium oxford cloth. The distinctive texture and subtle luster of the fabric create a refined yet casual appearance. Featuring a meticulously designed button-down collar with the perfect roll, this shirt offers versatility for both professional and casual settings.",
  features: ["Premium oxford cloth", "Button-down collar with ideal roll", "Single-needle stitching", "Reinforced side gussets", "Locker loop"],
  material: "100% Long-staple Cotton",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: [{
    name: "White",
    hex: "#ffffff"
  }, {
    name: "Blue",
    hex: "#a4c2f4"
  }, {
    name: "Pink",
    hex: "#f7cac9"
  }, {
    name: "Mint",
    hex: "#c7e5d6"
  }],
  care: ["Machine wash cold", "Tumble dry low", "Iron on medium heat", "Do not bleach"],
  images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10", "https://images.unsplash.com/photo-1563630423918-b58f07336ac9", "https://images.unsplash.com/photo-1589310243389-96a5483213a8", "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e"],
  rating: 4.7,
  reviewCount: 98,
  stock: 64,
  sku: "OB-009-WHT",
  relatedProducts: [3, 10, 12]
}, {
  id: 10,
  slug: "merino-wool-cardigan",
  name: "Merino Wool Cardigan",
  description: "Lightweight knit cardigan for year-round layering",
  price: "$145",
  image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
  category: "KNITWEAR",
  detailedDescription: "Our Merino Wool Cardigan offers exceptional versatility and comfort for year-round wear. Crafted from fine merino wool, it provides natural temperature regulation and breathability. The lightweight knit construction makes it perfect for layering, while the classic design ensures it remains a timeless addition to your wardrobe.",
  features: ["Fine merino wool", "Natural temperature regulation", "Mother-of-pearl buttons", "Ribbed cuffs and hem", "Reinforced button placket"],
  material: "100% Merino Wool",
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: [{
    name: "Navy",
    hex: "#0a192f"
  }, {
    name: "Charcoal",
    hex: "#36454f"
  }, {
    name: "Burgundy",
    hex: "#800020"
  }, {
    name: "Forest",
    hex: "#228b22"
  }],
  care: ["Hand wash cold", "Lay flat to dry", "Do not wring", "Do not bleach", "Cool iron if needed"],
  images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633", "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8", "https://images.unsplash.com/photo-1599447292180-45fd84092ef0", "https://images.unsplash.com/photo-1604644401890-0bd678c83788"],
  rating: 4.8,
  reviewCount: 87,
  stock: 32,
  sku: "MC-010-NVY",
  relatedProducts: [5, 11, 12]
}, {
  id: 11,
  slug: "leather-messenger-bag",
  name: "Leather Messenger Bag",
  description: "Full-grain leather bag with dedicated laptop compartment",
  price: "$275",
  image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7",
  category: "ACCESSORIES",
  detailedDescription: "Our Leather Messenger Bag combines timeless style with modern functionality. Crafted from full-grain leather that develops a rich patina over time, this bag features a dedicated padded compartment for laptops up to 15 inches. Multiple interior and exterior pockets provide organized storage for all your essentials.",
  features: ["Full-grain vegetable-tanned leather", "Padded 15-inch laptop compartment", "Adjustable cotton webbing strap", "Solid brass hardware", "Water-resistant lining"],
  material: "Full-grain Leather, Cotton Canvas Lining",
  sizes: ["One Size"],
  colors: [{
    name: "Brown",
    hex: "#5b3a29"
  }, {
    name: "Black",
    hex: "#000000"
  }, {
    name: "Tan",
    hex: "#d2b48c"
  }, {
    name: "Navy",
    hex: "#0a192f"
  }],
  care: ["Clean with leather conditioner", "Avoid exposure to rain and moisture", "Store in dust bag when not in use", "Allow leather to breathe", "Treat with leather protector"],
  images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7", "https://images.unsplash.com/photo-1622560480654-d96214fdc887", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62", "https://images.unsplash.com/photo-1548036328-c9fa89d128fa"],
  rating: 4.9,
  reviewCount: 64,
  stock: 18,
  sku: "LM-011-BRN",
  relatedProducts: [7, 12, 14]
}, {
  id: 12,
  slug: "linen-button-up-shirt",
  name: "Linen Button-Up Shirt",
  description: "Breathable pure linen shirt for warm weather",
  price: "$110",
  image: "https://picsum.photos/200",
  category: "SHIRT",
  detailedDescription: "Our Linen Button-Up Shirt is the perfect warm-weather essential. Crafted from 100% pure linen, it offers exceptional breathability and a naturally relaxed drape. The fabric becomes softer with each wash, developing character over time. The classic design features a slightly relaxed fit for comfort without sacrificing style.",
  features: ["100% pure linen fabric", "Mother-of-pearl buttons", "Single-needle stitching", "Relaxed fit", "Box pleat at back yoke"],
  material: "100% Linen",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: [{
    name: "White",
    hex: "#ffffff"
  }, {
    name: "Natural",
    hex: "#f5f5dc"
  }, {
    name: "Navy",
    hex: "#0a192f"
  }, {
    name: "Sage",
    hex: "#b2ac88"
  }],
  care: ["Machine wash cold", "Tumble dry low or line dry", "Iron while slightly damp", "Expect natural wrinkles"],
  images: ["https://picsum.photos/200", "https://images.unsplash.com/photo-1626497764746-6dc36546b388", "https://images.unsplash.com/photo-1589310243389-96a5483213a8", "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e"],
  rating: 4.7,
  reviewCount: 112,
  stock: 48,
  sku: "LS-012-WHT",
  relatedProducts: [3, 9, 13]
}, {
  id: 13,
  slug: "cashmere-beanie",
  name: "Cashmere Beanie",
  description: "Luxuriously soft cashmere hat for ultimate warmth",
  price: "$85",
  image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9",
  category: "ACCESSORIES",
  detailedDescription: "Our Cashmere Beanie offers exceptional warmth and softness for cold weather. Made from 100% pure cashmere from Mongolia, this hat provides luxurious comfort without bulk. The ribbed construction ensures a perfect fit, while the timeless design makes it a versatile addition to any winter wardrobe.",
  features: ["100% pure Mongolian cashmere", "Ribbed construction for stretch", "Double-layer for extra warmth", "Hand-finished seams", "Naturally insulating"],
  material: "100% Cashmere",
  sizes: ["One Size"],
  colors: [{
    name: "Black",
    hex: "#000000"
  }, {
    name: "Charcoal",
    hex: "#36454f"
  }, {
    name: "Camel",
    hex: "#c19a6b"
  }, {
    name: "Burgundy",
    hex: "#800020"
  }],
  care: ["Hand wash cold", "Reshape and lay flat to dry", "Do not wring", "Store folded to maintain shape"],
  images: ["https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9", "https://images.unsplash.com/photo-1510598969022-c4c6c5d05769", "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9", "https://picsum.photos/200"],
  rating: 4.9,
  reviewCount: 58,
  stock: 22,
  sku: "CB-013-BLK",
  relatedProducts: [11, 14, 15]
}, {
  id: 14,
  slug: "leather-wallet",
  name: "Leather Wallet",
  description: "Slim bifold wallet with RFID protection",
  price: "$95",
  image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
  category: "ACCESSORIES",
  detailedDescription: "Our Leather Wallet combines classic style with modern functionality. Crafted from full-grain leather, this slim bifold design features RFID-blocking technology to protect your cards from electronic theft. With thoughtfully designed card slots and a bill compartment, it offers organized storage without unnecessary bulk.",
  features: ["Full-grain leather", "RFID-blocking technology", "6 card slots", "2 hidden pockets", "Full-length bill compartment"],
  material: "Full-grain Leather",
  sizes: ["One Size"],
  colors: [{
    name: "Black",
    hex: "#000000"
  }, {
    name: "Brown",
    hex: "#5b3a29"
  }, {
    name: "Tan",
    hex: "#d2b48c"
  }, {
    name: "Navy",
    hex: "#0a192f"
  }],
  care: ["Wipe clean with damp cloth", "Apply leather conditioner occasionally", "Avoid excessive moisture", "Allow to air dry if wet"],
  images: ["https://images.unsplash.com/photo-1627123424574-724758594e93", "https://images.unsplash.com/photo-1606503825008-909a67e63c3d", "https://images.unsplash.com/photo-1627123424574-724758594e93", "https://picsum.photos/200"],
  rating: 4.7,
  reviewCount: 82,
  stock: 36,
  sku: "LW-014-BLK",
  relatedProducts: [11, 13, 15]
}, {
  id: 15,
  slug: "silk-neck-tie",
  name: "Silk Neck Tie",
  description: "Handcrafted Italian silk tie with subtle pattern",
  price: "$75",
  image: "https://images.unsplash.com/photo-1589756823695-278bc923f962",
  category: "ACCESSORIES",
  detailedDescription: "Our Silk Neck Tie exemplifies timeless elegance and exceptional craftsmanship. Made in Italy from 100% silk twill, this tie features a subtle pattern that adds sophistication without overwhelming. The seven-fold construction creates perfect drape and knot formation, while the hand-rolled edges demonstrate attention to detail.",
  features: ["100% Italian silk twill", "Seven-fold construction", "Hand-rolled edges", "Interlining for perfect drape", "Standard 3-inch width"],
  material: "100% Silk",
  sizes: ["One Size"],
  colors: [{
    name: "Navy/Red",
    hex: "#0a192f"
  }, {
    name: "Burgundy/Gold",
    hex: "#800020"
  }, {
    name: "Forest/Silver",
    hex: "#228b22"
  }, {
    name: "Charcoal/Blue",
    hex: "#36454f"
  }],
  care: ["Dry clean only", "Untie after wearing", "Hang to maintain shape", "Store rolled to prevent creasing"],
  images: ["https://images.unsplash.com/photo-1589756823695-278bc923f962", "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e", "https://picsum.photos/200", "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e"],
  rating: 4.8,
  reviewCount: 46,
  stock: 28,
  sku: "ST-015-NVR",
  relatedProducts: [11, 13, 14]
}, {
  id: 16,
  slug: "wool-overcoat",
  name: "Wool Overcoat",
  description: "Classic tailored overcoat for refined winter style",
  price: "$395",
  image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a",
  category: "COAT",
  detailedDescription: "Our Wool Overcoat embodies timeless elegance and exceptional warmth. Crafted from a premium wool blend, this tailored coat features a classic silhouette that pairs effortlessly with both formal and casual attire. The half-canvas construction and satin lining ensure comfort and durability for years to come.",
  features: ["Premium wool blend", "Half-canvas construction", "Satin lining for smooth layering", "Notched lapel", "Double-breasted closure"],
  material: "80% Wool, 20% Cashmere",
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: [{
    name: "Charcoal",
    hex: "#36454f"
  }, {
    name: "Navy",
    hex: "#0a192f"
  }, {
    name: "Camel",
    hex: "#c19a6b"
  }, {
    name: "Black",
    hex: "#000000"
  }],
  care: ["Dry clean only", "Use garment bag for storage", "Brush gently to remove dust", "Air occasionally"],
  images: ["https://images.unsplash.com/photo-1544022613-e87ca75a784a", "https://images.unsplash.com/photo-1591369822096-ffd140ec948f", "https://images.unsplash.com/photo-1608063615781-e2ef8c73d114", "https://images.unsplash.com/photo-1604644401890-0bd678c83788"],
  rating: 4.9,
  reviewCount: 68,
  stock: 16,
  sku: "WO-016-CHR",
  relatedProducts: [4, 17, 18]
}, {
  id: 17,
  slug: "cotton-henley",
  name: "Cotton Henley",
  description: "Soft long-sleeve henley with perfect drape",
  price: "$65",
  image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  category: "SHIRT",
  detailedDescription: "Our Cotton Henley offers the perfect blend of comfort and style for everyday wear. Made from premium combed cotton with a touch of stretch, this long-sleeve henley features a flattering fit and exceptional softness. The three-button placket and subtle details elevate this essential beyond basic.",
  features: ["Premium combed cotton with stretch", "Three-button placket", "Ribbed cuffs and collar", "Reinforced seams", "Pre-washed for softness"],
  material: "95% Cotton, 5% Elastane",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: [{
    name: "White",
    hex: "#ffffff"
  }, {
    name: "Heather Grey",
    hex: "#d3d3d3"
  }, {
    name: "Navy",
    hex: "#0a192f"
  }, {
    name: "Olive",
    hex: "#556b2f"
  }],
  care: ["Machine wash cold", "Tumble dry low", "Do not bleach", "Iron on low if needed"],
  images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", "https://images.unsplash.com/photo-1626497764746-6dc36546b388", "https://images.unsplash.com/photo-1589310243389-96a5483213a8", "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e"],
  rating: 4.7,
  reviewCount: 124,
  stock: 58,
  sku: "CH-017-WHT",
  relatedProducts: [3, 9, 12]
}, {
  id: 18,
  slug: "quilted-vest",
  name: "Quilted Vest",
  description: "Lightweight insulated vest for versatile layering",
  price: "$135",
  image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
  category: "OUTERWEAR",
  detailedDescription: "Our Quilted Vest provides essential core warmth without restricting movement. Featuring premium synthetic insulation that maintains warmth even when wet, this vest offers exceptional versatility as both a mid-layer and outer layer. The slim profile allows for easy layering, while multiple pockets provide practical storage.",
  features: ["Premium synthetic insulation", "Water-resistant shell", "Two-way front zipper", "Interior and exterior pockets", "Adjustable hem"],
  material: "Shell: 100% Nylon, Insulation: 100% Polyester",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: [{
    name: "Navy",
    hex: "#0a192f"
  }, {
    name: "Olive",
    hex: "#556b2f"
  }, {
    name: "Black",
    hex: "#000000"
  }, {
    name: "Burgundy",
    hex: "#800020"
  }],
  care: ["Machine wash cold", "Tumble dry low", "Do not use fabric softener", "Do not iron"],
  images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea", "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126", "https://images.unsplash.com/photo-1548126032-079a0fb0099d", "https://images.unsplash.com/photo-1551028719-00167b16eac5"],
  rating: 4.6,
  reviewCount: 92,
  stock: 34,
  sku: "QV-018-NVY",
  relatedProducts: [1, 4, 16]
}, {
  id: 19,
  slug: "premium-leather-belt",
  name: "Premium Leather Belt",
  description: "Handcrafted full-grain leather with classic buckle",
  price: "$85",
  image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
  category: "ACCESSORIES",
  detailedDescription: "Our Premium Leather Belt represents the pinnacle of craftsmanship and timeless style. Made from full-grain leather that develops a beautiful patina over time, this belt features a classic buckle design that pairs effortlessly with both casual and formal attire. The meticulous attention to detail ensures durability and longevity.",
  features: ["Full-grain vegetable-tanned leather", "Solid brass buckle with antique finish", "Hand-stitched edges", "Five adjustment holes", "Embossed logo detail"],
  material: "100% Full-grain Leather",
  sizes: ["30", "32", "34", "36", "38", "40", "42"],
  colors: [{
    name: "Brown",
    hex: "#5b3a29"
  }, {
    name: "Black",
    hex: "#000000"
  }, {
    name: "Tan",
    hex: "#d2b48c"
  }],
  care: ["Clean with leather conditioner", "Avoid excessive moisture", "Store flat or rolled", "Polish occasionally to maintain finish"],
  images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62", "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80", "https://images.unsplash.com/photo-1473966968600-fa801b869a1a", "https://images.unsplash.com/photo-1584865288642-42078afe6942"],
  rating: 4.8,
  reviewCount: 72,
  stock: 45,
  sku: "PB-019-BRN",
  relatedProducts: [11, 13, 14]
}, {
  id: 20,
  slug: "merino-wool-scarf",
  name: "Merino Wool Scarf",
  description: "Ultra-soft winter accessory with classic pattern",
  price: "$65",
  image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9",
  category: "ACCESSORIES",
  detailedDescription: "Our Merino Wool Scarf combines exceptional softness with timeless style. Crafted from premium merino wool known for its temperature-regulating properties, this scarf provides luxurious warmth without bulk. The classic pattern and fringed edges create a versatile accessory that elevates any winter ensemble.",
  features: ["100% premium merino wool", "Temperature-regulating properties", "Fringed edges", "Classic pattern design", "Generous length for multiple styling options"],
  material: "100% Merino Wool",
  sizes: ["One Size"],
  colors: [{
    name: "Navy/Grey",
    hex: "#0a192f"
  }, {
    name: "Burgundy/Black",
    hex: "#800020"
  }, {
    name: "Camel/Brown",
    hex: "#c19a6b"
  }, {
    name: "Grey/Black",
    hex: "#808080"
  }],
  care: ["Dry clean only", "Store folded in drawer", "Avoid direct sunlight when storing", "Reshape after wearing"],
  images: ["https://images.unsplash.com/photo-1520903920243-00d872a2d1c9", "https://images.unsplash.com/photo-1510598969022-c4c6c5d05769", "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9", "https://picsum.photos/200"],
  rating: 4.7,
  reviewCount: 58,
  stock: 32,
  sku: "MS-020-NVG",
  relatedProducts: [13, 15, 21]
}, {
  id: 21,
  slug: "leather-gloves",
  name: "Leather Gloves",
  description: "Cashmere-lined leather gloves for winter elegance",
  price: "$95",
  image: "https://picsum.photos/200",
  category: "ACCESSORIES",
  detailedDescription: "Our Leather Gloves combine sophisticated style with practical warmth. Crafted from supple leather and lined with luxurious cashmere, these gloves provide exceptional comfort and insulation during cold weather. The classic design and expert construction ensure a perfect fit and timeless appeal.",
  features: ["Premium lambskin leather exterior", "100% cashmere lining", "Three-point stitching detail", "Elasticized wrist for secure fit", "Touchscreen compatible fingertips"],
  material: "Exterior: Lambskin Leather, Lining: 100% Cashmere",
  sizes: ["S", "M", "L", "XL"],
  colors: [{
    name: "Black",
    hex: "#000000"
  }, {
    name: "Brown",
    hex: "#5b3a29"
  }, {
    name: "Burgundy",
    hex: "#800020"
  }, {
    name: "Navy",
    hex: "#0a192f"
  }],
  care: ["Spot clean only", "Apply leather conditioner occasionally", "Store in cool, dry place", "Use glove stretcher if needed"],
  images: ["https://picsum.photos/200", "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9", "https://images.unsplash.com/photo-1510598969022-c4c6c5d05769", "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9"],
  rating: 4.8,
  reviewCount: 42,
  stock: 24,
  sku: "LG-021-BLK",
  relatedProducts: [13, 14, 20]
}, {
  id: 22,
  slug: "linen-summer-shirt",
  name: "Linen Summer Shirt",
  description: "Lightweight breathable shirt for warm weather",
  price: "$95",
  image: "https://images.unsplash.com/photo-1626497764746-6dc36546b388",
  category: "SHIRT",
  detailedDescription: "Our Linen Summer Shirt is the perfect warm-weather essential. Made from 100% premium European linen, this shirt offers exceptional breathability and a naturally relaxed drape that improves with each wear. The classic design features a slightly relaxed fit and thoughtful details that transition seamlessly from beach to dinner.",
  features: ["100% premium European linen", "Mother-of-pearl buttons", "Single chest pocket", "Relaxed fit with curved hem", "Reinforced collar construction"],
  material: "100% Linen",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: [{
    name: "White",
    hex: "#ffffff"
  }, {
    name: "Sky Blue",
    hex: "#87CEEB"
  }, {
    name: "Sand",
    hex: "#c2b280"
  }, {
    name: "Sage",
    hex: "#b2ac88"
  }],
  care: ["Machine wash cold", "Tumble dry low or line dry", "Iron while slightly damp", "Expect and embrace natural wrinkles"],
  images: ["https://images.unsplash.com/photo-1626497764746-6dc36546b388", "https://images.unsplash.com/photo-1589310243389-96a5483213a8", "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e", "https://images.unsplash.com/photo-1598033129183-c4f50c736f10"],
  rating: 4.7,
  reviewCount: 86,
  stock: 52,
  sku: "LS-022-WHT",
  relatedProducts: [3, 9, 12]
}, {
  id: 23,
  slug: "canvas-sneakers",
  name: "Canvas Sneakers",
  description: "Classic low-top sneakers with premium construction",
  price: "$75",
  image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
  category: "SHOES",
  detailedDescription: "Our Canvas Sneakers combine timeless style with exceptional comfort. Crafted from premium cotton canvas with vulcanized rubber soles, these sneakers feature a classic low-top design that pairs effortlessly with any casual outfit. The cushioned insole and reinforced construction ensure all-day comfort and lasting durability.",
  features: ["Premium cotton canvas upper", "Vulcanized rubber sole", "Cushioned insole with arch support", "Reinforced stitching at stress points", "Metal eyelets and waxed cotton laces"],
  material: "Upper: 100% Cotton Canvas, Sole: Vulcanized Rubber",
  sizes: ["7", "8", "9", "10", "11", "12", "13"],
  colors: [{
    name: "White",
    hex: "#ffffff"
  }, {
    name: "Navy",
    hex: "#0a192f"
  }, {
    name: "Black",
    hex: "#000000"
  }, {
    name: "Olive",
    hex: "#556b2f"
  }],
  care: ["Spot clean with mild soap and water", "Air dry away from direct heat", "Use canvas protector spray", "Replace insoles as needed"],
  images: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77", "https://images.unsplash.com/photo-1560769629-975ec94e6a86", "https://images.unsplash.com/photo-1543508282-6319a3e2621f", "https://images.unsplash.com/photo-1491553895911-0055eca6402d"],
  rating: 4.6,
  reviewCount: 124,
  stock: 68,
  sku: "CS-023-WHT",
  relatedProducts: [7, 24, 25]
}, {
  id: 24,
  slug: "leather-loafers",
  name: "Leather Loafers",
  description: "Handcrafted penny loafers with premium leather",
  price: "$195",
  image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4",
  category: "SHOES",
  detailedDescription: "Our Leather Loafers represent the pinnacle of classic footwear craftsmanship. Handmade from premium full-grain leather, these penny loafers feature traditional moccasin construction with hand-stitched details. The leather sole with rubber heel insert provides the perfect balance of elegance and durability for versatile wear.",
  features: ["Full-grain calfskin leather", "Traditional penny keeper strap", "Leather sole with rubber heel insert", "Fully leather lined", "Blake-stitched construction"],
  material: "Upper: Full-grain Calfskin, Sole: Leather with Rubber Heel",
  sizes: ["7", "8", "9", "10", "11", "12", "13"],
  colors: [{
    name: "Burgundy",
    hex: "#800020"
  }, {
    name: "Brown",
    hex: "#5b3a29"
  }, {
    name: "Black",
    hex: "#000000"
  }, {
    name: "Tan",
    hex: "#d2b48c"
  }],
  care: ["Clean with leather conditioner", "Use shoe trees when not worn", "Polish regularly", "Protect from water and salt", "Allow 24 hours between wears"],
  images: ["https://images.unsplash.com/photo-1614252235316-8c857d38b5f4", "https://images.unsplash.com/photo-1531310197839-ccf54634509e", "https://images.unsplash.com/photo-1638247025967-b4e38f787b76", "https://picsum.photos/200"],
  rating: 4.9,
  reviewCount: 56,
  stock: 22,
  sku: "LL-024-BRG",
  relatedProducts: [7, 23, 25]
}, {
  id: 25,
  slug: "suede-desert-boots",
  name: "Suede Desert Boots",
  description: "Classic ankle boots with crepe rubber sole",
  price: "$165",
  image: "https://picsum.photos/200",
  category: "SHOES",
  detailedDescription: "Our Suede Desert Boots combine timeless design with exceptional comfort. Crafted from premium suede with the iconic two-eyelet lacing system and crepe rubber sole, these boots offer a versatile style that works with both casual and smart-casual outfits. The simple, clean lines and quality construction ensure these boots will be a wardrobe staple for years to come.",
  features: ["Premium suede upper", "Natural crepe rubber sole", "Two-eyelet lacing system", "Ankle-height silhouette", "Unlined for natural breathability"],
  material: "Upper: 100% Suede, Sole: Natural Crepe Rubber",
  sizes: ["7", "8", "9", "10", "11", "12", "13"],
  colors: [{
    name: "Sand",
    hex: "#c2b280"
  }, {
    name: "Brown",
    hex: "#5b3a29"
  }, {
    name: "Navy",
    hex: "#0a192f"
  }, {
    name: "Olive",
    hex: "#556b2f"
  }],
  care: ["Brush regularly to remove dirt", "Use suede protector spray", "Clean with suede eraser and brush", "Keep away from excessive moisture"],
  images: ["https://picsum.photos/200", "https://images.unsplash.com/photo-1638247025967-b4e38f787b76", "https://images.unsplash.com/photo-1542838132-92c53300491e", "https://images.unsplash.com/photo-1531310197839-ccf54634509e"],
  rating: 4.7,
  reviewCount: 78,
  stock: 34,
  sku: "DB-025-SND",
  relatedProducts: [7, 23, 24]
}, {
  id: 26,
  slug: "wool-dress-pants",
  name: "Wool Dress Pants",
  description: "Tailored trousers with premium wool blend",
  price: "$175",
  image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
  category: "PANTS",
  detailedDescription: "Our Wool Dress Pants combine classic tailoring with modern comfort. Crafted from a premium wool blend with a touch of stretch, these pants feature a tailored fit with a slight taper for a contemporary silhouette. The half-canvas construction and attention to detail ensure a refined appearance suitable for both professional and formal occasions.",
  features: ["Premium wool blend with stretch", "Half-canvas construction", "Extended closure with hook and bar", "Quarter-top pockets", "Tailored fit with slight taper"],
  material: "96% Wool, 4% Elastane",
  sizes: ["28", "30", "32", "34", "36", "38", "40", "42"],
  colors: [{
    name: "Charcoal",
    hex: "#36454f"
  }, {
    name: "Navy",
    hex: "#0a192f"
  }, {
    name: "Black",
    hex: "#000000"
  }, {
    name: "Grey",
    hex: "#808080"
  }],
  care: ["Dry clean only", "Steam to remove wrinkles", "Hang properly when not worn", "Brush occasionally to remove dust"],
  images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a", "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80", "https://images.unsplash.com/photo-1584865288642-42078afe6942", "https://images.unsplash.com/photo-1541099649105-f69ad21f3246"],
  rating: 4.8,
  reviewCount: 64,
  stock: 28,
  sku: "WP-026-CHR",
  relatedProducts: [6, 8, 27]
}, {
  id: 27,
  slug: "linen-trousers",
  name: "Linen Trousers",
  description: "Breathable summer pants with relaxed fit",
  price: "$125",
  image: "https://images.unsplash.com/photo-1584865288642-42078afe6942",
  category: "PANTS",
  detailedDescription: "Our Linen Trousers are the perfect summer wardrobe essential. Made from 100% premium European linen, these pants offer exceptional breathability and a naturally relaxed drape that improves with each wear. The slightly relaxed fit and drawstring waist combine comfort with casual elegance for versatile warm-weather style.",
  features: ["100% premium European linen", "Drawstring waist with belt loops", "Side slash pockets", "Back welt pockets", "Relaxed fit with slight taper"],
  material: "100% Linen",
  sizes: ["28", "30", "32", "34", "36", "38", "40"],
  colors: [{
    name: "Natural",
    hex: "#f5f5dc"
  }, {
    name: "Navy",
    hex: "#0a192f"
  }, {
    name: "Olive",
    hex: "#556b2f"
  }, {
    name: "Stone",
    hex: "#928e85"
  }],
  care: ["Machine wash cold", "Tumble dry low or line dry", "Iron while slightly damp", "Expect and embrace natural wrinkles"],
  images: ["https://images.unsplash.com/photo-1584865288642-42078afe6942", "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80", "https://images.unsplash.com/photo-1473966968600-fa801b869a1a", "https://images.unsplash.com/photo-1541099649105-f69ad21f3246"],
  rating: 4.6,
  reviewCount: 92,
  stock: 46,
  sku: "LT-027-NAT",
  relatedProducts: [8, 22, 26]
}, {
  id: 28,
  slug: "cashmere-sweater",
  name: "Cashmere Sweater",
  description: "Luxuriously soft pure cashmere crewneck",
  price: "$245",
  image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8",
  category: "KNITWEAR",
  detailedDescription: "Our Cashmere Sweater represents the ultimate in luxurious comfort. Crafted from 100% pure Mongolian cashmere, this crewneck sweater offers exceptional softness and warmth without bulk. The classic design and meticulous construction ensure a timeless piece that will remain a wardrobe favorite for years to come.",
  features: ["100% pure Mongolian cashmere", "12-gauge knit for ideal weight", "Ribbed collar, cuffs, and hem", "Fully-fashioned construction", "Reinforced shoulder seams"],
  material: "100% Cashmere",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: [{
    name: "Camel",
    hex: "#c19a6b"
  }, {
    name: "Charcoal",
    hex: "#36454f"
  }, {
    name: "Navy",
    hex: "#0a192f"
  }, {
    name: "Burgundy",
    hex: "#800020"
  }],
  care: ["Dry clean or hand wash cold", "Lay flat to dry", "Store folded with cedar blocks", "Use cashmere comb for pilling"],
  images: ["https://images.unsplash.com/photo-1584273143981-41c073dfe8f8", "https://images.unsplash.com/photo-1599447292180-45fd84092ef0", "https://images.unsplash.com/photo-1604644401890-0bd678c83788", "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633"],
  rating: 4.9,
  reviewCount: 78,
  stock: 24,
  sku: "CS-028-CML",
  relatedProducts: [5, 10, 29]
}, {
  id: 29,
  slug: "cable-knit-sweater",
  name: "Cable Knit Sweater",
  description: "Classic cable pattern in premium cotton blend",
  price: "$145",
  image: "https://images.unsplash.com/photo-1599447292180-45fd84092ef0",
  category: "KNITWEAR",
  detailedDescription: "Our Cable Knit Sweater combines traditional craftsmanship with contemporary comfort. Featuring a classic cable pattern that showcases the artistry of knitwear, this sweater is made from a premium cotton blend that provides warmth without overheating. The timeless design and versatile style make it a perfect layering piece for transitional weather.",
  features: ["Premium cotton blend yarn", "Traditional cable knit pattern", "Ribbed collar, cuffs, and hem", "Relaxed fit for comfortable layering", "Reinforced shoulder construction"],
  material: "85% Cotton, 15% Wool",
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: [{
    name: "Cream",
    hex: "#F5F5DC"
  }, {
    name: "Navy",
    hex: "#0a192f"
  }, {
    name: "Grey",
    hex: "#808080"
  }, {
    name: "Forest",
    hex: "#228b22"
  }],
  care: ["Hand wash cold", "Lay flat to dry", "Do not bleach", "Cool iron if needed"],
  images: ["https://images.unsplash.com/photo-1599447292180-45fd84092ef0", "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8", "https://images.unsplash.com/photo-1604644401890-0bd678c83788", "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633"],
  rating: 4.7,
  reviewCount: 92,
  stock: 36,
  sku: "CK-029-CRM",
  relatedProducts: [5, 10, 28]
}, {
  id: 30,
  slug: "denim-jacket",
  name: "Denim Jacket",
  description: "Classic trucker jacket with premium selvedge denim",
  price: "$195",
  image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2",
  category: "JACKET",
  detailedDescription: "Our Denim Jacket represents the perfect blend of heritage style and modern craftsmanship. Made from premium selvedge denim that develops unique character with wear, this classic trucker jacket features traditional details like button flap pockets and adjustable waist tabs. The versatile design makes it an essential layering piece for year-round style.",
  features: ["Premium selvedge denim", "Button flap chest pockets", "Adjustable waist tabs", "Copper rivets and buttons", "Chain-stitched details"],
  material: "100% Cotton Selvedge Denim",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: [{
    name: "Indigo",
    hex: "#3f5d9d"
  }, {
    name: "Washed Blue",
    hex: "#6e8caf"
  }, {
    name: "Black",
    hex: "#000000"
  }, {
    name: "Vintage Wash",
    hex: "#a0a9b8"
  }],
  care: ["Wash inside out in cold water", "Line dry or tumble dry low", "Wash separately for first few washes", "Wash infrequently to develop character"],
  images: ["https://images.unsplash.com/photo-1551537482-f2075a1d41f2", "https://images.unsplash.com/photo-1591047139829-d91aecb6caea", "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126", "https://images.unsplash.com/photo-1548126032-079a0fb0099d"],
  rating: 4.8,
  reviewCount: 108,
  stock: 42,
  sku: "DJ-030-IND",
  relatedProducts: [1, 4, 18]
}];
export const reviews: Review[] = [{
  id: 1,
  productId: 1,
  userName: "Alex Johnson",
  userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  rating: 5,
  date: "2023-12-15",
  title: "Exceptional Quality and Style",
  comment: "This jacket exceeded my expectations in every way. The material feels premium, and the fit is perfect. I've received numerous compliments whenever I wear it. Definitely worth the investment!",
  helpful: 24,
  verified: true
}, {
  id: 2,
  productId: 1,
  userName: "Sarah Miller",
  userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  rating: 4,
  date: "2023-11-28",
  title: "Great Jacket, Slightly Large",
  comment: "I love the quality and design of this jacket. The only reason I'm giving 4 stars is because it runs slightly larger than expected. I would recommend sizing down if you prefer a more fitted look.",
  helpful: 18,
  verified: true
}, {
  id: 3,
  productId: 1,
  userName: "Michael Chen",
  userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  rating: 5,
  date: "2024-01-05",
  title: "Perfect for All Seasons",
  comment: "This has become my go-to jacket for almost any occasion. It's lightweight enough for spring but substantial enough for cooler days. The water-resistant feature has saved me multiple times during unexpected rain. Highly recommend!",
  helpful: 32,
  verified: true
}, {
  id: 4,
  productId: 1,
  userName: "Emma Rodriguez",
  userImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
  rating: 5,
  date: "2023-12-22",
  title: "Stylish and Functional",
  comment: "I was looking for something that could transition from office to casual outings, and this jacket is perfect. The hidden pockets are a great feature, and the material has held up well after several washes.",
  helpful: 15,
  verified: true
}, {
  id: 5,
  productId: 1,
  userName: "David Wilson",
  rating: 4,
  date: "2024-01-18",
  title: "Great Value for Money",
  comment: "Solid construction and thoughtful design. The only improvement I would suggest is adding more color options. Otherwise, it's a fantastic jacket that I wear regularly.",
  helpful: 9,
  verified: true
}, {
  id: 6,
  productId: 2,
  userName: "Jennifer Lee",
  userImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  rating: 5,
  date: "2023-11-12",
  title: "Exceptional Tailoring",
  comment: "This blazer fits like it was custom-made for me. The attention to detail is evident in every stitch. It's become my signature piece for important meetings and events.",
  helpful: 28,
  verified: true
}, {
  id: 7,
  productId: 3,
  userName: "Thomas Wright",
  userImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  rating: 5,
  date: "2023-12-30",
  title: "Versatile and Comfortable",
  comment: "I've worn this overshirt in multiple settings, from casual outings to semi-formal events. It's incredibly versatile and always looks great. The fabric is soft yet durable.",
  helpful: 21,
  verified: true
}, {
  id: 8,
  productId: 4,
  userName: "Olivia Parker",
  userImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  rating: 4,
  date: "2024-01-08",
  title: "Statement Piece Indeed",
  comment: "This coat turns heads wherever I go. The quality is exceptional, and it keeps me warm even in freezing temperatures. My only suggestion would be to add interior pockets.",
  helpful: 16,
  verified: true
}];
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug);
}
export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}
export function getRelatedProducts(productId: number): Product[] {
  const product = getProductById(productId);
  if (!product || !product.relatedProducts) return [];
  return product.relatedProducts.map(id => {
    const relatedProduct = getProductById(id);
    return relatedProduct ?? {} as Product;
  }).filter(p => Object.keys(p).length > 0);
}
export function getProductReviews(productId: number): Review[] {
  return reviews.filter(review => review.productId === productId);
}