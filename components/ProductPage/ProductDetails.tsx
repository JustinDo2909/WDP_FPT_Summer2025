import { Core, Container, Area, Begin } from "@/lib/by/Div";
import { ProductPageData } from "@/types";

const tabs = [
  { label: "Description", key: "description" },
  { label: "Ingredients", key: "ingredients" },
  { label: "How to Use", key: "how-to-use" },
  { label: "Reviews", key: "reviews" },
];

export function ProductDetailsTabs({productData}: { productData: ProductPageData }) {
  return (
    <Core>
      <Container>
        <Area>
          <Begin>
            {tabs.map((tab) => (
              
                <button
                  key={tab.key}
                  className={`pb-2 border-b-2 transition-all duration-200
            //   activeTab === tab.key
            //     ? "border-pink-500 text-pink-600 font-semibold"
            //     : "border-transparent text-gray-500 hover:text-gray-700"}`}
                >
                  {tab.label}
                </button>
            ))}
          </Begin>
        </Area>
      </Container>
    </Core>
  );
}
