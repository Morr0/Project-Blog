<template>
    <footer class="footer grid grid-cols-3 gap-4">
        <div class="text-gray-700 hover:text-blue-500  relative drop font-bold">
            <a href="https://www.linkedin.com/in/rami-hikmat/" target="_blank">
                Linkedin
            </a>
            <!-- <Icon :githubLogo="true" /> -->
        </div>
        <div>
            <a href="" class="text-gray-700 hover:text-blue-500 relative drop font-bold" target="_blank">
            <!-- Fill out email here -->
            </a>
        </div>
        <div>
            <a href="https://github.com/Morr0" target="_blank" class="text-gray-700 hover:text-blue-500  relative drop font-bold">
            Github
            </a>
        </div>
    </footer>
</template>

<script>
export default {

}
</script>

<style scoped>
/* .footer {
    padding: 4rem;


    margin-top: auto;

    border-top: 1px solid rgba(110, 125, 130, 10%);

} */
/* .footer {
    margin-top: auto;
    position: absolute;
    bottom: 0vmax;

    padding: 4rem;
} */
.footer {
    padding-left: 4rem;
    position: sticky;
    bottom: 0%;
    clear: both;
}

.footer a {
    text-decoration: none;
}

</style>