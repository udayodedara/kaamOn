import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { IRequest } from 'src/common/interface/request.interface';
import { WalletService } from './wallet.service';
import { AddBalanceDto } from './dto/add-balance.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('/details')
  getWallet(@Req() request: IRequest) {
    const userId = request.user.id;
    return this.walletService.getWalletByUserId(userId);
  }

  @Post('add-balance')
  addBalance(@Req() request: IRequest, @Body() addBalanceDto: AddBalanceDto) {
    const userId = request.user.id;
    return this.walletService.addBalance(userId, addBalanceDto.amount);
  }
}
