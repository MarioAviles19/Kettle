<script lang=ts>
    import { setContext } from "svelte";
    import { key } from ".";
	import { writable } from "svelte/store";


    interface Props {
        page?: number;
        children?: import('svelte').Snippet;
    }

    let { page = $bindable(0), children }: Props = $props();
    let activePage = writable(0);
    let transitionDirection = writable(1);

    let pages = writable<Array<any>>([])

    function RegisterPage(id : Symbol){
        pages.set([...$pages, id])
        console.log(pages);
        return $pages.findIndex(el=>{return el == id})
    }
    function SetPage(index : number){
        activePage.set(index);
    }
    function AdvancePage(increment : number){
        if($activePage + increment > $pages.length){
            activePage.set(0);
            return
        }
        transitionDirection.set(Math.sign(increment))
        activePage.update(el=>{return el + increment});
    }
    function GetPages(){
        return pages
    }
    

    setContext(key, {
        activePage,
        RegisterPage,
        AdvancePage,
        SetPage,
        GetPages,
        transitionDirection
    })

    activePage.subscribe(pg=>{
        page = pg
    })


</script>


    {@render children?.()}



