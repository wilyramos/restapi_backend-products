import { Request, Response } from "express"
import Product from "../models/Product"

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            attributes: ['id', 'name', 'price', 'availability']
        })
        res.json({data: products})
    } catch (error) {
        res.status(500).json({message: 'Error al obtener los productos'})
    }
}

export const getProductsById = async (req : Request, res : Response) => {
    try {
        const {id} = req.params
        const product = await Product.findByPk(id)

        if(!product){
            return res.status(404).json({error: 'Producto no encontrado'})
        }
        res.json({data: product})
            
    } catch (error) {
        res.status(500).json({message: 'Error al obtener los productos'})
    }
}


export const createProduct =async (req : Request, res : Response) => {
    const product = await Product.create(req.body)
    res.status(201).json({data: product})
}

// Update product

export const updateProduct = async (req : Request, res : Response) => {
    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({error: 'Producto no encontrado'})
    }

    await product.update(req.body)
    await product.save
    res.json({data: product})
}

// Delete product

export const deleteProduct = async (req : Request, res : Response) => {
    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({error: 'Producto no encontrado'})
    }

    await product.destroy() // Eliminar el producto
    res.json({data: product})
}

// Update availability

export const updateAvailability = async (req : Request, res : Response) => {
    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({error: 'Producto no encontrado'})
    }

    product.availability = !product.dataValues.availability
    await product.save()

    res.json({data: product})
}