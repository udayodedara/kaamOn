import { Controller, Get, Req } from '@nestjs/common';
import { IRequest } from 'src/common/interface/request.interface';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('/details')
  getWallet(@Req() request: IRequest) {
    const userId = request.user.id;
    return this.walletService.getWalletByUserId(userId);
  }
}
