import { Module } from '@nestjs/common';
import { CryptoController } from './controller/crypto.controller';
import { GetCryptoUseCase } from './use-cases/getCrypto.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoEntity } from './domain/crypto.entity';
import { CryptoRepo } from './repositories/crypto.repo';

@Module({
  imports: [TypeOrmModule.forFeature([CryptoEntity])],
  controllers: [CryptoController],
  providers: [GetCryptoUseCase, CryptoRepo],
})
export class CryptoModule {}
