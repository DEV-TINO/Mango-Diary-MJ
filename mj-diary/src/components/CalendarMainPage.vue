<template>
	<div class="select-date">
		<ul>
			<li>&lt</li>
		</ul>
		<h3>2024년 1월</h3>
		<ul>
			<li>></li>
		</ul>
	</div>
	<div>
		<table class="calendar">
			<thead class="week-block">
				<tr class="week"  v-for="week, index in weeks" :key="index">{{ week }}</tr>
				</thead>
			<tbody class="date-block">
				<tr class="date" v-for="index in 31" :key="index">{{ index }}</tr>
				<tr class="date" v-for="index in 4"></tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			weeks: ['MON',	'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
		}
	}
}
</script>

<style>
.select-date {
	width: 100%;
	padding-bottom: 8px;

	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
.calendar {
	width: calc(100% - 24px);
	padding-left: 12px;
	padding-right: 12px;
	padding-top: 12px;
	height: 525px;
	background-color: rgb(255, 255, 152);
}
.week-block {
	width: 100%;	
	margin-bottom: 16px;

	display: flex;
	justify-content: space-around;
}
.week {
	width: 42px;
	background-color: rgb(255, 226, 64);

	display: flex;
	justify-content: center;
}
.date-block {
	width: 100%;

	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
.date {
	width: 42px;
	height: 84px;
	background-color: rgb(255, 226, 64);
	margin-bottom: 16px;

	display: flex;
	align-items: flex-start;
	justify-content: center;
}
</style>