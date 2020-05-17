<template>
    <img ref="image" :src="userImage"  alt="Profile Picture" @error.once="imageErrorLoading" 
    class="w-32 h-32 border rounded-full" @dblclick.prevent="dblclik">
</template>

<script>
export default {
    props: {
        image_url: undefined,
        dblclik: undefined,
    },
    methods: {
        defaultImage: function (){
            // 'require' is very important
            return require("@/assets/svg/user.svg");
        },
        imageErrorLoading: function (){
            this.$refs.image.src = this.defaultImage();
        }
    },
    computed: {
        userImage: function (){
            return this.image_url? this.image_url: this.defaultImage();
        },
    }
}
</script>

<style>

</style>