import React, { useEffect, useState } from 'react';
import './RoomSchedule.scss';
import RoomModal from '../../building/RoomModal/RoomModal'

const Daily = ({ selectedDate, selectedStatus, workspaceType }) => {
    const [roomStatus, setRoomStatus] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const roomPrefix = {
        'Single POD': 'WY1',
        'Double POD': 'WY1',
        'Quad POD': 'WY1',
        'Working Room': 'WY2',
        'Meeting Room': 'WY3',
        'Event Space': 'WY0'
    };

    const roomSuffix = {
        'Single POD': 'S',
        'Double POD': 'D',
        'Quad POD': 'Q',
        'Working Room': 'W',
        'Meeting Room': 'M',
        'Event Space': 'E'
    };

    const generateRooms = (workspaceType, count) => {
        return Array.from({ length: count }, (_, i) => {
            const number = String(i + 1);
            return `${roomPrefix[workspaceType]}${number}${roomSuffix[workspaceType]}`;
        });
    };

    const handleCellClick = (room, status) => {
        let bookingDetails = null;
        if (status === "booked") {
            bookingDetails = {
                id: "",
                customerName: "",
                date: "2024-09-20",
            };
        }
        
        setSelectedRoom({ id: room, status, type: workspaceType, bookingDetails });
        setModalOpen(true);
    };
    
    const rooms = generateRooms(workspaceType, 5);

    const monthDays = {
        1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30,
        7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
    };

    useEffect(() => {
        const selectedMonth = new Date(selectedDate).getMonth() + 1;
        const daysInMonth = monthDays[selectedMonth];
        const newRoomStatus = generateRoomStatus(daysInMonth);
        setRoomStatus(newRoomStatus);
    }, [selectedDate, workspaceType]);

    const generateRoomStatus = (daysInMonth) => {
        const statusOptions = ['available', 'booked', 'in_use', 'under_maintenance'];
        const generatedStatus = {};

        rooms.forEach(room => {
            generatedStatus[room] = Array.from({ length: daysInMonth }, () => {
                return statusOptions[Math.floor(Math.random() * statusOptions.length)];
            });
        });

        return generatedStatus;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'available':
                return '#D9D9D9'; 
            case 'booked':
                return 'rgba(76, 252, 56, 0.5)'; 
            case 'in_use':
                return 'rgba(55, 156, 250, 0.5)'; 
            case 'under_maintenance':
                return 'rgba(255, 0, 0, 0.5)'; 
            default:
                return 'transparent'; 
        }
    };

    return (
        <div className='room-schedule'>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {Array.from({ length: monthDays[new Date(selectedDate).getMonth() + 1] }, (_, i) => i + 1).map((day) => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr key={room}>
                            <td>{room}</td>
                            {roomStatus[room]?.map((status, index) => {
                                if (selectedStatus && selectedStatus !== status) {
                                    return <td key={index} style={{ backgroundColor: 'transparent' }}></td>;
                                }
                                return (
                                    <td 
                                        key={index} 
                                        style={{ backgroundColor: getStatusColor(status) }} 
                                        onClick={() => handleCellClick(room, status)}
                                    ></td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalOpen && (
                <RoomModal 
                    isOpen={modalOpen} 
                    onClose={() => setModalOpen(false)} 
                    room={selectedRoom} 
                />
            )}
        </div>
    );
};

export default Daily;
