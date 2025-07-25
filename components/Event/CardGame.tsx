import { Box, Column, RText } from "@/lib/by/Div";
import Image from "next/image";
import Link from "next/link";

export const CardGame = ({ game }: { game: IEvent }) => {
  const fallbackImage = "/placeholder.svg";

  return (
    <Link
      href={
        game.is_active
          ? game.type === "DROP"
            ? "/event/BeautyDrop"
            : game.type === "QUIZ"
              ? "/event/Quiz"
              : "/event/coming-soon"
          : "/event/coming-soon"
      }
      className="shadow-xl h-56 w-72 flex flex-col justify-between items-center rounded-lg bg-[url('https://90sj56vdp0.ufs.sh/f/rSQkHC8t0FOUCNH4GXgNEZRdGL4mshnW0g53kYyDOSeQlIc2')] bg-no-repeat bg-cover
      hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer group relative overflow-hidden"
    >
      <Box className="relative h-3/5 w-full overflow-hidden mb-4">
        <Image
          src={game.image_url || fallbackImage}
          alt={game.title || "Game Image"}
          fill
          className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
        />
        <Box className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent rounded-b-xl opacity-70 group-hover:opacity-80 transition-opacity duration-300"></Box>
      </Box>
      <Box className="absolute bottom-3 left-3 right-3 text-white z-10 px-2">
        <Column className="flex flex-col justify-end items-start gap-1">
          <RText className="text-xl font-bold text-white leading-tight">
            {game.title}
          </RText>
          <RText className="text-sm font-light text-zinc-200 line-clamp-2">
            {game.description}
          </RText>
        </Column>
      </Box>
    </Link>
  );
};
