import { OrderContext } from "@/context/OrderContext";
import { UserContext } from "@/context/UserContext";
import OrdersService from "@/services/order.service";
import { Product } from "@/types/products/product.type";
import { useContext, useEffect, useState } from "react";

const AddToCart = ({ productData }: { productData: Product }) => {
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useContext(UserContext);
  const { order } = useContext(OrderContext);
  console.log(productData);

  const orderItem = {
    order: { id: order?.id },
    product: { id: productData.id },
    quantity: 1,
  };

  const updateCart = () => {
    const existingOrderItem = order?.orderItems?.find(
      (item) => item.product.id === productData.id
    );

    if (existingOrderItem) {
      const newOrderItem = {
        ...existingOrderItem,
        quantity: existingOrderItem.quantity + 1,
      };

      console.log("existingOrderItem", existingOrderItem);
      console.log(typeof existingOrderItem.quantity);

      OrdersService.updateOrderItems(existingOrderItem.id, newOrderItem);
    } else {
      addOrderItems();
    }
  };

  const addOrderItems = async () => {
    try {
      const response = await OrdersService.createOrderItems(orderItem);
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={updateCart}>Ajouter au panier</button>
      {isConnected && <p>Vous devez vous connecter pour ajouter au panier</p>}
    </div>
  );
};

export default AddToCart;
