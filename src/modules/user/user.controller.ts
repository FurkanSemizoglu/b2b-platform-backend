import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('suppliers')
  getSuppliers() {
    return this.userService.getSuppliers();
  }

  @Get('customers')
  getCustomers() {
    return this.userService.getCustomers();
  }

  @Post('suppliers')
  createSupplier(@Body() createSupplierDto: CreateSupplierDto) {
    return this.userService.createSupplier(createSupplierDto);
  }

  @Delete('suppliers/:id')
  deleteSupplier(@Param('id') id: string) {
    return this.userService.deleteSupplier(id);
  }

  @Put('suppliers/:id')
  updateSupplier(@Param('id') id: string, @Body() updateData: any) {
    return this.userService.updateSupplier(id, updateData);
  }

  @Post('customers')
  createCustomer(@Body() createUserDto: CreateUserDto) {
    return this.userService.createCustomer(createUserDto);
  }

  @Delete('customers/:id')
  deleteCustomer(@Param('id') id: string) {
    return this.userService.deleteCustomer(id);
  }

  @Put('customers/:id')
  updateCustomer(@Param('id') id: string, @Body() updateData: any) {
    return this.userService.updateCustomer(id, updateData);
  }
} 