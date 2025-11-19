import { Payment, PaymentRequest, PaymentResponse } from '@/types/payment';
import { supabase } from './supabase';

// 주문 ID 생성 함수
export function generateOrderId(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 15);
    return `order_${timestamp}_${random}`;
}

// 결제 요청 생성
export async function createPaymentRequest(userId: string, amount: number): Promise<Payment> {
    const orderId = generateOrderId();

    const { data, error } = await supabase
        .from('payments')
        .insert({
            user_id: userId,
            amount,
            order_id: orderId,
            status: 'pending'
        })
        .select()
        .single();

    if (error) {
        throw new Error(`결제 요청 생성 실패: ${error.message}`);
    }

    return data;
}

// 결제 상태 업데이트
export async function updatePaymentStatus(
    orderId: string,
    paymentKey: string,
    status: 'completed' | 'failed' | 'cancelled'
): Promise<Payment> {
    const { data, error } = await supabase
        .from('payments')
        .update({
            payment_key: paymentKey,
            status
        })
        .eq('order_id', orderId)
        .select()
        .single();

    if (error) {
        throw new Error(`결제 상태 업데이트 실패: ${error.message}`);
    }

    return data;
}

// 사용자의 결제 내역 조회
export async function getUserPayments(userId: string): Promise<Payment[]> {
    const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(`결제 내역 조회 실패: ${error.message}`);
    }

    return data || [];
}

// 사용자의 완료된 결제 확인
export async function hasCompletedPayment(userId: string): Promise<boolean> {
    const { data, error } = await supabase
        .from('payments')
        .select('id')
        .eq('user_id', userId)
        .eq('status', 'completed')
        .limit(1);

    if (error) {
        throw new Error(`결제 상태 확인 실패: ${error.message}`);
    }

    return data && data.length > 0;
}
