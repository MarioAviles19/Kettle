// place files you want to import through the `$lib` alias in this folder.


export function FractionToDecimal(fraction : string) {
    const parts = fraction.split(' ');

    if (parts.length === 1 && parts[0].includes('/')) {
        // Case: Simple fraction like "1/2"
        const [numerator, denominator] = parts[0].split('/').map(Number);
        return numerator / denominator;
    } else if (parts.length === 1) {
        // Case: Whole number like "3"
        return parseFloat(parts[0]);
    } else {
        // Case: Mixed fraction like "1 1/2"
        const wholeNumber = parseInt(parts[0]);
        const [numerator, denominator] = parts[1].split('/').map(Number);
        return wholeNumber + (numerator / denominator);
    }
}
export function DecimalToFraction(decimal : number, precision : number) {
    const wholeNumber = Math.floor(decimal);
    const fractionalPart = decimal - wholeNumber;

    if (fractionalPart === 0) {
        return wholeNumber.toString(); // If it's a whole number, return just the whole part
    }

    // Approximate the fractional part
    let denominator = precision; // Precision of the fraction
    let numerator = Math.round(fractionalPart * denominator);

    const commonDivisor = gcd(numerator, denominator);
    numerator /= commonDivisor;
    denominator /= commonDivisor;

    // Handle the case where the fraction is a simple fraction
    if (wholeNumber === 0) {
        return `${numerator}/${denominator}`; // Just return the fraction if no whole part
    }


    return `${wholeNumber > 0? wholeNumber + " " : ""}${numerator}/${denominator}`;
}

// Iterative GCD function
function gcd(a : number, b : number) {
    let i = 0;
    while (b !== 0) {
        if(i > 100){
            break;
        }
        console.log("mow")
        let temp = b;
        b = a % b;
        a = temp;
        i++;
    }
    return a;
}