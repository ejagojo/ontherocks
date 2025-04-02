import React, { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      const ordersRef = collection(db, 'users', user.uid, 'Orders');
      const unsubscribeOrders = onSnapshot(ordersRef, async (snapshot) => {
        const fetchedOrders = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: data.id || docSnap.id,
            product: data.product,
            status: data.status,
            total: data.total,
            pickupTime: data.pickupTime || '',
            pickupAddress: data.store?.address || '',
            items: data.items || [],
          };
        });
        setOrders(fetchedOrders);
      });

      return () => {
        unsubscribeOrders();
      };
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Order History</h2>
      {orders.map((order) => {
        const isExpanded = expandedOrderId === order.id;
        return (
          <div key={order.id} className="bg-[#000021] bg-opacity-50 p-4 rounded mb-2">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(order.id)}>
              <div>
                <p className="text-sm font-bold">Order: {order.id}</p>
                <p>{order.product}</p>
                <p className={`text-sm font-semibold ${
                  order.status === 'PENDING' ? 'text-yellow-400' : 
                  order.status === 'PICKED UP' || order.status === 'AWAITING_PICKUP' ? 'text-green-400' : 
                  order.status === 'CANCELED' ? 'text-red-400' : 'text-white'
                }`}>
                  {order.status}
                </p>
                <p className="font-semibold">{order.total}</p>
              </div>
              <div className="text-xl text-gray-300">
                {isExpanded ? '▲' : '▼'}
              </div>
            </div>
            {isExpanded && (
              <div className="mt-2 pl-4 border-t border-gray-600 pt-2">
                <div className="mb-2">
                  <p className="text-sm font-semibold">
                    Pick Up Time: <span className="font-normal">{formatDateTime(order.pickupTime)}</span>
                  </p>
                  <p className="text-sm font-semibold">
                    Pick Up Address: <span className="font-normal">{order.pickupAddress || 'N/A'}</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2">Items in Order:</p>
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <div key={index} className="flex flex-col mb-1">
                        <p className="text-sm">{item.name} - {item.quantity}x</p>
                        <p className="text-xs">{item.size} - ${item.price}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No items found for this order.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderHistory;
