<script lang=ts>
    import { setContext } from "svelte";
    import { key } from ".";
	import { writable } from "svelte/store";



    let activePage = writable(0);

    let pages : Array<any>= []

    function RegisterPage(id : Symbol){
        pages = [...pages, id]
        return pages.findIndex(el=>{return el == id})
    }
    function AdvancePage(increment : number){
        if($activePage + increment > pages.length){
            activePage.set(0);
            return
        }
        activePage.update(el=>{return el + increment});
        console.log(increment)
    }
    

    setContext(key, {
        activePage,
        RegisterPage,
        AdvancePage
    })

    $:console.log($activePage)


</script>

<slot/>



