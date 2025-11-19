'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { updatePaymentStatus } from '@/lib/payment'
import { useAuth } from '@/contexts/auth-context'

export default function PaymentSuccessPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { user } = useAuth()
    const [isProcessing, setIsProcessing] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const processPayment = async () => {
            try {
                const paymentKey = searchParams.get('paymentKey')
                const orderId = searchParams.get('orderId')
                const amount = searchParams.get('amount')

                if (!paymentKey || !orderId || !amount) {
                    throw new Error('결제 정보가 올바르지 않습니다.')
                }

                // 결제 상태를 완료로 업데이트
                await updatePaymentStatus(orderId, paymentKey, 'completed')

                setIsProcessing(false)

                // 3초 후 메인 페이지로 이동
                setTimeout(() => {
                    router.push('/')
                }, 3000)

            } catch (err: any) {
                setError(err.message)
                setIsProcessing(false)
            }
        }

        if (user) {
            processPayment()
        }
    }, [user, searchParams, router])

    if (isProcessing) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">결제를 처리하고 있습니다...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">❌</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">결제 처리 중 오류 발생</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        홈으로 돌아가기
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="text-green-500 text-6xl mb-4">✅</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">결제가 완료되었습니다!</h1>
                <p className="text-gray-600 mb-6">
                    노트 테이킹 앱을 이용하실 수 있습니다.<br />
                    잠시 후 홈페이지로 이동합니다.
                </p>
                <div className="animate-pulse">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                </div>
            </div>
        </div>
    )
}
