import { Test, TestingModule } from '@nestjs/testing';
import { ProductInvestmentService } from './product-investment.service';

describe('ProductInvestmentService', () => {
  let service: ProductInvestmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductInvestmentService],
    }).compile();

    service = module.get<ProductInvestmentService>(ProductInvestmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
