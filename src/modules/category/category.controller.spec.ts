import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { NotFoundException } from '@nestjs/common';

const mockCategory: CategoryEntity = {
  id: '1',
  name: 'Test Category',
  description: 'Test Description',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockCategories: CategoryEntity[] = [mockCategory];

const mockCategoryService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all categories', async () => {
      mockCategoryService.findAll.mockResolvedValue(mockCategories);
      const result = await controller.findAll();
      expect(result).toEqual(mockCategories);
      expect(mockCategoryService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a category by id', async () => {
      mockCategoryService.findOne.mockResolvedValue(mockCategory);
      const result = await controller.findOne('1');
      expect(result).toEqual(mockCategory);
      expect(mockCategoryService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if category not found', async () => {
      mockCategoryService.findOne.mockResolvedValue(null);
      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createCategoryDto: CreateCategoryDto = {
        name: 'New Category',
        description: 'New Description',
      };
      mockCategoryService.create.mockResolvedValue(mockCategory);
      const result = await controller.create(createCategoryDto);
      expect(result).toEqual(mockCategory);
      expect(mockCategoryService.create).toHaveBeenCalledWith(createCategoryDto);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const updateCategoryDto: UpdateCategoryDto = { name: 'Updated Category' };
      const updatedCategory = { ...mockCategory, name: 'Updated Category' };
      mockCategoryService.update.mockResolvedValue(updatedCategory);
      const result = await controller.update('1', updateCategoryDto);
      expect(result).toEqual(updatedCategory);
      expect(mockCategoryService.update).toHaveBeenCalledWith('1', updateCategoryDto);
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      mockCategoryService.remove.mockResolvedValue('Category removed'); // Mock message
      const result = await controller.remove('1');
      expect(result).toEqual({ message: 'Category removed' }); // Beklenen mesaj
      expect(mockCategoryService.remove).toHaveBeenCalledWith('1');
    });
  });
});