
import { gameProducts } from "@/constants/intershift-game";
import { NPCProfile, GameProduct } from "@/types/intershift";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const DEFAULT_PRICE = 50;

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1) + (word.endsWith('r') ? 's' : '');
}

interface ChoosingProductsProps {
  selectedProductTypes: string[];
  selectedProducts: GameProduct[];
  selectProduct: (product: GameProduct) => void;
  removeProduct: (productId: number) => void;
  currentCustomer?: NPCProfile;
  setGameScene?: (scene: any) => void;
}

export default function ChoosingProducts({
  selectedProductTypes,
  selectedProducts,
  selectProduct,
  removeProduct,
  currentCustomer,
}: ChoosingProductsProps) {
  const [page, setPage] = useState(0);
  const currentType = selectedProductTypes[page] || selectedProductTypes[0];
  const products = gameProducts.filter((p) => p.type === currentType);
  const selectedIds = selectedProducts.map((p) => p.id);

  // Pagination for products (3x3 grid)
  const productsPerPage = 9;
  const [productPage, setProductPage] = useState(0);
  const paginatedProducts = products.slice(productPage * productsPerPage, (productPage + 1) * productsPerPage);
  const totalProductPages = Math.ceil(products.length / productsPerPage);

  // Customer concern
  const concern = currentCustomer?.case?.tooltip || "";

  // Total revenue
  const totalRevenue = selectedProducts.length * DEFAULT_PRICE;

  // Handlers
  const handleTypePage = (dir: number) => {
    setPage((prev) => {
      let next = prev + dir;
      if (next < 0) next = selectedProductTypes.length - 1;
      if (next >= selectedProductTypes.length) next = 0;
      setProductPage(0);
      return next;
    });
  };
  const handleProductPage = (dir: number) => {
    setProductPage((prev) => {
      let next = prev + dir;
      if (next < 0) next = totalProductPages - 1;
      if (next >= totalProductPages) next = 0;
      return next;
    });
  };

  return (
    <div className="flex flex-col  mt-20 w-full items-center justify-between">
      {/* Product Type Navigation */}
      <div className="flex items-center justify-between w-full gap-8 mb-4 px-80">
        <button
          className="game-button text-2xl px-3 py-1"
          onClick={() => handleTypePage(-1)}
          aria-label="Previous type"
        >
          <div className="">
            <span className="!p-1 !px-2"><ArrowLeft/></span>
          </div>
        </button>
        <h2 className="text-3xl font-bold text-white drop-shadow">
          {capitalize(currentType || "Product")}
        </h2>
        <button
          className="game-button text-2xl !px-0"
          onClick={() => handleTypePage(1)}
          aria-label="Next type"
        >
           <div className="!px-0">
            <span className="!p-1 !px-2"><ArrowRight/></span>
          </div>
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-3 grid-rows-2 gap-6 mb-6">
        {paginatedProducts.map((product) => {
          const isSelected = selectedIds.includes(product.id);
          return (
            <div
              key={product.id}
              className={`relative flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-white bg-white/80 shadow-lg cursor-pointer transition-all duration-150 ${isSelected ? "ring-4 ring-green-400" : "hover:ring-2 hover:ring-blue-300"}`}
              onClick={() =>
                isSelected ? removeProduct(product.id) : selectProduct(product)
              }
            >
              <span className="text-lg font-bold text-gray-800 text-center px-2">{product.name}</span>
              <span className="text-sm text-gray-600 mt-1">₫{DEFAULT_PRICE}</span>
              {/* Tooltip icon */}
              <div className="absolute top-2 right-2 group">
                <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-xs font-bold cursor-help">
                  ?
                </div>
                <div className="absolute z-20 left-8 top-0 w-48 p-2 bg-white text-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                  {product.tooltip}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Pagination */}
      {totalProductPages > 1 && (
        <div className="flex items-center gap-2 mb-4">
          <button className="game-button px-2 py-1" onClick={() => handleProductPage(-1)} aria-label="Prev products">◀️</button>
          <span className="text-white">Page {productPage + 1} / {totalProductPages}</span>
          <button className="game-button px-2 py-1" onClick={() => handleProductPage(1)} aria-label="Next products">▶️</button>
        </div>
      )}

      {/* Footer Info */}
      <div className="w-full mt-auto bg-black/60 rounded-xl p-4 flex flex-col items-center gap-2">
        <div className="text-white text-lg font-semibold">Customer Concern: <span className="font-normal">{concern}</span></div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-white font-semibold">Selected:</span>
          {selectedProducts.map((p) => (
            <span key={p.id} className="bg-white/80 text-gray-800 px-2 py-1 rounded-full text-sm border border-gray-300">{p.name}</span>
          ))}
        </div>
        <div className="text-white text-lg">Total Revenue: <span className="font-bold">₫{totalRevenue}</span></div>
      </div>
    </div>
  );
}

