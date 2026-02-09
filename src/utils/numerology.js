// Numerology Calculation Utilities
// Master numbers: 11, 22, 33 are not reduced further

/**
 * Reduce a number to a single digit (or master number)
 */
export const reduceToSingleDigit = (num) => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
        num = num.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }
    return num;
};

/**
 * Calculate Life Path Number from date of birth
 */
export const calculateLifePath = (day, month, year) => {
    const dayReduced = reduceToSingleDigit(day);
    const monthReduced = reduceToSingleDigit(month);
    const yearReduced = reduceToSingleDigit(year);
    return reduceToSingleDigit(dayReduced + monthReduced + yearReduced);
};

/**
 * Calculate Destiny Number (Expression Number) from full name
 * Uses all letters of the name
 */
export const calculateDestiny = (name) => {
    const letterValues = {
        a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
        j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
        s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
    };
    const sum = name
        .toLowerCase()
        .split('')
        .filter(c => letterValues[c])
        .reduce((total, c) => total + letterValues[c], 0);
    return reduceToSingleDigit(sum);
};

/**
 * Calculate Soul Urge Number (Heart's Desire) from vowels only
 */
export const calculateSoulUrge = (name) => {
    const vowelValues = { a: 1, e: 5, i: 9, o: 6, u: 3 };
    const sum = name
        .toLowerCase()
        .split('')
        .filter(c => vowelValues[c])
        .reduce((total, c) => total + vowelValues[c], 0);
    return reduceToSingleDigit(sum);
};

/**
 * Calculate Personality Number from consonants only
 */
export const calculatePersonality = (name) => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const letterValues = {
        a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
        j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
        s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
    };
    const sum = name
        .toLowerCase()
        .split('')
        .filter(c => letterValues[c] && !vowels.includes(c))
        .reduce((total, c) => total + letterValues[c], 0);
    return reduceToSingleDigit(sum);
};

/**
 * Calculate Birthday Number (just the day reduced)
 */
export const calculateBirthdayNumber = (day) => {
    return reduceToSingleDigit(day);
};

/**
 * Generate full numerology report from name and DOB
 */
export const generateFullReport = (name, dob) => {
    // Parse DOB in DD/MM/YYYY or DD-MM-YYYY format
    const parts = dob.includes('/') ? dob.split('/') : dob.split('-');
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[2]);

    return {
        lifePath: calculateLifePath(day, month, year),
        destiny: calculateDestiny(name),
        soulUrge: calculateSoulUrge(name),
        personality: calculatePersonality(name),
        birthday: calculateBirthdayNumber(day),
        name,
        dob
    };
};
