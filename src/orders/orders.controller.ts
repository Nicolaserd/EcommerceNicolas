import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService:OrdersService){}
    @Post()
    addOrder(@Body()order:any){
        const {userId, products} = order
        return this.orderService.addOrder(userId, products)

    }

    @Get(":id")
    getOrder(@Query("id") id:string){
        return this.orderService.getOrder(id);
    }


}
