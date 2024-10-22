import { Link, Outlet, useLocation } from "react-router-dom";
import { TfiStatsUp } from "react-icons/tfi";
import { GoPeople } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { PiIdentificationBadge } from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import { PiBuildingsLight } from "react-icons/pi";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { LuCalendarCheck } from "react-icons/lu";
import { RiCoupon3Line } from "react-icons/ri";
import { IoIosArrowRoundForward } from "react-icons/io";
import React, { PureComponent } from 'react';
import { format } from 'date-fns';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import io from "socket.io-client";
import "./AdminDashboardPage.scss";
import { useState } from "react";



const data = [
  { name: '1', uv: 4000, pv: 2400, amt: 2400, },
  { name: '2', uv: 3000, pv: 1398, amt: 2210, },
  { name: '3', uv: 2000, pv: 9800, amt: 2290, },
  { name: '4', uv: 2780, pv: 3908, amt: 2000, },
  { name: '5', uv: 1890, pv: 4800, amt: 2181, },
  { name: '6', uv: 2390, pv: 3800, amt: 2500, },
  { name: '7', uv: 3490, pv: 4300, amt: 2100, },
  { name: '8', uv: 3490, pv: 4300, amt: 2100, },
  { name: '9', uv: 3490, pv: 4300, amt: 2100, },
  { name: '10', uv: 3490, pv: 4300, amt: 2100, },
  { name: '11', uv: 3490, pv: 4300, amt: 2100, },
  { name: '12', uv: 3490, pv: 4300, amt: 2100, },
];

const data2 = [
  { name: '1', uv: 4000, pv: 2400, amt: 2400, },
  { name: '2', uv: 3000, pv: 1398, amt: 2210, },
  { name: '3', uv: 2000, pv: 9800, amt: 2290, },
  { name: '4', uv: 2780, pv: 3908, amt: 2000, },
  { name: '5', uv: 1890, pv: 4800, amt: 2181, },
  { name: '6', uv: 2390, pv: 3800, amt: 2500, },
  { name: '7', uv: 3490, pv: 4300, amt: 2100, },
  { name: '8', uv: 3490, pv: 4300, amt: 2100, },
  { name: '9', uv: 3490, pv: 4300, amt: 2100, },
  { name: '10', uv: 3490, pv: 4300, amt: 2100, },
  { name: '11', uv: 3490, pv: 4300, amt: 2100, },
  { name: '12', uv: 3490, pv: 4300, amt: 2100, },
];

const AdminDashboard = () => {
  const socket = io('http://localhost:5000');
  const [ravenue, setRavenue] = useState();
  const [booking, setBookings] = useState();
  const [voucher, setVoucher] = useState();
  const [manager, setManager] = useState();
  const [staff, setStaff] = useState();
  const [customer, setCustomer] = useState();
  const [building, setBuilding] = useState();
  const [amenity, setAmenity] = useState();
  const [workspace, setWorkspace] = useState();
  const [top5Customers, setTop5Customers] = useState([]);
  const [top5Bookings, setTop5Bookings] = useState([]);

  const handleRavenueSubmit = (event) => {
    event.preventDefault();
    socket.emit("newCompletedBookingInMonth");
    socket.on("totalPricesInMonth", (data) => {
      setRavenue(data);
    });
  }

  const handleBookingsSubmit = (event) => {
    event.preventDefault();
    socket.emit("newBooking");
    socket.on("totalBooking", (data) => {
      setBookings(data);
    });
  }

  const handleVoucherSubmit = (event) => {
    event.preventDefault();
    socket.emit("newVoucher");
    socket.on("totalVoucher", (data) => {
      setVoucher(data);
    });
  }

  const handleManagerSubmit = (event) => {
    event.preventDefault();
    socket.emit("newManager");
    socket.on("totalManager", (data) => {
      setManager(data);
    });
  }

  const handleStaffSubmit = (event) => {
    event.preventDefault();
    socket.emit("newStaff");
    socket.on("totalStaff", (data) => {
      setStaff(data);
    });
  }

  const handleCustomerSubmit = (event) => {
    event.preventDefault();
    socket.emit("newCustomer");
    socket.on("totalCustomer", (data) => {
      setCustomer(data);
    });
  }

  const handleBuildingSubmit = (event) => {
    event.preventDefault();
    socket.emit("newBuilding");
    socket.on("totalBuilding", (data) => {
      setBuilding(data);
    });
  }

  const handleAmenitySubmit = (event) => {
    event.preventDefault();
    socket.emit("newAmenities");
    socket.on("totalAmenities", (data) => {
      setAmenity(data);
    });
  }

  const handleWorkspaceSubmit = (event) => {
    event.preventDefault();
    socket.emit("newWorkspace");
    socket.on("totalWorkspace", (data) => {
      setWorkspace(data);
    });
  }

  const handleTop5CustomersSubmit = (event) => {
    event.preventDefault();
    socket.emit("newFiveCustomer");
    socket.on("fiveCustomer", (data) => {
      setTop5Customers(data);
    });
  }

  const handleTop5BookingsSubmit = (event) => {
    event.preventDefault();
    socket.emit("newFiveBooking");
    socket.on("fiveBooking", (data) => {
      setTop5Bookings(data);
    });
  }
  return (
    <div className="max-w-screen *:box-border w-full h-full flex flex-col overflow-hidden">

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Gernaral Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/*General Overview*/}
          <div className="card shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <TfiStatsUp className="mt-1 size-5"/>
                <div className="stat-title ml-2 text-xl">Total Ravenue in Month</div>
              </div>
              <div className="stat-value text-5xl">{ravenue}</div>
              <button onClick={handleRavenueSubmit}>Send</button>
            </div>
          </div>

          <div className="card shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <LuCalendarCheck className="mt-1 size-5"/>
                <div className="stat-title ml-2 text-xl">Total Bookings</div>
              </div>
              <div className="stat-value text-5xl">{booking}</div>
              <button onClick={handleBookingsSubmit}>Send</button>
            </div>
          </div>

          <div className="card shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <RiCoupon3Line className="mt-1 size-5"/>
                <div className="stat-title ml-2 text-xl">Total Vouchers</div>
              </div>
              <div className="stat-value text-5xl">{voucher}</div>
              <button onClick={handleVoucherSubmit}>Send</button>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <PiIdentificationBadge className="mt-1 size-5"/>
                <div className="stat-title ml-2 text-xl">Total Managers</div>
              </div>
              <div className="stat-value text-5xl">{manager}</div>
              <button onClick={handleManagerSubmit}>Send</button>

            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <GoPerson className="mt-1 size-5"/>
                <div className="stat-title ml-2 text-xl">Total Staffs</div>
              </div>
              <div className="stat-value text-5xl">{staff}</div>
              <button onClick={handleStaffSubmit}>Send</button>

            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <GoPeople className="mt-1 size-5"/>
                <div className="stat-title ml-2 text-xl">Total Customers</div>
              </div>
              <div className="stat-value text-5xl">{customer}</div>
              <button onClick={handleCustomerSubmit}>Send</button>

            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <IoExtensionPuzzleOutline className="mt-1 size-5"/>
                <div className="stat-title ml-2 text-xl">Total Amenities</div>
              </div>
              <div className="stat-value text-5xl">{amenity}</div>
              <button onClick={handleAmenitySubmit}>Send</button>

            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <PiBuildingsLight className="mt-1 size-5"/>
                <div className="stat-title ml-2 text-xl">Total Buildings</div>
              </div>
              <div className="stat-value text-5xl">{building}</div>
              <button onClick={handleBuildingSubmit}>Send</button>

            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <RxDashboard className="mt-1 size-5"/>
                <div className="stat-title ml-2 text-xl">Total Workspaces</div>
              </div>
              <div className="stat-value text-5xl">{workspace}</div>
              <button onClick={handleWorkspaceSubmit}>Send</button>

            </div>
          </div>

        </div>

        

        {/*Revenue & Guest*/}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Revenue & Booking Analysis</h2>
          <div className="flex w-full flex-col lg:flex-row">
            
            <div className="rounded-box grid h-32 flex-grow">
            <p className="text-xl font-semibold mb-4">Revenue</p>
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart width={730} height={250} data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="divider"></div>
            
            <div className="rounded-box grid h-32 flex-grow">
            <p className="text-xl font-semibold mb-4">Guest Bookings</p>
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart width={730} height={250} data={data2}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-96">
          <h2 className="text-2xl font-bold mb-4">Bookings & Customers</h2>
          <div className="flex w-full">
            <div className="rounded-box grid flex-grow">
              <p className="text-xl font-semibold mb-4">Recent overview</p>
              <div className="bg-base-200 p-4 rounded-lg shadow-lg">
                {top5Bookings.map((booking, index) => (
                  <div key={index} className="border-b py-2 flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{booking.Customer.User.name}</p>
                      <p>{booking.Workspace.workspace_name}</p>
                      <p className="text-sm">{booking.Workspace.WorkspaceType.workspace_type_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{format(new Date(booking.createdAt), "dd/MM/yyyy HH:mm:ss")}</p>
                      {booking.BookingStatuses.map((status, index) => (
                        <p key={index}>{status.status}</p>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="mt-7 text-right">
                  <button className="btn btn-neutral btn-sm">See more<IoIosArrowRoundForward className="size-5"/></button>
                </div>
                <button onClick={handleTop5BookingsSubmit}>Send</button>
              </div>
            </div>

          <div className="divider-horizontal"></div>
            <div className="rounded-box grid flex-grow">
              <p className="text-xl font-semibold mb-4">Top 5 VIP Customer</p>
              <div className="bg-base-200 p-4 rounded-lg shadow-lg">
                <table className="table-auto w-full">
                  <tbody>
                    {top5Customers.map((customer, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2 text-3xl font-bold"
                          style={{
                            color: index === 0 ? '#d4af37' : index === 1 ? 'silver' : index === 2 ? '#cd7f32' : 'inherit',
                          }}
                        >
                          #{index + 1}
                        </td>
                        <td className="px-4 py-2 text-2xl font-semibold">{customer.User.name}</td>
                        <td className="px-4 py-2 text-right text-xl font-medium">{customer.point} ZyCoin</td>
                      </tr>
                    ))}
                  </tbody>
                  <button onClick={handleTop5CustomersSubmit}>Send</button>
                </table>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default AdminDashboard;
