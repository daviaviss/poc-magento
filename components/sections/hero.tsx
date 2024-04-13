import Image from 'next/image';
import React from 'react';
import { buttonVariants } from '../ui/button';
import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
  buttonUrl: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, buttonText, imageUrl, buttonUrl }) => {
  return (
    <div className="relative h-[700px] w-full overflow-hidden rounded-lg pl-8 pr-8">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-xl text-gray-800">Bem-vindo ao nosso site!</p>
      </div>
      <div className="relative h-full w-full overflow-hidden rounded-lg p-4">
        <Image
          src={imageUrl}
          layout="fill"
          objectFit="cover"
          alt="Background"
          className="z-0"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0"></div>
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10 pl-24">
          <p className="text-xl font-semibold text-white mb-2">{subtitle}</p>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-8xl mb-8">{title}</h1>
          <Link href={buttonUrl} className={buttonVariants({ variant: "hero", size: "hero" })}>{buttonText}</Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
