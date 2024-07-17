export interface PaymentOrderModel{
    id?: number;
    cartId?: number;
    shipmentId?: number;
    method?: string;
    state?: string;
    total?: number;
}