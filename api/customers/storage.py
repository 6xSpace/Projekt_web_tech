from functools import lru_cache

from .schema import Customer

CustomerStorageType = dict[int, Customer]

CUSTOMERS: CustomerStorageType = {
    1: Customer(
        name = "Place",
        surname = "Holder",
        email = "przykladowy.user@na.poczatek",
        phone_number = "213-769-666",
        id = 1
    )
}


PRODUCTS = {
    1: {
        'name': 'nazwa',
        'price': 30,
        'category': 'kategoria',
        'description': 'opis',
        'id': 1
    },
    2: {
        'name': 'rzecz',
        'price': 15,
        'category': 'rzeczy',
        'description': 'nwm coś',
        'id': 2
    },
    3: {
        'name': 'przedmiot',
        'price': 35,
        'category': 'rzeczy',
        'description': 'w zasadzie to rzecz',
        'id': 3
    },
    4: {
        'name': 'droga rzecz',
        'price': 1000,
        'category': 'drogie rzeczy',
        'description': 'dużo pieniędzy za tą rzecz',
        'id': 4
    }
}

ORDERS = {
    1: {
        'customer_id': 1,
        'product_ids': [2, 3],
        'id': 1
    },
    2: {
        'customer_id': 1,
        'product_ids': [3],
        'id': 2
    },
    3: {
        'customer_id': 1,
        'product_ids': [2, 4],
        'id': 3
    }
}

@lru_cache(maxsize=1)
def get_customers_storage() -> CustomerStorageType:
    return CUSTOMERS

@lru_cache(maxsize=1)
def get_products_storage() -> dict[int, dict[str, int]]:
    return PRODUCTS

@lru_cache(maxsize=1)
def get_orders_storage() -> dict[int, dict[int, list[int]]]:
    return ORDERS
