<script>
    import {
        Breadcrumb,
        BreadcrumbItem,
        Tooltip,
        Table,
        TableHead,
        TableBody,
        TableHeadCell,
        TableBodyRow,
        TableBodyCell,
        Checkbox,
        Button,
    } from "flowbite-svelte";
    import TextInput from "./TextInput.svelte";
    import { SearchOutline } from "flowbite-svelte-icons";
    import { onMount } from "svelte";
    import { request } from "$lib/util/requests";

    export let crumbs = [];

    export let search = {
        enabled: false,
        placeholder: null,
        onInput: null,
        val: "",
    };

    export let title;
    export let select = false;
    export let selectActions = [];
    export let actions = [];

    //table info
    export let cols = [];
    export let rowActions = [];
    export let url = null;
    export let user = null;
    export let perPage = 10;
    export let sortBy = null;

    let loading = true;
    let error = null;
    let data = [];

    //pagination
    let pagination = {
        page: 1,
        perPage,
        total: 0,
        start: 1,
        end: 10,
        sortBy: {
            col: sortBy,
            type: "desc",
        },
    };

    $: totalPages = Math.ceil(pagination.total / pagination.perPage);
    $: message = `<span class="text-sm font-normal text-black dark:text-gray-400">Showing <span class="font-semibold text-black dark:text-white">${
        (pagination.page - 1) * pagination.perPage + 1
    } - ${Math.min(
        pagination.page * pagination.perPage,
        pagination.total
    )}</span> of <span class="font-semibold text-black dark:text-white">${
        pagination.total
    }</span> documents</span>`;

    //if not loading, and there is a next page
    $: canNext = !loading && pagination.page < totalPages;
    $: canPrev = !loading && pagination.page > 1;

    const toggleAllCheckboxes = (event) => {
        //select all checkboxes in tbody rows
        const checkboxes = document.querySelectorAll(
            "tbody input[type=checkbox]"
        );

        checkboxes.forEach((checkbox) => {
            checkbox.checked = event.target.checked;
        });
    };

    let err = (text) => {
        error = text;
        loading = false;
    };

    const fetchData = async () => {
        error = null;
        loading = true;

        if (!url) return err("No url provided");

        let fetchUrl = `${url}?page=${pagination.page}&perPage=${
            pagination.perPage
        }${
            pagination.sortBy.col
                ? `&sortBy=${pagination.sortBy.col}&sortType=${pagination.sortBy.type}`
                : ""
        }`;

        try {
            const res = await request(fetchUrl, "GET", user, true);

            data = res || [];
            pagination.total = res?.total || 0;
        } catch (e) {
            return err(e.message);
        } finally {
            loading = false;
        }
    };

    const nextPage = () => {
        if (canNext) {
            pagination.page++;
            fetchData();
        }
    };

    const prevPage = () => {
        if (canPrev) {
            pagination.page--;
            fetchData();
        }
    };

    onMount(async () => {
        await fetchData();
    });
</script>

<div
    class="p-4 block sm:flex items-center justify-between border-b border-gray-200 dark:border-gray-700"
>
    <div class="mb-1 w-full">
        <div class="mb-4">
            <nav class="flex mb-5" aria-label="Breadcrumb">
                <Breadcrumb>
                    {#each crumbs as crumb, i}
                        <BreadcrumbItem
                            href={crumb.href}
                            home={i === 0 ? true : null}
                        >
                            {crumb.text}
                        </BreadcrumbItem>
                    {/each}
                </Breadcrumb>
            </nav>
            <h1
                class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
            >
                <slot name="header" />
            </h1>
        </div>
        <div class="sm:flex">
            <div
                class="hidden items-center mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700"
            >
                {#if search.enabled}
                    <form class="lg:pr-3" action="#" method="GET">
                        <label for="users-search" class="sr-only">Search</label>
                        <div class="relative mt-1 lg:w-64 xl:w-96">
                            <TextInput
                                text={search.placeholder}
                                label={false}
                                on:input={search.onInput}
                                Icon={SearchOutline}
                            />
                        </div>
                    </form>
                {/if}
                {#if select}
                    {#each selectActions as action}
                        <div class="flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0">
                            <a
                                on:click={() => {
                                    //get all selected checkboxes in tbody rows, and return their data-id attribute
                                    const selected = Array.from(
                                        document.querySelectorAll(
                                            "tbody input[type=checkbox]:checked"
                                        )
                                    ).map((el) => el.dataset.id);

                                    action?.onClick(selected);
                                }}
                                href="#"
                                class="tooltip-host inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <svelte:component this={action.icon} />
                            </a>
                        </div>

                        {#if action.text}
                            <Tooltip triggeredBy=".tooltip-host">
                                {action.text}
                            </Tooltip>
                        {/if}
                    {/each}
                {/if}
            </div>
            <div class="flex items-center ml-auto space-x-2 sm:space-x-3">
                {#each actions as action}
                    <button
                        on:click={action.onClick}
                        type="button"
                        class={action.type === "primary"
                            ? "inline-flex justify-center items-center py-2 px-3 w-1/2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            : "inline-flex justify-center items-center py-2 px-3 w-1/2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"}
                    >
                        {#if action.icon}
                            <svelte:component
                                this={action.icon}
                                class="mr-2 w-5 h-5"
                            />
                        {/if}
                        {action.text}
                    </button>
                {/each}
            </div>
        </div>
    </div>
</div>
<div class="flex flex-col">
    <div class="overflow-x-auto">
        <div class="inline-block min-w-full align-middle">
            <div class="overflow-hidden shadow">
                <Table>
                    <TableHead>
                        {#if select}
                            <TableHeadCell class="!p-4">
                                <Checkbox />
                            </TableHeadCell>
                        {/if}

                        {#each cols as col}
                            <TableHeadCell>
                                {col.name}
                            </TableHeadCell>
                        {/each}

                        {#if rowActions.length > 0}
                            <TableHeadCell>
                                <span class="sr-only">Actions</span>
                            </TableHeadCell>
                        {/if}
                    </TableHead>
                    <TableBody>
                        {#if loading}
                            {#each { length: pagination.perPage } as _, i}
                                <TableBodyRow>
                                    {#each { length: cols.length + (select ? 1 : 0) + (rowActions.length > 0 ? 1 : 0) } as col}
                                        <TableBodyCell class="p-4">
                                            <div
                                                class="text-skeleton bg-gray-700 rounded animate-pulse"
                                            />
                                        </TableBodyCell>
                                    {/each}
                                </TableBodyRow>
                            {/each}
                        {:else if error}
                            <!-- error -->
                            <TableBodyRow>
                                <TableBodyCell
                                    colspan={cols.length +
                                        (rowActions.length > 0 ? 1 : 0) +
                                        (select ? 1 : 0)}
                                    class="text-center p-5"
                                    >{error}
                                </TableBodyCell>
                            </TableBodyRow>
                        {:else if data.length === 0}
                            <!-- no results -->
                            <TableBodyRow>
                                <TableBodyCell
                                    colspan={cols.length +
                                        (rowActions.length > 0 ? 1 : 0) +
                                        (select ? 1 : 0)}
                                    class="text-center p-5"
                                    >No {title}s found
                                </TableBodyCell>
                            </TableBodyRow>
                        {:else}
                            <!-- data -->
                            {#each data as user (user._id)}
                                <TableBodyRow>
                                    {#each cols as col}
                                        {#if col.type === "image" && user[col?.image?.key] && user[col?.title?.key] && user[col?.sub?.key]}
                                            <TableBodyCell
                                                class="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap lg:mr-0"
                                            >
                                                <div
                                                    class={col.sub.key ===
                                                    "rank"
                                                        ? "rank " +
                                                          user[col.sub.key]
                                                        : null}
                                                >
                                                    <img
                                                        class="w-10 h-10 rounded-full {col
                                                            .image?.classes ||
                                                            ''}"
                                                        src={user[
                                                            col.image.key
                                                        ]}
                                                        alt="Table icon"
                                                    />
                                                </div>

                                                <div
                                                    class="text-sm font-normal text-gray-500 dark:text-gray-400"
                                                >
                                                    <div
                                                        class="text-base font-semibold text-gray-900 dark:text-white {col
                                                            .title?.classes ||
                                                            ''}"
                                                    >
                                                        {user[col.title.key]}
                                                    </div>
                                                    <div
                                                        class="text-sm font-normal {col
                                                            .sub.key === 'rank'
                                                            ? 'rank ' +
                                                              user[col.sub.key]
                                                            : 'text-gray-500 dark:text-gray-400'} {col
                                                            .sub?.classes ||
                                                            ''}"
                                                    >
                                                        {user[col.sub.key]}
                                                    </div>
                                                </div>
                                            </TableBodyCell>
                                        {:else if col.type === "formatter"}
                                            <TableBodyCell
                                                class={col?.classes || null}
                                            >
                                                {@html col.formatter(user)}
                                            </TableBodyCell>
                                        {:else}
                                            <TableBodyCell
                                                class={col?.classes || null}
                                            >
                                                {#if user[col.key] !== undefined}
                                                    {#if col.type === "date"}
                                                        {new Date(
                                                            user[col.key]
                                                        ).toLocaleDateString()}
                                                    {:else if col.type === "number"}
                                                        {user[
                                                            col.key
                                                        ].toLocaleString()}
                                                    {:else}
                                                        {user[col.key]}
                                                    {/if}
                                                {:else}
                                                    {col.key}
                                                {/if}
                                            </TableBodyCell>
                                        {/if}
                                    {/each}

                                    {#if rowActions.length > 0}
                                        <TableBodyCell>
                                            {#each rowActions as action}
                                                <Button
                                                    type={action.type}
                                                    on:click={() => {
                                                        action?.onClick(user);
                                                    }}
                                                >
                                                    <svelte:component
                                                        this={action.icon}
                                                        class="w-3.5 h-3.5 mr-2"
                                                    />
                                                    {action.text}
                                                </Button>
                                            {/each}
                                        </TableBodyCell>
                                    {/if}
                                </TableBodyRow>
                            {/each}
                        {/if}
                    </TableBody>
                </Table>
                <div
                    class="sticky right-0 bottom-0 items-center p-4 w-full border-t sm:flex sm:justify-between bg-gray-100 border-gray-700 dark:bg-gray-800"
                >
                    <div class="flex items-center mb-4 sm:mb-0">
                        <a
                            href="#"
                            class="inline-flex justify-center p-1 rounded {canPrev
                                ? 'cursor-pointer'
                                : 'cursor-not-allowed opacity-50'} hover:text-gray-900 hover:bg-gray-100 text-black dark:text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                            <svg
                                class="w-7 h-7"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                                ><path
                                    fill-rule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                /></svg
                            >
                        </a>
                        <a
                            href="#"
                            class="inline-flex justify-center p-1 mr-2 rounded {canNext
                                ? 'cursor-pointer'
                                : 'cursor-not-allowed opacity-50'} hover:text-gray-900 hover:bg-gray-100 text-black dark:text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                            <svg
                                class="w-7 h-7"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                                ><path
                                    fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd"
                                /></svg
                            >
                        </a>
                        {#if message}
                            {@html message}
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .text-skeleton {
        height: 24px;
        width: 100%;
    }
</style>
