<script>
    import { Card, Button, Toggle } from "flowbite-svelte";
    import { request } from "$lib/util/requests";
    import { onMount } from "svelte";
    import { PUBLIC_API_URL } from "$env/static/public";
    export let data;

    let loading = true;
    let d = {};

    const getUser = async () => {
        let { user, evidence } = await request(
            `/users/${data.id}`,
            "GET",
            data?.user,
            true
        );

        d = { user, evidence };
    };

    onMount(async () => {
        loading = true;
        await getUser();
        loading = false;
    });
</script>

{#if !loading}
    {#each d.evidence as evidence}
        <div>
            <Card
                img="{PUBLIC_API_URL}{evidence.images[0]}"
                href="/evidence/{evidence._id}"
                horizontal
                class="mb-4"
            >
                {evidence.text}
            </Card>
        </div>
    {/each}
{/if}
