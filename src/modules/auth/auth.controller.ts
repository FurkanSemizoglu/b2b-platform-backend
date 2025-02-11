import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterSupplierDto } from './dto/register-supplier.dto';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { RegisterAdminDto } from './dto/register-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    return this.authService.login(user);
  }

  @Post('register/supplier')
  async registerSupplier(@Body() registerDto: RegisterSupplierDto) {
    return this.authService.registerSupplier(registerDto);
  }

  @Post('register/customer')
  async registerCustomer(@Body() registerDto: RegisterCustomerDto) {
    return this.authService.registerCustomer(registerDto);
  }

  @Post('register/admin')
  async registerAdmin(@Body() registerDto: RegisterAdminDto) {
    return this.authService.registerAdmin(registerDto);
  }
} 