from fastapi import APIRouter, HTTPException, Query

from .storage import get_customers_storage, get_orders_storage, get_products_storage
from .schema import CustomerCreateSchema, CustomerUpdateSchema, Customer

router = APIRouter()


CUSTOMERS_STORAGE = get_customers_storage()
PRODUCTS_STORAGE = get_products_storage()
ORDERS_STORAGE = get_orders_storage()


@router.get("/customers")
async def get_customers() -> list[Customer]:
    print(CUSTOMERS_STORAGE)
    return list(get_customers_storage().values())


@router.get("/customers/{customer_id}")
async def get_customer(customer_id: int) -> Customer:
    try:
        return CUSTOMERS_STORAGE[customer_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )



@router.patch("/customers/{customer_id}")
async def update_customer(
    customer_id: int, updated_customer: CustomerUpdateSchema
) -> Customer:
    try:
        new_customer = {}
        updated_customer = updated_customer.dict()
        for n in CUSTOMERS_STORAGE[customer_id]:
            print(n)
            print(updated_customer)
            
            if n[0] in updated_customer and updated_customer[n[0]] != None:
                new_customer[n[0]] = updated_customer[n[0]]
            else:
                new_customer[n[0]] = n[1]
        print(new_customer)
        CUSTOMERS_STORAGE[customer_id] = new_customer
        return new_customer
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )


@router.delete("/customers/{customer_id}")
async def delete_customer(customer_id: int) -> None:
    try:
        del CUSTOMERS_STORAGE[customer_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )


@router.post("/customers/")
async def create_customer(customer: CustomerCreateSchema) -> Customer:
   pass



@router.post("/customers/add-customer")
async def add_customer(customer: CustomerCreateSchema) -> Customer:
    print(len(CUSTOMERS_STORAGE))

    # print(typeof(customer))
    customer = customer.dict()

    new_customer = Customer(
        id = len(CUSTOMERS_STORAGE)+1,
        name = customer['name'],
        surname = customer['surname'],
        email = customer['email'],
        phone_number = customer['phone_number'],
    )

    CUSTOMERS_STORAGE[len(CUSTOMERS_STORAGE)+1] = new_customer
    print(len(CUSTOMERS_STORAGE))
    return new_customer
    


@router.get("/products")
async def get_products() -> list[dict]:
    return list(get_products_storage().values())

@router.get("/orders")
async def get_orders() -> list[dict]:
    return list(get_orders_storage().values())