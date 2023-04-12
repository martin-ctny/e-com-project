import { Order, OrderContextType } from "@/types/order/order.type";
import { use, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { UserContext } from "./UserContext";
import OrdersService from "@/services/order.service";

const OrderContext = createContext({} as OrderContextType);
const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [totalAmmount, setTotalAmmount] = useState<number>(0);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.orders?.length == 0) {
      const newOrder = {
        status: false,
        userId: user.id,
        ammount: 0,
      };
      createOneOrder(newOrder);
    } else if (user?.orders?.length !== 0) {
      user?.orders?.forEach((order: Order) => {
        if (order.status === false) {
          order.id && getOneOrder(order.id);
        } else if (order.status == true) {
          const newOrder = {
            status: false,
            userId: user.id,
            ammount: 0,
          };
          createOneOrder(newOrder);
        }
      });
    }
  }, [user]);

  const calculateTotal = () => {
    const total = order?.orderItems?.filter((item) => item.quantity > 0);
    const totalAmmount = total?.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);
    console.log(totalAmmount);
    return totalAmmount;
  };

  useEffect(() => {
    if (order) {
      const newOrder = {
        ...order,
        ammount: calculateTotal(),
      };

      OrdersService.updateOrder(order.id, newOrder);
    }
    console.log(order);
  }, [order]);

  const createOneOrder = async (order: Order) => {
    const response = await OrdersService.createOrder(order);
    if (response.status === 200) {
      setOrder(response.data);
    }
  };

  const getOneOrder = async (id: string) => {
    const response = await OrdersService.getOneOrder(id);
    if (response) {
      setOrder(response);
    }
  };

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
