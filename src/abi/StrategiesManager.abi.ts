export default [
    {
        inputs: [
            {
                internalType: "address",
                name: "approvedTokens_",
                type: "address",
            },
            {
                internalType: "address",
                name: "tokensOperations_",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "DuplicateToken",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "validMin",
                type: "uint8",
            },
        ],
        name: "InvalidMaxStrategiesPerUser",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "validMin",
                type: "uint8",
            },
        ],
        name: "InvalidMaxTokensPerStrategy",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
        ],
        name: "InvalidZeroPercentage",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "maxCount",
                type: "uint8",
            },
        ],
        name: "StrategiesLimitReached",
        type: "error",
    },
    {
        inputs: [],
        name: "StrategyDoesNotExist",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "maxCount",
                type: "uint8",
            },
        ],
        name: "StrategyTokensLimitReached",
        type: "error",
    },
    {
        inputs: [],
        name: "StrategyTotalPercentageNotEq100",
        type: "error",
    },
    {
        inputs: [],
        name: "SwapQuotesArrayLengthDoesntMatch",
        type: "error",
    },
    {
        inputs: [],
        name: "TokenNotApproved",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
        ],
        name: "UnknownTokenInSwapQuotes",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint8",
                name: "prevValue",
                type: "uint8",
            },
            {
                indexed: false,
                internalType: "uint8",
                name: "newValue",
                type: "uint8",
            },
        ],
        name: "MaxStrategiesPerUserChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint8",
                name: "prevValue",
                type: "uint8",
            },
            {
                indexed: false,
                internalType: "uint8",
                name: "newValue",
                type: "uint8",
            },
        ],
        name: "MaxTokensPerStrategyChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "strategyId",
                type: "uint256",
            },
        ],
        name: "StrategyCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "strategyId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "StrategyInvestmentCompleted",
        type: "event",
    },
    {
        inputs: [],
        name: "MAX_STRATEGIES_PER_USER_MIN_COUNT",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "MAX_TOKENS_PER_STRATEGY_MIN_COUNT",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "approvedTokens",
        outputs: [
            {
                internalType: "contract IApprovedTokens",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "name_",
                type: "string",
            },
            {
                components: [
                    {
                        internalType: "address",
                        name: "addr",
                        type: "address",
                    },
                    {
                        internalType: "uint8",
                        name: "percentage",
                        type: "uint8",
                    },
                ],
                internalType: "struct IStrategiesManager.TokenParams[]",
                name: "tokensParams_",
                type: "tuple[]",
            },
        ],
        name: "createStrategy",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "address_",
                type: "address",
            },
        ],
        name: "getUserStrategies",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "addr",
                                type: "address",
                            },
                            {
                                internalType: "uint8",
                                name: "percentage",
                                type: "uint8",
                            },
                        ],
                        internalType: "struct IStrategiesManager.TokenParams[]",
                        name: "tokensParams",
                        type: "tuple[]",
                    },
                ],
                internalType: "struct IStrategiesManager.StrategyView[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "address_",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "strategyId_",
                type: "uint256",
            },
        ],
        name: "getUserStrategy",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "addr",
                                type: "address",
                            },
                            {
                                internalType: "uint8",
                                name: "percentage",
                                type: "uint8",
                            },
                        ],
                        internalType: "struct IStrategiesManager.TokenParams[]",
                        name: "tokensParams",
                        type: "tuple[]",
                    },
                ],
                internalType: "struct IStrategiesManager.StrategyView",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user_",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "strategyId_",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amount_",
                type: "uint256",
            },
        ],
        name: "investIntoUserStrategy",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "strategyId_",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amount_",
                type: "uint256",
            },
            {
                components: [
                    {
                        internalType: "address",
                        name: "token",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "spender",
                        type: "address",
                    },
                    {
                        internalType: "bytes",
                        name: "swapCallData",
                        type: "bytes",
                    },
                    {
                        internalType: "uint256",
                        name: "gasPrice",
                        type: "uint256",
                    },
                ],
                internalType: "struct IStrategiesManager.ZeroXApiQuote[]",
                name: "swapQuotes_",
                type: "tuple[]",
            },
        ],
        name: "investIntoYourStrategy",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "maxStrategiesPerUser",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "maxTokensPerStrategy",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "maxStrategiesPerUser_",
                type: "uint8",
            },
        ],
        name: "setMaxStrategiesPerUser",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "maxTokensPerStrategy_",
                type: "uint8",
            },
        ],
        name: "setMaxTokensPerStrategy",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "tokensOperations",
        outputs: [
            {
                internalType: "contract ITokensOperations",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
] as const
