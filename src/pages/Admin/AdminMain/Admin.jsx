import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../components/context/auth.context";
import { getUserAuthen } from "../../../config/api";
import AdminHeader from "../../../components/layout/Admin/AdminHeader/AdminHeader";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../../components/layout/Admin/AdminSidebar/AdminSidebar";

const Admin = () => {
  const { auth, setAuth, appLoading, setAppLoading, setRoleId, roleId } =
    useContext(AuthContext);
  const [staff, setStaff] = useState(null);

  const [refresh, setRefresh] = useState(false);

  // function render both sideBar and outlet
  const handleUpdate = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const fetchAccount = async () => {
      // Kiểm tra nếu đã có auth trong localStorage thì không cần fetch lại
      if (!auth.isAuthenticated) {
        setAppLoading(true);
        try {
          const res = await getUserAuthen();
          if (res && res.data && res.err === 0) {
            setAuth({
              isAuthenticated: true,
            });
            setRoleId(res.data.role_id);
          } else {
            setAuth({
              isAuthenticated: false,
            });
            setRoleId(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Xóa localStorage khi có lỗi
          localStorage.removeItem("auth");
          localStorage.removeItem("roleId");
        } finally {
          setAppLoading(false);
        }
      }
    };

    fetchAccount();
  }, [setAuth, setRoleId, setAppLoading, auth.isAuthenticated]);

  useEffect(() => {
    const fetchUser = async () => {
      setAppLoading(true);
      try {
        const res = await getUserAuthen();
        if (res && res.data && res.err === 0) {
          setStaff(res.data);
        } else {
          setStaff(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setAppLoading(false);
      }
    };

    fetchUser();
  }, [refresh]);

  return (
    <>
      {appLoading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="sticky top-0 z-50 shadow-lg">
            <AdminHeader staff={staff} />
          </div>

          <div className="sidebar-container drawer lg:drawer-open">
            {/* Sidebar */}
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <main className="drawer-content items-start w-full h-full p-4">
              {/* Page content here */}
              <Outlet context={{ handleUpdate }} />
            </main>
            <div className="sidebar-container drawer lg:drawer-open">
              <input
                id="my-drawer-2"
                type="checkbox"
                className="drawer-toggle"
              />
              <AdminSidebar />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Admin;
