import { createSelector } from 'redux-orm';
import { orm } from './orm';

export const productSelector = createSelector(orm, (session) => {
    const productModels = session.ProductInBasket.all().toModelArray();
    // console.log(session.Products.toModelArray())

    const formattedProducts= productModels.map((productInBasket) => {
      return {
        id: productInBasket.id,
        name: productInBasket.name,
        // description: product.description

      };
    });
    return formattedProducts;
  });


