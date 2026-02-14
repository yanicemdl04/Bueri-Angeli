import { ReactNode } from 'react'
import { motion } from 'framer-motion'

const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
