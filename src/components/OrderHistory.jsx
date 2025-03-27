import React from 'react';


const OrderHistory = ({ orders }) => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Order History</h2>
        {orders.map(order => (
          <div key={order.id} className="bg-[#000021] bg-opacity-50 p-4 rounded mb-2 flex items-center">
            <img
                src={order.image}
                alt={order.product}
                className="w-16 h-16 object-contain mr-4"
            />
            <div>
                <p className="text-sm font-bold">Order: {order.id}</p>
                <p>{order.product}</p>
                <p className={`text-sm font-semibold ${
                  order.status === 'PENDING' ? 'text-yellow-400' : 
                  order.status === 'PICKED UP' ? 'text-green-400' : 
                  order.status === 'CANCELED' ? 'text-red-400' : 'text-white'
                }`}>
                  {order.status}
                </p>
                <p className="font-semibold">{order.total}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default OrderHistory;
  