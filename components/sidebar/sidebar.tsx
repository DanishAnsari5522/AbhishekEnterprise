import React, { useState, useEffect } from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { useRouter } from "next/router";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export const SidebarWrapper = () => {
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();
  const [auth, setAuth] = useState(false);

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Master Key"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  useEffect(() => {
    let auth1 = localStorage.getItem('user');
    if (auth1) {
      console.log(JSON.parse(auth1).data['type']);
      if (JSON.parse(auth1).data['phone'] === 9262786676) {
        setAuth(true);
      }
    }
  })

  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Dashboard"
              icon={<HomeIcon />}
              // isActive={auth ? router.pathname === '/' : router.pathname === '/accounts'}
              // href={auth ? "/" : "accounts"}
              isActive={router.pathname === '/'}
              href="/"
            />
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="light"
                  className="capitalize"
                >
                  {selectedValue}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
              >
                <DropdownItem key="Master Key">
                  <SidebarItem
                    isActive={router.pathname === '/admin/MasterKey/addItem'}
                    title="Supplier"
                    icon={<AccountsIcon />}
                    href={auth ? "/admin/MasterKey/addItem" : "/"}
                  />
                </DropdownItem>
                <DropdownItem key="number">

                </DropdownItem>
                <DropdownItem key="date">Date</DropdownItem>
                <DropdownItem key="single_date">Single Date</DropdownItem>
                <DropdownItem key="iteration">Iteration</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <SidebarMenu title="Main Menu">
              <CollapseItems
                icon={<BalanceIcon />}
                items={['Items', 'Product List', 'Head']}
                title="Master Key"
              />
              <CollapseItems
                icon={<BalanceIcon />}
                items={['Customer List', 'Customer Account List']}
                title="Customer"
              />
              <SidebarItem
                isActive={router.pathname === '/admin/Supplier'}
                title="Supplier"
                icon={<AccountsIcon />}
                href={auth ? "/admin/business" : "/"}
              />
              <SidebarItem
                isActive={router.pathname === '/admin/Purchase'}
                title="Purchase"
                icon={<BalanceIcon />}
                href={auth ? "/admin/business" : "/"}
              />
              <SidebarItem
                isActive={router.pathname === '/admin/business'}
                title="Stock"
                icon={<ViewIcon />}
                href={auth ? "/admin/business" : "/"}
              />
              <SidebarItem
                isActive={router.pathname === '/admin/Delivery'}
                title="Delivery Challan"
                icon={<BalanceIcon />}
                href={auth ? "/admin/business" : "/"}
              />
              <SidebarItem
                isActive={router.pathname === '/admin/Sale'}
                title="Sale"
                icon={<BalanceIcon />}
                href={auth ? "/admin/business" : "/"}
              />
              <SidebarItem
                isActive={router.pathname === '/admin/Services'}
                title="Services"
                icon={<BalanceIcon />}
                href={auth ? "/admin/business" : "/"}
              />
              <CollapseItems
                icon={<PaymentsIcon />}
                items={['Vendor Account', 'TDS Account', 'Payment Voucher']}
                title="Account"
              />
              <CollapseItems
                icon={<BalanceIcon />}
                items={['Create Invoice', 'Invoice Details']}
                title="Invoice"
              />

              <CollapseItems
                icon={<BalanceIcon />}
                items={['Labour & Mistri', 'Labour & Mistri Account']}
                title="Labour&Mistri"
              />

              <SidebarItem
                isActive={router.pathname === '/admin/Reports'}
                title="Reports"
                icon={<BalanceIcon />}
                href={auth ? "/admin/business" : "/"}
              />

              <CollapseItems
                icon={<BalanceIcon />}
                items={['Proposal', 'Proposal List']}
                title="Proposal"
              />
            </SidebarMenu>

          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
