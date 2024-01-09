<script>
    import { makeCamelCase } from "$lib/util/String";
    import { formFieldProxy } from "sveltekit-superforms/client";

    export let text;
    export let Icon;
    export let placeholder = "";
    export let errors = [];
    export let type = "text";
    export let required = false;
    export let val = "";
    export let dark = false;
    export let label = true;

    if (!placeholder) {
        placeholder = text;
    }

    if (type === "password") {
        placeholder = "•".repeat(8);
    }

    $: id = makeCamelCase(text);

    function typeAction(node) {
        node.type = type;
    }
</script>

{#if label}
    <label
        for={id}
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >{text}</label
    >
{/if}
<div
    class="text-input {dark
        ? 'bg-gray-200 dark:bg-gray-900'
        : 'bg-gray-50 dark:bg-gray-800'} {Icon ? 'input-with-icon' : ''}"
>
    {#if Icon}
        <svelte:component
            this={Icon}
            tabindex="-1"
            style="margin: 0 0.25rem 0 0.5rem;"
        />
    {/if}
    <input
        class="{dark
            ? 'bg-gray-200 dark:bg-gray-900 dark:text-gray-50'
            : 'bg-gray-50 dark:bg-gray-800 dark:text-gray-50'} sm:text-sm rounded-lg block w-full p-2.5 border-none rounded-none focus:ring-0"
        {placeholder}
        {required}
        {id}
        name={id}
        bind:value={val}
        on:input
        use:typeAction
        {...$$restProps}
    />
</div>
