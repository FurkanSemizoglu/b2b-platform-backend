import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

const mockCategory: CategoryEntity = {
  id: '1',
  name: 'Test Category',
  description: 'Test Description',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockCategories: CategoryEntity[] = [mockCategory];

const mockPrismaService = {
  category: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('CategoryService', () => {
  let service: CategoryService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all categories', async () => {
      mockPrismaService.category.findMany.mockResolvedValue(mockCategories);
      const categories = await service.findAll();
      expect(categories).toEqual(mockCategories);
      expect(prisma.category.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a category by id', async () => {
      mockPrismaService.category.findUnique.mockResolvedValue(mockCategory);
      const category = await service.findOne('1');
      expect(category).toEqual(mockCategory);
      expect(prisma.category.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should return null if category not found', async () => {
      mockPrismaService.category.findUnique.mockResolvedValue(null);
      const category = await service.findOne('1');
      expect(category).toBeNull();
      expect(prisma.category.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createCategoryDto: CreateCategoryDto = {
        name: 'New Category',
        description: 'New Description',
      };
      mockPrismaService.category.create.mockResolvedValue(mockCategory);
      const category = await service.create(createCategoryDto);
      expect(category).toEqual(mockCategory);
      expect(prisma.category.create).toHaveBeenCalledWith({ data: createCategoryDto });
    });

    it('should throw HttpException if creation fails', async () => {
      const createCategoryDto: CreateCategoryDto = {
        name: 'New Category',
        description: 'New Description',
      };
      mockPrismaService.category.create.mockRejectedValue(new Error('Creation failed'));
      await expect(service.create(createCategoryDto)).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const updateCategoryDto: UpdateCategoryDto = { name: 'Updated Category' };
      const updatedCategory = { ...mockCategory, name: 'Updated Category' };
      mockPrismaService.category.update.mockResolvedValue(updatedCategory);
      const category = await service.update('1', updateCategoryDto);
      expect(category).toEqual(updatedCategory);
      expect(prisma.category.update).toHaveBeenCalledWith({ where: { id: '1' }, data: updateCategoryDto });
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      mockPrismaService.category.delete.mockResolvedValue(mockCategory); // Mock silinen kategori
      const message = await service.remove('1');
      expect(message).toEqual('Kategori başarıyla silindi');
      expect(prisma.category.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw HttpException if deletion fails', async () => {
      mockPrismaService.category.delete.mockRejectedValue(new Error('Deletion failed'));
      await expect(service.remove('1')).rejects.toThrow(HttpException);
    });
  });

  describe('mapCategoryToEntity', () => {
    it('should map a Prisma category object to a CategoryEntity', () => {
      const categoryEntity = service.mapCategoryToEntity(mockCategory);
      expect(categoryEntity).toBeInstanceOf(CategoryEntity);
      expect(categoryEntity.id).toEqual(mockCategory.id);
      expect(categoryEntity.name).toEqual(mockCategory.name);
      expect(categoryEntity.description).toEqual(mockCategory.description);
      expect(categoryEntity.createdAt).toEqual(mockCategory.createdAt);
      expect(categoryEntity.updatedAt).toEqual(mockCategory.updatedAt);
    });
  });
});