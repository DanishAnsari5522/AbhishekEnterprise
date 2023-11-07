import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from 'react';
import { DarkModeSwitch } from "./darkmodeswitch";
import { useRouter } from 'next/router';

export const UserDropdown = () => {
  const router = useRouter();
  const [emial, setEmail] = useState();
  const [name, setName] = useState('d');
  const logout = () => {
    localStorage.removeItem("user");
    router.reload();
  }
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser !== null) {
      const auths = JSON.parse(storedUser);
      setName(auths.data.name);
    }
  })
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            showFallback
            as="button"
            size="md"
            src="https://images.unsplash.com/broken"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>Signed in as</p>
          <p>{name}</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="logout" color="danger" className="text-danger " onClick={logout}>
          Log Out
        </DropdownItem>
        <DropdownItem key="switch">
          <DarkModeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
