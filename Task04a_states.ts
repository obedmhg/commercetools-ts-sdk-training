import { StateDraft } from "@commercetools/platform-sdk";
import * as states from "./handson/states";
import { log } from "./utils/logger";

const orderPackedStateDraft: StateDraft = {
    key: "om-order-packed",
    type: "OrderState",
    name: {
        de: "om Order Packed ",
        en: "om Order Packed ",
    },
    initial: true,
};

const orderCompletedStateDraft: StateDraft = {
    key: "om-order-completed",
    type: "OrderState",
    name: {
        de: "om Order Completed ",
        en: "om Order Completed ",
    },
    initial: false,
};

const createStatesWithTransitions = async () => {
    let orderPackedState = await states.createNewState(orderPackedStateDraft)
    let orderCompletedState = await states.createNewState(orderCompletedStateDraft)

    orderPackedState = await states.addTransition(orderPackedState.body.key, [orderCompletedState.body.key])

    orderCompletedState = await states.addTransition(orderCompletedState.body.key, [])

    return orderPackedState;
};

createStatesWithTransitions().then(log).catch(log)

// states.getStateByKey(orderPackedStateDraft.key).then(log).catch(log)