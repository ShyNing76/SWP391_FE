import React, { useEffect, useState } from "react";
import { getAllBooking } from "../../../config/api.admin";
import { format } from "date-fns";
import { formatCurrency } from "../../../components/context/priceFormat";
import BookingDetailsModal from "../../../components/layout/Admin/Modals/BookingDetailModal";
import {
  FiFilter,
  FiMapPin,
  FiClock,
  FiCalendar,
} from "react-icons/fi";
import Pagination from "../../../components/layout/Shared/Pagination/Pagination";
const BookingsManagerPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filterLocation, setFilterLocation] = useState("");
  const [filterBookingType, setFilterBookingType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [page, setPage] = useState(1); // Trang hiện tại
  const [limit, setLimit] = useState(8); // Số lượng bookings trên 1 trang
  const [totalBookings, setTotalBookings] = useState(0); // Tổng số bookings
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang

  // Fetch bookings data
  const fetchDataBookings = async () => {
    setIsLoading(true);
      try {
        const response = await getAllBooking(page, limit); // Lấy bookings theo trang và số lượng bookings trên 1 trang
        if (response) {
          setBookings(response.data.rows);
          setTotalBookings(response.data.count);
          console.log("bookings", bookings);
        }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataBookings();
  }, [page, setPage]); // Lấy bookings theo trang

  useEffect(() => {
    if (totalBookings > 0) { // Nếu tổng số bookings > 0
      setTotalPages(Math.ceil(totalBookings / limit)); // Calculate total pages
    } else {
      setTotalPages(1); // Nếu tổng số bookings = 0 thì set tổng số trang = 1
    }
  }, [totalBookings, limit]); // Tính tổng số trang

  // Hold the location value
  const handleFilterLocation = (event) => {
    setFilterLocation(event.target.value);
  };

  // Hold the booking type value
  const handleFilterBookingType = (event) => {
    setFilterBookingType(event.target.value);
  };

  // Filter bookings by location and booking type
  const filteredBookings = bookings.filter(
    (booking) =>
      (filterLocation
        ? booking.Workspace.Building &&
          booking.Workspace.Building.location === filterLocation
        : true) &&
      (filterBookingType
        ? booking.BookingType.type === filterBookingType
        : true)
  ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  // Open modal truyền vào 1 booking để hiển thị chi tiết booking đó
  const handleOpenModal = (selectedBooking, bookingId) => {
    // param: selectedBooking là booking được chọn để hiển thị chi tiết
    setSelectedBooking(selectedBooking); // set selectedBooking là booking được chọn
    setOpenModal(true); // set openModal là true để hiển thị modal
  };

  // Đóng modal
  const handleCloseModal = () => {
    // đóng modal
    setSelectedBooking(null); // set selectedBooking là null
    setOpenModal(false); // set openModal là false để đóng modal
  };


  return (
    <div>
      <div className="p-4 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">View Bookings</h1>
          </div>
        </div>

        {/* Filters Card */}
        <div className="card bg-base-100  mb-6">
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Location Filter - spans 6 columns */}
              <div className="form-control md:col-span-6">
                <div className="join w-full">
                  <div className="join-item bg-base-200 px-3 flex items-center">
                    <FiMapPin className="w-5 h-5 text-base-content/70" />
                  </div>
                  <select
                    className="select select-bordered join-item w-full"
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                  >
                    <option value="">All Locations</option>
                    <option value="HCM">Ho Chi Minh City</option>
                    <option value="Hanoi">Hanoi</option>
                  </select>
                </div>
              </div>

              {/* Booking Type Filter - spans 6 columns */}
              <div className="form-control md:col-span-6">
                <div className="join w-full">
                  <div className="join-item bg-base-200 px-3 flex items-center">
                    <FiClock className="w-5 h-5 text-base-content/70" />
                  </div>
                  <select
                    className="select select-bordered join-item w-full"
                    value={filterBookingType}
                    onChange={(e) => setFilterBookingType(e.target.value)}
                  >
                    <option value="">All Booking Types</option>
                    <option value="Hourly">Hourly</option>
                    <option value="Daily">Daily</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              </div>

              {/* Filter Tags */}
              <div className="md:col-span-12 flex flex-wrap gap-2">
                {filterLocation && (
                  <div className="badge badge-primary gap-2">
                    <FiMapPin className="w-4 h-4" />
                    {filterLocation}
                    <button
                      className="btn btn-xs btn-ghost btn-circle"
                      onClick={() => setFilterLocation("")}
                    >
                      ✕
                    </button>
                  </div>
                )}
                {filterBookingType && (
                  <div className="badge badge-primary gap-2">
                    <FiClock className="w-4 h-4" />
                    {filterBookingType}
                    <button
                      className="btn btn-xs btn-ghost btn-circle"
                      onClick={() => setFilterBookingType("")}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        {!isLoading ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Building Name</th>
                  <th>Workspace Name</th>
                  <th>Booking Type</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Status</th>
                  <th>Total Price</th>
                  <th>View Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => (
                  <tr key={booking.booking_id}>
                    <td>{index + 1}</td>
                    <td>{booking.Workspace.Building.building_name}</td>
                    <td>{booking.Workspace.workspace_name}</td>
                    <td>{booking.BookingType.type}</td>
                    <td>
                      {format(
                        new Date(booking.start_time_date),
                        "dd/MM/yyyy HH:mm"
                      )}
                    </td>
                    <td>
                      {format(
                        new Date(booking.end_time_date),
                        "dd/MM/yyyy HH:mm"
                      )}
                    </td>
                    <td>
                      {booking.BookingStatuses.length > 0 ? (
                        <div
                          className={`badge text-sm mx-1 my-1 rounded-lg shadow-md ${
                            booking.BookingStatuses[0].status === "usage"
                              ? "badge-accent"
                              : booking.BookingStatuses[0].status === "paid"
                              ? "badge-warning"
                              : booking.BookingStatuses[0].status ===
                                "cancelled"
                              ? "badge-error"
                              : booking.BookingStatuses[0].status ===
                                "check-amenities"
                              ? "badge-primary"
                              : booking.BookingStatuses[0].status ===
                                "completed"
                              ? "badge-info"
                              : "badge-neutral"
                          }`}
                        >
                          {booking.BookingStatuses[0].status}
                        </div>
                      ) : (
                        <div className="badge badge-neutral text-lg mx-1 my-1 rounded-lg shadow-md">
                          N/A
                        </div>
                      )}
                    </td>
                    <td>{formatCurrency(booking.total_price)}</td>
                    <td>
                      <button
                        className="btn btn-sm hover:bg-gray-500"
                        onClick={() => handleOpenModal(booking)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
        ) : (
          <table>
            <tbody>
              <tr>
                <td colSpan="9">
                  <div className="flex justify-center items-center h-64">
                    <span className="loading loading-spinner loading-lg"></span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {/* Modal */}
        {openModal && selectedBooking && (
          <BookingDetailsModal
            booking={selectedBooking}
            onClose={handleCloseModal}
          />
        )}
      </div>
      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
};

export default BookingsManagerPage;