import { MainNav } from "@/components/MainNav";

import { DataTable } from "./components/DataTable";
import { Columns } from "./components/Columns";
import { UserNav } from "./components/UserNav";
import { navigationLinks } from "../../config/navigationLinks";

import { useState, useEffect } from "react";

export const CustomersPage = () => {
  const [data, setData] = useState([]);
  const [userList, setUserList] = useState([])

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/customers`)
      .then((response) => response.json())
      .then((content) => {
        setData(content)
        console.log(content)
        let newList = []
        for (let n = 0; n < content.length; n++) {
          let element = {
            id: content[n].id,
            fullname: content[n].name + ' ' + content[n].surname,
            phoneNumber: content[n].phone_number,
            email: content[n].email,
          }
          newList.push(element)
        }
        setUserList(newList)
        console.log(newList);
      })
    // fetch(`http://127.0.0.1:8000/customers`)
    //   .then((response) => response.json())
    //   .then((actualData) => console.log(actualData));
  }, []);

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" links={navigationLinks} />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
          <DataTable
            data={userList
              //   [
              //   {
              //     id: 1,
              //     fullname: "Test",
              //     email: "test@example.com",
              //     phoneNumber: "000-000-000",
              //   },
              // ]
            }
            columns={Columns}
          />
        </div>
      </div>
    </div>
  );
};
