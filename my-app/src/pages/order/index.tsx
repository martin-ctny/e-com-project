import { OrderContext } from "@/context/OrderContext";
import OrdersService from "@/services/order.service";
import { Order } from "@/types/order/order.type";
import { useContext } from "react";

const order = () => {
  const { order, setOrder } = useContext(OrderContext);
  const handleUp = (e: any, id: string | undefined) => {
    console.log(id);
    try {
      const CurrentOrderItems = order?.orderItems?.find(
        (item) => item.id === id
      );
      //   CurrentOrderItems.quantity = +1
      OrdersService.updateOrderItems(id, CurrentOrderItems);
      console.log(CurrentOrderItems);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="panier"
    >
      <h1>Panier</h1>
      {order?.orderItems?.length === 0 && <p>Votre panier est vide</p>}

      {order?.orderItems?.map((item) => (
        <div key={item.id}>
          <p>{item.product.title}</p>
          <p>-</p>
          <p>{item.quantity}</p>
          <p>+</p>
          <button onClick={(e) => handleUp(e, item.id)}>ajouter</button>
          <p>{item.product.price} €</p>
          <p>Total {order.ammount} €</p>
        </div>
      ))}
    </div>
  );
};

export default order;
