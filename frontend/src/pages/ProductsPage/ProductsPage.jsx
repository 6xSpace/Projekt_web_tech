import { MainNav } from "@/components/MainNav";
import { navigationLinks } from "../../config/navigationLinks";
import { UserNav } from "../CustomersPage/components/UserNav";
import { useState, useEffect } from "react";

export const ProductsPage = () => {
  const [data, setData] = useState([]);
  // const [userList, setUserList] = useState([])


  const listItems = data.map((n) =>
    <li className="grid grid-cols-5">
      <div className="text-center">{n.id}</div>
      <div className="text-center bg-slate-50">{n.name}</div>
      <div className="text-center">{n.category}</div>
      <div className="text-center bg-slate-50">{n.description}</div>
      <div className="text-center">{n.price + ' $'}</div>
    </li>
  );
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/products`)
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
      <div>
        <ul>
          <li className="grid grid-cols-5 border-b-2">
            <div className="text-center">id</div>
            <div className="text-center">name</div>
            <div className="text-center">category</div>
            <div className="text-center">description</div>
            <div className="text-center">price</div>
          </li>
          {listItems}
        </ul>

      </div>
    </div>
  );
};
