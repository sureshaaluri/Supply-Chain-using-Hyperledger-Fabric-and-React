const productModel = require('../models/product.js');
const apiResponse = require('../utils/apiResponse.js');

exports.createProduct = async (req, res) => {
    const { id, name, price , loggedUserType } = req.body;
    console.log('1');

    if (!name || !id || !price  || !loggedUserType) {
        return apiResponse.badRequest(res);
    }
    console.log('2' +loggedUserType);

    if (loggedUserType !== 'manufacturer' ) {
        return apiResponse.badRequest(res);
    }
    console.log('3');

    const modelRes = await productModel.createProduct({ name, id, price });
    return apiResponse.send(res, modelRes);
};

exports.createOrder = async (req, res) => {
    const { id, productId ,userId ,loggedUserType, loggedUserName } = req.body;
    // console.log('createOrderData', req.body);

    if (!productId || !id || !userId  || !loggedUserType) {
        return apiResponse.badRequest(res);
    }
    console.log('2' +id, productId,userId ,loggedUserType);

    if (loggedUserType !== 'consumer' ) {
        return apiResponse.badRequest(res);
    }
    // console.log('3');

    const modelRes = await productModel.createOrder({id, productId, userId, loggedUserType, loggedUserName});
    return apiResponse.send(res, modelRes);
};

exports.isDelivered = async (req, res) => {
    const { id, productId } = req.body;
    
    if (!productId || !id ) {
        return apiResponse.badRequest(res);
    }
    console.log('2' +id, productId);

    const modelRes = await productModel.isDelivered({ productId,id});
    return apiResponse.send(res, modelRes);
};

exports.updateProduct = async (req, res) => {
    const { id, name, price , loggedUserType } = req.body;
    const { role, productId } = req.params;
    console.log('1');

    if (!productId || !name || !id || !price || !loggedUserType || !role) {
        return apiResponse.badRequest(res);
    }
    console.log('2');

    if (loggedUserType === 'consumer' ) {
        return apiResponse.badRequest(res);
    }
    console.log('3');

    let modelRes
    if( role === 'manufacturer' ) {
        modelRes = await productModel.updateProduct(true, false,false, { productId, id, name, price });
    } else if( role === 'middlemen' ) {
        modelRes = await productModel.updateProduct(false, true, false, { productId, id, name, price });
    } else {
        return apiResponse.badRequest(res);
    }
    return apiResponse.send(res, modelRes);
};

exports.getProductbyId = async (req, res) => {

    console.log('editProduct')

    const { id } = req.body;
    const { productId, role } = req.params
    // console.log("get Details 111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"+id + productId + role)
    // console.log('1111111');

    if (!productId || !id || !role ) {
        return apiResponse.badRequest(res);
    }
    console.log('2');
    console.log('3');
    let modelRes;
    if( role === 'manufacturer' ) {
        modelRes = await productModel.getProductById(true, false, false, { productId, id });
    } else if( role === 'middlemen' ) {
        modelRes = await productModel.getProductById(false, true, false,{ productId, id });
    } else if( role === 'consumer' ) {
        modelRes = await productModel.getProductById(false, false, true, { productId, id });
    } else {
        return apiResponse.badRequest(res);
    }
    return apiResponse.send(res, modelRes);
};

exports.getAllProducts = async (req, res) => {
    const { id } = req.body;
    const { role } = req.params

    // console.log('1');

    if (!id || !role ) {
        return apiResponse.badRequest(res);
    }
    // console.log('2');
    // console.log('productsInfo', id);
    let modelRes;
    if( role === 'manufacturer' ) {
        modelRes = await productModel.getAllProducts(true, false, false, { id });
    } else if( role === 'middlemen' ) {
        modelRes = await productModel.getAllProducts(false, true, false,{ id });
    } else if( role === 'consumer' ) {
        modelRes = await productModel.getAllProducts(false, false, true, { id });
    } else {
        return apiResponse.badRequest(res);
    }

    console.log('productres', res)
    console.log('productModelRes', JSON.stringify(modelRes))
    return apiResponse.send(res, modelRes);
};

