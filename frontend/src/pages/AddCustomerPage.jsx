import { MainNav } from "@/components/MainNav";
import { navigationLinks } from "../config/navigationLinks";
import { UserNav } from "./CustomersPage/components/UserNav";

import { useState, useEffect } from "react";
// import { Button } from "react-day-picker";
import { Button } from "@/components/ui/button";

export const AddCustomerPage = () => {

  const [newName, setNewName] = useState()
  const [newSurname, setNewSurname] = useState()
  const [newNumber, setNewNumber] = useState()
  const [newEmail, setNewEmail] = useState()

  const handleName = function (event) {
    setNewName(event.target.value)
  }
  const handleSurname = function (event) {
    setNewSurname(event.target.value)
  }
  const handleEmail = function (event) {
    setNewEmail(event.target.value)
  }
  const handleNumber = function (event) {
    setNewNumber(event.target.value)
  }
  const sendData = async function () {
    if (newEmail && newName && newSurname && newNumber) {
      let dataToSend = {
        name: newName,
        surname: newSurname,
        email: newEmail,
        phone_number: newNumber
      }
      console.log(dataToSend);
      fetch('http://127.0.0.1:8000/customers/add-customer', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      }).then((res) => {
        console.log(res)
        alert('użytkownik dodany!')
        setNewName('')
        setNewSurname('')
        setNewNumber('')
        setNewEmail('')
      });

    } else {
      alert('Musisz uzupełnić wszystkie dane!')
    }

  }
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
          <h2 className="text-3xl font-bold tracking-tight">Add customer</h2>

        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
          <span>Name:</span>
          <input type="text" placeholder="Jan" value={newName} onChange={handleName} />
          <span>Surname:</span>
          <input type="text" placeholder="Brzechwa" value={newSurname} onChange={handleSurname} />
          <span>Email:</span>
          <input type="text" placeholder="jego.email@nwm.pl" value={newEmail} onChange={handleEmail} />
          <span>Phone number:</span>
          <input type="text" placeholder="123-345-098" value={newNumber} onChange={handleNumber} />
          <Button onClick={sendData}>submit</Button>
        </div>
      </div>
    </div>
  );
};
