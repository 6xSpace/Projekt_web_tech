import { MainNav } from "@/components/MainNav";
import { navigationLinks } from "../../config/navigationLinks";
import { UserNav } from "../CustomersPage/components/UserNav";
import { useState, useEffect } from "react";

export const OrdersPage = () => {
  const [data, setData] = useState([]);

  const sublist = function (row) {
    // let efekt 
    let str = ''
    data.forEach((n) => {
      if (n.id == row) {
        n.product_ids.forEach((m) => { str = str + ', ' + m })
        console.log(n);
        // efekt = str
      }
    })

    return str.substring(1)
  }

  const listItems = data.map((n) =>
    <li className="grid grid-cols-3">
      <div className="text-center">{n.id}</div>
      <div className="text-center bg-slate-50">{n.customer_id}</div>
      <div className="text-center">{sublist(n.id)}</div>
    </li>
  );



  useEffect(() => {
    fetch(`http://127.0.0.1:8000/orders`)
      .then((response) => response.json())
      .then((content) => {
        setData(content)
        console.log(content)
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
      <div><ul>
        <li className="grid grid-cols-3 border-b-2">
          <div className="text-center">order's id</div>
          <div className="text-center">customer's id</div>
          <div className="text-center">ordered products' ids</div>
        </li>
        {listItems}
      </ul></div>
    </div>
  );
};
