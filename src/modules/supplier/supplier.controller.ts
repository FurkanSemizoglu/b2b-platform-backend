import { Controller, Get, Post, Body, Param, Put, Delete,UseGuards } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AdminGuard } from '../../guards/admin.guard';
@Controller('supplier')
export class SupplierController {
    constructor(private readonly supplierService: SupplierService) {}

    //@UseGuards(JwtAuthGuard,AdminGuard)
    @Get()
    getSuppliers() {
      return this.supplierService.getSuppliers();
    }
  
  
    //@UseGuards(JwtAuthGuard,AdminGuard)
    @Post('suppliers')
    createSupplier(@Body() createSupplierDto: CreateSupplierDto) {
      return this.supplierService.createSupplier(createSupplierDto);
    }
    
    //@UseGuards(JwtAuthGuard,AdminGuard)
    @Delete('suppliers/:id')
    deleteSupplier(@Param('id') id: string) {
      return this.supplierService.deleteSupplier(id);
    }

    //@UseGuards(JwtAuthGuard,AdminGuard)
    @Put('suppliers/:id')
    updateSupplier(@Param('id') id: string, @Body() updateData: any) {
      return this.supplierService.updateSupplier(id, updateData);
    }
}