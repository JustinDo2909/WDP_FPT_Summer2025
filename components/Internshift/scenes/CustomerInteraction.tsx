import { SmileIcon } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const productTypes = [
  "cleanser",
  "moisturizer",
  "toner",
  "serum",
  "exfoliator",
];

interface CustomerInteractionProps {
  customer: NPCProfile;
  gameState: GameState;
  selectProductType: (type: string) => void;
  removeProductType: (type: string) => void;
  submitRoutine: (customer: NPCProfile) => void;
}

export default function CustomerInteraction({
  customer,
  gameState,
  selectProductType,
  removeProductType,
  submitRoutine

}: CustomerInteractionProps) {
  const handleCheckboxChange = (type: string) => {
    if (gameState.selectedProductTypes.includes(type)) {
      removeProductType(type);
    } else if (gameState.selectedProductTypes.length < customer.steps) {
      selectProductType(type);
    }
  };

  // Animation variants for chat bubbles
  const bubbleVariants = {
    hidden_left: { opacity: 0, x: -50 },
    hidden_right: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    visible_delayed: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.5 } }
  };

  return (
    <>
      {/* Customer Side (left) */}
      <div className="absolute left-8 bottom-0 flex flex-col items-center space-y-4">
        {/* Name Card */}
        <div className="bg-white shadow-md px-4 py-2 rounded-xl border border-gray-200 text-center text-lg font-semibold">
          {customer.name}
        </div>

        {/* Customer Illustration */}
        <div className="relative">
          <Image
            src={customer.avatar_url_default ?? "/placeholder.png"}
            alt={`${customer.name} in clinic`}
            width={192}
            height={288}
            className="w-48 h-72 object-cover rounded-t-3xl bg-white shadow-lg"
          />
          {/* Mood Icon */}
          <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg border-2 border-primary/20">
            <span className="text-2xl">
              <SmileIcon />
            </span>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute right-8 top-24 max-w-sm"
        variants={bubbleVariants}
        initial="hidden_left"
        animate="visible"
      >
        <div className="bg-blue-100 text-gray-800 px-5 py-4 rounded-2xl shadow-md border border-blue-200 text-lg relative">
          <span className="block">{customer.concern_line}</span>
          <div className="absolute -left-2 top-4 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-l-blue-100"></div>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-8 top-48 max-w-sm"
        variants={bubbleVariants}
        initial="hidden_right"
        animate="visible_delayed"
      >
        <div className="bg-pink-100 text-gray-800 px-5 py-4 rounded-2xl shadow-md border border-pink-200 text-lg relative">
          <span className="">
            Yes, I can help you choose out the products. You will have to
            purchase for a {customer.steps}-step cleansing routine which
            includes:{" "}
          </span>
          <div className="mt-2">
            {productTypes.map((type) => (
              <div key={type} className="flex items-center">
                <input
                  type="checkbox"
                  id={type}
                  checked={gameState.selectedProductTypes.includes(type)}
                  onChange={() => handleCheckboxChange(type)}
                  disabled={
                    !gameState.selectedProductTypes.includes(type) &&
                    gameState.selectedProductTypes.length >= customer.steps
                  }
                  className="mr-2"
                />
                <label htmlFor={type} className="capitalize">
                  {type}
                </label>
              </div>
            ))}

            <button className="game-button mt-4" onClick={() => submitRoutine(customer)} disabled={gameState.selectedProductTypes.length < customer.steps}>
              <div className="">
                <span className="">Start Treatment</span>
              </div>
            </button>
          </div>
          <div className="absolute -right-2 top-4 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[10px] border-l-pink-100"></div>
        </div>
      </motion.div>
    </>
  );
}