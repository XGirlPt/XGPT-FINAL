"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import SubscriptionPlan from '@/components/subscriptionPlan';

interface SubscriptionPlanModalProps {
  showSubscriptionPlan: boolean;
  handleCloseSubscriptionPlan: () => void;
}

const SubscriptionPlanModal: React.FC<SubscriptionPlanModalProps> = ({
  showSubscriptionPlan,
  handleCloseSubscriptionPlan,
}) => {
  if (!showSubscriptionPlan) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-[#1a0a10] rounded-2xl p-6 max-w-4xl w-full mx-4 relative"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={handleCloseSubscriptionPlan}
          className="absolute top-4 right-4 rounded-full bg-pink-600 text-white hover:bg-pink-700 w-10 h-10 flex items-center justify-center"
        >
          <X size={20} />
        </Button>
        <SubscriptionPlan userUID={''} onPlanoSelect={handleCloseSubscriptionPlan} />
      </motion.div>
    </motion.div>
  );
};

export default SubscriptionPlanModal;