<template>
    <div class="sm:inline-flex flex-grow">
        <svg v-if="editable" tooltip="Hello world" class="bi bi-wrench fill-current w-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M.102 2.223A3.004 3.004 0 003.78 5.897l6.341 6.252A3.003 3.003 0 0013 16a3 3 0 10-.851-5.878L5.897 3.781A3.004 3.004 0 002.223.1l2.141 2.142L4 4l-1.757.364L.102 2.223zm13.37 9.019L13 11l-.471.242-.529.026-.287.445-.445.287-.026.529L11 13l.242.471.026.529.445.287.287.445.529.026L13 15l.471-.242.529-.026.287-.445.445-.287.026-.529L15 13l-.242-.471-.026-.529-.445-.287-.287-.445-.529-.026z" clip-rule="evenodd"/>
        </svg>
        <svg v-if="draft" class="bi bi-pencil fill-current w-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>
            <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>
        </svg>
        <svg v-if="hidden" class="bi bi-eye-slash-fill fill-current w-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 01-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 002.79-.588zM5.21 3.088A7.028 7.028 0 018 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 00-4.474-4.474L5.21 3.089z"/>
            <path d="M5.525 7.646a2.5 2.5 0 002.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 012.829 2.829z"/>
            <path fill-rule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z" clip-rule="evenodd"/>
        </svg>
    </div>
</template>

<script>
export default {
    name: "Icon",
    props: {
        // Icons possible
        draft: false,
        hidden: false,
        editable: false,
        // true -> inside a container, else it is the full icon
        embedded: true,
    },
}
</script>

<style scoped>
    svg:hover {
        fill: red;
    }
</style>