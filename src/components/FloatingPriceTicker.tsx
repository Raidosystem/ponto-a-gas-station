import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, TrendUp, TrendDown } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRealTimeFuelPrices } from '@/hooks/useRealTimeFuelPrices'

export default function FloatingPriceTicker() {
    const { fuelPrices } = useRealTimeFuelPrices()
    const [isVisible, setIsVisible] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    
    // Cycle through fuel prices every 4 seconds
    useEffect(() => {
        if (!fuelPrices || fuelPrices.length === 0) return
        
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % fuelPrices.length)
        }, 4000)
        
        return () => clearInterval(interval)
    }, [fuelPrices])

    if (!isVisible || !fuelPrices || fuelPrices.length === 0) return null

    const currentFuel = fuelPrices[currentIndex]
    if (!currentFuel) return null

    const priceChange = currentFuel.price !== currentFuel.previousPrice
    const priceUp = currentFuel.price > currentFuel.previousPrice

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-4 right-4 z-50"
                >
                    <Card className="p-4 bg-card/95 backdrop-blur-md border-2 min-w-[280px] shadow-2xl">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                                Preço Atual
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsVisible(false)}
                                className="h-6 w-6 p-0 hover:bg-destructive/20"
                            >
                                <X size={14} />
                            </Button>
                        </div>
                        
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentFuel.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-2"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-sm">{currentFuel.name}</h4>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-2xl font-bold text-primary">
                                                R$ {currentFuel.price.toFixed(2)}
                                            </span>
                                            {priceChange && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className={`flex items-center ${priceUp ? 'text-red-500' : 'text-green-500'}`}
                                                >
                                                    {priceUp ? (
                                                        <TrendUp size={16} weight="bold" />
                                                    ) : (
                                                        <TrendDown size={16} weight="bold" />
                                                    )}
                                                </motion.div>
                                            )}
                                        </div>
                                        <span className="text-xs text-muted-foreground">por litro</span>
                                    </div>
                                </div>
                                
                                {/* Progress indicator */}
                                <div className="flex space-x-1 mt-3">
                                    {fuelPrices.map((_, index) => (
                                        <motion.div
                                            key={index}
                                            className={`h-1 rounded-full ${
                                                index === currentIndex ? 'bg-primary' : 'bg-border'
                                            }`}
                                            style={{ flex: 1 }}
                                            animate={{
                                                backgroundColor: index === currentIndex ? 'var(--primary)' : 'var(--border)'
                                            }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    )
}