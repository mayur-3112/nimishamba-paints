import React from 'react';
import LivingRoomTransform from '../components/LivingRoomTransform';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
  openQuoteModal: (category?: string) => void;
  triggerColorMyWorld?: () => void;
}

export default function Hero({ setCurrentTab, openQuoteModal, triggerColorMyWorld }: HeroProps) {
  return (
    <LivingRoomTransform 
      openQuoteModal={openQuoteModal} 
      setCurrentTab={setCurrentTab} 
      triggerColorMyWorld={triggerColorMyWorld}
    />
  );
}
