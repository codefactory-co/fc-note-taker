'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { hasCompletedPayment } from '@/lib/payment'

export function usePaymentStatus() {
    const { user } = useAuth()
    const [hasPayment, setHasPayment] = useState<boolean | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkPaymentStatus = async () => {
            if (!user) {
                setHasPayment(false)
                setIsLoading(false)
                return
            }

            try {
                const hasCompleted = await hasCompletedPayment(user.id)
                setHasPayment(hasCompleted)
            } catch (error) {
                console.error('결제 상태 확인 실패:', error)
                setHasPayment(false)
            } finally {
                setIsLoading(false)
            }
        }

        checkPaymentStatus()
    }, [user])

    return { hasPayment, isLoading }
}
