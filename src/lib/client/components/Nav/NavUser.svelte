<script>
    import {
        Avatar,
        Dropdown,
        DropdownHeader,
        DropdownDivider,
    } from "flowbite-svelte";
    import {
        CogOutline,
        GridSolid,
        ArrowRightToBracketOutline,
        StarSolid,
    } from "flowbite-svelte-icons";

    import DropdownItem from "./DropdownItem.svelte";
    export let user = {};
</script>

<Avatar
    dot={{
        color: "green",
        placement: "bottom-right",
    }}
    id="avatar-menu"
    class="cursor-pointer {user?.role === 'admin'
        ? 'border border-primary-500'
        : ''}"
    src={user?.avatar}>{user?.displayName?.charAt(0)}</Avatar
>

<Dropdown placement="bottom" triggeredBy="#avatar-menu">
    <DropdownHeader>
        <span
            class="block text-sm {user?.role === 'admin'
                ? 'text-primary-500'
                : ''}">{user?.displayName}</span
        >
        <span class="block truncate text-sm font-medium"
            >{user?.role.toUpperCase() || "USER"}</span
        >
    </DropdownHeader>
    {#if user?.role === "admin"}
        <DropdownItem href="/admin" icon={StarSolid}>Admin</DropdownItem>
    {/if}
    <DropdownItem href="/user/settings" icon={CogOutline}
        >Settings
    </DropdownItem>

    <DropdownDivider />

    <DropdownItem href="/logout" icon={ArrowRightToBracketOutline}
        >Logout</DropdownItem
    >
</Dropdown>
