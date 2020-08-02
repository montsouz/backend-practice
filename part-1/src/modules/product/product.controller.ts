import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { AppGuard } from 'common/guards/app-guard';

@Controller()
@UseGuards(AppGuard)
export class ProductController {
  @Post('product')
  async post(@Body() product: any): Promise<any> {
    return product;
  }
}
