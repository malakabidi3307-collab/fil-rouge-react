import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateId } from "../utils/formatPrice";

export const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],
      lastOrder: null,

      createOrder: ({ userId, items, total, shippingInfo }) => {
        const order = {
          id: generateId("order"),
          userId,
          items,
          total,
          shippingInfo,
          createdAt: new Date().toISOString(),
          status: "confirmee",
        };

        set({ orders: [order, ...get().orders], lastOrder: order });
        return order;
      },

      getOrdersByUser: (userId) =>
        get().orders.filter((order) => order.userId === userId),
    }),
    {
      name: "shopease-orders",
    }
  )
);