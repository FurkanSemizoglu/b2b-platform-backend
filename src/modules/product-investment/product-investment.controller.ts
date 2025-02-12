import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ProductInvestmentService } from './product-investment.service';
import { CreateProductInvestmentDto } from './dto/create-product-investment.dto';
import { UpdateProductInvestmentDto } from './dto/update-product-investment.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AdminGuard } from '../../guards/admin.guard';

@Controller('product-investment')
export class ProductInvestmentController {
  constructor(private readonly productInvestmentService: ProductInvestmentService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductInvestmentDto: CreateProductInvestmentDto) {
    return this.productInvestmentService.create(createProductInvestmentDto);
  }

  //@UseGuards(JwtAuthGuard,AdminGuard)
  @Get()
  findAll() {
    return this.productInvestmentService.findAll();
  }

  //@UseGuards(JwtAuthGuard,AdminGuard)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productInvestmentService.findOne(id);
  }

  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductInvestmentDto: UpdateProductInvestmentDto,
  ) {
    return this.productInvestmentService.update(id, updateProductInvestmentDto);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productInvestmentService.remove(id);
  }

  //@UseGuards(JwtAuthGuard)
  @Get('customer/:customerId')
  findByCustomer(@Param('customerId', ParseUUIDPipe) customerId: string) {
    return this.productInvestmentService.findByCustomer(customerId);
  }

  //@UseGuards(JwtAuthGuard)
  @Get('supplier/:supplierId')
  findBySupplier(@Param('supplierId', ParseUUIDPipe) supplierId: string) {
    return this.productInvestmentService.findBySupplier(supplierId);
  }
}
