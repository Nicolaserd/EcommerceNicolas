import { Body, Controller, Get, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './orders.dto';


@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService:OrdersService){}
    @Post()
    addOrder(@Body()order:CreateOrderDto){
        const {userId, products} = order
        return this.orderService.addOrder(userId, products)

    }

    @Get(":id")
    getOrder(@Query("id",ParseUUIDPipe) id:string){
        return this.orderService.getOrder(id);
    }


}
