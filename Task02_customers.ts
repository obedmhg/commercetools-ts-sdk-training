import { CustomerDraft } from "@commercetools/platform-sdk";
import {
    createCustomer,
    getCustomerById,
    getCustomerByKey,
    createCustomerToken,
    confirmCustomerEmail,
    assignCustomerToCustomerGroup,
} from "./handson/customer";
import { log } from "./utils/logger";

const customerDraft: CustomerDraft = {
    firstName: "Obed",
    lastName: "Murillo",
    email: "om@test.com",
    password: "password",
    key: "om-customer",
    addresses: [
        {
            country: "US",
            key: "om-customer-address"
        }
    ],
    defaultBillingAddress: 0,
    defaultShippingAddress: 0
};

//createCustomer(customerDraft).then(log).catch(log);

getCustomerByKey(customerDraft.key!).then(log).catch(log);

/*
 getCustomerByKey(customerDraft.key!)
     .then(createCustomerToken)
     .then(confirmCustomerEmail)
     .then(log)
     .catch(log);
*/
 assignCustomerToCustomerGroup(customerDraft.key!, "indoor-customers")
     .then(log)
     .catch(log);
