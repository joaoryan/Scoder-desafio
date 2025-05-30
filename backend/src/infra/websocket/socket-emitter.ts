import { io } from '../../main/server';

export const emitProductUpdate = (products: any[]) => {
    io.emit('products:update', products);
};