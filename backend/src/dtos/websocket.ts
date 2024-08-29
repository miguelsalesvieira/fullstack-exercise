import { DTO } from '.';
import { WebsocketMessage, WebsocketMessageType } from '../types';

export class WebsocketMessageDTO implements WebsocketMessage {
    public type: WebsocketMessageType;
    public data: DTO;

    constructor(data: any) {
        this.type = data.type;
        this.data = data.data;
    }
}
