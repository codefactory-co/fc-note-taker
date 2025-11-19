'use client'

import { useState } from 'react'
import AuthModal from './auth-modal'

export default function HeroSection() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

    return (
        <>
            <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            생각을 정리하고
                            <br />
                            <span className="text-blue-600">아이디어를 실현하세요</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            NoteTaker는 직관적이고 강력한 노트 테이킹 도구로,
                            당신의 모든 아이디어를 체계적으로 관리하고 공유할 수 있게 도와줍니다.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => setIsAuthModalOpen(true)}
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                무료로 시작하기
                            </button>
                            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
                                데모 보기
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                mode="signup"
            />
        </>
    )
}
