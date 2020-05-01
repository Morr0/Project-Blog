<template>
    <div>
        You have reached a non-existing page
    </div>
</template>

<script>
export default {
    created(){
        return this.$router.replace("/");
    }
}
</script>