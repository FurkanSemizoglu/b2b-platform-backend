import { Test, TestingModule } from '@nestjs/testing';
import { ProductInvestmentController } from './product-investment.controller';

describe('ProductInvestmentController', () => {
  let controller: ProductInvestmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductInvestmentController],
    }).compile();

    controller = module.get<ProductInvestmentController>(ProductInvestmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
