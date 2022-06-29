const request =  require("supertest")
const app = require("../../server")
const newProduct = require("../data/new-product.json")
const mongoose = require("mongoose")



it("POST /api/products", async() => {
    const response = await request(app)
        .post("api/producs")
        .send(newProduct);
        expect(response.statusCode).toBe(201)
        expect(response.body.name).toBe(newProduct.name)
        expect(response.body.description).toBe(newProduct.description)
        await mongoose.connection.close();

        done();
         
})

it("should return 500 on POST /api/products", async() => {
    const response = await request(app)
        .post("api/products")
        .send({name : "hehe"});

    expect(response.statusCode).toBe(500)
})
