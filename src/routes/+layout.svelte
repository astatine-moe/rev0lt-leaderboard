<script>
    import "../app.pcss";

    import { PUBLIC_API_URL } from "$env/static/public";
    import {
        DarkMode,
        BottomNav,
        BottomNavItem,
        Indicator,
    } from "flowbite-svelte";
    import {
        ListOrdoredSolid,
        GiftBoxOutline,
        DiscordSolid,
    } from "flowbite-svelte-icons";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    $: activeUrl = $page.url.pathname;

    let indicator;

    let items = [
        {
            name: "Leaderboards",
            href: "/",
            icon: ListOrdoredSolid,
        },
        {
            name: "Giveaways",
            href: "/giveaways",
            icon: GiftBoxOutline,
            indicator: indicator,
        },
        {
            name: "Discord Server",
            href: "https://discord.gg/7ByxTVqnSz",
            target: "_blank",
            icon: DiscordSolid,
        },
    ];

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

<DarkMode btnClass="hidden" size="lg" />

<slot />

<BottomNav
    position="fixed"
    classInner="grid-cols-3"
    {activeUrl}
    classActive="font-bold bg-gray-600 text-gray-500 dark:text-gray-400 hover:!bg-gray-600"
>
    {#each items as item}
        <BottomNavItem
            btnName={item.name}
            href={item.href}
            btnClass="relative"
            target={item.target}
        >
            {#if item.indicator}
                <Indicator color="green" border size="xl" placement="top-right">
                    <span class="text-white text-xs font-bold"
                        >{item.indicator}</span
                    >
                </Indicator>
            {/if}
            <svelte:component
                this={item.icon}
                class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500"
            />
        </BottomNavItem>
    {/each}
</BottomNav>
