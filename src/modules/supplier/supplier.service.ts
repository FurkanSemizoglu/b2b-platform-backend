import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
@Injectable()
export class SupplierService {

constructor(private readonly prisma: PrismaService) {}

    async getSuppliers() {
        return this.prisma.supplier.findMany({
        include: { user: true },
        });
    }
    


  async createSupplier(createSupplierDto: CreateSupplierDto) {
    const user = await this.prisma.user.create({
      data: {
        name: createSupplierDto.name,
        surname: createSupplierDto.surname,
        email: createSupplierDto.email,
        password: createSupplierDto.password,
        age: createSupplierDto.age,
        role: 'SUPPLIER', // veya UserRole enum'ını kullanabilirsiniz
      },
    });

    return this.prisma.supplier.create({
      data: {
        userId: user.id, // Yeni oluşturulan kullanıcının ID'si
        companyName: createSupplierDto.companyName,
        website: createSupplierDto.website,
        logo: createSupplierDto.logo,
      },
    });
  }

  async deleteSupplier(id: string) {
    return this.prisma.supplier.delete({
      where: { id },
    });
  }

  async updateSupplier(id: string, updateData: any) {
    return this.prisma.supplier.update({
      where: { id },
      data: updateData,
    });
  }
    
}
