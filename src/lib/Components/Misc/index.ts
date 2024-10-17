export const ResizeToFitInput = (e : HTMLElement)=>{
    e.addEventListener("input", Resize)
    function Resize(e : Event){

        const target = e.target as HTMLElement | null
        
        if(target && target.scrollHeight > 0){
            
        
            target.style.height = "auto"
            target.style.height = target.scrollHeight + 'px';
        }
        }
}