module.exports = (temp, product) => {
    let output = temp.replace(/{%NAME%}/g, product.name);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%LOCATION%}/g, product.location);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%SELLER%}/g, product.seller);
    output = output.replace(/{%ID%}/g, product.id);

    return output;
};
