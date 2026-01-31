<template>
	<Layout>
		<template #nav-bar-content-before>
			<div class="flex items-center gap-3 ps-4">
				{{ $frontmatter.title }}
				<a
					v-if="$frontmatter.info"
					class="bg-(--vp-button-alt-bg)
						block
						border
						hover:border-(--vp-button-alt-border-hover)
						border-(--vp-button-alt-border)
						p-1
						rounded-full
						transition-colors"
					:href="$frontmatter.info"
				>
					<AnOutlinedInfo class="text-base" />
				</a>
			</div>
		</template>
		<template #layout-bottom>
			<ClientOnly>
				<SafhaPromotion />
			</ClientOnly>
		</template>
	</Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import SafhaPromotion from './SafhaPromotion.vue';
const { Layout } = DefaultTheme;
</script>
