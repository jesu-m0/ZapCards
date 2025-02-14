import React from 'react';
import Image from 'next/image';
import ZapCardsLogo from './assets/logo/ZapCards-logo.png';

const Header: React.FC = () => {
      return (
            <header className="bg-babyPowder p-2">
                  <div className="container mx-auto flex justify-between items-center">
                        <Image src={ZapCardsLogo} alt="ZapCards Logo" className="mr-2 w-44" />
                        <h1 className="ml-8 text-2xl font-bold">Flashcard Game</h1>
                  </div>
            </header>
      );
};

export default Header;
