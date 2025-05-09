export const formatAmountInPounds = (amountInPounds: number) => {
    return amountInPounds.toLocaleString('en-GB', {
        style: 'currency',
        currency: 'GBP'
    });
}