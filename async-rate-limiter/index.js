const urls = [];

for (let i = 1; i <= 20; i++) {
    urls.push("/api/user/" + i);
}

function fakeRequest(url) {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 401) + 100;

        setTimeout(() => {
            const shouldFail = Math.random() < 0.2;

            if (shouldFail) {
                reject(new Error(`Request failed for ${url}`));
            } else {
                resolve({
                    message: `Success for ${url}`
                });
            }
        }, delay);
    });
}

// // Testing one API
// fakeRequest("/api/user/1")
//     .then((data) => {
//         console.log("Success:", data);
//     })
//     .catch((error) => {
//         console.error("Error:", error.message);
//     });

function sleep(ms){
    return new Promise((resolve)=>{
    setTimeout(resolve,ms);
    });
}

async function fetchWithRetry(url,retries){
    let attempts = 0;
    while(attempts<=retries){
        attempts++;
        try{
            const data=await fakeRequest(url);
            return{
                url:url,
                status:"success",
                data:data,
                attempts:attempts

            };
        } catch(error){
            if(attempts>retries){
                return{
                    url:url,
                    status:"failed",
                    data:error.message,
                    attempts:attempts
                };
                
            }   
            const backoff=500*(2**(attempts-1));

            console.log(
                `${url} failed.  Retrying in ${backoff}ms...`
            );
            await sleep(backoff);
            
           }

        }
    }
///testing again
fetchWithRetry("/api/user/1",2)
   .then((result)=>{
     console.log(result);
   });