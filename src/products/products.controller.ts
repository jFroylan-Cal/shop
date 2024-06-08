import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Songs')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @Auth()
  @ApiResponse({ status: 200, description: 'A song was created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 200, description: 'Forbidden, Token related.' })
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.create(createProductDto, user);
  }

  @Get('all')
  @ApiResponse({ status: 200, description: 'Search all songs' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 200, description: 'Forbidden, Token related.' })
  findAll(@Query() pagination: PaginationDto) {
    return this.productsService.findAll(pagination);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get one product' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 200, description: 'Forbidden, Token related.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOnePlain(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Update one product' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 200, description: 'Forbidden, Token related.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User,
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete one product' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 200, description: 'Forbidden, Token related.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
