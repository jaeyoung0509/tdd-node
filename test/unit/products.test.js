const productController = require("../../controller/product")
const productModel = require("../../models/Product")
const httpMocks =  require("node-mocks-http");
const newProduct = require("../data/new-product.json")
const allProducts = require("../data/all-products.json")

productModel.create = jest.fn();
productModel.find = jest.fn();
let req,res,next;
beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})


describe("Product Controller Create" , ()=> {
    beforeEach(()=>{
        req.body= newProduct;
    })
    it("should have a createProduct function" , () => {
        expect(typeof productController.createProduct).toBe("function")
    })
    it("should call ProductModel.create" , async () => {
        await productController.createProduct(req,res,next);
        expect(productModel.create).toBeCalledWith(newProduct);
    })

    it("should return 201 response code" , async () => {
        await productController.createProduct(req , res ,next) ;
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should return json body in response" , async () => {
        productModel.create.mockReturnValue(newProduct)
        await productController.createProduct(req,res,next);
        expect(res._getJSONData()).toStrictEqual(newProduct )
    })
    it("should handle errors" ,async() => {
        const errorMessage = {message: "description property missing"};
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.create.mockReturnValue(rejectedPromise);
        await productController.createProduct(req,res,next);
        expect(next).toBeCalledWith(errorMessage);
    })
})


describe("Product Controller Get" , () => {
    it("should have a getProducts function", () => {
        expect(typeof productController.getProducts).toBe("function")
    })
    it ("should call ProductModel.find{}", async ()=> {
        await productController.getProducts(req ,res ,next) ;
        expect(productModel.find).toHaveBeenCalledWith({})
    })
    it("should return 200 response" ,async () => {
        await productController.getProducts(req ,res , next)
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
    })
    it("should return json body in response" , async () => {
        productModel.find.mockReturnValue(allProducts)
        await productController.getProducts(req ,res , next);
        expect(res._getJSONData()).toStrictEqual(allProducts)
    })
    it("should handle errors" , async() => {
        const errorMesage = {message : "Error finding product data"}
        const rejectedPromise = Promise.reject(errorMesage)
        productModel.find.mockReturnValue(rejectedPromise)
        await productController.getProducts(req ,res ,next);
        expect(next).toHaveBeenCalledWith(errorMesage);
    })
})