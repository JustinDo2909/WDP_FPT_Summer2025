import { useUser } from "@/hooks/useUser";
import { Box, Column, RText } from "@/lib/by/Div";
import { find, isEqual } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const CardGame = ({
  game,
  isList = false,
}: {
  game: IEvent;
  isList?: boolean;
}) => {
  const { isLogged } = useUser();
  const router = useRouter();
  const fallbackImage =
    "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWF3EMjVHyeOBfC0Di9EszHlqMXr4T7G1ovPbY";
  enum EGame {
    DROP = "DROP",
    QUIZ = "QUIZ",
    PUZZLE = "PUZZLE",
    REFLEX = "REFLEX",
    ARCADE = "ARCADE"
  }

  const ListGameType = [
    { type: EGame.DROP, link: "/event/BeautyDrop" },
    { type: EGame.QUIZ, link: "/event/Quiz" },
    { type: EGame.PUZZLE, link: "/event/FlipCard" },
    { type: EGame.REFLEX, link: "/event/Racing" },
    { type: EGame.ARCADE, link: `/event/internshift?event_id=${game.id}`}
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
      href={
        game.is_active
          ? `/event/GameMenu?event_id=${game.id}`
          : renderGame(game)
      }
      className="flex w-full items-start gap-6 p-4 rounded-xl bg-[#1e1033] border border-white/10 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
    >
      {/* Image */}
      <Box
        className={`relative ${isList ? "min-w-[240%]" : "min-w-[140px]"} h-32 rounded-lg overflow-hidden shadow-md`}
      >
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
          {formatDate(String(game.start_time))} —{" "}
          {formatDate(String(game.end_time))}
        </RText>
        <RText className="text-sm text-zinc-300 line-clamp-3">
          {game.description}
        </RText>
      </Column>
    </Link>
  );
};
