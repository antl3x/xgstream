/*
 * Generated type guards for "Messages.ts".
 * WARNING: Do not manually change this file.
 */
import { MARKET_BEAT_RESPONSE, MARKET_LATENCY_RESPONSE, MARKET_SUBIMAGE_RESPONSE, MARKET_RESUBIMAGE_RESPONSE, MARKET_TV_CHANGE_RESPONSE, MARKET_DEFINITION_CHANGE_RESPONSE, MARKETS_CHANGE_RESPONSE, RUNNERS_CHANGE_RESPONSE, RUNNER_ATB_CHANGE_RESPONSE, RUNNER_ATL_CHANGE_RESPONSE, RUNNER_BATB_CHANGE_RESPONSE, RUNNER_BATL_CHANGE_RESPONSE, RUNNER_BDATB_CHANGE_RESPONSE, RUNNER_BDATL_CHANGE_RESPONSE, RUNNER_TRD_CHANGE_RESPONSE, RUNNER_TV_CHANGE_RESPONSE, RUNNER_LTP_CHANGE_RESPONSE, RUNNER_SPB_CHANGE_RESPONSE, RUNNER_SPL_CHANGE_RESPONSE, RUNNER_SPN_CHANGE_RESPONSE, RUNNER_SPF_CHANGE_RESPONSE } from "./Messages";

export function isMarketHeartbeat(obj: any, _argumentName?: string): obj is MARKET_BEAT_RESPONSE {
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

export function isMarketLatency(obj: any, _argumentName?: string): obj is MARKET_LATENCY_RESPONSE {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.op === "mcm" &&
        obj.status === 503
    )
}

export function isMarketSubImage(obj: any, _argumentName?: string): obj is MARKET_SUBIMAGE_RESPONSE {
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

export function isMarketReSubImage(obj: any, _argumentName?: string): obj is MARKET_RESUBIMAGE_RESPONSE {
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

export function isMarketTvChange(obj: any, _argumentName?: string): obj is MARKET_TV_CHANGE_RESPONSE {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "string" &&
        typeof obj.tv === "number"
    )
}

export function isMarketDefinitionChange(obj: any, _argumentName?: string): obj is MARKET_DEFINITION_CHANGE_RESPONSE {
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
            (typeof e.bsp === "undefined" ||
                typeof e.bsp === "number") &&
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

export function isMarketsChange(obj: any, _argumentName?: string): obj is MARKETS_CHANGE_RESPONSE {
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
            typeof e.id === "string"
        )
    )
}

export function isRunnersChange(obj: any, _argumentName?: string): obj is RUNNERS_CHANGE_RESPONSE {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        Array.isArray(obj.rc)
    )
}

export function isRunnerAtbChange(obj: any, _argumentName?: string): obj is RUNNER_ATB_CHANGE_RESPONSE {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "number" &&
        Array.isArray(obj.atb) &&
        obj.atb.every((e: any) =>
            typeof e === "object"
        )
    )
}

export function isRunnerAtlChange(obj: any, _argumentName?: string): obj is RUNNER_ATL_CHANGE_RESPONSE {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "number" &&
        Array.isArray(obj.atl) &&
        obj.atl.every((e: any) =>
            typeof e === "object"
        )
    )
}

export function isRunnerBatbChange(obj: any, _argumentName?: string): obj is RUNNER_BATB_CHANGE_RESPONSE {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "number" &&
        Array.isArray(obj.batb) &&
        obj.batb.every((e: any) =>
            typeof e === "object"
        )
    )
}

export function isRunnerBatlChange(obj: any, _argumentName?: string): obj is RUNNER_BATL_CHANGE_RESPONSE {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "number" &&
        Array.isArray(obj.batl) &&
        obj.batl.every((e: any) =>
            typeof e === "object"
        )
    )
}

export function isRunnerBdatbChange(obj: any, _argumentName?: string): obj is RUNNER_BDATB_CHANGE_RESPONSE {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "number" &&
        Array.isArray(obj.bdatb) &&
        obj.bdatb.every((e: any) =>
            typeof e === "object"
        )
    )
}

export function isRunnerBdatlChange(obj: any, _argumentName?: string): obj is RUNNER_BDATL_CHANGE_RESPONSE {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "number" &&
        Array.isArray(obj.bdatl) &&
        obj.bdatl.every((e: any) =>
            typeof e === "object"
        )
    )
}

export function isRunnerTrdChange(obj: any, _argumentName?: string): obj is RUNNER_TRD_CHANGE_RESPONSE {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "number" &&
        Array.isArray(obj.trd) &&
        obj.trd.every((e: any) =>
            typeof e === "object"
        )
    )
}

export function isRunnerTvChange(obj: any, _argumentName?: string): obj is RUNNER_TV_CHANGE_RESPONSE {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "number" &&
        typeof obj.tv === "number"
    )
}

export function isRunnerLtpChange(obj: any, _argumentName?: string): obj is RUNNER_LTP_CHANGE_RESPONSE {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "number" &&
        typeof obj.ltp === "number"
    )
}

export function isRunnerSpbChange(obj: any, _argumentName?: string): obj is RUNNER_SPB_CHANGE_RESPONSE {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "number" &&
        Array.isArray(obj.spb) &&
        obj.spb.every((e: any) =>
            typeof e === "object"
        )
    )
}

export function isRunnerSplChange(obj: any, _argumentName?: string): obj is RUNNER_SPL_CHANGE_RESPONSE {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "number" &&
        Array.isArray(obj.spl) &&
        obj.spl.every((e: any) =>
            typeof e === "object"
        )
    )
}

export function isRunnerSpnChange(obj: any, _argumentName?: string): obj is RUNNER_SPN_CHANGE_RESPONSE {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "number" &&
        typeof obj.spn === "number"
    )
}

export function isRunnerSpfChange(obj: any, _argumentName?: string): obj is RUNNER_SPF_CHANGE_RESPONSE {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "number" &&
        typeof obj.spf === "number"
    )
}
