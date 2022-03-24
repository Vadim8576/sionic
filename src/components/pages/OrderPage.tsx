import React from "react";
import { ProductsInBasket } from "../../types/types";
import OrderContainer from "../order/OrderContainer";

interface OrderPageProps {
	productsInBasket: ProductsInBasket
    cleanBasket: () => void
}



const OrderPage: React.FC<OrderPageProps> = ({ cleanBasket }) => {
    return (
        <div style={{ width: '100%' }}>
            <OrderContainer cleanBasket={cleanBasket} />
        </div>
    )
}

export default OrderPage;