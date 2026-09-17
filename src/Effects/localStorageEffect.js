
export const localStorageEffect=(localStorageKey)=>({setSelf,onSet})=>{
    //na loadu izvuci podatke iz localStorage i stavi ga u state
    const savedValues=localStorage.getItem(localStorageKey)
    if(savedValues!=null){
        setSelf(JSON.parse(savedValues));
    }
    //kada uradimo nesto na statu(updatujemo upisemo nove podatke)->upisi u local storage
    onSet(newValue=>{
        localStorage.setItem(localStorageKey,JSON.stringify(newValue));
    })
}