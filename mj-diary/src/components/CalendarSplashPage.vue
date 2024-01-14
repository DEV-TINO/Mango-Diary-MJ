<template>
	<div class="splash" @click="this.$store.commit('increaseStep')">
		<img class="splash-logo" src="../../public/splashLogo.png" />
		<p to="/main">Touch to Start</p>
	</div>
</template>

<script>
export default {
	
}
</script>

<style>
.splash {
	width: 100%;
	min-height: 100svh;
	margin: 0;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
}
.splash-logo {
	width: 156px;
}
</style>