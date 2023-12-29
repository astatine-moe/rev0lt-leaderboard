<script>
    import { onMount } from "svelte";
    import { PUBLIC_API_URL } from "$env/static/public";
    import { Toast } from "flowbite-svelte";
    import {
        PapperPlaneOutline,
        ExclamationCircleOutline,
        StarSolid,
    } from "flowbite-svelte-icons";
    import { copy } from "svelte-copy";

    let hidden = true;

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
    <div class="mt-5 mb-5 text-center flex justify-center w-100">
        <Toast
            dismissable={false}
            contentClass="flex space-x-4 rtl:space-x-reverse divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-700"
        >
            <ExclamationCircleOutline
                class="w-5 h-5 text-primary-600 dark:text-primary-500"
            />
            <div class="ps-4 text-sm font-normal">Click @ to copy mention</div>
        </Toast>
    </div>
    <div class="leaderboard">
        {#if loading}
            {#each { length: 5 } as col}
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
            {#each users as user, i}
                <div class="user">
                    {#if i === 0}
                        <StarSolid
                            class="absolute left-[-10px] top-[-10px] rotate-45 text-yellow-400 w-7 h-7"
                        />
                    {/if}
                    <img
                        class="image"
                        src={user.avatar}
                        alt={`${user.username}'s pfp`}
                    />
                    <div class="details">
                        <h3>
                            {user.displayName || user.username}
                            <br />
                            <span
                                class="mention"
                                use:copy={`<@${user.identifier}>`}
                                >@{user.username}</span
                            >
                        </h3>
                        <span class="text-center"
                            >{user.total_points} total<br /><span
                                class="text-gray-400 text-xs"
                                >({user.points} current)</span
                            ></span
                        >
                    </div>
                </div>
            {/each}
        {:else}
            <p class="text-center">No users found</p>
        {/if}
    </div>
</div>

<svelte:head>
    <title>Rev0lt - Leaderboards</title>
</svelte:head>

<style lang="scss">
    .leaderboard {
        padding: 1em 0 1em 0;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        .user {
            display: flex;
            align-items: center;
            background: rgb(25, 25, 25);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1em;
            border-radius: 0.5em;
            margin-bottom: 0.75em;

            position: relative;

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
