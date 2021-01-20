// (async()=>{
//     const moduleSpecifier = './func1.js';
//     const module = await import(moduleSpecifier)
//     document.getElementById("log").addEventListener("click",()=>module.log());
//     document.getElementById("warn").addEventListener("click",()=>module.warn());
// })();

document.getElementById("log").addEventListener('click',async (e)=>{
    e.preventDefault();
    try {
        const module = await import("./func1.js");
        module.log();
    } catch (error) {
        console.error(error);
    }
})

document.getElementById("warn").addEventListener('click',async (e)=>{
    e.preventDefault();
    try {
        const module = await import("./func2.js");
        module.warn();
    } catch (error) {
        console.error(error);
    }
})