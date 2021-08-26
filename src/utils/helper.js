const cloneJson = json => {
    
    if(!json){
        return json;
    }

    return JSON.parse(JSON.stringify(json));
};

export default {
    cloneJson
};