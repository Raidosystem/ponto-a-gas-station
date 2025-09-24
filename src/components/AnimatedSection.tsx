import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  id?: string
  animationType?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'slideDown'
  delay?: number
  duration?: number
}

const animationVariants = {
  fadeUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
  },
  fadeLeft: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 }
  },
  fadeRight: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 }
  },
  slideDown: {
    initial: { opacity: 0, y: -60 },
    animate: { opacity: 1, y: 0 }
  }
}

export default function AnimatedSection({
  children,
  className = '',
  id,
  animationType = 'fadeUp',
  delay = 0,
  duration = 0.8
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '-50px',
  })

  const variants = animationVariants[animationType]

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={variants.initial}
      animate={isVisible ? variants.animate : variants.initial}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.section>
  )
}