import { gameProducts } from "@/constants/intershift-game";
import { NPCProfile, GameProduct } from "@/types/intershift";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const DEFAULT_PRICE = 50;

function capitalize(word: string) {
  return (
    word.charAt(0).toUpperCase() +
    word.slice(1) +
    (word.endsWith("r") ? "s" : "")
  );
}

interface ChoosingProductsProps {
  selectedProductTypes: string[];
  selectedProducts: GameProduct[];
  selectProduct: (product: GameProduct) => void;
  removeProduct: (productId: number) => void;
  currentCustomer?: NPCProfile;
  setGameScene?: (scene: any) => void;
  submitProducts?: () => void;
}

export default function ChoosingProducts({
  selectedProductTypes,
  selectedProducts,
  selectProduct,
  removeProduct,
  currentCustomer,
  submitProducts,
}: ChoosingProductsProps) {
  const [page, setPage] = useState(0);
  const currentType = selectedProductTypes[page] || selectedProductTypes[0];
  const products = gameProducts.filter((p) => p.type === currentType);

  // Pagination for products (3x3 grid)
  const productsPerPage = 9;
  const [productPage, setProductPage] = useState(0);
  const paginatedProducts = products.slice(
    productPage * productsPerPage,
    (productPage + 1) * productsPerPage
  );
  const totalProductPages = Math.ceil(products.length / productsPerPage);

  // Customer concern
  const concern = currentCustomer?.case?.tooltip || "";

  // Total revenue
  const totalRevenue = selectedProducts.length * DEFAULT_PRICE;

  // Only allow one product per type
  const selectedForCurrentType = selectedProducts.find(
    (p) => p.type === currentType
  );

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

  // Product selection logic: only one per type
  const handleProductClick = (product: GameProduct) => {
    if (selectedForCurrentType && selectedForCurrentType.id === product.id) {
      removeProduct(product.id);
    } else if (!selectedForCurrentType) {
      selectProduct(product);
    } else {
      // Replace the selected product for this type
      removeProduct(selectedForCurrentType.id);
      selectProduct(product);
    }
  };

  return (
    <div className="flex flex-col mt-20 w-full items-center justify-between">
      {/* Product Type Navigation */}
      <div className="flex items-center justify-between w-full gap-8 mb-4 px-60">
        <button
          className="game-button text-2xl px-3 py-1"
          onClick={() => handleTypePage(-1)}
          aria-label="Previous type"
        >
          <div>
            <span className="!p-1 !px-2">
              <ArrowLeft />
            </span>
          </div>
        </button>
        <h2 className="text-3xl font-bold text-white drop-shadow whitespace-nowrap">
          {capitalize(currentType || "Product")}
        </h2>
        <button
          className="game-button text-2xl !px-0"
          onClick={() => handleTypePage(1)}
          aria-label="Next type"
        >
          <div>
            <span className="!p-1 !px-2">
              <ArrowRight />
            </span>
          </div>
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-3 grid-rows-2 gap-6 mb-6">
        {paginatedProducts.map((product) => {
          const isSelected = selectedForCurrentType?.id === product.id;
          return (
            <div
              key={product.id}
              className={`relative flex flex-col items-center justify-between w-32 h-40 p-3 rounded-xl border-2 border-white bg-white/90 shadow-lg cursor-pointer transition-all duration-150 
    ${isSelected ? "ring-4 ring-green-400" : "hover:ring-2 hover:ring-blue-300"} 
    ${selectedForCurrentType && !isSelected ? "opacity-50 pointer-events-none" : ""}`}
              onClick={() => handleProductClick(product)}
            >
              {/* Product Icon (placeholder or product.icon if available) */}
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xl mb-1">
                {/* If using an icon/image path: */}
                {/* <img src={product.icon} alt={product.name} className="w-8 h-8 object-contain" /> */}
                🧴
              </div>

              {/* Product Name */}
              <span className="text-sm font-semibold text-center text-gray-800 leading-tight px-1">
                {product.name}
              </span>

              {/* Price */}
              <span className="text-xs text-gray-600 mt-1">
                ₫{DEFAULT_PRICE}K
              </span>

              {/* Tooltip icon */}
              <div className="absolute top-2 right-2 group">
                <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-xs font-bold cursor-help">
                  ?
                </div>
                <div className="absolute z-20 left-6 top-0 w-44 p-2 bg-white text-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto text-xs">
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
          <button
            className="game-button px-2 py-1"
            onClick={() => handleProductPage(-1)}
            aria-label="Prev products"
          >
            ◀️
          </button>
          <span className="text-white">
            Page {productPage + 1} / {totalProductPages}
          </span>
          <button
            className="game-button px-2 py-1"
            onClick={() => handleProductPage(1)}
            aria-label="Next products"
          >
            ▶️
          </button>
        </div>
      )}

      {/* Selected Products Sidebar */}
      <div className="absolute right-8 top-8 w-48 bg-white/90 rounded-xl p-4 shadow-xl flex flex-col gap-2 border border-gray-300 z-10">
        <h3 className="text-gray-700 font-bold text-sm mb-2 text-center">
          Selected Products
        </h3>
        {selectedProducts.length === 0 ? (
          <span className="text-gray-500 text-sm text-center">None</span>
        ) : (
          selectedProducts.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between bg-white px-3 py-1 rounded-full text-sm text-gray-800 border border-gray-300 shadow-sm"
            >
              <span>{p.name}</span>
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => removeProduct(p.id)}
                aria-label={`Remove ${p.name}`}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer Info */}
      <div className="w-full mt-auto bg-black/70 backdrop-blur-md rounded-xl p-3 flex items-center justify-between gap-4">
        <div className="flex flex-col items-start">
          <div className="text-white text-base font-semibold">
            Concern: <span className="font-normal">{concern}</span>
          </div>
          <div className="text-white text-base">
            Total: <span className="font-bold">₫{totalRevenue}K</span>
          </div>
        </div>

        <button
          className="game-button px-6 py-2 text-lg font-bold ml-auto"
          onClick={submitProducts}
          disabled={selectedProductTypes.some(
            (type) => !selectedProducts.find((p) => p.type === type)
          )}
        >
          <div>
            <span className="">Submit</span>
          </div>
        </button>
      </div>
    </div>
  );
}
