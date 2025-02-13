import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { UpdateProductDto } from './dto/pdate-product.dto';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { SupplierEntity } from '../supplier/entities/supplier.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { PrismaService } from 'src/prisma/prisma.service';

const mockCategory: CategoryEntity = { // Mock CategoryEntity
  id: '1',
  name: 'Test Category',
  description : "Güzel ürün",
  createdAt: new Date(),
  updatedAt: new Date()
  // ... diğer CategoryEntity özellikleri
};

const mockSupplier: SupplierEntity = { // Mock SupplierEntity
  id: '1',
  companyName: 'Test Supplier',
  website: 'https://testsupplier.com',
  logo: 'https://testsupplier.com/logo.png',
  products: [],
  address: null,
  userId: '1',
  createdAt: new Date(),
  updatedAt: new Date()
  // ... diğer SupplierEntity özellikleri
};

const mockProduct: ProductEntity = {
  id: '1',
  productName: 'Test Product',
  productDescription: 'Test Description',
  isActive: true,
  putToMarket: false,
  availableForTrade: false,
  totalStockQuantity: 100,
  unitPrice: new Decimal(10), // new Decimal() ile oluşturuldu
  siloStockQuantity: 50, // Sayısal değer veya null
  marketStockQuantity: null, // null değeri de olabilir
  minimumSellingQuantity: 10, // Sayısal değer veya null
  discountAvailable: false,
  discountRate: 0,
  commissionRate: null, // null değeri de olabilir
  images: [], // ImageEntity[] veya null
  storageCostPerUnit: new Decimal(5), // new Decimal() ile oluşturuldu veya null
  categoryId: '1',
  category: mockCategory, // CategoryEntity veya null
  supplierId: '1',
  supplier: mockSupplier, // SupplierEntity veya null
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockProducts: ProductEntity[] = [
  { ...mockProduct },
  {
    id: '2',
    productName: 'Test Product 2',
    productDescription: 'Test Description 2',
    isActive: true,
    putToMarket: true,
    availableForTrade: true,
    totalStockQuantity: 200,
    unitPrice: new Decimal(20),
    siloStockQuantity: null,
    marketStockQuantity: 150,
    minimumSellingQuantity: null,
    discountAvailable: true,
    discountRate: 10,
    commissionRate: 5,
    images: null, // null değeri de olabilir
    storageCostPerUnit: new Decimal(10),
    categoryId: '1',
    category: null, // null değeri de olabilir
    supplierId: '1',
    supplier: null, // null değeri de olabilir
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockPrismaService = {
  product: {
    findMany: jest.fn(),
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      mockPrismaService.product.findMany.mockResolvedValue(mockProducts);
      const products = await service.findAll();
      expect(products).toEqual(mockProducts);
      expect(prisma.product.findMany).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const createProductDto: CreateProductDto = {
        productName: 'New Product',
        productDescription: 'New Description',
        unitPrice: 30,
        categoryId: '1',
        supplierId: '1',
        totalStockQuantity: 0,
        discountRate: 0,
        commissionRate: 0
      };
      mockPrismaService.product.create.mockResolvedValue(mockProduct);
      const product = await service.create(createProductDto);
      expect(product).toEqual(mockProduct);
      expect(prisma.product.create).toHaveBeenCalledWith({ data: createProductDto });
    });
  });

  describe('getProductById', () => {
    it('should return a product by id', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(mockProduct);
      const product = await service.getProductById('1');
      expect(product).toEqual(mockProduct);
      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { images: true, category: true, supplier: true },
      });
    });

    it('should throw NotFoundException if product not found', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(null);
      await expect(service.getProductById('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateProductDto: UpdateProductDto = { productName: 'Updated Product' };
      mockPrismaService.product.update.mockResolvedValue({ ...mockProduct, productName: 'Updated Product' });
      const product = await service.update('1', updateProductDto);
      expect(product.productName).toEqual('Updated Product');
      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateProductDto,
        include: { images: true, category: true, supplier: true },
      });
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      mockPrismaService.product.delete.mockResolvedValue(mockProduct);
      const result = await service.remove('1');
      expect(result.product).toEqual(mockProduct);
      expect(result.message).toEqual('Product successfully deleted');
      expect(prisma.product.delete).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { images: true, category: true, supplier: true },
      });
    });

    it('should throw InternalServerErrorException if delete fails', async () => {
      mockPrismaService.product.delete.mockRejectedValue(new Error('Delete failed'));
      await expect(service.remove('1')).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('getProductsByCategory', () => {
    it('should return products by category', async () => {
      mockPrismaService.product.findMany.mockResolvedValue(mockProducts);
      const products = await service.getProductsByCategory('1');
      expect(products).toEqual(mockProducts);
      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: { categoryId: '1' },
        include: { images: true, category: true, supplier: true },
      });
    });
  });
});