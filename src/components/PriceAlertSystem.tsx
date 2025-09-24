import { useEffect } from 'react'
import { toast } from 'sonner'
import { TrendUp, TrendDown, Drop, Lightning, Car } from '@phosphor-icons/react'
import { useRealTimeFuelPrices } from '@/hooks/useRealTimeFuelPrices'

export default function PriceAlertSystem() {
    const { fuelPrices } = useRealTimeFuelPrices()

    const iconMap = {
        'gasolina-comum': Car,
        'gasolina-aditivada': Lightning,
        'etanol': Drop,
        'diesel-s10': Car
    }

    useEffect(() => {
        if (!fuelPrices) return

        fuelPrices.forEach((fuel) => {
            const priceDiff = fuel.price - fuel.previousPrice
            const percentageChange = fuel.previousPrice ? (priceDiff / fuel.previousPrice) * 100 : 0

            // Alert for significant price changes (>= 2%)
            if (Math.abs(percentageChange) >= 2) {
                const IconComponent = iconMap[fuel.id as keyof typeof iconMap] || Car
                const isIncrease = priceDiff > 0

                toast(
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${isIncrease ? 'bg-red-100' : 'bg-green-100'}`}>
                            <IconComponent 
                                size={20} 
                                className={isIncrease ? 'text-red-600' : 'text-green-600'} 
                                weight="bold" 
                            />
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold text-sm">{fuel.name}</div>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                <div className={`flex items-center space-x-1 ${isIncrease ? 'text-red-600' : 'text-green-600'}`}>
                                    {isIncrease ? <TrendUp size={12} /> : <TrendDown size={12} />}
                                    <span>
                                        {isIncrease ? '+' : ''}{percentageChange.toFixed(1)}%
                                    </span>
                                </div>
                                <span>•</span>
                                <span>R$ {fuel.price.toFixed(2)}/L</span>
                            </div>
                        </div>
                    </div>,
                    {
                        duration: 5000,
                        position: 'top-right',
                    }
                )
            }
        })
    }, [fuelPrices])

    // This component doesn't render anything visible
    return null
}