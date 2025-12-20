import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const LinearChart = ({ bookings }) => {
  const [data, setData] = useState([
    ["Date", "Price"]
  ])

  useEffect(() => {
    if (!Array.isArray(bookings) || bookings.length === 0) return

    const dataCopy = [
      ["Date", "Price"],
      ...bookings.map((booking) => [
        new Date(booking.booking_date).toLocaleDateString(),
        Number(booking.total_price)
      ])
    ]

    setData(dataCopy)
  }, [bookings])

  return (
    <Chart className='shadow-sm'
      chartType="LineChart"
      data={data}
      height="300px"
      options={{
        curveType: "function",
        legend: { position: "bottom" },
      }}
    />
  )
}

export default LinearChart
