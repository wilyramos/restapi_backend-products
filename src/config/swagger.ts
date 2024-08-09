import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {

    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operationes related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / Typescript',
            version: '1.0.0',
            description: "Api docs for products"
        }
    },
    apis: ['./src/router.ts']


}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss: `
        .swagger-wrapper .link {
            content: url('https://cdn.iconscout.com/icon/free/png-256/swagger-3-1175040.png');
            width: 50px;
            height: 50px;
            margin-left: 10px;
        }
        .swagger-ui .topbar .download-url-wrapper {
            background-color: #f0f0f0;
            border-radius: 10px;
            padding: 10px;
        
    
        `
    
}

export default swaggerSpec;
export { swaggerUiOptions };