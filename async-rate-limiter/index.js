const urls=[];

for(let i=1;i<=20;i++){
    urls.push("/api/user/" +i);
}

function fakeRequest(Url){
    return new Promise((resolve,reject)=>{
        const delay=Math.floor(Math.random()*401)+100;

        setTimeout(()=>{
            const shouldFail=Math.random()<0.2;
            if(shouldFail){
                reject(new Error(`Request failed for ${url}`));

            }else{
                resolve({
                message:`Success for ${url}`
                });
            }
        },delay);
    })
}

///testing one of this api
fakeRequest("/api/user/1")
.then((data)=>{
    console.log("Success:",data);

})
.catch((data)=>{
    console.error("Error:",error.message);
});
