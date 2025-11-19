'use client'

import { useState } from 'react'
import AuthModal from './auth-modal'
import PaymentModal from './payment-modal'
import { useAuth } from '@/contexts/auth-context'
import { hasCompletedPayment } from '@/lib/payment'

export default function PricingSection() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
    const { user } = useAuth()

    const plans = [
        {
            name: "무료",
            price: "₩0",
            period: "영원히",
            description: "개인 사용자를 위한 기본 기능",
            features: [
                "월 100개 노트",
                "기본 템플릿",
                "이메일 지원",
                "5GB 저장공간"
            ],
            buttonText: "무료로 시작",
            popular: false
        },
        {
            name: "프로",
            price: "₩10,000",
            period: "일회성",
            description: "일회성 결제로 평생 이용",
            features: [
                "무제한 노트",
                "모든 템플릿",
                "우선 지원",
                "100GB 저장공간",
                "고급 검색",
                "데이터 내보내기"
            ],
            buttonText: "₩10,000 구매",
            popular: true
        },
        {
            name: "팀",
            price: "₩10,000",
            period: "일회성",
            description: "일회성 결제로 평생 이용",
            features: [
                "무제한 노트",
                "팀 공유 기능",
                "실시간 협업",
                "관리자 대시보드",
                "1TB 저장공간",
                "API 접근",
                "전화 지원"
            ],
            buttonText: "₩10,000 구매",
            popular: false
        }
    ]

    return (
        <>
            <section id="pricing" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            간단하고 투명한 가격
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            당신의 필요에 맞는 플랜을 선택하세요. 언제든지 업그레이드하거나 다운그레이드할 수 있습니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`bg-white p-8 rounded-lg shadow-lg ${plan.popular ? 'ring-2 ring-blue-600 relative' : ''
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                            가장 인기
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {plan.name}
                                    </h3>
                                    <div className="mb-2">
                                        <span className="text-4xl font-bold text-gray-900">
                                            {plan.price}
                                        </span>
                                        <span className="text-gray-600 ml-1">
                                            /{plan.period}
                                        </span>
                                    </div>
                                    <p className="text-gray-600">
                                        {plan.description}
                                    </p>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center">
                                            <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => {
                                        if (plan.name === "무료") {
                                            setIsAuthModalOpen(true)
                                        } else {
                                            if (!user) {
                                                setIsAuthModalOpen(true)
                                            } else {
                                                setIsPaymentModalOpen(true)
                                            }
                                        }
                                    }}
                                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${plan.popular
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                        }`}
                                >
                                    {plan.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-gray-600 mb-4">
                            일회성 결제로 평생 이용하세요
                        </p>
                        <a href="#contact" className="text-blue-600 hover:text-blue-800 font-semibold">
                            맞춤형 엔터프라이즈 플랜 문의하기 →
                        </a>
                    </div>
                </div>
            </section>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                mode="signup"
            />

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                onSuccess={() => {
                    setIsPaymentModalOpen(false)
                    // 결제 성공 후 처리 로직
                    window.location.reload()
                }}
            />
        </>
    )
}
