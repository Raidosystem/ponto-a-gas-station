import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

    useEffect(() => {
        if (previousPrice !== undefined && previousPrice !== price) {
            setIsAnimating(true)
            setPriceChange(price > previousPrice ? 'up' : 'down')
            
            // Reset animation state
            setTimeout(() => {
                setIsAnimating(false)
                setPriceChange(null)
            }, 2000)
        } else {
            setDisplayPrice(price)
        }
    }, [price, previousPrice])

    // Format price into reais and centavos
    const formatPrice = (price: number) => {
        const reais = Math.floor(price)
        const centavos = Math.round((price - reais) * 100).toString().padStart(2, '0')
        return { reais, centavos }
    }

    const { reais, centavos } = formatPrice(displayPrice)

    return (
        <div className={`relative flex flex-col items-start ${className}`}>
            {/* Price display with smooth animations */}
            <div className={`flex items-baseline space-x-1 ${isAnimating ? 'price-pulse' : ''}`}>
                <span className="text-lg font-medium text-muted-foreground">R$</span>
                
                <div className="flex items-baseline">
                    {/* Reais part */}
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={reais}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                            className="text-4xl font-bold tabular-nums"
                        >
                            {reais}
                        </motion.span>
                    </AnimatePresence>
                    
                    <span className="text-lg font-medium">,</span>
                    
                    {/* Centavos part */}
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={centavos}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="text-2xl font-semibold tabular-nums"
                        >
                            {centavos}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>
            
            {/* Label */}
            <span className="text-sm text-muted-foreground font-medium mt-1">
                {label}
            </span>
            
            {/* Price change indicator */}
            <AnimatePresence>
                {priceChange && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-medium ${
                            priceChange === 'up' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                        }`}
                    >
                        {priceChange === 'up' ? '↑' : '↓'}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function LiveIndicator() {
    return (
        <div className="flex items-center space-x-2 text-sm text-green-600">
            <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ 
                    scale: [1, 1.2, 1]
                }}
                transition={{ 
                    repeat: Infinity,
                    duration: 2
                }}
            />
            <span>Atualização em tempo real</span>
        </div>
    )
}