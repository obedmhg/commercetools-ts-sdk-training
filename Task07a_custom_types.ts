import { TypeDraft } from "@commercetools/platform-sdk";
import { apiRoot } from "./handson/client";
import { log } from "./utils/logger";

const typeDraft: TypeDraft = {
    key: "om-allowed-to-place-orders",
    name: {
        "de": "om allowed to place orders",
        "en": "om allowed to place orders"
    },
    description: {
        "de": "allow a customer to place orders",
        "en": "allow a customer to place orders"
    },
    resourceTypeIds: ["customer"],
    fieldDefinitions: [{
        type: {
            name: "Boolean"
        },
        name: "allowed-to-place-orders",
        label: {
            "de": "Allowed to place orders",
            "en": "Allowed to place orders"
        },
        required: false,
    }]
}

const typeDraft2: TypeDraft = {
    key: "om-custom-fields",
    name: {
        "de": "om custom fields",
        "en": "om custom fields"
    },
    description: {
        "de": "om custom fields",
        "en": "om custom fields"
    },
    resourceTypeIds: ["customer"],
    fieldDefinitions: [{
        type: {
            name: "String"
        },
        name: "Nickname",
        label: {
            "de": "NickName",
            "en": "NickName"
        },
        required: false,
    }]
}

apiRoot
    .types()
    .post({ body: typeDraft2 })
    .execute()
    .then(log)
    .catch(log);