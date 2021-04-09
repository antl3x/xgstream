/*
 * Generated type guards for "MessageResponse.ts".
 * WARNING: Do not manually change this file.
 */
import { ConnectionSuccess, ConnectionFailure, AuthenticationSuccess, MarketHeartbeat, MarketLatency, MarketSubImage, MarketReSubImage, RunnerAtbChange, RunnerAtlChange, RunnerBatbChange, RunnerBatlChange, RunnerBdatbChange, RunnerBdatlChange, RunnerTrdChange, RunnerTvChange, RunnerLtpChange, RunnerSpbChange, RunnerSplChange, RunnerSpnChange, RunnerSpfChange, MarketTvChange, MarketDefinitionChange, MarketsChange } from "./MessageResponse";

export function isConnectionSuccess(obj: any, _argumentName?: string): obj is ConnectionSuccess {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "connection" &&
        typeof obj.connectionId === "string"
    )
}

export function isConnectionFailure(obj: any, _argumentName?: string): obj is ConnectionFailure {
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

export function isAuthenticationSuccess(obj: any, _argumentName?: string): obj is AuthenticationSuccess {
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

export function isMarketHeartbeat(obj: any, _argumentName?: string): obj is MarketHeartbeat {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "mcm" &&
        typeof obj.id === "number" &&
        typeof obj.clk === "string" &&
        typeof obj.pt === "number" &&
        obj.ct === "HEARTBEAT"
    )
}

export function isMarketLatency(obj: any, _argumentName?: string): obj is MarketLatency {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "mcm" &&
        obj.status === 503
    )
}

export function isMarketSubImage(obj: any, _argumentName?: string): obj is MarketSubImage {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "mcm" &&
        typeof obj.id === "number" &&
        typeof obj.initialClk === "string" &&
        typeof obj.clk === "string" &&
        typeof obj.conflateMs === "number" &&
        typeof obj.heartbeatMs === "number" &&
        typeof obj.pt === "number" &&
        obj.ct === "SUB_IMAGE"
    )
}

export function isMarketReSubImage(obj: any, _argumentName?: string): obj is MarketReSubImage {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "mcm" &&
        typeof obj.id === "number" &&
        typeof obj.initialClk === "string" &&
        typeof obj.clk === "string" &&
        typeof obj.conflateMs === "number" &&
        typeof obj.heartbeatMs === "number" &&
        typeof obj.pt === "number" &&
        obj.ct === "RESUB_DELTA"
    )
}

export function isRunnerAtbChange(obj: any, _argumentName?: string): obj is RunnerAtbChange {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "mcm" &&
        typeof obj.id === "number" &&
        typeof obj.clk === "string" &&
        typeof obj.pt === "number" &&
        Array.isArray(obj.mc) &&
        obj.mc.every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e.id === "string" &&
            Array.isArray(e.rc) &&
            e.rc.every((e: any) =>
                (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                Array.isArray(e.atb) &&
                e.atb.every((e: any) =>
                    typeof e === "object"
                )
            )
        )
    )
}

export function isRunnerAtlChange(obj: any, _argumentName?: string): obj is RunnerAtlChange {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "mcm" &&
        typeof obj.id === "number" &&
        typeof obj.clk === "string" &&
        typeof obj.pt === "number" &&
        Array.isArray(obj.mc) &&
        obj.mc.every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e.id === "string" &&
            Array.isArray(e.rc) &&
            e.rc.every((e: any) =>
                (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                Array.isArray(e.atl) &&
                e.atl.every((e: any) =>
                    typeof e === "object"
                )
            )
        )
    )
}

export function isRunnerBatbChange(obj: any, _argumentName?: string): obj is RunnerBatbChange {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "mcm" &&
        typeof obj.id === "number" &&
        typeof obj.clk === "string" &&
        typeof obj.pt === "number" &&
        Array.isArray(obj.mc) &&
        obj.mc.every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e.id === "string" &&
            Array.isArray(e.rc) &&
            e.rc.every((e: any) =>
                (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                Array.isArray(e.batb) &&
                e.batb.every((e: any) =>
                    typeof e === "object"
                )
            )
        )
    )
}

export function isRunnerBatlChange(obj: any, _argumentName?: string): obj is RunnerBatlChange {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "mcm" &&
        typeof obj.id === "number" &&
        typeof obj.clk === "string" &&
        typeof obj.pt === "number" &&
        Array.isArray(obj.mc) &&
        obj.mc.every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e.id === "string" &&
            Array.isArray(e.rc) &&
            e.rc.every((e: any) =>
                (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                Array.isArray(e.batl) &&
                e.batl.every((e: any) =>
                    typeof e === "object"
                )
            )
        )
    )
}

export function isRunnerBdatbChange(obj: any, _argumentName?: string): obj is RunnerBdatbChange {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "mcm" &&
        typeof obj.id === "number" &&
        typeof obj.clk === "string" &&
        typeof obj.pt === "number" &&
        Array.isArray(obj.mc) &&
        obj.mc.every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e.id === "string" &&
            Array.isArray(e.rc) &&
            e.rc.every((e: any) =>
                (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                Array.isArray(e.bdatb) &&
                e.bdatb.every((e: any) =>
                    typeof e === "object"
                )
            )
        )
    )
}

export function isRunnerBdatlChange(obj: any, _argumentName?: string): obj is RunnerBdatlChange {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "mcm" &&
        typeof obj.id === "number" &&
        typeof obj.clk === "string" &&
        typeof obj.pt === "number" &&
        Array.isArray(obj.mc) &&
        obj.mc.every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e.id === "string" &&
            Array.isArray(e.rc) &&
            e.rc.every((e: any) =>
                (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                Array.isArray(e.bdatl) &&
                e.bdatl.every((e: any) =>
                    typeof e === "object"
                )
            )
        )
    )
}

export function isRunnerTrdChange(obj: any, _argumentName?: string): obj is RunnerTrdChange {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "mcm" &&
        typeof obj.id === "number" &&
        typeof obj.clk === "string" &&
        typeof obj.pt === "number" &&
        Array.isArray(obj.mc) &&
        obj.mc.every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e.id === "string" &&
            Array.isArray(e.rc) &&
            e.rc.every((e: any) =>
                (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                Array.isArray(e.trd) &&
                e.trd.every((e: any) =>
                    typeof e === "object"
                )
            )
        )
    )
}

export function isRunnerTvChange(obj: any, _argumentName?: string): obj is RunnerTvChange {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "mcm" &&
        typeof obj.id === "number" &&
        typeof obj.clk === "string" &&
        typeof obj.pt === "number" &&
        Array.isArray(obj.mc) &&
        obj.mc.every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e.id === "string" &&
            Array.isArray(e.rc) &&
            e.rc.every((e: any) =>
                (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                typeof e.tv === "number"
            )
        )
    )
}

export function isRunnerLtpChange(obj: any, _argumentName?: string): obj is RunnerLtpChange {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "mcm" &&
        typeof obj.id === "number" &&
        typeof obj.clk === "string" &&
        typeof obj.pt === "number" &&
        Array.isArray(obj.mc) &&
        obj.mc.every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e.id === "string" &&
            Array.isArray(e.rc) &&
            e.rc.every((e: any) =>
                (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                typeof e.ltp === "number"
            )
        )
    )
}

export function isRunnerSpbChange(obj: any, _argumentName?: string): obj is RunnerSpbChange {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "mcm" &&
        typeof obj.id === "number" &&
        typeof obj.clk === "string" &&
        typeof obj.pt === "number" &&
        Array.isArray(obj.mc) &&
        obj.mc.every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e.id === "string" &&
            Array.isArray(e.rc) &&
            e.rc.every((e: any) =>
                (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                Array.isArray(e.spb) &&
                e.spb.every((e: any) =>
                    typeof e === "object"
                )
            )
        )
    )
}

export function isRunnerSplChange(obj: any, _argumentName?: string): obj is RunnerSplChange {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "mcm" &&
        typeof obj.id === "number" &&
        typeof obj.clk === "string" &&
        typeof obj.pt === "number" &&
        Array.isArray(obj.mc) &&
        obj.mc.every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e.id === "string" &&
            Array.isArray(e.rc) &&
            e.rc.every((e: any) =>
                (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                Array.isArray(e.spl) &&
                e.spl.every((e: any) =>
                    typeof e === "object"
                )
            )
        )
    )
}

export function isRunnerSpnChange(obj: any, _argumentName?: string): obj is RunnerSpnChange {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "mcm" &&
        typeof obj.id === "number" &&
        typeof obj.clk === "string" &&
        typeof obj.pt === "number" &&
        Array.isArray(obj.mc) &&
        obj.mc.every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e.id === "string" &&
            Array.isArray(e.rc) &&
            e.rc.every((e: any) =>
                (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                typeof e.spn === "number"
            )
        )
    )
}

export function isRunnerSpfChange(obj: any, _argumentName?: string): obj is RunnerSpfChange {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "mcm" &&
        typeof obj.id === "number" &&
        typeof obj.clk === "string" &&
        typeof obj.pt === "number" &&
        Array.isArray(obj.mc) &&
        obj.mc.every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e.id === "string" &&
            Array.isArray(e.rc) &&
            e.rc.every((e: any) =>
                (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                typeof e.spf === "number"
            )
        )
    )
}

export function isMarketTvChange(obj: any, _argumentName?: string): obj is MarketTvChange {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "string" &&
        typeof obj.tv === "number"
    )
}

export function isMarketDefinitionChange(obj: any, _argumentName?: string): obj is MarketDefinitionChange {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "string" &&
        (obj.marketDefinition !== null &&
            typeof obj.marketDefinition === "object" ||
            typeof obj.marketDefinition === "function") &&
        typeof obj.marketDefinition.bspMarket === "boolean" &&
        typeof obj.marketDefinition.turnInPlayEnabled === "boolean" &&
        typeof obj.marketDefinition.persistenceEnabled === "boolean" &&
        typeof obj.marketDefinition.marketBaseRate === "number" &&
        typeof obj.marketDefinition.eventId === "string" &&
        typeof obj.marketDefinition.eventTypeId === "string" &&
        typeof obj.marketDefinition.numberOfWinners === "number" &&
        typeof obj.marketDefinition.bettingType === "string" &&
        typeof obj.marketDefinition.marketType === "string" &&
        typeof obj.marketDefinition.marketTime === "string" &&
        typeof obj.marketDefinition.suspendTime === "string" &&
        typeof obj.marketDefinition.bspReconciled === "boolean" &&
        typeof obj.marketDefinition.complete === "boolean" &&
        typeof obj.marketDefinition.inPlay === "boolean" &&
        typeof obj.marketDefinition.crossMatching === "boolean" &&
        typeof obj.marketDefinition.runnersVoidable === "boolean" &&
        typeof obj.marketDefinition.numberOfActiveRunners === "number" &&
        typeof obj.marketDefinition.betDelay === "number" &&
        (obj.marketDefinition.status === "OPEN" ||
            obj.marketDefinition.status === "INACTIVE" ||
            obj.marketDefinition.status === "SUSPENDED" ||
            obj.marketDefinition.status === "CLOSED") &&
        Array.isArray(obj.marketDefinition.runners) &&
        obj.marketDefinition.runners.every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            (e.status === "ACTIVE" ||
                e.status === "WINNER" ||
                e.status === "LOSER" ||
                e.status === "PLACED" ||
                e.status === "REMOVED_VACANT" ||
                e.status === "REMOVED" ||
                e.status === "HIDDEN") &&
            (typeof e.adjustmentFactor === "undefined" ||
                typeof e.adjustmentFactor === "number") &&
            typeof e.sortPriority === "number" &&
            (typeof e.removalDate === "undefined" ||
                typeof e.removalDate === "string") &&
            typeof e.id === "number"
        ) &&
        Array.isArray(obj.marketDefinition.regulators) &&
        obj.marketDefinition.regulators.every((e: any) =>
            typeof e === "string"
        ) &&
        typeof obj.marketDefinition.countryCode === "string" &&
        (typeof obj.marketDefinition.venue === "undefined" ||
            typeof obj.marketDefinition.venue === "string") &&
        typeof obj.marketDefinition.discountAllowed === "boolean" &&
        typeof obj.marketDefinition.timezone === "string" &&
        typeof obj.marketDefinition.openDate === "string" &&
        typeof obj.marketDefinition.version === "number" &&
        (typeof obj.marketDefinition.raceType === "undefined" ||
            obj.marketDefinition.raceType === "Flat") &&
        (obj.marketDefinition.priceLadderDefinition !== null &&
            typeof obj.marketDefinition.priceLadderDefinition === "object" ||
            typeof obj.marketDefinition.priceLadderDefinition === "function") &&
        (obj.marketDefinition.priceLadderDefinition.type === "CLASSIC" ||
            obj.marketDefinition.priceLadderDefinition.type === "FINEST" ||
            obj.marketDefinition.priceLadderDefinition.type === "LINE_RANGE")
    )
}

export function isMarketsChange(obj: any, _argumentName?: string): obj is MarketsChange {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "mcm" &&
        typeof obj.id === "number" &&
        typeof obj.clk === "string" &&
        typeof obj.pt === "number" &&
        Array.isArray(obj.mc)
    )
}
