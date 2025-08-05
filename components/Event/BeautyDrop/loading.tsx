import { Area, Block, Card, RText, Yard } from "@/lib/by/Div";

export default function LoadingScreen() {
  return (
    <Yard className="w-full max-w-md mx-auto">
      <Area className="bg-white/95 backdrop-blur-sm border border-purple-100 shadow-lg">
        <Card className="p-8 text-center">
          <Block className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></Block>
          <RText className="text-gray-600">Loading game images...</RText>
        </Card>
      </Area>
    </Yard>
  );
}
