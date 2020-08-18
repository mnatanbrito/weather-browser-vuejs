<template>
    <i :class="`fas ${icon || ''}`" />
</template>

<script>
export default {
    name: 'Icon',
    props: ['icon']
}
</script>