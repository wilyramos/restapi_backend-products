import request from 'supertest';
import server from '../../server';

describe('POST /api/products', () => {

    it('Should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('Should create a new product', async () => {
        const response = await request(server)
            .post('/api/products')
            .send({
                name: 'Test Product',
                price: 100
            })

            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('data')

            expect(response.status).not.toBe(404)
            expect(response.status).not.toBe(200)
            expect(response.body).not.toHaveProperty('errors')
    })

    it('Should validate that the price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Test Product',
            price: 0
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('El precio debe ser mayor a 0')
    })



})


describe('GET /api/products', () => {
    it('Should check if api/products url exists', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })

    it('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products/:id', () => {

    it('Should return a 404 response for a non-existent product', async () => {

        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')

    })
    

    it('Should check a valid ID in the URL', async () => {
        const response = await request(server).get('/api/products/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
    })

    it('get a JSON response for a single product', async () => {

        const response = await request(server).get('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

// test for PUT /api/products/:id

describe('PUT /api/products/:id', () => {

    // falta validacion de url
    // falta validacion de id
    // falta validacion de producto no encontrado

    it('Should display validation error messages when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({})
                                

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')        
    })

    it('Should validate that the price is greater than 0', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: "Monitor Curvo",
            availability: true,
            price: 0
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(2)
        expect(response.body.errors[0].msg).toBe('El precio debe ser mayor a 0')
    })
})

describe('PATCH /api/products/:id', () => {
    it('Should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server).patch(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    it('Should update the product availability', async () => {
        const response = await request(server).patch('/api/products/1').send({
            availability: false
        })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availability).toBe(false)
    })
})

describe('DELETE /api/products/:id', () => {
    it('Should check a valid ID', async () => {
        const response = await request(server).delete('/api/products/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('El id debe ser un numero')
    })

    it('Should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server).delete(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
        expect(response.status).not.toBe(200)
    })

    

})
