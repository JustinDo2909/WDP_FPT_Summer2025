import CosmeticCatchGame from "@/components/Event/BeautyDrop/cosmetic-catch-game";
import { Container } from "@/lib/by/Div";

export default function Page() {
  return (
    <Container className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-rose-400 flex items-center justify-center p-4">
      <CosmeticCatchGame />
    </Container>
  );
}
