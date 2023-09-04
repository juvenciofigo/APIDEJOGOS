function validateGameFields(title, year, price) {
    if (title === undefined || typeof title !== 'string' || title.length === 0) {
        return false;
    }
    if (year === undefined || isNaN(year) || year.length === 0)  {
        return false;
    }
    if (price === undefined || isNaN(price) || price.length === 0) {
        return false;
    }
    return true;
}

module.exports = validateGameFields;