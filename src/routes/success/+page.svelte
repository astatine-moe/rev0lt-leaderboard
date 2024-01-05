<script>
    import { Spinner } from "flowbite-svelte";
    import { invalidateAll } from "$app/navigation";
    import { onMount } from "svelte";

    onMount(() => {
        invalidateAll();
    });
</script>

<div class="flex items-center justify-center h-screen w-screen">
    <Spinner />
</div>
