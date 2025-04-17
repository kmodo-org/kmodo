export const allowedUserIds = new Set([
    process.env.NEXT_PUBLIC_CARLOS,
    process.env.NEXT_PUBLIC_SAM, 
    process.env.NEXT_PUBLIC_ADRIAN,
    process.env.NEXT_PUBLIC_KAI,
    process.env.NEXT_PUBLIC_DANIEL,
    process.env.NEXT_PUBLIC_ELI,
    process.env.NEXT_PUBLIC_CARFOS,
    process.env.NEXT_PUBLIC_TEST, // This is a test user for local testing purposes, remove in production
]);