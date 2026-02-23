import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedView({ children, cardKey, direction, onDone }) {
  const variants = {
    enter: (dir) => ({
      y: dir === "up" ? 120 : -120,
      opacity: 0,
      scale: 1.04,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      y: dir === "up" ? -120 : 120,
      opacity: 0,
      scale: 0.94,
    }),
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={cardKey}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1], // premium feel
        }}
        onAnimationComplete={onDone}
        className="absolute inset-0 will-change-transform"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
