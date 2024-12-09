<script lang=ts>
    const { ...restProps } = $props();
</script>
<div aria-hidden="true" class="rounded-xl w-full h-4" {...restProps}></div>


<style>
    div{
        animation: skel 1000ms ease alternate infinite;
    }
    @keyframes skel{
        0%{
            background-color: var(--color-skeleton-start);
        }
        100%{
            background-color: var(--color-skeleton-end);
        }
    }
</style>