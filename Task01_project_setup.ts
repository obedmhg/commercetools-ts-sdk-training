import { log } from "./utils/logger";
import { apiRoot } from "./handson/client";

// TODO: Complete the functions in
// ./handson/client.ts

// So this code displays the project configuration
// https://docs.commercetools.com/http-api-projects-project.html#get-project

// TODO: Get project settings
//apiRoot.get().execute().then(log).catch(log);

// TODO: Get shipping method by id
//apiRoot.shippingMethods().withKey({key:"ship-01"}).get({queryArgs: { expand : "taxCategory"}}).execute().then(log).catch(log);


// TODO: Get standard tax category by key
apiRoot.taxCategories().withKey({key:"std-vat"}).get().execute().then(log).catch(log);

