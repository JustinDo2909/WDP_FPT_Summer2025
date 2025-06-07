import { Group, Wrap } from "@/lib/by/Div";

interface ShapeCardProps {
  shape: "triangle" | "diamond" | "circle" | "square";
  backgroundColor: string; // tailwind color class e.g. 'bg-red-500'
  option: string;
}

export default function ShapeCard({
  shape,
  backgroundColor,
  option,
}: ShapeCardProps) {
  return (
    <Group
      className={`w-full h-full min-h-[100px] min-w-[300px] ${backgroundColor} grid grid-cols-2 items-center p-4  rounded-md`}
    >
      <Wrap className={getShapeClass(shape)} />
      <Wrap className="text-2xl ">{option}</Wrap>
    </Group>
  );
}

function getShapeClass(shape: string): string {
  switch (shape) {
    case "triangle":
      return "w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-white";
    case "diamond":
      return "w-8 h-8 bg-white rotate-45";
    case "circle":
      return "w-10 h-10 bg-white rounded-full";
    case "square":
      return "w-10 h-10 bg-white";
    default:
      return "";
  }
}
