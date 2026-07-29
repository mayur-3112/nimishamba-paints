import React from 'react';
import LivingRoomTransform from '../components/LivingRoomTransform';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
  openQuoteModal: (category?: string) => void;
}

export default function Hero({ setCurrentTab, openQuoteModal }: HeroProps) {
  return (
    <LivingRoomTransform openQuoteModal={openQuoteModal} setCurrentTab={setCurrentTab} />
  );
}
