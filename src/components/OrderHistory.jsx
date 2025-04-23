import React, { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import {
  collection,
  onSnapshot,
  doc,
  updateDoc
} from 'firebase/firestore';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Subscribe to the user's Orders subcollection
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const ordersRef = collection(db, 'users', uid, 'Orders');
    const unsubscribe = onSnapshot(ordersRef, snapshot => {
      const arr = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setOrders(arr);
    });

    return () => unsubscribe();
  }, []);

  // Tick the clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const parseMs = ts => {
    if (!ts) return 0;
    if (typeof ts === 'string') return new Date(ts).getTime();
    if (ts.toDate) return ts.toDate().getTime();
    return ts instanceof Date ? ts.getTime() : new Date(ts).getTime();
  };

  const formatDate = ts => {
    if (!ts) return '—';
    const d = typeof ts === 'string'
      ? new Date(ts)
      : ts.toDate
        ? ts.toDate()
        : new Date(ts);
    return d.toLocaleString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const normalizeUrl = u =>
    !u ? null
      : u.startsWith('//') ? `https:${u}`
      : u.replace(/^http:\/\//i, 'https://');
  const fallback = 'https://via.placeholder.com/64?text=No+Image';

  const isOrderCancellable = order => {
    if (!order.createdAt) return false;
    const status = order.status?.toUpperCase();
    if (status === 'CANCELED' || status === 'PICKED UP') return false;
    return currentTime.getTime() - parseMs(order.createdAt) < 5 * 60 * 1000;
  };

  const getTimeLeft = order => {
    const rem = 5 * 60 * 1000 - (currentTime.getTime() - parseMs(order.createdAt));
    if (rem <= 0) return '0:00';
    const m = Math.floor(rem / 60000), s = Math.floor((rem % 60000) / 1000);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCancelOrder = async id => {
    if (!window.confirm('Cancel this order?')) return;
    const uid = auth.currentUser.uid;
    const ref = doc(db, 'users', uid, 'Orders', id);
    try {
      await updateDoc(ref, {
        status: 'CANCELED',
        canceledAt: new Date().toISOString()
      });
      alert('Order canceled successfully');
    } catch {
      alert('Failed to cancel. Please try again.');
    }
  };

  const getStatusClass = status => {
    const s = status?.toUpperCase();
    const base = 'px-2 py-1 rounded-md text-xs font-medium';
    if (s.startsWith('AWAITING')) return `${base} bg-yellow-200 text-yellow-800`;
    if (s === 'PICKED UP')        return `${base} bg-green-200 text-green-800`;
    if (s === 'CANCELED')         return `${base} bg-red-200 text-red-800`;
    return `${base} bg-gray-200 text-gray-800`;
  };

  // Sort newest first
  const sorted = [...orders].sort(
    (a, b) => parseMs(b.createdAt) - parseMs(a.createdAt)
  );

  // Auto-expand most recent cancellable
  useEffect(() => {
    if (sorted[0] && isOrderCancellable(sorted[0])) {
      setExpandedOrderId(sorted[0].id);
    }
  }, [sorted]);

  const toggleExpand = id =>
    setExpandedOrderId(expandedOrderId === id ? null : id);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Order History</h2>

      {sorted.map(order => {
        const expanded = expandedOrderId === order.id;
        const canCancel = isOrderCancellable(order);
        const dispStatus = order.status?.replace('_', ' ') || 'Unknown';

        return (
          <div
            key={order.id}
            className="mb-4 bg-[#000021] rounded-lg overflow-hidden shadow-md border border-gray-800"
          >
            {/* Header */}
            <div
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(order.id)}
            >
              <div>
                <p className="text-sm font-bold">Order: {order.id}</p>
                <span className={getStatusClass(order.status)}>
                  {dispStatus}
                </span>
                <p className="font-semibold mt-1">${order.total}</p>
                <p className="text-xs text-gray-500">
                  Placed: {formatDate(order.createdAt)}
                </p>
                {canCancel && (
                  <span className="text-xs text-yellow-500 font-medium mt-1 block">
                    ⚠️ Cancelable ({getTimeLeft(order)} remaining)
                  </span>
                )}
              </div>
              <div className={`transform transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Details */}
            {expanded && (
              <div className="mt-2 px-4 py-3 border-t border-gray-600 bg-[#000030] text-gray-300">
                <div className="mb-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {/* Pickup Time */}
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-gray-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="text-xs text-gray-500">Pick Up Time</span>
                      <p className="text-sm text-gray-300">
                        {formatDate(order.pickupTime)}
                      </p>
                    </div>
                  </div>
                  {/* Pickup Address */}
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-gray-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <span className="text-xs text-gray-500">Pick Up Address</span>
                      <p className="text-sm text-gray-300">
                        {order.store?.address || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <p className="text-sm font-semibold mb-2">Items in Order:</p>
                <div className="space-y-3">
                  {order.items?.length ? (
                    order.items.map((item, i) => (
                      <div key={i} className="flex items-center mb-2 bg-[#000021] p-3 rounded-md">
                        <div className="w-16 h-16 bg-white rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={normalizeUrl(item.image_url) || fallback}
                            alt={item.name}
                            className="w-full h-full object-contain"
                            onError={e => { e.currentTarget.src = fallback; }}
                          />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium">
                            {item.name} - {item.quantity}x
                          </p>
                          <p className="text-xs text-gray-400">
                            {item.size} - ${item.price}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 py-3 text-center bg-[#000021] rounded-md">
                      No items found for this order.
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between">
                  <button className="px-3 py-1.5 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
                    Reorder
                  </button>
                  {canCancel ? (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="px-3 py-1.5 text-xs rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      Cancel Order
                    </button>
                  ) : (
                    order.status?.toUpperCase().startsWith('AWAITING') && (
                      <span className="text-xs text-gray-400">Cancel window expired</span>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {!sorted.length && (
        <div className="text-center py-8 bg-[#000021] rounded-lg border border-gray-800">
          <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 012-2m-6 9l2 2 4-4" />
          </svg>
          <p className="mt-2 text-gray-400">No orders yet</p>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
