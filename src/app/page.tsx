import Image from "next/image";
import HeroText from "@/components/HeroText";
import ActionButtons from "@/components/ActionButtons";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-8 sm:p-16 w-full max-w-3xl mx-auto gap-8 sm:items-start mt-16">
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={100}
        height={20}
        priority
      />
      
      {/* Использование созданных компонентов */}
      <HeroText />
      <ActionButtons />
    </main>
  );
}