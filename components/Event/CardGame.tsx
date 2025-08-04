import { useUser } from "@/hooks/useUser";
import { Box, Column, RText } from "@/lib/by/Div";
import { find, isEqual } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const CardGame = ({ game, isList = false }: { game: IEvent, isList?: boolean }) => {
  const {  isLogged  } = useUser();;
  const router = useRouter();
;
  const fallbackImage =
    "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWF3EMjVHyeOBfC0Di9EszHlqMXr4T7G1ovPbY";
  enum EGame {
    DROP = "DROP",
    QUIZ = "QUIZ",
    PUZZLE = "PUZZLE",
    REFLEX = "REFLEX",
  }

  const ListGameType = [
    { type: EGame.DROP, link: "/event/BeautyDrop" },
    { type: EGame.QUIZ, link: "/event/Quiz" },
    { type: EGame.PUZZLE, link: "/event/FlipCard" },
    { type: EGame.REFLEX, link: "/event/Racing" },
  ];
  const renderGame = (game: IEvent) => {
    console.log("game", game.type);
    let found = "";
    Object.keys(EGame).forEach((key) => {
      if (game.type === EGame[key as keyof typeof EGame]) {
        found =
          find(ListGameType, (item) =>
            isEqual(item.type, EGame[key as keyof typeof EGame])
          )?.link || "/event/coming-soon";
      }
    });
    return found || "/event/coming-soon";
  };
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <Link
      onClick={(e) => {
        if (!isLogged) {
          e.preventDefault();
          router.push("/login");
        }
      }}
      href={renderGame(game)}
      className="shadow-xl h-56 w-72 flex flex-col justify-between items-center rounded-lg bg-[url('https://90sj56vdp0.ufs.sh/f/rSQkHC8t0FOUCNH4GXgNEZRdGL4mshnW0g53kYyDOSeQlIc2')] bg-no-repeat bg-cover
      hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer group relative overflow-hidden"
    >
      {/* Image */}
      <Box className={`relative ${ isList ?  "min-w-[240%]" :"min-w-[140px]"} h-32 rounded-lg overflow-hidden shadow-md`}>
        <Image
          src={game.image_url || fallbackImage}
          alt={game.title || "Game Image"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Box>

      {/* Text Info */}
      <Column className="flex-1 gap-1">
        <RText className="text-lg font-bold text-white">{game.title}</RText>
        <RText className="text-sm text-purple-200">
          {formatDate(String(game.start_time))} — {formatDate(String(game.end_time))}
        </RText>
        <RText className="text-sm text-zinc-300 line-clamp-3">
          {game.description}
        </RText>
      </Column>
    </Link>
  );
};
