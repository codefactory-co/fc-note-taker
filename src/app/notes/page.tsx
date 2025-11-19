'use client'

import { useAuth } from '@/contexts/auth-context'
import { usePaymentStatus } from '@/hooks/use-payment-status'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NotesPage() {
    const { user, loading } = useAuth()
    const { hasPayment, isLoading } = usePaymentStatus()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/')
        }
    }, [user, loading, router])

    if (loading || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">로딩 중...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    if (!hasPayment) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md mx-auto text-center">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="text-6xl mb-4">🔒</div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            프리미엄 기능
                        </h1>
                        <p className="text-gray-600 mb-6">
                            노트 테이킹 앱을 이용하려면<br />
                            먼저 이용권을 구매해주세요.
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={() => router.push('/#pricing')}
                                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                ₩10,000 이용권 구매하기
                            </button>
                            <button
                                onClick={() => router.push('/')}
                                className="w-full px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                홈으로 돌아가기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        노트 테이킹 앱
                    </h1>
                    <p className="text-gray-600">
                        프리미엄 이용자님, 환영합니다! 🎉
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* 노트 카드 예시 */}
                    {[1, 2, 3, 4, 5, 6].map((note) => (
                        <div key={note} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                노트 {note}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                이것은 샘플 노트입니다. 실제 노트 앱에서는 여기에 노트 내용이 표시됩니다.
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    {new Date().toLocaleDateString()}
                                </span>
                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    편집
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        새 노트 만들기
                    </button>
                </div>
            </div>
        </div>
    )
}
