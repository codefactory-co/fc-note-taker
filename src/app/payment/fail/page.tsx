'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function PaymentFailPage() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const errorCode = searchParams.get('code')
    const errorMessage = searchParams.get('message')
    const orderId = searchParams.get('orderId')

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-md mx-4">
                <div className="text-red-500 text-6xl mb-4">❌</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">결제가 실패했습니다</h1>

                {errorCode && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">
                            <strong>오류 코드:</strong> {errorCode}
                        </p>
                        {errorMessage && (
                            <p className="text-sm text-red-600 mt-1">
                                <strong>오류 메시지:</strong> {errorMessage}
                            </p>
                        )}
                        {orderId && (
                            <p className="text-sm text-gray-600 mt-1">
                                <strong>주문 번호:</strong> {orderId}
                            </p>
                        )}
                    </div>
                )}

                <p className="text-gray-600 mb-6">
                    결제 처리 중 문제가 발생했습니다.<br />
                    다시 시도하시거나 다른 결제 수단을 이용해 주세요.
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => router.push('/')}
                        className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        홈으로 돌아가기
                    </button>
                    <button
                        onClick={() => router.back()}
                        className="w-full px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        이전 페이지로
                    </button>
                </div>
            </div>
        </div>
    )
}
