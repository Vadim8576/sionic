import { Model, fk, many, attr, ORM } from 'redux-orm';



class ProductInBasket extends Model {
    
    static reducer(action, ProductInBasket) {

        switch (action.type) {
        case 'ADD_PRODUCT_TO_BASKET':
            let arr = action.payload
            ProductInBasket.upsert(action.payload);
            break;
        }
    }

}

ProductInBasket.modelName = 'ProductInBasket';


const orm = new ORM;
orm.register(ProductInBasket);



export default ProductInBasket;