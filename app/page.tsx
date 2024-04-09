import type { Metadata } from "next";

import HeaderMock from "@/__mocks__/header.json";
import FooterMock from "@/__mocks__/footer.json";
import HeroMock from "@/__mocks__/hero.json";

import { Header } from "@/components/sections/header";
import logo from "@/public/icons/logo_header.svg";
import Footer from "@/components/sections/footer";
import Hero from "@/components/sections/hero";
import ProductList from "@/components/common/ProductList";

export const metadata: Metadata = {
  title: "Template - InfityWorks",
  description:
    "This is a front end app that serves as a template for creating projects to InfityWorks. Made by Miguel <3.",
  keywords: ["nextjs", "typescript", "tailwindcss", "infityworks"],
  authors: [
    { name: "InfityWorks", url: "https://infityworks.com" },
    { name: "Miguel Marquiori", url: "https://migeuu.github.io/" },
  ],
};

export default function Home() {

  const logoExample = {
    src: logo,
    alt: "logo",
    width: 200,
    height: 150,
  };

  return (
    <main className="min-h-screen">
      <Header logo={logoExample} links={HeaderMock.links as any} />
      <Hero {...HeroMock} />
      <ProductList />
      <Footer logo={logoExample} data={FooterMock} />
    </main>
  );
}
