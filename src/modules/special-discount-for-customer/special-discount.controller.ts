import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecialDiscountService } from './special-discount.service';
import { CreateSpecialDiscountDto } from './dto/create-special-discount.dto';
import { UpdateSpecialDiscountDto } from './dto/update-special-discount.dto';

@Controller('special-discount')
export class SpecialDiscountController {
  constructor(private readonly specialDiscountService: SpecialDiscountService) {}

  @Post()
  create(@Body() createSpecialDiscountDto: CreateSpecialDiscountDto) {
    return this.specialDiscountService.create(createSpecialDiscountDto);
  }

  @Get()
  findAll() {
    return this.specialDiscountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialDiscountService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpecialDiscountDto: UpdateSpecialDiscountDto,
  ) {
    return this.specialDiscountService.update(id, updateSpecialDiscountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialDiscountService.remove(id);
  }
} 