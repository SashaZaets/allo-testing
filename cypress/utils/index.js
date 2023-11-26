export const removeNonNumbers = (priceText) => {
    return parseFloat(priceText.replace(/[^0-9.]/g, ''));
};