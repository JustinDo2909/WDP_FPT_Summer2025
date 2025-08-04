declare global {
    type NPCProfile = {
        id: number
        name: string
        avatar_url_default: string
        avatar_url_happy: string
        avatar_url_sad: string
        concern_line: string
        happy_line: string
        unhappy_line: string
        thanks_line: string
        steps: number
        description: string
        case: SkinCase
        
    };

    type SkinCase = {
        caseName: string
        tooltip: string
        skinType?: "oily" | "dry" | "combination" | "acne-prone"
        requiredIngredients: string[]
        avoidIngredients: string[]
        requiredProducts: string[]
        avoidProducts?: string[]
    }

    type Mask = {
        id: number
        name: string
        ingredients: IngredientEntry[]
        case: string
        tooltip: string
    };

    type IngredientEntry = {
        tag: string
        quantity: number
    }

    type MaskIngredient = {
        tag: string
        name: string
        benefits: string[]
        image_url?: string
        tooltip?: string
        is_allergen: boolean
    }

    type GameProduct = {
        id: number
        price?: number
        type: "oil-based-cleanser" | "gel/foam-cleanser" | "exfoliator" | "toner" | "serum"  | "moisturizer" 
        name: string
        image_url: string
        ingredients: string[]
        tooltip: string
    }


    type GameState = {
        currentCustomer?: NPCProfile
        currentDialogue?: string
        selectedProductTypes: string[]
        selectedProducts: GameProduct[]
        profit: number
        meter: number
        customersServed: number
        waitingForFeedback: NPCProfile[]
        showMaskCrafting: boolean
        showNextCustomer: boolean
        gameScene: SceneName
    }
}

export type {
    NPCProfile,
    GameProduct,
    MaskIngredient,
    GameState,
    Mask
};

export enum SceneName {
    CUSTOMER_INTERFACE = "customer-interface",
    CHOOSING_PRODUCTS = "choosing-products",
    MASK_MIXING = "mask-mixing",
    PIMPLE_POPPING = "pimple-popping"
}