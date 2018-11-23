// import service from "./Service";

export function getLogList() {
    // return service.get("");
    const data=[];
    for(let i=0;i<9;i++){
        data.push({
            id:1,
            username:"康若曼",
            date:"2018/11/21"
        })
    }
    return data;
}

