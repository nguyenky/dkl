import HttpClientService from './http-client.service';

export type Feature = {
    code: string;
    label: Record<string, string>;
    description: string;
    translatedDescription: Record<string, string>;
    state: string;
    active: boolean;
    path: string;
};

class OrderService {
    async fetchOrders() {
        return await HttpClientService.get('app/list').then((response) => response.data);
    }
}

export default new OrderService();
