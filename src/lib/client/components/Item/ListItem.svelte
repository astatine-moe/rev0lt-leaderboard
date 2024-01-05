<script>
    import { Tooltip } from "flowbite-svelte";
    import { StarSolid, GiftBoxOutline } from "flowbite-svelte-icons";
    import { formatDate } from "$lib/util/date";

    export let type = "leaderboard";
    export let loading = false;

    export let data;
</script>

<div
    class="relative flex items-center bg-slate-50 dark:bg-gray-800 hover:bg-slate-200 hover:dark:bg-gray-700 text-slate-700 dark:text-white border border-slate-200 dark:border-gray-600 rounded mb-3 last:mb-0 p-4"
>
    {#if type === "leaderboard"}
        {#if !loading && data?.user?.leader}
            <StarSolid
                class="absolute left-[-10px] top-[-10px] rotate-45 text-yellow-400 w-7 h-7"
            />
        {/if}

        {#if loading}
            <div
                class="bg-slate-300 dark:bg-gray-600 animate-pulse min-w-[64px] h-[64px] w-[64px] rounded-full mr-4"
            ></div>
        {:else}
            <img
                src={data?.user?.avatar}
                alt={`${data?.user?.username}'s pfp`}
                class="h-[64px] w-[64px] min-w-[64px] rounded-full mr-4 {data
                    ?.user?.role === 'admin'
                    ? 'border-primary-500 border-2'
                    : ''}"
            />
        {/if}
        <div class="w-full flex justify-between">
            {#if loading}
                <div
                    class="bg-slate-300 dark:bg-gray-600 animate-pulse h-2 w-1/3"
                />
                <div
                    class="bg-slate-300 dark:bg-gray-600 animate-pulse h-1 w-1/6"
                />
            {:else}
                <div>
                    <h3>{data?.user?.displayName || data?.user?.username}</h3>
                    {#if data?.user?.disqualified || data?.user?.identifier === "161546204260466688"}
                        <!-- disqualify myself, don't want people to think I rig anything -->
                        <p class="text-sm text-red-600" id="disqualify-message">
                            Disqualified
                        </p>
                        <Tooltip
                            color="red"
                            placement="right"
                            triggeredBy="[id^='disqualify-message']"
                            >User cannot be selected in the giveaway <span
                                class="block mt-2"
                                >Reason: {data?.user?.disqualified_reason ||
                                    "No reason"}</span
                            ></Tooltip
                        >
                    {/if}
                </div>

                <span class="text-center">
                    <span class="block">{data?.user?.total_points} total</span>
                    <span
                        class="text-slate-500 dark:text-gray-300 text-xs block"
                        >{data?.user?.points} current</span
                    >
                </span>
            {/if}
            <!-- todo: mention if user logged in is admin -->
        </div>
    {:else if type === "giveaway"}
        <GiftBoxOutline
            class="ml-2 w-10 h-10 {loading
                ? 'text-slate-300 dark:text-gray-600 animate-pulse'
                : 'text-primary-500'}"
        />

        <div class="flex ml-4 w-full justify-between">
            {#if loading}
                <div class="flex h-9 w-full flex-col">
                    <div
                        class="bg-slate-300 dark:bg-gray-600 animate-pulse h-4 w-1/3 block mb-2"
                    />

                    <div
                        class="bg-slate-300 dark:bg-gray-600 animate-pulse h-3 w-1/4 block"
                    />
                </div>
            {:else}
                <div>
                    <h1 class="text-xl text-primary-500">
                        {data?.title}
                    </h1>
                    <time class="text-xs text-slate-400 dark:text-gray-300"
                        >{formatDate(data?.deadline)}</time
                    >
                </div>
                <div class="text-center">
                    <span>Winner:</span>
                    <span
                        class="block {data?.winner
                            ? 'text-primary-900 dark:text-primary-500'
                            : 'text-slate-500 dark:text-gray-300'} text-xs"
                        >{data?.winner
                            ? data.winner?.displayName || data.winner?.username
                            : "TBA"}</span
                    >
                </div>
            {/if}
        </div>
    {/if}
</div>
