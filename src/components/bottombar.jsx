import React from 'react'

export default function Bottombar() {
  return (
   
    <div className="fixed-bottom d-flex justify-content-evenly">
          <div className="">
            <a href="/dashboard" className="icon btn">
                <i class="fa-solid fa-home"></i>
            </a>
            <p className="text-center mb-0 mt-1 text-sm">Home</p>
          </div>

        <div className="">
          <a href="/user-profile" className="icon btn">
              <i class="fa-solid fa-user"></i>
          </a>
          <p className="text-center mb-0 mt-1 text-sm">Profile</p>
        </div>

        <div className="">
            <a href="/withdraw" className="icon btn">
            <i class="fa-solid fa-arrow-up"></i>
            </a>
            <p className="text-center mt-1 mb-0 text-sm">Cash</p>
        </div>

        <div className="">
        <a href="/task" className="icon btn">
            <i class="fa-solid fa-money-bill-transfer"></i>
        </a>
        <p className="text-center mb-0 mt-1 text-sm">Task</p>
        </div>
    </div>
  )
}
