'use client'

import { useState, useEffect, useRef } from 'react'
import { loadTossPayments } from '@tosspayments/tosspayments-sdk'
import { useAuth } from '@/contexts/auth-context'
import { createPaymentRequest, updatePaymentStatus } from '@/lib/payment'
import { PaymentRequest } from '@/types/payment'

interface PaymentModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export default function PaymentModal({ isOpen, onClose, onSuccess }: PaymentModalProps) {
    const { user } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [widgets, setWidgets] = useState<any>(null)
    const [isWidgetReady, setIsWidgetReady] = useState(false)
    const paymentMethodRef = useRef<HTMLDivElement>(null)
    const agreementRef = useRef<HTMLDivElement>(null)

    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!

    useEffect(() => {
        if (isOpen && clientKey && user) {
            const initializeWidgets = async () => {
                try {
                    const tossPayments = await loadTossPayments(clientKey)
                    // 결제 위젯 인스턴스 생성
                    const widgetsInstance = tossPayments.widgets({
                        customerKey: user.id // 사용자 ID를 customerKey로 사용
                    })

                    setWidgets(widgetsInstance)

                    // 결제 금액 설정
                    await widgetsInstance.setAmount({
                        currency: 'KRW',
                        value: 10000,
                    })

                    // 결제 UI와 약관 UI 렌더링
                    await Promise.all([
                        widgetsInstance.renderPaymentMethods({
                            selector: '#payment-method-widget',
                            variantKey: 'DEFAULT',
                        }),
                        widgetsInstance.renderAgreement({
                            selector: '#agreement-widget',
                            variantKey: 'AGREEMENT',
                        }),
                    ])

                    setIsWidgetReady(true)
                } catch (err) {
                    console.error('TossPayments 위젯 초기화 실패:', err)
                    setError('결제 시스템 초기화에 실패했습니다.')
                }
            }
            initializeWidgets()
        }
    }, [isOpen, clientKey, user])

    const handlePayment = async () => {
        if (!user || !widgets || !isWidgetReady) return

        setIsLoading(true)
        setError(null)

        try {
            // 1. 결제 요청 생성
            const paymentRequest = await createPaymentRequest(user.id, 10000) // 1만원

            // 2. TossPayments 결제 위젯으로 결제 요청
            await widgets.requestPayment({
                orderId: paymentRequest.order_id,
                orderName: '노트 테이킹 앱 이용권',
                customerEmail: user.email,
                customerName: user.user_metadata?.full_name || '사용자',
                successUrl: `${window.location.origin}/payment/success`,
                failUrl: `${window.location.origin}/payment/fail`,
            })
        } catch (err: any) {
            setError(err.message || '결제 처리 중 오류가 발생했습니다.')
            setIsLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        노트 테이킹 앱 이용권 구매
                    </h2>
                    <div className="text-3xl font-bold text-blue-600 mb-2">₩10,000</div>
                    <p className="text-gray-600">
                        일회성 결제로 노트 테이킹 앱을 평생 이용하실 수 있습니다.
                    </p>
                </div>

                <div className="space-y-3 mb-6 text-left">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">무제한 노트 생성</span>
                    </div>
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">모든 템플릿 사용</span>
                    </div>
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">고급 검색 기능</span>
                    </div>
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">데이터 내보내기</span>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {/* 결제 수단 선택 UI */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">결제 수단 선택</h3>
                    <div id="payment-method-widget" className="min-h-[200px]"></div>
                </div>

                {/* 약관 동의 UI */}
                <div className="mb-6">
                    <div id="agreement-widget" className="min-h-[100px]"></div>
                </div>

                <div className="flex space-x-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        disabled={isLoading}
                    >
                        취소
                    </button>
                    <button
                        onClick={handlePayment}
                        disabled={isLoading || !isWidgetReady}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? '처리 중...' : '₩10,000 결제하기'}
                    </button>
                </div>
            </div>
        </div>
    )
}
