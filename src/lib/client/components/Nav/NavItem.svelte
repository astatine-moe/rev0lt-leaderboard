<script>
    import { NavLi, Indicator } from "flowbite-svelte";

    export let href = "#";
    export let icon = null;
    export let indicator = 0;
</script>

<NavLi {href} activeClass="text-black dark:text-white active">
    <div class="flex items-center relative">
        {#if indicator && href === "/giveaways"}
            <Indicator color="red" size="lg" placement="bottom-left">
                <span class="text-white text-xs font-bold">{indicator}</span>
            </Indicator>
        {/if}
        <svelte:component this={icon} />
        <span class="ml-2"><slot /></span>
    </div>
</NavLi>
