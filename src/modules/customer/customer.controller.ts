import { Controller, Delete,Body, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AdminGuard } from '../../guards/admin.guard';

@Controller('customers')
//@UseGuards(JwtAuthGuard,AdminGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Post('')
  createCustomer(@Body() createCustomer: CreateCustomerDto) {
    return this.customerService.createCustomer(createCustomer);
  }

  @Delete('customers/:id')
  deleteCustomer(@Param('id') id: string) {
    return this.customerService.deleteCustomer(id);
  }

  @Put('customers/:id')
  updateCustomer(@Param('id') id: string, @Body() updateData: any) {
    return this.customerService.updateCustomer(id, updateData);
  }
} 