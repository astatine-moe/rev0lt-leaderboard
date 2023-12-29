<script>
    import { GiftBoxOutline } from "flowbite-svelte-icons";
    import { Tabs, TabItem, Spinner } from "flowbite-svelte";
    import { onMount } from "svelte";
    import { PUBLIC_API_URL } from "$env/static/public";
    import { copy } from "svelte-copy";

    let loading = true;
    let err = null;
    let giveaways = [];
    let active = [];
    let inactive = [];
    let get = async () => {
        try {
            const res = await fetch(`${PUBLIC_API_URL}/giveaways`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                giveaways = await res.json();
            } else {
                err = "failed to load";
            }
        } catch (e) {
            console.error(e);
            err = "failed to load";
        }
    };

    onMount(async () => {
        loading = true;

        await get();

        active = giveaways.filter((giveaway) => giveaway.active);
        inactive = giveaways.filter((giveaway) => !giveaway.active);

        loading = false;
    });

    function formatDate(date) {
        date = new Date(date);
        const day = date.getDate();
        const month = date.toLocaleString("en-GB", { month: "long" });
        const year = date.getFullYear();

        const suffix =
            day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th";

        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        const formattedDate = `${day}${suffix} ${month}, ${year}`;
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        return `${formattedDate} @ ${formattedTime}`;
    }
</script>

<div class="container">
    <div class="giveaways">
        <Tabs contentClass="mt-2">
            <TabItem open title="Active Giveaways">
                {#if loading}
                    <div class="text-center mt-5">
                        <Spinner />
                    </div>
                {:else}
                    {#if !active.length}
                        <p>No active giveaways</p>
                    {/if}
                    {#each active as giveaway}
                        <div class="giveaway">
                            <GiftBoxOutline class="icon w-10 h-10" />
                            <div>
                                <h1>{giveaway.title}</h1>
                                <time>{formatDate(giveaway.deadline)}</time>
                            </div>
                        </div>
                    {/each}
                {/if}
            </TabItem>
            <TabItem title="Past Giveaways">
                {#if loading}
                    <div class="text-center mt-5">
                        <Spinner />
                    </div>
                {:else}
                    {#if !inactive.length}
                        <p>No active giveaways</p>
                    {/if}
                    {#each inactive as giveaway}
                        <div class="giveaway">
                            <GiftBoxOutline class="icon w-10 h-10" />
                            <div>
                                <h1>{giveaway.title}</h1>
                                <time>{formatDate(giveaway.deadline)}</time>
                                {#if giveaway.winner}
                                    <p>
                                        Winner: <span class="text-yellow-600"
                                            >{giveaway.winner.displayName ||
                                                giveaway.winner.username}
                                            <span
                                                class="mention"
                                                use:copy={`<@${giveaway.winner.identifier}>`}
                                                >@{giveaway.winner
                                                    .username}</span
                                            ></span
                                        >
                                    </p>
                                {/if}
                            </div>
                        </div>
                    {/each}
                {/if}</TabItem
            >
        </Tabs>
    </div>
</div>

<style lang="scss">
    .giveaways {
        margin-top: 1em;
        .giveaway {
            display: flex;
            align-items: center;
            background: rgb(25, 25, 25);
            padding: 1em;
            border-radius: 0.5em;
            margin-bottom: 0.5em;

            > div {
                margin-left: 1em;
                h1 {
                    font-size: 1.5em;
                }
                time {
                    font-size: 0.9em;
                    color: gray;
                }
            }
        }
    }

    .mention {
        border-radius: 3px;
        padding: 0 2px;

        font-weight: 500;
        unicode-bidi: plaintext;
        color: rgb(201, 205, 251);
        outline: rgb(201, 205, 251);
        background: rgba(88, 101, 242, 0.3);

        cursor: pointer;
        &:hover {
            background: rgb(88, 101, 242);
            text-decoration: underline;
        }
    }
</style>
