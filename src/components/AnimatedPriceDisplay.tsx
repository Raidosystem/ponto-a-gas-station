import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
interface AnimatedPriceDisplayProps {

    className?: string

    price,
    label,
    className?: string
}

export default function AnimatedPriceDisplay({ 
    price,
    previousPrice,
    label,
    className = "" 
            // Reset animation 
                setIsAnimating(false)
            }, 2000)
            setDisplayPrice(price)

    // Format price into rea
        const reais =
        return { reais, centavos }


        <div
            <div className={`flex items-baseline space-x-1 $
                
                    {/* Reais part */}
                   

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
export function LiveIndicator() {
        <div className="flex items-cent
                animate={{ 
                    scale: [1, 1.2, 1]
                transition={{ 
                    repeat: Infinity,
                }}
            />
            <span>Atualização em te
    )













































        </div>
    )
}





















