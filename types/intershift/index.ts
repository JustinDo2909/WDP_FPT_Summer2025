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
        requiredIngredients: string[]
        avoidIngredients: string[]
        requiredProducts: string[]
        avoidProducts?: string[]
    }

    type Mask = {
        id: number
        name: string
        ingredients: string[]
        case: SkinCase
        tooltip: string
    };

    type MaskIngredient = {
        id: string
        name: string
        image_url?: string
        tooltip: string
    }

    type GameProduct = {
        id: number
        price?: number
        type: "cleanser" | "moisturizer" | "toner" | "serum" | "exfoliator"
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