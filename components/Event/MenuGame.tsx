import { Block, RText, Section } from "@/lib/by/Div";
import { IGame } from "@/types";
import { map } from "lodash";
import { CardGame } from "./CardGame";

export const MenuGame = ({ listGame }: { listGame: IGame[] }) => {
  return (
    <Section
      className="py-12 bg-[#2A0A4A] rounded-lg mx-auto max-w-6xl
                 shadow-[0_0_50px_rgba(151,71,255,0.5)]"
    >
      <RText className="text-4xl font-bold text-center text-[#eee] mb-10 drop-shadow-md">
        Our Exciting Games
      </RText>

      <Block className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-12 px-4">
        {map(listGame, (game, index) => (
          <CardGame key={index} game={game} />
        ))}
      </Block>
    </Section>
  );
};
