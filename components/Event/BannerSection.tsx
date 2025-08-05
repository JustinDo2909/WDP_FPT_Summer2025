import { Block, Box, RText, Section } from "@/lib/by/Div";
import { ArrowLeft, Gamepad } from "lucide-react";
import Link from "next/link";

export const BannerEvent = () => {
  return (
    <Section
      className="relative flex flex-col justify-center items-center gap-12 pt-16 pb-8 shadow-lg  mx-auto w-full
    bg-[url('https://90sj56vdp0.ufs.sh/f/rSQkHC8t0FOUCNH4GXgNEZRdGL4mshnW0g53kYyDOSeQlIc2')] bg-no-repeat bg-cover"
    >
      <Link
        href={"/"}
        className="absolute top-6 left-6 flex justify-center items-center group"
      >
        <ArrowLeft
          color="#fff"
          className="group-hover:translate-x-[-4px] transition-transform"
        />
        <RText className="text-xl font-semibold text-[#aaa] group-hover:text-[#fff] transition-colors">
          Home
        </RText>
      </Link>
      <Block className="flex flex-col md:flex-row max-w-5xl justify-center items-end ">
        <Box className="relative flex justify-center items-center p-4 md:p-0">
          <RText className="text-5xl md:text-6xl text-center text-[#9747FF] font-extrabold z-10 drop-shadow-lg">
            CosmePlay <br /> Event
          </RText>
          <Gamepad
            size={100}
            color="#e44"
            className="absolute -right-1/4 -top-1/4 -rotate-45 z-0 animate-pulse-slow"
          />
        </Box>
        <RText className="text-2xl md:text-3xl font-bold text-[#fff] text-center">
          Play, Win, Glow!
        </RText>
      </Block>
      <Block className="flex flex-col max-w-4xl justify-center items-center text-center px-4 md:px-0">
        <RText className="text-lg font-semibold text-[#eee] mb-4">
          Choose your game, collect points, and redeem amazing beauty vouchers &
          gifts!
        </RText>
        <RText className="text-base text-[#aaa]">
          Simply browse our exciting selection of mini-games. Each game offers a
          unique way to earn points – the more you play, the more rewards you
          unlock. Keep an eye on your point balance and visit our rewards store
          to redeem your well-deserved treats!
        </RText>
      </Block>
    </Section>
  );
};
