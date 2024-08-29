export interface DTO {
    valid(): boolean;
}

export { CreatePaymentDto, GetPaymentDto } from './payments';
export { CreateGridDto, GetGridDto } from './grid';
export { WebsocketMessageDTO } from './websocket';
