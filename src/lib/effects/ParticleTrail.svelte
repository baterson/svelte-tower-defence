<script lang="ts">
  let { position, count = 10 } = $props();
  let particles = $state([]);

  $effect(() => {
    // Create trail effect using previous positions
    const newParticle = {
      x: position.x,
      y: position.y,
      opacity: 1
    };

    particles = [newParticle, ...particles.slice(0, count - 1)]
      .map((p, i) => ({
        ...p,
        opacity: 1 - (i / count)
      }));
  });
</script>

{#each particles as particle}
  <div
    class="particle"
    style:transform="translate({particle.x}px, {particle.y}px)"
    style:opacity={particle.opacity}
  />
</style>