import { Block, RText, Section } from "@/lib/by/Div";
import { CardGame } from "./CardGame";

function groupEvents(events: IEvent[]) {
  const now = new Date();
  const running: IEvent[] = [];
  const upcoming: IEvent[] = [];
  const previous: IEvent[] = [];

  events.forEach((event) => {
    const start = new Date(event.start_time);
    const end = new Date(event.end_time);

    if (event.is_active &&  now <= end) {
      running.push(event);
    } else if (start > now) {
      upcoming.push(event);
    } else if (end < now) {
      previous.push(event);
    }
  });

  return { running, upcoming, previous };
}

export const MenuGame = ({ listGame }: { listGame: IEvent[] }) => {
  const { running, upcoming, previous } = groupEvents(listGame);

  return (
    <Section className="py-16 bg-gradient-to-br from-[#2A0A4A] via-[#3e1b6b] to-[#2A0A4A] rounded-xl mx-auto w-full p-8 max-w-6xl shadow-[0_0_50px_rgba(151,71,255,0.4)]">
      <RText className="text-4xl font-bold text-center text-white mb-12 drop-shadow-md">
        Our Exciting Games
      </RText>

      <Block className="space-y-16">
        {/* Running Events */}
        <Block>
          <RText className="text-2xl font-semibold text-white mb-6">
            Running Events
          </RText>
          {running.length > 0 ? (
            <Block className="grid grid-cols-1 gap-8">
              {running.map((game) => (
                <CardGame key={game.id} game={game} />
              ))}
            </Block>
          ) : (
            <Block className="flex items-center justify-center text-center text-gray-300 py-10 border border-dashed border-gray-500 rounded-lg bg-white/5">
              <RText className="text-lg italic">No active events at the moment. Check back soon!</RText>
            </Block>
          )}
        </Block>

        {/* Upcoming Events */}
        {upcoming.length > 0 && (
          <Block>
            <RText className="text-2xl font-semibold text-white mb-6">
              Upcoming Events
            </RText>
            <Block className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcoming.map((game) => (
                <CardGame key={game.id} game={game} />
              ))}
            </Block>
          </Block>
        )}

        {/* Previous Events */}
        {previous.length > 0 && (
          <Block>
            <RText className="text-2xl font-semibold text-white mb-6">
              Previous Events
            </RText>
            <Block className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {previous.map((game) => (
                <CardGame key={game.id} game={game} />
              ))}
            </Block>
          </Block>
        )}
      </Block>

      {/* Fallback: No events at all */}
      {running.length === 0 &&
        upcoming.length === 0 &&
        previous.length === 0 && (
          <RText className="text-center text-lg text-gray-300 mt-10">
            No events found.
          </RText>
        )}
    </Section>
  );
};
