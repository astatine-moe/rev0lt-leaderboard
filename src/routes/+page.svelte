<script>
    import { request } from "$lib/util/requests";
    import paginate from "$lib/util/paginate";
    import ListItem from "$lib/client/components/Item/ListItem.svelte";
    import { onMount } from "svelte";
    import { ArrowLeftOutline, ArrowRightOutline } from "flowbite-svelte-icons";
    import { Toast, Pagination, Checkbox } from "flowbite-svelte";

    let loading = true;
    let perPage = 5;
    let currPage = 1;
    let showOnlyEntries = true;

    //data
    let users = [];
    let pages = [];
    let totalPages = 0;
    let helper = { start: 1, end: perPage, total: 0 };
    let error;

    $: prevDisabled = currPage === 1;
    $: nextDisabled = currPage >= pages.length;

    //logic
    const getUsers = async () => {
        try {
            let u = await request("/users", "GET");

            const highestPoints = u[0].total_points;
            const topUsers = u.filter(
                (user) => user.total_points === highestPoints
            );

            console.log(topUsers, highestPoints);

            if (topUsers.length > 1) {
                let tier = 1;
                topUsers.forEach((user) => {
                    user.leader_tier = tier;
                    user.leader = true;
                    tier++;
                });
            } else {
                if (topUsers[0]) topUsers[0].leader = true;
            }

            let paginateRequest = paginate(
                u,
                perPage,
                currPage,
                showOnlyEntries
            );

            users = u;
            pages = paginateRequest.pages;
            helper = paginateRequest.helper;
            totalPages = paginateRequest.totalPages;
        } catch (err) {
            console.error(err);
            error = "Error fetching users...";
        }
    };

    const switchPage = (page = 1) => {
        if (page < 1 || page > totalPages) return;

        currPage = page;
        helper = paginate(users, perPage, currPage, showOnlyEntries).helper;

        for (let i = 0; i < pages.length; i++) {
            if (page === i + 1) pages[i].active = true;
            else pages[i].active = false;
        }
    };

    onMount(async () => {
        loading = true;
        await getUsers();
        switchPage();
        loading = false;
    });

    const previous = () => {
        //run on prev
        if (currPage === 1) return;
        currPage -= 1;

        switchPage(currPage);
    };
    const next = () => {
        //run on next
        if (currPage >= pages.length) return;

        currPage += 1;
        switchPage(currPage);
    };
</script>

<div class="pt-3 sm:container">
    {#if loading}
        {#each { length: perPage } as col}
            <ListItem loading={true} />
        {/each}
    {:else if users.length}
        {#each pages as page}
            {#if page.active}
                {#each page.items as user, i}
                    <ListItem
                        data={{
                            user,
                        }}
                    />
                {/each}
            {/if}
        {/each}
        <Checkbox bind:checked={showOnlyEntries} on:change={(e) => switchPage}
            >Show entries only</Checkbox
        >
        <div class="flex flex-col items-center justify-center gap-2">
            <div class="text-sm text-gray-700 dark:text-gray-400">
                Showing <span
                    class="font-semibold text-gray-900 dark:text-white"
                    >{helper.start}</span
                >
                to
                <span class="font-semibold text-gray-900 dark:text-white"
                    >{helper.end}</span
                >
                of
                <span class="font-semibold text-gray-900 dark:text-white"
                    >{helper.total}</span
                >
                {showOnlyEntries ? "Entries" : "Users"}
            </div>

            <Pagination table on:previous={previous} on:next={next}>
                <div
                    slot="prev"
                    class="flex items-center gap-2 text-white bg-gray-800 {prevDisabled
                        ? 'cursor-not-allowed'
                        : ''}"
                >
                    <ArrowLeftOutline class="w-3.5 h-3.5 me-2" />
                    Prev
                </div>
                <div
                    slot="next"
                    class="flex items-center gap-2 text-white bg-gray-800 {nextDisabled
                        ? 'cursor-not-allowed'
                        : ''}"
                >
                    Next
                    <ArrowRightOutline class="w-3.5 h-3.5 ms-2" />
                </div>
            </Pagination>
        </div>
    {:else}
        <p>{error || "Unknown error occurred"}</p>
    {/if}
</div>
