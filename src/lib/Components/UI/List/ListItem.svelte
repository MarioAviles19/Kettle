<script lang=ts>
        let className = '';
        export { className as class };
</script>


<li class="grid sm:grid-cols-[repeat(auto-fit,minmax(50px,1fr))] grid-cols-[2.5rem_1fr_1fr] grid-rows-2 sm:grid-rows-1 {className}">
    <slot/>
</li>
