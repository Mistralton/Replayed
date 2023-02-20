<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { modal } from '../../stores/stores';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	let modalElement: HTMLDivElement;

	const handle_keydown = (e: KeyboardEvent) => {
		if (e && e.key === 'Escape') {
			modal.set(false)
			close();
			return;
		}

		if (e.key === 'Tab' && modalElement) {
			// trap focus
			const nodes: NodeListOf<HTMLElement> = modalElement.querySelectorAll('*');
			const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0);

			let index = tabbable.indexOf(document.activeElement as HTMLElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			tabbable[index].focus();
			e.preventDefault();
		}
	};

	const previously_focused = typeof document !== 'undefined' && document.activeElement;

	if (previously_focused  && previously_focused instanceof HTMLElement) {
		onDestroy(() => {
			previously_focused.focus();
		});
	}
</script>

<svelte:window on:keydown={handle_keydown} />

<div class="modal-background" on:keydown={close} on:click={close} />

<div class="modal z-10 h-56" role="dialog" aria-modal="true" bind:this={modalElement}>
	<slot name="header" />
	<hr />
	<slot />
	<hr />
</div>

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 200%;
		background: rgba(0, 0, 0, 0.3);
	}

	.modal {
		position: fixed;
		left: 50%;
		top: 50%;
		width: calc(100vw - 4em);
		max-width: 32em;
		max-height: calc(100vh);
		overflow: auto;
		transform: translate(-50%, -50%);
		padding: 1em;
		border-radius: 0.2em;
		background: white;
	}

	button {
		display: block;
	}
</style>
