<template>
    <div>
        <div class="warn">
            <div class="warn-card">
                该音乐不能播放
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.warn{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index:99;
    display: flex;
    justify-content: center;
    align-items: center;
    transition:all 6s;
    opacity: 1;
}
.warn-card{
    width: 70%;
    height: 50vh;
    background:white;
    border-radius:10px;
    text-align: center;
}
</style>