<script>
    import {
        Navbar,
        NavBrand,
        NavUl,
        NavHamburger,
        Button,
        DarkMode,
    } from "flowbite-svelte";

    import NavItem from "./NavItem.svelte";
    import { ListOrdoredSolid, GiftBoxOutline } from "flowbite-svelte-icons";

    import { page } from "$app/stores";
    $: activeUrl = $page.url.pathname;

    let navItems = [
        {
            href: "/",
            icon: ListOrdoredSolid,
            text: "Leaderboards",
        },
        {
            href: "/giveaways",
            icon: GiftBoxOutline,
            text: "Giveaways",
        },
    ];

    export let user = null;
    export let indicator = 0;
</script>

<header
    class="bg-white border-b border-slate-300 dark:border-gray-500 dark:bg-gray-800 mb-5 py-2"
>
    <Navbar
        class="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 divide-gray-200 dark:divide-gray-700 sm:px-4 flex items-center justify-between w-full mx-auto py-1.5 px-4"
    >
        <div class="flex items-center md:order-2">
            <DarkMode class="mr-4" />
            <Button
                size="sm"
                href="/login?redirect={encodeURIComponent($page.url.pathname)}"
                >Login with Discord</Button
            >

            <NavHamburger />
        </div>

        <NavUl
            {activeUrl}
            ulClass="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium items-start md:items-center"
        >
            <NavBrand href="/">
                <img
                    src="/images/logo.webp"
                    alt="Rev0lt logo"
                    class="mr-3 h-6 sm:h-9 rounded-full hidden sm:block"
                />
            </NavBrand>
            {#each navItems as navItem}
                <NavItem href={navItem.href} icon={navItem.icon} {indicator}
                    >{navItem.text}</NavItem
                >
            {/each}
        </NavUl>
    </Navbar>
</header>
