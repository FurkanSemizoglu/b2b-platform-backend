/* import { Test, TestingModule } from '@nestjs/testing';
import { ProductInvestmentController } from './product-investment.controller';
import { ProductInvestmentService } from './product-investment.service';
import { CreateProductInvestmentDto } from './dto/create-product-investment.dto';
import { UpdateProductInvestmentDto } from './dto/update-product-investment.dto';

import { Decimal } from '@prisma/client/runtime/library';

const mockProductInvestment = {
  id: "1",
  productID: "1",
  product: null,
  quantity: 10,
  unitPrice: new Decimal(100),
  customerID: "1",
  customer: null,
  supplierID:"1",
  supplier: null,
  billID: "1",
  bill: null,
  active: true,
};

const mockProductInvestments = [mockProductInvestment];

const mockProductInvestmentService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  findByCustomer: jest.fn(),
  findBySupplier: jest.fn(),
};

describe('ProductInvestmentController', () => {
  let controller: ProductInvestmentController;
  let service: ProductInvestmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductInvestmentController],
      providers: [
        {
          provide: ProductInvestmentService,
          useValue: mockProductInvestmentService,
        },
      ],
    }).compile();

    controller = module.get<ProductInvestmentController>(ProductInvestmentController);
    service = module.get<ProductInvestmentService>(ProductInvestmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product investment', async () => {
      const createProductInvestmentDto: CreateProductInvestmentDto = {
        productID: uuid(),
        quantity: 10,
        unitPrice: new Decimal(100),
        customerID: uuid(),
        supplierID: uuid(),
        billID: uuid(),
        active: true,
      };
      mockProductInvestmentService.create.mockResolvedValue(mockProductInvestment);
      const result = await controller.create(createProductInvestmentDto);
      expect(result).toEqual(mockProductInvestment);
      expect(mockProductInvestmentService.create).toHaveBeenCalledWith(createProductInvestmentDto);
    });
  });

  describe('findAll', () => {
    it('should return all product investments', async () => {
      mockProductInvestmentService.findAll.mockResolvedValue(mockProductInvestments);
      const result = await controller.findAll();
      expect(result).toEqual(mockProductInvestments);
      expect(mockProductInvestmentService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product investment by id', async () => {
      const id = uuid();
      mockProductInvestmentService.findOne.mockResolvedValue(mockProductInvestment);
      const result = await controller.findOne(id);
      expect(result).toEqual(mockProductInvestment);
      expect(mockProductInvestmentService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a product investment', async () => {
      const id = uuid();
      const updateProductInvestmentDto: UpdateProductInvestmentDto = { quantity: 20, unitPrice: new Decimal(200) };
      const updatedProductInvestment = { ...mockProductInvestment, quantity: 20, unitPrice: new Decimal(200) };
      mockProductInvestmentService.update.mockResolvedValue(updatedProductInvestment);
      const result = await controller.update(id, updateProductInvestmentDto);
      expect(result).toEqual(updatedProductInvestment);
      expect(mockProductInvestmentService.update).toHaveBeenCalledWith(id, updateProductInvestmentDto);
    });
  });

  describe('remove', () => {
    it('should remove a product investment', async () => {
      const id = uuid();
      mockProductInvestmentService.remove.mockResolvedValue(mockProductInvestment);
      const result = await controller.remove(id);
      expect(result).toEqual(mockProductInvestment);
      expect(mockProductInvestmentService.remove).toHaveBeenCalledWith(id);
    });
  });

  describe('findByCustomer', () => {
    it('should return product investments by customerId', async () => {
      const customerId = uuid();
      mockProductInvestmentService.findByCustomer.mockResolvedValue(mockProductInvestments);
      const result = await controller.findByCustomer(customerId);
      expect(result).toEqual(mockProductInvestments);
      expect(mockProductInvestmentService.findByCustomer).toHaveBeenCalledWith(customerId);
    });
  });

  describe('findBySupplier', () => {
    it('should return product investments by supplierId', async () => {
      const supplierId = uuid();
      mockProductInvestmentService.findBySupplier.mockResolvedValue(mockProductInvestments);
      const result = await controller.findBySupplier(supplierId);
      expect(result).toEqual(mockProductInvestments);
      expect(mockProductInvestmentService.findBySupplier).toHaveBeenCalledWith(supplierId);
    });
  });
}); */