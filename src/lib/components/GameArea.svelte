<script>
	import Entity from '$lib/components/Entity.svelte';
	import { entityManager } from '$lib/store/EntityManager.svelte';
	import Effect from './Effects/index.svelte';
	import Enemy from './Enemy.svelte';
	import Tower from './Tower.svelte';
	import Throne from './Throne.svelte';
</script>

<section>
	{#each entityManager.enemies as enemy (enemy.id)}
		<Enemy {enemy} />
	{/each}

	<!-- All who uses effect instead of sprite -->
	{#each entityManager.fxEntities as entity (entity.id)}
		<Effect {entity} />
	{/each}

	<div class="towers">
		{#each entityManager.towers as tower, index (tower.id)}
			<Tower {tower} placement={index % 2 !== 0 ? 'end' : 'start'} />
		{/each}
	</div>

	<div class="throne">
		<Throne throne={entityManager.throne} />
	</div>
</section>

<style>
	section {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		will-change: transform;
	}

	.towers {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 60px;
		padding: 0 20px 0 20px;
	}

	.throne {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media (max-width: 768px) {
		section {
			margin-top: 0;
			justify-content: end;
		}

		.towers {
			gap: 20px;
			padding: 0 20px 0 20px;
		}
	}
</style>
