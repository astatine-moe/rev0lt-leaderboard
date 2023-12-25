<script>
    import { onMount } from "svelte";
    import { PUBLIC_API_URL } from "$env/static/public";

    let loading = true;
    let err = null;
    let users = [];

    const get = async () => {
        try {
            const res = await fetch(`${PUBLIC_API_URL}/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                users = await res.json();
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

        loading = false;
    });
</script>

<div class="container">
    <h1 class="text-lg mt-3 mb-3 text-center">Leaderboard</h1>
    <div class="leaderboard">
        {#if loading}
            {#each { length: 10 } as col}
                <div class="user">
                    <div class="image bg-gray-700 animate-pulse" />
                    <div class="details">
                        <div class="bg-gray-700 animate-pulse h-2 w-1/2" />
                        <div class="bg-gray-700 animate-pulse h-1 w-1/4" />
                    </div>
                </div>
            {/each}
        {:else if err}
            <h3 class="text-lg">Error:</h3>
            <p>{err}</p>
        {:else if users.length}
            {#each users as user}
                <div class="user">
                    <img
                        class="image"
                        src={user.avatar}
                        alt={`${user.username}'s pfp`}
                    />
                    <div class="details">
                        <h3>${user.username}</h3>
                        <span>${user.points} points</span>
                    </div>
                </div>
            {/each}
        {:else}
            <p class="text-center">No users found</p>
        {/if}
    </div>
</div>

<style lang="scss">
    .leaderboard {
        padding: 1em 0 1em 0;
        border-top: 1px solid rgba(255, 255, 255, 0.25);
        .user {
            width: 100%;
            display: flex;
            align-items: center;
            background: rgba(54, 54, 54, 0.3);
            padding: 0.5em;

            position: relative;
            &:nth-child(even) {
                background: rgba(54, 54, 54, 0.5);
            }
            &:nth-child(1) {
                background: rgba(255, 224, 46, 0.25) !important;
            }

            &:hover {
                background: rgba(54, 54, 54, 0.7);
            }

            .image {
                height: 64px;
                width: 64px;
                min-height: 64px;
                min-width: 64px;
                border-radius: 50%;

                margin-right: 1em;
            }
        }

        .details {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
</style>
