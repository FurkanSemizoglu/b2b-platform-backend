import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProductInvestmentService } from './product-investment.service';
import { CreateProductInvestmentDto } from './dto/create-product-investment.dto';
import { UpdateProductInvestmentDto } from './dto/update-product-investment.dto';

@Controller('product-investment')
export class ProductInvestmentController {
  constructor(private readonly productInvestmentService: ProductInvestmentService) {}

  @Post()
  create(@Body() createProductInvestmentDto: CreateProductInvestmentDto) {
    return this.productInvestmentService.create(createProductInvestmentDto);
  }

  @Get()
  findAll() {
    return this.productInvestmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productInvestmentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductInvestmentDto: UpdateProductInvestmentDto,
  ) {
    return this.productInvestmentService.update(id, updateProductInvestmentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productInvestmentService.remove(id);
  }

  @Get('customer/:customerId')
  findByCustomer(@Param('customerId', ParseUUIDPipe) customerId: string) {
    return this.productInvestmentService.findByCustomer(customerId);
  }

  @Get('supplier/:supplierId')
  findBySupplier(@Param('supplierId', ParseUUIDPipe) supplierId: string) {
    return this.productInvestmentService.findBySupplier(supplierId);
  }
}
