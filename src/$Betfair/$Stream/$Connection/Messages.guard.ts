/*
 * Generated type guards for "Messages.ts".
 * WARNING: Do not manually change this file.
 */
import { CONNECTION_SUCCESS_RESPONSE, CONNECTION_FAILURE_RESPONSE, AUTHENTICATION_SUCCESS_RESPONSE } from "./Messages";

export function isConnectionSuccess(obj: any, _argumentName?: string): obj is CONNECTION_SUCCESS_RESPONSE {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "connection" &&
        typeof obj.connectionId === "string"
    )
}

export function isConnectionFailure(obj: any, _argumentName?: string): obj is CONNECTION_FAILURE_RESPONSE {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "status" &&
        obj.statusCode === "FAILURE" &&
        typeof obj.connectionId === "string" &&
        obj.connectionClosed === true &&
        typeof obj.errorMessage === "string" &&
        (obj.errorCode === "INVALID_INPUT" ||
            obj.errorCode === "TIMEOUT" ||
            obj.errorCode === "NO_APP_KEY" ||
            obj.errorCode === "INVALID_APP_KEY" ||
            obj.errorCode === "NO_SESSION" ||
            obj.errorCode === "INVALID_SESSION_INFORMATION" ||
            obj.errorCode === "NOT_AUTHORIZED" ||
            obj.errorCode === "MAX_CONNECTION_LIMIT_EXCEEDED" ||
            obj.errorCode === "TOO_MANY_REQUESTS" ||
            obj.errorCode === "SUBSCRIPTION_LIMIT_EXCEEDED" ||
            obj.errorCode === "INVALID_CLOCK" ||
            obj.errorCode === "UNEXPECTED_ERROR" ||
            obj.errorCode === "CONNECTION_FAILED")
    )
}

export function isAuthenticationSuccess(obj: any, _argumentName?: string): obj is AUTHENTICATION_SUCCESS_RESPONSE {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "status" &&
        typeof obj.id === "number" &&
        obj.statusCode === "SUCCESS" &&
        obj.connectionClosed === false &&
        typeof obj.connectionsAvailable === "number"
    )
}
