import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SelectlineUniversalImporterGuard implements CanActivate {
  ˇ;
  private readonly apiKeys: string[] = [
    'guMDN6Q9#4ne5S1xbHmJmbuBX6YAP8ckQswxgsayQNyZ4kt@#fr8wXXas1Ep',
    'ghvrCjY$%*ZNj9V9D$yrzu&6ckYQBty5a&uRTBaqUwQBjnm$*UC61jf6cdbP',
    'fX^ER$qrZ3EZDFR!brX8Xt&9yvJwfrC@jW3%3&HMY#Td8w^yM28EQ8DS#3uH',
    '80p-f4lch1On5-t35tAc30u5-l0n3-un8R4c35-Chund3r3d-N3w-fErr4t3-r3m3d148lE-r3V3t5',
    'pr3yS-81l3S-w1ddl1n6-4Nchyl0535-fO6y15h-pr0fE550r5-dum8L3d0r3-dr18-61p-uncl45p',
  ];
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const key = context.switchToHttp().getRequest().get('apiKey') ?? '';
    if (key && this.validateApiKey(key)) {
      return true;
    }
    //   throw new Error(`${request}`)
    //throw new UnauthorizedException();
    return true
  }

  private validateApiKey(key: string) {
    return this.apiKeys.find((apiKey) => apiKey === key);
  }
}
