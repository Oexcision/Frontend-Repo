import React, { useState } from 'react';
import { BsKey } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { LuUser } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

const ToggleButton = ({ onClick }) => (
  <button className='ml-4 hover:bg-gray-100' onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  </button>
);

const Backdrop = ({ open, onClick }) => (
  <div className={`${open ? 'block' : 'hidden'} bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm`} onClick={onClick}></div>
);

const UserProfile = ({ user }) => (
  <div className="flex justify-center p-2 space-x-4">
    <img src={user.image_url || "https://via.placeholder.com/200"} alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
    <div>
      <h2 className="text-lg font-semibold">{user.username}</h2>
      <span className="flex items-center space-x-1">
        <a href="/users/me" className="text-xs hover:underline dark:text-gray-600">Ver perfil</a>
      </span>
    </div>
  </div>
);

const SidebarMenuItem = ({ icon, text, entity, page, handleLogout }) => {
  if (entity === "logout") {
    return (
      <li className='hover:bg-gray-200 text-gray-900 flex'>
        <button className="flex items-center p-2 space-x-3 w-full rounded-md" onClick={handleLogout}>
          {icon}
          <span>{text}</span>
        </button>
      </li>
    );
  } else {
    return (
      <li className='hover:bg-gray-200 text-gray-900'>
        <a href={entity ? `/${entity}/${page}` : `/`} className="flex items-center p-2 space-x-3 rounded-md">
          {icon}
          <span>{text}</span>
        </a>
      </li>
    );
  }
};


const SidebarMenu = ({ permissionsOfUser, handleLogout }) => (
    <div className="divide-y divide-gray-300 ">
                        
        <ul className="px-4 pt-2 pb-4 space-y-1 text-sm">

            {permissionsOfUser && permissionsOfUser.some(p => p.name === 'dashboard_view') && (
            <SidebarMenuItem
                icon={<RxDashboard />}
                text="Dashboard"/>
            )}
              
            {permissionsOfUser && permissionsOfUser.some(p => p.name === 'permission_view') && (
            <SidebarMenuItem
                icon={<BsKey/>}
                text="Permissions"
                entity={"permissions"}
                page={"list"}/>
            )}

            {permissionsOfUser && permissionsOfUser.some(p => p.name === 'role_view') && (
            <SidebarMenuItem
                icon={<GrUserAdmin />}
                text="Roles"
                entity={"roles"}
                page={"list"}/>
            )}

            {permissionsOfUser && permissionsOfUser.some(p => p.name === 'user_view') && (
            <SidebarMenuItem
                icon={<LuUser />}
                text="Users"
                entity={"users"}
                page={"list"}/>
            )}

        </ul>

        <ul className="px-4 pt-4 pb-2 space-y-1 text-sm">
            <SidebarMenuItem
                icon={<IoSettingsOutline />}
                text="Settings"/>

            <SidebarMenuItem
                icon={<FiLogOut />}
                text="Logout"
                entity={"logout"}
                handleLogout={handleLogout}/>
        </ul>

    </div>
);

const SideBar = ( { user, permissionsOfUser, handleLogout} ) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='bg-white py-3 fixed top-0 left-0 right-0 shadow-md'>

        <ToggleButton onClick={() => setOpen(true)} />

        <Backdrop open={open} onClick={() => setOpen(false)} />

        <div className={`${open ? "w-60" : "w-0"} bg-gray-50 text-gray-800 min-h-screen fixed top-0 left-0 transition-all duration-300`}>

          <div className={`${!open && "hidden"} pt-3`}>

            <ToggleButton onClick={() => setOpen(false)} />

            <UserProfile user={user}/>

            <SidebarMenu  permissionsOfUser={permissionsOfUser}
                          handleLogout={handleLogout}/>

          </div>

        </div>

      </div>
    </>
  );
};

export default SideBar;
