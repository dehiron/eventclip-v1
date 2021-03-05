//actionsは必ずプレーンなObjectを返す

const a = "a";
const aAction = (eventState) => {
    return {
        type: "a",
        payload: {
            
        }
    }
};

export { a, aAction };