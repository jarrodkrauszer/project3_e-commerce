const db = require('./connection');
const { User, Product, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Product', 'products');
  await cleanDB('User', 'users');

  const categories = await Category.insertMany([
    { name: 'Mens' },
    { name: 'Womens' },
    { name: 'Hats' },
    { name: 'Jackets' },
    { name: 'Sneakers' }
  ]);

  console.log('categories seeded');

  const newProducts = [
    {
      name: 'Camo Down Vest',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      imageUrl: 'https://i.ibb.co/xJS0T3Y/camo-vest.png',
      category: categories[0]._id,
      price: 199.99,
      quantity: 150
    },
    {
      name: 'Floral T-Shirt',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      imageUrl: 'https://i.ibb.co/qMQ75QZ/floral-shirt.png',
      category: categories[0]._id,
      price: 25.99,
      quantity: 200
    },
    {
      name: 'Black & White Longsleeve',
      category: categories[0]._id,
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      imageUrl: 'https://i.ibb.co/55z32tw/long-sleeve.png',
      price: 20.99,
      quantity: 78
    },
    {
      name: 'Pink T-shirt',
      category: categories[0]._id,
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      imageUrl: 'https://i.ibb.co/RvwnBL8/pink-shirt.png',
      price: 19.99,
      quantity: 150
    },
    {
      name: 'Jean Long Sleeve',
      category: categories[0]._id,
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      imageUrl: 'https://i.ibb.co/VpW4x5t/roll-up-jean-shirt.png',
      price: 29.99,
      quantity: 100
    },
    {
      name: 'Burgundy T-shirt',
      category: categories[0]._id,
      description:
        'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
      imageUrl: 'https://i.ibb.co/mh3VM1f/polka-dot-shirt.png',
      price: 25.99,
      quantity: 90
    },
    {
      name: 'Blue Tanktop',
      category: categories[1]._id,
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      imageUrl: 'https://i.ibb.co/7CQVJNm/blue-tank.png',
      price: 19.99,
      quantity: 80
    },
    {
      name: 'Floral Blouse',
      category: categories[1]._id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      imageUrl: 'https://i.ibb.co/4W2DGKm/floral-blouse.png',
      price: 30.99,
      quantity: 100
    },
    {
      name: 'Floral Dress',
      category: categories[1]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      imageUrl: 'https://i.ibb.co/KV18Ysr/floral-skirt.png',
      price: 49.99,
      quantity: 113
    },
    {
      name: 'Red Dots Dres',
      category: categories[1]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      imageUrl: 'https://i.ibb.co/N3BN1bh/red-polka-dot-dress.png',
      price: 75.99,
      quantity: 200
    },
    {
      name: 'Striped Sweater',
      category: categories[1]._id,
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
      imageUrl: 'https://i.ibb.co/KmSkMbH/striped-sweater.png',
      price: 44.99,
      quantity: 100
    },
    {
      name: 'Yellow Track Suit',
      category: categories[1]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      imageUrl: 'https://i.ibb.co/v1cvwNf/yellow-track-suit.pngg',
      price: 74.99,
      quantity: 125
    },
    {
      name: 'White Blouse',
      category: categories[1]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      imageUrl: 'https://i.ibb.co/qBcrsJg/white-vest.png',
      price: 39.99,
      quantity: 125
    },
    {
      name: 'Brown Brim',
      category: categories[2]._id,
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      imageUrl: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
      price: 19.99,
      quantity: 80
    },
    {
      name: 'Brown Cowboy',
      category: categories[2]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      imageUrl: 'https://i.ibb.co/QdJwgmp/brown-cowboy.png',
      price: 64.99,
      quantity: 110
    },
    {
      name: 'Grey Brim',
      category: categories[2]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      imageUrl: 'https://i.ibb.co/RjBLWxB/grey-brim.png',
      price: 19.99,
      quantity: 200
    },
    {
      name: 'Blue Beanie',
      category: categories[2]._id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      imageUrl: 'https://i.ibb.co/ypkgK0X/blue-beanie.png',
      price: 13.99,
      quantity: 74
    },
    {
      name: 'Green Beanie',
      category: categories[2]._id,
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
      imageUrl: 'https://i.ibb.co/YTjW3vF/green-beanie.png',
      price: 13.99,
      quantity: 100
    },
    {
      name: 'Red Beanie',
      category: categories[2]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      imageUrl: 'https://i.ibb.co/bLB646Z/red-beanie.png',
      price: 13.99,
      quantity: 125
    },
    {
      name: 'Palm Tree Cap',
      category: categories[2]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      imageUrl: 'https://i.ibb.co/rKBDvJX/palm-tree-cap.png',
      price: 29.99,
      quantity: 125
    },
    {
      name: 'Black Jean Shearlin',
      category: categories[3]._id,
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      imageUrl: 'https://i.ibb.co/XzcwL5s/black-shearling.png',
      price: 119.99,
      quantity: 80
    },
    {
      name: 'Blue Jean Jacket',
      category: categories[3]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      imageUrl: 'https://i.ibb.co/mJS6vz0/blue-jean-jacket.png',
      price: 99.99,
      quantity: 110
    },
    {
      name: 'Grey Jean Jacket',
      category: categories[3]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      imageUrl: 'https://i.ibb.co/N71k1ML/grey-jean-jacket.png',
      price: 69.99,
      quantity: 200
    },
    {
      name: 'Brown Shearling',
      category: categories[3]._id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      imageUrl: 'https://i.ibb.co/s96FpdP/brown-shearling.png',
      price: 119.99,
      quantity: 74
    },
    {
      name: 'Tan Trench',
      category: categories[3]._id,
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
      imageUrl: 'https://i.ibb.co/M6hHc3F/brown-trench.png',
      price: 129.99,
      quantity: 100
    },
    {
      name: 'Adidas NMD',
      category: categories[4]._id,
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
      imageUrl: 'https://i.ibb.co/0s3pdnc/adidas-nmd.png',
      price: 119.99,
      quantity: 100
    },
    {
      name: 'Adidas Yeezy',
      category: categories[4]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      imageUrl: 'https://i.ibb.co/dJbG1cT/yeezy.png',
      price: 199.99,
      quantity: 125
    },
    {
      name: 'Nike White AirForce',
      category: categories[4]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      imageUrl: 'https://i.ibb.co/1RcFPk0/white-nike-high-tops.png',
      price: 159.99,
      quantity: 125
    },
    {
      name: 'Nike Red High Tops',
      category: categories[4]._id,
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      imageUrl: 'https://i.ibb.co/QcvzydB/nikes-red.png',
      price: 119.99,
      quantity: 80
    },
    {
      name: 'Nike Brown High Tops',
      category: categories[4]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      imageUrl: 'https://i.ibb.co/fMTV342/nike-brown.pngg',
      price: 119.99,
      quantity: 110
    },
    {
      name: 'Air Jordan Limited',
      category: categories[4]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      imageUrl: 'https://i.ibb.co/w4k6Ws9/nike-funky.png',
      price: 199.99,
      quantity: 200
    },
    {
      name: 'Timberlands',
      category: categories[4]._id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      imageUrl: 'https://i.ibb.co/Mhh6wBg/timberlands.png',
      price: 129.99,
      quantity: 74
    }
  ];

  const products = await Product.insertMany(newProducts);

  console.log('products seeded');

  await User.create({
    firstName: 'Jarrod',
    lastName: 'Krauszer',
    email: 'jarrod@test.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  console.log('users seeded');

  process.exit();
});
