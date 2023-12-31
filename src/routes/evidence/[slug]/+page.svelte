<script>
    export let data;
    import { PUBLIC_API_URL } from "$env/static/public";
    import { copy } from "svelte-copy";

    let images = [];
    let user = {};
    let err = null;

    let loading = true;

    import { Spinner } from "flowbite-svelte";
    import { onMount } from "svelte";

    const get = async () => {
        try {
            const res = await fetch(`${PUBLIC_API_URL}/evidence/${data.slug}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                let responseData = await res.json();
                images = responseData.images;
                user = responseData.user;
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

{#if loading}
    <div class="text-center">
        <Spinner size={16} class="mt-5" />
    </div>
{:else if err}
    <h1>Error fetching evidence</h1>
{:else}
    <div class="container mt-5">
        <h1 class="text-xl mb-3">
            Evidence for <span
                class="mention"
                use:copy={`<@${user.identifier}>`}>@{user.username}</span
            >
        </h1>
        <div class="images">
            {#each images as image, i}
                <div>
                    <img
                        src={`${PUBLIC_API_URL}${image}`}
                        alt="evidence {i + 1}"
                        crossorigin="anonymous"
                    />
                </div>
            {/each}
        </div>
    </div>
{/if}

<style lang="scss">
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
    .images {
        display: flex;
        > div {
            margin-right: 0.5em;
        }
    }
</style>
