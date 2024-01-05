<script>
    import { DropdownItem } from "flowbite-svelte";

    export let href;
    export let icon = null;
</script>

<DropdownItem {href}>
    <div class="flex align-center">
        {#if icon}
            <svelte:component this={icon} class="w-4 h-4 mr-2" />
        {/if}
        <div><slot /></div>
    </div>
</DropdownItem>
