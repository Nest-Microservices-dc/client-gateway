import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto/';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy,) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send({ cmd: 'create_order' }, createOrderDto)
  }

  @Get()
  findAll(
    @Query() orderPaginationDto: OrderPaginationDto
  ) {

    return this.client.send({ cmd: 'find_all_orders' }, orderPaginationDto)
      .pipe(
        catchError((err) => { throw new RpcException(err) }),
      );

  }

  @Get('id/:id')
  findOne(
    @Param('id' ,ParseUUIDPipe) 
    id: string
  ) {
    return this.client.send({ cmd: 'find_one_order' }, { id })
      .pipe(
        catchError((err) => { throw new RpcException(err) }),
      );
  }

  @Get(':status')
  findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {
    return this.client.send({ cmd: 'find_all_orders' }, { ...paginationDto, status: statusDto.status })
      .pipe(
        catchError((err) => { throw new RpcException(err) }),
      );
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) 
    id: string,
    @Body() statusDto: StatusDto
  ) {
    return this.client.send({ cmd: 'change_order_status' }, { id, status: statusDto.status })
      .pipe(
        catchError((err) => { throw new RpcException(err) }),
      );
  }

}
