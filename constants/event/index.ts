export const fallbackRewards: ILeaderBoardReward[] = [
    {
        id: "reward-1",
        event_id: "event-001",
        rank_from: 1,
        rank_to: 1,
        title: "₫500,000 Voucher",
        description: "Top 1 player receives the biggest prize.",
        is_active: "true",
        created_at: new Date(),
        voucherTemplates: [
            {
                id: "voucher-1",
                event_id: "event-001",
                type: "Amount",
                user_limit: "1",
                user_count: "0",
                is_active: "true",
                leaderboard_reward_id: "reward-1",
                updated_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
                voucherProducts: [
                    {
                        product: {
                            id: "3",
                            title: "Age Defy Serum",
                            image_url: "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWPBPP01Orulwk1UO3YLnpZhyJsMeibzfd0mVt"
                        }
                    },
                    {
                        product: {
                            id: "7",
                            title: "switzerland Eye Cream",
                            image_url: "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWwq0ZEI6c5Z0PKmAlT2ELRnDMp7aN8sfwXidY"
                        }
                    }
                ]
            },
        ],
    },
    {
        id: "reward-2",
        event_id: "event-001",
        rank_from: 2,
        rank_to: 2,
        title: "₫300,000 Voucher",
        description: "Second place reward.",
        is_active: "true",
        created_at: new Date(),
        voucherTemplates: [
            {
                id: "voucher-2",
                event_id: "event-001",
                type: "Amount",
                user_limit: "1",
                user_count: "0",
                is_active: "true",
                leaderboard_reward_id: "reward-2",
                updated_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
                voucherProducts: [
                    {
                        product: {
                            id: "3",
                            title: "Age Defy Serum",
                            image_url: "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWPBPP01Orulwk1UO3YLnpZhyJsMeibzfd0mVt"
                        }
                    },
                    {
                        product: {
                            id: "7",
                            title: "switzerland Eye Cream",
                            image_url: "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWwq0ZEI6c5Z0PKmAlT2ELRnDMp7aN8sfwXidY"
                        }
                    }
                ]
            },
        ],
    },
    {
        id: "reward-3",
        event_id: "event-001",
        rank_from: 3,
        rank_to: 3,
        title: "₫200,000 Voucher",
        description: "Third place prize.",
        is_active: "true",
        created_at: new Date(),
        voucherTemplates: [
            {
                discount_value: 200000,
                id: "voucher-3",
                event_id: "event-001",
                type: "Amount",
                user_limit: "1",
                user_count: "0",
                is_active: "true",
                leaderboard_reward_id: "reward-3",
                updated_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
                voucherProducts: [],
            },
        ],
    },
    {
        id: "reward-4",
        event_id: "event-001",
        rank_from: 4,
        rank_to: 5,
        title: "₫100,000 Voucher",
        description: "For players ranked 4-5.",
        is_active: "true",
        created_at: new Date(),
        voucherTemplates: [
            {
                id: "voucher-4",
                event_id: "event-001",
                type: "Amount",
                user_limit: "2",
                user_count: "0",
                is_active: "true",
                leaderboard_reward_id: "reward-4",
                updated_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
                voucherProducts: [
                    {
                        product: {
                            id: "3",
                            title: "Age Defy Serum",
                            image_url: "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWPBPP01Orulwk1UO3YLnpZhyJsMeibzfd0mVt"
                        }
                    },
                    {
                        product: {
                            id: "7",
                            title: "switzerland Eye Cream",
                            image_url: "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWwq0ZEI6c5Z0PKmAlT2ELRnDMp7aN8sfwXidY"
                        }
                    }
                ]
            },
        ],
    },
    {
        id: "reward-5",
        event_id: "event-001",
        rank_from: 6,
        rank_to: 25,
        title: "₫50,000 Voucher",
        description: "For ranks 6 to 25.",
        is_active: "true",
        created_at: new Date(),
        voucherTemplates: [
            {
                id: "voucher-5",
                event_id: "event-001",
                type: "Amount",
                user_limit: "20",
                user_count: "0",
                is_active: "true",
                leaderboard_reward_id: "reward-5",
                updated_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
            },
        ],
    },
    {
        id: "reward-6",
        event_id: "event-001",
        rank_from: 26,
        rank_to: 100,
        title: "₫20,000 Voucher",
        description: "For participants who made it to top 100.",
        is_active: "true",
        created_at: new Date(),
        voucherTemplates: [
            {
                id: "voucher-6",
                event_id: "event-001",
                type: "Percent",
                user_limit: "75",
                user_count: "0",
                is_active: "true",
                leaderboard_reward_id: "reward-6",
                updated_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
                voucherProducts: [
                    {
                        product: {
                            id: "3",
                            title: "Age Defy Serum",
                            image_url: "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWPBPP01Orulwk1UO3YLnpZhyJsMeibzfd0mVt"
                        }
                    },
                    {
                        product: {
                            id: "7",
                            title: "switzerland Eye Cream",
                            image_url: "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWwq0ZEI6c5Z0PKmAlT2ELRnDMp7aN8sfwXidY"
                        }
                    }
                ]
            },
        ],
    },
];


export const mockUserScore = {
  id: "user-789",
  rank: 7,
  score: 12345,
  is_eligible_for_rewards: true,
  user: {
    id: "user-789",
    name: "rme",
  },
  event_id:"",
  completion_time: "",
  completed_at: ""
};