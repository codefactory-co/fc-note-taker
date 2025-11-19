export interface Payment {
    id: string;
    user_id: string;
    amount: number;
    order_id: string;
    payment_key?: string;
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    created_at: string;
    updated_at: string;
}

export interface PaymentRequest {
    orderId: string;
    orderName: string;
    customerEmail?: string;
    customerName?: string;
    amount: number;
}

export interface PaymentResponse {
    paymentKey: string;
    orderId: string;
    amount: number;
    status: string;
}
