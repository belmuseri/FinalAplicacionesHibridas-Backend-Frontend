import usersRouter from './usersRouter.js'
import productsRouter from './productsRouter.js'

export function routerAPI(app){
    app.use('/products', productsRouter);
    app.use('/users', usersRouter);
}