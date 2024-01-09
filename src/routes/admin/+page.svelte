<script>
    import { Tabs, TabItem } from "flowbite-svelte";
    import List from "$lib/client/components/List/List.svelte";
    import { goto } from "$app/navigation";
    import {
        UserCircleSolid,
        GridSolid,
        AdjustmentsVerticalSolid,
        ClipboardSolid,
        UsersGroupOutline,
    } from "flowbite-svelte-icons";

    let url = "/users";
    let cols = [
        {
            name: "User",
            type: "image",
            image: {
                key: "avatar",
            },
            title: {
                key: "displayName",
            },
            sub: {
                key: "role",
                classes: "uppercase",
            },
        },
        {
            name: "Points",
            type: "formatter",
            formatter: (user) => {
                return `${user.total_points} total<br>${user.points} current`;
            },
        },
    ];
    let title = "user";

    export let data;
</script>

<Tabs style="underline">
    <TabItem open>
        <div slot="title" class="flex items-center gap-2">
            <UsersGroupOutline size="sm" />
            Users
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400">
            <List
                perPage={1}
                {title}
                {cols}
                {url}
                user={data?.user}
                rowActions={[
                    {
                        text: "View Evidence",
                        type: "secondary",
                        icon: ClipboardSolid,
                        onClick: (user) => {
                            goto(`/admin/${user._id}`);
                        },
                    },
                ]}
                actions={[]}
            />
        </p>
    </TabItem>
</Tabs>
