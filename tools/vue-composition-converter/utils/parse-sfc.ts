import type { ElementNode } from '@vue/compiler-dom';
import { parse } from '@vue/compiler-dom';

/**
 * Generates a string of attributes from an ElementNode.
 */
const getAttributesString = (node: ElementNode | undefined) => {
	return node?.props?.map((property) => {
		return `${property.name}${property.value ? `="${property.value.content}"` : ''}`;
	}).join(' ') || '';
};

/**
 * Parse SFC user input to extract template, script and style
 */
const parseSfc = (sfcContent: string) => {
	const parsedUserInput = parse(sfcContent, {
		parseMode: 'sfc',
	});

	const template = parsedUserInput.children.find((node) => {
		return (node as ElementNode).tag === 'template';
	});

	const script = parsedUserInput.children.find((node) => {
		return (node as ElementNode).tag === 'script';
	});

	const style = parsedUserInput.children.find((node) => {
		return (node as ElementNode).tag === 'style';
	});

	const styleAttributes = getAttributesString(style as ElementNode);

	return {
		templateContent: template?.innerLoc.source,
		scriptContent: script?.innerLoc.source,
		styleContent: style?.innerLoc.source,
		styleAttributes: styleAttributes || 'scoped',
	};
};

/**
 * Compose the output SFC
 *
 * @param scriptContent The updated script content
 */
const composeSfc = (
	scriptContent: string,
	templateContent: string,
	styleContent: string,
	styleAttributes: string
) => {
	const templateSfc = `<template>${templateContent}</template>`;
	let scriptSfc = `&lt;script setup&gt;\n${scriptContent}\n&lt;/script&gt;`;
	const styleSfc = `<style ${styleAttributes}>${styleContent}</style>`;
	scriptSfc = scriptSfc.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
	return [templateSfc, scriptSfc, styleSfc].join('\n\n');
};

export { parseSfc, composeSfc };