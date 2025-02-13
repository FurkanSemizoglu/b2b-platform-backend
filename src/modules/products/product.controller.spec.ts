import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { UpdateProductDto } from './dto/pdate-product.dto';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { SupplierEntity } from '../supplier/entities/supplier.entity';
import { CategoryEntity } from '../category/entities/category.entity';

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

const mockProducts: ProductEntity[] = [mockProduct];

const mockProductsService = {
  findAll: jest.fn(),
  getProductById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  getProductsByCategory: jest.fn(),
};

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      mockProductsService.findAll.mockResolvedValue(mockProducts);
      const result = await controller.findAll();
      expect(result).toEqual(mockProducts);
      expect(mockProductsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      mockProductsService.getProductById.mockResolvedValue(mockProduct);
      const result = await controller.findOne('1');
      expect(result).toEqual(mockProduct);
      expect(mockProductsService.getProductById).toHaveBeenCalledWith('1');
    });

    it('should handle NotFoundException from the service', async () => {
      mockProductsService.getProductById.mockRejectedValue(new NotFoundException());
      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });
  describe('findAllByCategory', () => {
    it('should return products by category', async () => {
        mockProductsService.getProductsByCategory.mockResolvedValue(mockProducts);
        const result = await controller.findAllByCategory('1');
        expect(result).toEqual(mockProducts);
        expect(mockProductsService.getProductsByCategory).toHaveBeenCalledWith('1');
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
      mockProductsService.create.mockResolvedValue(mockProduct);
      const result = await controller.create(createProductDto);
      expect(result).toEqual(mockProduct);
      expect(mockProductsService.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateProductDto: UpdateProductDto = { productName: 'Updated Product' };
      mockProductsService.update.mockResolvedValue({ ...mockProduct, productName: 'Updated Product' });
      const result = await controller.update('1', updateProductDto);
      expect(result.productName).toEqual('Updated Product');
      expect(mockProductsService.update).toHaveBeenCalledWith('1', updateProductDto);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      mockProductsService.remove.mockResolvedValue({ product: mockProduct, message: 'Product removed' });
      const result = await controller.remove('1');
      expect(result).toEqual({ product: mockProduct, message: 'Product removed' });
      expect(mockProductsService.remove).toHaveBeenCalledWith('1');
    });
    it('should handle InternalServerErrorException from the service', async () => {
        mockProductsService.remove.mockRejectedValue(new InternalServerErrorException());
        await expect(controller.remove('1')).rejects.toThrow(InternalServerErrorException);
      });
  });
});