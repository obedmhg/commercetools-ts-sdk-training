import { createApiBuilderFromCtpClient as createImportApiBuilderFromCtpClient } from "@commercetools/importapi-sdk";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { AuthMiddlewareOptions, ClientBuilder, HttpMiddlewareOptions, PasswordAuthMiddlewareOptions } from "@commercetools/sdk-client-v2";
import fetch from "node-fetch";
import { ApiRoot, ImportApiRoot } from "../types/global";
import { Prefix, Config, readConfig } from "../utils/config";


const createApiClient = () => {
    const {
        clientId,
        clientSecret,
        host,
        oauthHost,
        projectKey
    } =  readConfig(Prefix.DEV);
    const authOptions: AuthMiddlewareOptions = {
        credentials: {clientId, clientSecret},
        host: oauthHost,
        projectKey,
        fetch
    };

    const httpOptions: HttpMiddlewareOptions = {
        host,
        fetch
    };


    const client = new ClientBuilder().withClientCredentialsFlow(authOptions).withHttpMiddleware(httpOptions).build();

    return createApiBuilderFromCtpClient(client).withProjectKey({projectKey});

}

const createImportApiClient = () => {
    const {
        clientId,
        clientSecret,
        host,
        oauthHost,
        projectKey
    } =  readConfig(Prefix.IMPORT);
    const authOptions: AuthMiddlewareOptions = {
        credentials: {clientId, clientSecret},
        host: oauthHost,
        projectKey,
        fetch
    };

    const httpOptions: HttpMiddlewareOptions = {
        host,
        fetch
    };


    const client = new ClientBuilder().withClientCredentialsFlow(authOptions).withHttpMiddleware(httpOptions).build();

    return createImportApiBuilderFromCtpClient(client).withProjectKeyValue({projectKey});  
}

const createStoreApiClient = () => {
    const {
        clientId,
        clientSecret,
        host,
        oauthHost,
        projectKey
    } =  readConfig(Prefix.STORE);
    const authOptions: AuthMiddlewareOptions = {
        credentials: {clientId, clientSecret},
        host: oauthHost,
        projectKey,
        fetch
    };

    const httpOptions: HttpMiddlewareOptions = {
        host,
        fetch
    };


    const client = new ClientBuilder().withClientCredentialsFlow(authOptions).withHttpMiddleware(httpOptions).build();

    return createApiBuilderFromCtpClient(client).withProjectKey({projectKey});}

const createMyApiClient = () => {
    const {
        clientId,
        clientSecret,
        host,
        oauthHost,
        projectKey,
        username,
        password
    } =  readConfig(Prefix.ME);
    const authOptions: PasswordAuthMiddlewareOptions = {
        credentials: {clientId, clientSecret, user : {username, password}},
        host: oauthHost,
        projectKey,
        fetch
    };

    const httpOptions: HttpMiddlewareOptions = {
        host,
        fetch
    };


    const client = new ClientBuilder().withPasswordFlow(authOptions).withHttpMiddleware(httpOptions).build();

    return createApiBuilderFromCtpClient(client).withProjectKey({projectKey});

}


export const apiRoot: ApiRoot = createApiClient();
export const importApiRoot: ImportApiRoot = createImportApiClient();
export const storeApiRoot: ApiRoot = createStoreApiClient();
export const myApiRoot: ApiRoot = createMyApiClient();