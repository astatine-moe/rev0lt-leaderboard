<script>
    import { request } from "$lib/util/requests";
    import paginate from "$lib/util/paginate";
    import ListItem from "$lib/client/components/Item/ListItem.svelte";
    import { onMount } from "svelte";
    import { ButtonGroup, Button } from "flowbite-svelte";
    import { browser } from "$app/environment";
    import {
        ArrowLeftOutline,
        ArrowRightOutline,
        ChevronDownSolid,
        UserCircleSolid,
        AdjustmentsVerticalOutline,
        DownloadSolid,
    } from "flowbite-svelte-icons";

    let category = "active";
    if (browser) {
        category = localStorage.getItem("giveaway_category") || "active";
    }
    let loading = true;

    //data
    let giveaways = [];
    let active = [];
    let inactive = [];
    let giveawaysFiltered = {};
    let error;

    //logic
    const getGiveaways = async () => {
        try {
            giveaways = await request("/giveaways", "GET");
            giveawaysFiltered.active = giveaways.filter(
                (giveaway) => giveaway.active
            );
            giveawaysFiltered.inactive = giveaways.filter(
                (giveaway) => !giveaway.active
            );
        } catch (err) {
            error = "Failed to fetch giveaways";
            console.error(err);
        }
    };

    onMount(async () => {
        loading = true;
        await getGiveaways();
        loading = false;
    });

    const setCategory = (cat) => {
        category = cat;
        if (browser) {
            localStorage.setItem("giveaway_category", cat);
        }
    };
</script>

<div class="pt-3 sm:container">
    <div class="text-center mb-5">
        <ButtonGroup>
            <Button
                outline
                color={category === "active" ? "primary" : "dark"}
                on:click={() => {
                    setCategory("active");
                }}
            >
                <UserCircleSolid class="w-3 h-3 me-2" />
                Active
            </Button>
            <Button
                outline
                color={category !== "active" ? "primary" : "dark"}
                on:click={() => {
                    setCategory("inactive");
                }}
            >
                <AdjustmentsVerticalOutline class="w-3 h-3 me-2" />
                Archived
            </Button>
        </ButtonGroup>
    </div>

    {#if loading}
        {#each { length: 5 } as col}
            <ListItem type="giveaway" loading={true} />
        {/each}
    {:else if !error}
        {#each giveawaysFiltered[category] as giveaway}
            <ListItem data={giveaway} type="giveaway" />
        {:else}
            <div class="text-center text-slate-500 dark:text-gray-300">
                <p>
                    No {category === "active" ? "active" : "archived"} giveaways
                    found
                </p>
            </div>
        {/each}
    {:else}
        <p>{error || "Unknown error"}</p>
    {/if}
</div>
