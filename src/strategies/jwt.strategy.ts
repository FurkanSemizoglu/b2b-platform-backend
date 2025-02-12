import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET'); // Tip belirlemesi de ekledik

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined'); // Eğer JWT_SECRET yoksa bir hata fırlatıyoruz
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,  // JWT_SECRET'in her zaman geçerli olmasını sağlıyoruz
    });
  }

  async validate(payload: any) {
    return { 
      id: payload.sub, 
      email: payload.email,
      role: payload.role
    };
  }
}
