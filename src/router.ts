import { Router } from "express";
import { createProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";
import { getProducts, getProductsById, updateProduct, deleteProduct, updateAvailability } from "./handlers/product";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *     Product:
 *      type: object
 *      properties:
 *          id:
 *              type: integer
 *              description: The product ID
 *              example: 1
 *          name:
 *             type: string
 *             description: The product name
 *             example: "Laptop"
 *          price:
 *              type: number
 *              description: The product price
 *              example: 1000
 *          availability:
 *              type: boolean
 *              description: The product availability
 *              example: true  
 * 
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *      summary: Get all products
 *      tags: 
 *         - Products
 *      description: Return a list of all products
 *      responses:
 *         200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 */

// Routing
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/Product'
 *          400:
 *              description: Invalid ID supplied
 *          404:
 *              description: Product not found
 * 
 *              
 *              
 *         
 */

router.get('/:id', 
    param('id')
        .isNumeric().withMessage('El id debe ser un numero')
        .notEmpty().withMessage('El id es requerido'),
    handleInputErrors,
    getProductsById
);


/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Create a new product
 *      tags:
 *          - Products
 *      description: Return a new record in the de database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Laptop" 
 *                          price:
 *                              type: number
 *                              example: 1000
 *      responses:
 *          201:
 *              description: Product updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - invalid input data
 * 
 */     

router.post('/', 

    // validacion

    body ('name')
        .notEmpty().withMessage('El nombre del producto es requerido'),

    body ('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto es requerido')
        .custom(value => value>0).withMessage('El precio debe ser mayor a 0'),     
    handleInputErrors,
    createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Update a product by ID
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to update
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Laptop" 
 *                          price:
 *                              type: number
 *                              example: 1000
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Product updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - invalid input data
 *          404:
 *              description: Product not found
 * 
 */

router.put('/:id', 
    // validacion
    body('name')
        .notEmpty().withMessage('El nombre del producto es requerido'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto es requerido')
        .custom(value => value>0).withMessage('El precio debe ser mayor a 0'),
    param('availability')
        .isBoolean().withMessage('El campo availability debe ser un booleano'),
    handleInputErrors,    
    updateProduct);

    
/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update the availability of a product by ID
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to update
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Product updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request
 *          404:
 *              description: Product not found
 * 
*/
router.patch('/:id', updateAvailability);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete a product by ID
 *      tags:
 *          - Products
 *      description: Delete a product by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to delete
 *          required: true
 *      schema:
 *          type: integer
 *      responses:
 *          200:
 *              description: Product deleted successfully
 *              content:
 *                 application/json:
 *                    schema:
 *                          type: string
 *                          value: "Product deleted successfully"
 * 
 *          400:
 *              description: Bad request
 *          404:
 *              description: Product not found
 * 
 */

router.delete('/:id', 
    param('id')
        .isNumeric().withMessage('El id debe ser un numero')
        .notEmpty().withMessage('El id es requerido'),
    handleInputErrors,    
    deleteProduct);



export default router;