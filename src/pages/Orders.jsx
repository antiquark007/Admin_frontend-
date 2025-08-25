import React from 'react'
import OrdersTable from '../components/orders/OrdersTable.jsx'
import OrdersOverview from '../components/orders/OrdersOverview.jsx'

function Orders() {
  return (
    <div>
      <h2>Orders Content</h2>
      <OrdersTable />
      {/* <OrdersOverview /> */}
    </div>
  )
}

export default Orders