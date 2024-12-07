import {Router} from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { handlerInputErrors } from './middleware'


const router =Router()
//Routing
router.get('/',getProducts)
router.get('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handlerInputErrors,    
    getProductById
)


router.post('/',
    
    body('name')
                .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
                
    
    body('price')
                .isNumeric().withMessage('valor no valido')
                .notEmpty().withMessage('El precio del producto no puede ir vacio')
                .custom(value => value > 0).withMessage('precio no valido'),            

    handlerInputErrors,
    createProduct
)

router.put('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    body('name')
                .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
                
    
    body('price')
                .isNumeric().withMessage('valor no valido')
                .notEmpty().withMessage('El precio del producto no puede ir vacio')
                .custom(value => value > 0).withMessage('precio no valido'),
    body('availability')
    .isBoolean().withMessage('Valor para disponibilidad no valido'),
    handlerInputErrors,
    updateProduct)

router.patch('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handlerInputErrors,
    updateAvailability)

router.delete('/',
    param('id').isInt().withMessage('ID no valido'),
    handlerInputErrors,
    deleteProduct
)
export default router