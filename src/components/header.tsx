'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { usePaymentStatus } from '@/hooks/use-payment-status'
import AuthModal from './auth-modal'

export default function Header() {
    const { user, signOut } = useAuth()
    const { hasPayment, isLoading } = usePaymentStatus()
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')

    const handleAuthClick = (mode: 'login' | 'signup') => {
        setAuthMode(mode)
        setIsAuthModalOpen(true)
    }

    const handleSignOut = async () => {
        await signOut()
    }

    return (
        <>
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900">
                                NoteTaker
                            </h1>
                        </div>

                        <nav className="hidden md:flex space-x-8">
                            <a href="#features" className="text-gray-600 hover:text-gray-900">
                                기능
                            </a>
                            <a href="#pricing" className="text-gray-600 hover:text-gray-900">
                                가격
                            </a>
                            <a href="#contact" className="text-gray-600 hover:text-gray-900">
                                문의
                            </a>
                            {user && !isLoading && hasPayment && (
                                <a href="/notes" className="text-blue-600 hover:text-blue-800 font-medium">
                                    노트 앱
                                </a>
                            )}
                        </nav>

                        <div className="flex items-center space-x-4">
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    {!isLoading && hasPayment && (
                                        <div className="flex items-center space-x-1">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-xs text-green-600 font-medium">
                                                프리미엄
                                            </span>
                                        </div>
                                    )}
                                    <span className="text-sm text-gray-600">
                                        안녕하세요, {user.email}님!
                                    </span>
                                    <button
                                        onClick={handleSignOut}
                                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                                    >
                                        로그아웃
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleAuthClick('login')}
                                        className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                                    >
                                        로그인
                                    </button>
                                    <button
                                        onClick={() => handleAuthClick('signup')}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                    >
                                        시작하기
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                mode={authMode}
            />
        </>
    )
}
