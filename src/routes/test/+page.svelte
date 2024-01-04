<script>
    import ListItem from "$lib/client/components/Item/ListItem.svelte";
</script>

<div class="container">
    <div class="pt-3 sm:container">
        <ListItem
            data={{
                user: {
                    leader: true,
                    avatar: "https://cdn.discordapp.com/avatars/161546204260466688/0c96d55a31c522caeb3620ea2f6d1407.webp?size=256",
                    username: "astatine.moe",
                    displayName: "AstatineQt",
                    points: 0,
                    total_points: 0,
                    role: "admin",
                },
            }}
        />
        <ListItem loading={true} />
        <ListItem
            type="giveaway"
            data={{
                title: "10m GP",
                deadline: new Date(),
            }}
        />
        <ListItem
            type="giveaway"
            data={{
                title: "10m GP",
                deadline: new Date(),
                winner: {
                    username: "astatine.moe",
                    displayName: "AstatineQt",
                },
            }}
        />
        <ListItem loading={true} type="giveaway" />
    </div>
</div>
