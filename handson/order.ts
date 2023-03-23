import { ClientResponse, Cart, CustomerSignin, CustomerSignInResult, Order, OrderFromCartDraft, OrderState } from "@commercetools/platform-sdk";
import { apiRoot } from "./client";
import { getCustomerByKey } from "./customer";

export const createCart = (customerKey: string): Promise<ClientResponse<Cart>> => {
    return getCustomerByKey(customerKey).then(customer => {
        return apiRoot.carts().post({
            body : { 
                    currency : "EUR", 
                    customerId:  customer.body.id,
                    customerEmail: customer.body.email,
                    deleteDaysAfterLastModification: 15,
                    inventoryMode: "None",
                    shippingAddress: customer.body.addresses.find(address=> address.id === customer.body.defaultShippingAddressId),
                    country: customer.body.addresses.find(address=> address.id === customer.body.defaultShippingAddressId)?.country
                }
        }).execute()
    });
}

export const createAnonymousCart = (): Promise<ClientResponse<Cart>> =>
    apiRoot
        .carts()
        .post({
            body: {
                currency: "EUR",
                country: "DE"
            }
        })
        .execute();

export const customerSignIn = (customerDetails: CustomerSignin): Promise<ClientResponse<CustomerSignInResult>> =>
    apiRoot
        .login()
        .post({
            body: customerDetails
        })
        .execute();

export const getCartById = (ID: string): Promise<ClientResponse<Cart>> =>
    apiRoot
        .carts()
        .withId({ ID })
        .get()
        .execute();

export const addLineItemsToCart = (cartId: string, arrayOfSKUs: Array<string>): Promise<ClientResponse<Cart>> => {
    return getCartById(cartId).then(cart => {
        return apiRoot.carts().withId({ID: cartId}).post({
            body : {
                version : cart.body.version,
                actions : arrayOfSKUs.map(sku => {
                    return {
                        action: "addLineItem",
                        sku,
                        quantity: 4
                    }
                })
            }
        }).execute();
    });
    
}

export const addDiscountCodeToCart = (cartId: string, discountCode: string): Promise<ClientResponse<Cart>> => {
    return getCartById(cartId)
        .then(cart => apiRoot
            .carts()
            .withId({ ID: cartId })
            .post({
                body: {
                    version: cart.body.version,
                    actions: [{
                        action: "addDiscountCode",
                        code: discountCode
                    }]
                }
            })
            .execute()
        );
}

export const recalculate = (cartId: string): Promise<ClientResponse<Cart>> =>
    getCartById(cartId).then(cart =>
        apiRoot
            .carts()
            .withId({ ID: cartId })
            .post({
                body: {
                    version: cart.body.version,
                    actions: [{
                        action: "recalculate",
                    }]
                }
            })
            .execute()
    );

export const setShippingMethod = async (cartId: string): Promise<ClientResponse<Cart>> => {

    const matchingShippingMethod = await apiRoot
        .shippingMethods()
        .matchingCart()
        .get({
            queryArgs: {
                cartId
            }
        })
        .execute()
        .then(response => response.body.results[0]);

    return getCartById(cartId).then(cart =>
        apiRoot
            .carts()
            .withId({ ID: cartId })
            .post({
                body: {
                    version: cart.body.version,
                    actions: [{
                        action: "setShippingMethod",
                        shippingMethod: {
                            typeId: "shipping-method",
                            id: matchingShippingMethod.id
                        }
                    }]
                }
            })
            .execute()
    );

}


export const createOrderFromCart = (cartId: string): Promise<ClientResponse<Order>> => {
    return createOrderFromCartDraft(cartId).then(orderDraft => {
        return apiRoot.orders().post({
             body : orderDraft
        }).execute();
    });
}

const createOrderFromCartDraft = (cartId: string): Promise<OrderFromCartDraft> =>
    getCartById(cartId).then(cart => {
        return {
            id: cart.body.id,
            version: cart.body.version,
        };
    });

export const getOrderById = (ID: string): Promise<ClientResponse<Order>> =>
    apiRoot
        .orders()
        .withId({ ID })
        .get()
        .execute();

export const updateOrderCustomState = (orderId: string, customStateKey: string): Promise<ClientResponse<Order>> => {
    return getOrderById(orderId)
        .then(order => apiRoot
            .orders()
            .withId({ ID: orderId })
            .post({
                body: {
                    version: order.body.version,
                    actions: [{
                        action: "transitionState",
                        state: {
                            key: customStateKey,
                            typeId: "state"
                        }
                    }]
                }
            })
            .execute()
        );
}

export const setOrderState = (orderId: string, stateName: OrderState): Promise<ClientResponse<Order>> => {
    return getOrderById(orderId)
        .then(order => apiRoot
            .orders()
            .withId({ ID: orderId })
            .post({
                body: {
                    version: order.body.version,
                    actions: [{
                        action: "changeOrderState",
                        orderState: stateName
                    }]
                }
            })
            .execute()
        );
}

export const addPaymentToCart = (cartId: string, paymentId: string): Promise<ClientResponse<Cart>> =>
    getCartById(cartId)
        .then(cart =>
            apiRoot
                .carts()
                .withId({ ID: cartId })
                .post({
                    body: {
                        version: cart.body.version,
                        actions: [{
                            action: "addPayment",
                            payment: {
                                typeId: "payment",
                                id: paymentId
                            }
                        }]
                    }
                })
                .execute()
        );

