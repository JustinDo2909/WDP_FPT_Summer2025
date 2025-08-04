import { mproduct } from "@/constants";
import { Card, Area, Begin } from "@/lib/by/Div";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/pattern/share/Tabs";
import { map } from "lodash";
import ReviewSection from "./ReviewSection";
import { fetchPost } from "@/app/(user)/how-to-use/seg";
import HowToUsePostCard from "../HowToUsePage/HowToUsePostCard";
import Link from "next/link";

export async function ProductDetailsTabs({
  productData,
}: {
  productData: IProduct;
}) {
  const res = await fetchPost(productData.productCategory.title);
  return (
    <Card className="flex flex-col gap-2 shadow-md bg-white rounded-lg p-4 min-h-[400px] flex-1">
      <Tabs defaultValue="description">
        <Area>
          <Begin>
            <TabsList>
              {map(mproduct.tabs, (tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Begin>
        </Area>

        <Area className="pt-2 text-sm text-gray-700">
          <TabsContent value="description">
            <p>{productData.description}</p>
          </TabsContent>
          <TabsContent value="ingredients">
            <p>{productData.ingredients ?? ""}</p>
          </TabsContent>
          <TabsContent value="how-to-use">
            <Link href={`/how-to-use/${res.post.title.split(" ")[0]}`}>
              <HowToUsePostCard post={res.post} />
            </Link>
          </TabsContent>
          <TabsContent value="reviews">
            <ReviewSection productId={productData.id} />
          </TabsContent>
        </Area>
      </Tabs>
    </Card>
  );
}
