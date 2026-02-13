import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: 'Electrónica', color: '#3B82F6' },
  { name: 'Ropa', color: '#10B981' },
  { name: 'Alimentos', color: '#F59E0B' },
  { name: 'Libros', color: '#8B5CF6' },
  { name: 'Hogar', color: '#EC4899' },
];

const products = [
  { name: 'Laptop Dell XPS 15', sku: 'LAPTOP-001', category: 'Electrónica', price: 1299.99, stock: 15, minStock: 5 },
  { name: 'Mouse Logitech MX Master', sku: 'MOUSE-001', category: 'Electrónica', price: 89.99, stock: 45, minStock: 10 },
  { name: 'Teclado Mecánico RGB', sku: 'KEYB-001', category: 'Electrónica', price: 129.99, stock: 30, minStock: 10 },
  { name: 'Monitor Samsung 27"', sku: 'MON-001', category: 'Electrónica', price: 349.99, stock: 8, minStock: 5 },
  { name: 'Auriculares Sony WH-1000XM4', sku: 'AUDIO-001', category: 'Electrónica', price: 279.99, stock: 3, minStock: 8 },
  
  { name: 'Camiseta Básica', sku: 'SHIRT-001', category: 'Ropa', price: 19.99, stock: 120, minStock: 30 },
  { name: 'Jeans Levi\'s 501', sku: 'JEANS-001', category: 'Ropa', price: 79.99, stock: 65, minStock: 20 },
  { name: 'Chaqueta de Invierno', sku: 'JACKET-001', category: 'Ropa', price: 149.99, stock: 25, minStock: 10 },
  { name: 'Zapatillas Nike Air', sku: 'SHOES-001', category: 'Ropa', price: 119.99, stock: 40, minStock: 15 },
  
  { name: 'Café Colombiano 500g', sku: 'COFFEE-001', category: 'Alimentos', price: 12.99, stock: 200, minStock: 50 },
  { name: 'Chocolate Orgánico', sku: 'CHOC-001', category: 'Alimentos', price: 4.99, stock: 150, minStock: 40 },
  { name: 'Aceite de Oliva Extra', sku: 'OIL-001', category: 'Alimentos', price: 15.99, stock: 80, minStock: 25 },
  
  { name: 'Novela "Cien Años de Soledad"', sku: 'BOOK-001', category: 'Libros', price: 24.99, stock: 50, minStock: 15 },
  { name: 'Libro de Cocina', sku: 'BOOK-002', category: 'Libros', price: 29.99, stock: 35, minStock: 10 },
  { name: 'Manual de JavaScript', sku: 'BOOK-003', category: 'Libros', price: 39.99, stock: 22, minStock: 10 },
  
  { name: 'Set de Toallas', sku: 'HOME-001', category: 'Hogar', price: 34.99, stock: 60, minStock: 20 },
  { name: 'Sábanas de Algodón', sku: 'HOME-002', category: 'Hogar', price: 49.99, stock: 45, minStock: 15 },
  { name: 'Lámpara de Mesa', sku: 'HOME-003', category: 'Hogar', price: 39.99, stock: 28, minStock: 10 },
];

const movements = [
  { sku: 'LAPTOP-001', type: 'entrada', quantity: 10, reason: 'Compra a proveedor', daysAgo: 15 },
  { sku: 'LAPTOP-001', type: 'salida', quantity: 5, reason: 'Venta', daysAgo: 10 },
  { sku: 'MOUSE-001', type: 'entrada', quantity: 50, reason: 'Reposición de stock', daysAgo: 20 },
  { sku: 'MOUSE-001', type: 'salida', quantity: 15, reason: 'Venta', daysAgo: 8 },
  { sku: 'KEYB-001', type: 'entrada', quantity: 40, reason: 'Nueva línea de productos', daysAgo: 25 },
  { sku: 'KEYB-001', type: 'salida', quantity: 10, reason: 'Venta', daysAgo: 5 },
  { sku: 'MON-001', type: 'entrada', quantity: 15, reason: 'Compra a proveedor', daysAgo: 18 },
  { sku: 'MON-001', type: 'salida', quantity: 7, reason: 'Venta corporativa', daysAgo: 3 },
  { sku: 'AUDIO-001', type: 'entrada', quantity: 20, reason: 'Importación', daysAgo: 30 },
  { sku: 'AUDIO-001', type: 'salida', quantity: 17, reason: 'Venta', daysAgo: 2 },
  { sku: 'SHIRT-001', type: 'entrada', quantity: 150, reason: 'Nueva temporada', daysAgo: 40 },
  { sku: 'SHIRT-001', type: 'salida', quantity: 30, reason: 'Venta', daysAgo: 6 },
  { sku: 'JEANS-001', type: 'entrada', quantity: 80, reason: 'Reposición', daysAgo: 22 },
  { sku: 'JEANS-001', type: 'salida', quantity: 15, reason: 'Venta', daysAgo: 4 },
  { sku: 'COFFEE-001', type: 'entrada', quantity: 300, reason: 'Compra mayorista', daysAgo: 12 },
  { sku: 'COFFEE-001', type: 'salida', quantity: 100, reason: 'Venta', daysAgo: 1 },
];

async function main() {
  console.log('Limpiando base de datos...');
  await prisma.stockMovement.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log('Creando categorías...');
  const createdCategories = await Promise.all(
    categories.map((cat) =>
      prisma.category.create({
        data: cat,
      })
    )
  );

  console.log('Creando productos...');
  for (const product of products) {
    const category = createdCategories.find((c) => c.name === product.category);
    await prisma.product.create({
      data: {
        name: product.name,
        sku: product.sku,
        categoryId: category?.id,
        price: product.price,
        stock: product.stock,
        minStock: product.minStock,
      },
    });
  }

  console.log('Creando movimientos de stock...');
  for (const movement of movements) {
    const product = await prisma.product.findUnique({
      where: { sku: movement.sku },
    });

    if (product) {
      const date = new Date();
      date.setDate(date.getDate() - movement.daysAgo);

      await prisma.stockMovement.create({
        data: {
          productId: product.id,
          type: movement.type,
          quantity: movement.quantity,
          reason: movement.reason,
          date,
        },
      });
    }
  }

  console.log('Seed completado con éxito!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
