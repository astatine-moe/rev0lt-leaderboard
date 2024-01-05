<script>
    import "../app.pcss";

    import Nav from "$lib/client/components/Nav/Nav.svelte";
    import { PUBLIC_API_URL } from "$env/static/public";
    import { onMount } from "svelte";

    let indicator;

    let getCount = async () => {
        try {
            const res = await fetch(`${PUBLIC_API_URL}/giveaways/active`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                indicator = await res.json();
            }
        } catch (e) {
            console.error(e);
        }
    };
    onMount(async () => {
        await getCount();
    });
</script>

<Nav {indicator} />

<div class="container">
    <slot />
</div>
