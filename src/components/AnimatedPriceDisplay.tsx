import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendUp, TrendDown, Clock } from '@phosphor-icons/react'

interface AnimatedPriceDisplayProps {
    price: number
    previousPrice?: number
    label: string
    className?: string
}

export default function AnimatedPriceDisplay({ 
    price, 
    previousPrice,
    label, 
    className = "" 
}: AnimatedPriceDisplayProps) {
    const [displayPrice, setDisplayPrice] = useState(price)
    const [isAnimating, setIsAnimating] = useState(false)
    const [priceChange, setPriceChange] = useState<'up' | 'down' | null>(null)

    // Animate price changes
    useEffect(() => {
        if (previousPrice && previousPrice !== price) {
            setIsAnimating(true)
            setPriceChange(price > previousPrice ? 'up' : 'down')
            
            // Animate the number change with a slight delay
            setTimeout(() => {
                setDisplayPrice(price)
            }, 200)
            
            // Clear animation state after animation completes
            setTimeout(() => {
                setIsAnimating(false)
                setPriceChange(null)
            }, 2000)
        } else {
            setDisplayPrice(price)
        }
    }, [price, previousPrice])

    // Split price into reais and centavos for individual animations
    const priceString = displayPrice.toFixed(2)
    const [reais, centavos] = priceString.split('.')

    return (
        <div className={`relative ${className}`}>
            {/* Main price display */}
            <div className="flex items-baseline space-x-1">
                <span className="text-sm font-medium text-muted-foreground">R$</span>
                
                {/* Reais part */}
                <div className="flex items-baseline">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={reais}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-4xl font-bold tabular-nums"
                        >
                            {reais}
                        </motion.span>
                    </AnimatePresence>
                    
                    {/* Decimal separator */}
                    <span className="text-2xl font-bold text-muted-foreground">,</span>
                    
                    {/* Centavos part */}
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={centavos}
                            initial={{ y: -15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 15, opacity: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="text-2xl font-bold tabular-nums"
                        >
                            {centavos}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>

            {/* Price change indicator */}
            <AnimatePresence>
                {priceChange && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className={`absolute -right-8 top-0 flex items-center space-x-1 ${
                            priceChange === 'up' ? 'text-red-600' : 'text-green-600'
                        }`}
                    >
                        {priceChange === 'up' ? (
                            <TrendUp size={16} weight="bold" />
                        ) : (
                            <TrendDown size={16} weight="bold" />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Label */}
            <div className="text-sm text-muted-foreground mt-1">
                {label}
            </div>
        </div>
    )
}

// Pulse animation component for "live" indicator
export function LiveIndicator() {
    return (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <motion.div
                animate={{ 
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1]
                }}
                transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="w-2 h-2 bg-green-500 rounded-full"
            />
            <Clock size={16} className="mr-1" />
            <span>Atualização em tempo real</span>
        </div>
    )
}