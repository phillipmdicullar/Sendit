import React from 'react'

function Orders() {
  return (
    <div>
      <div className="summary-container">

      {/* HEADER */}
      <div className="summary-header">
        <h2>Parcel Orders</h2>

        <div className="summary-actions">
          <input type="text" placeholder="Search parcel..." />
          <button className="primary-btn"> Search parcel</button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Pickup</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Current Location</th>
              <th>Price</th>
              <th>Dimension</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,1].map((item) => (
              <tr key={item}>
                <td>#200</td>
                <td>Kware</td>
                <td>Nairobi CBD</td>

                <td>
                  <span className="status transit">
                    In Transit
                  </span>
                </td>

                <td>Kware Kwa Njenga</td>
                <td>KES 200</td>
                <td>20×8×1</td>

                <td className="actions">
                  <button className="view">View</button>
                  <button className="edit">Edit</button>
                  <button className="delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
    </div>
  )
}

export default Orders