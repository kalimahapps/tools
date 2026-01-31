import jameelTheme from '../jameel-color-theme.json';
import { createHighlighter } from 'shiki';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';

/**
 * Highlight the output code
 *
 * @param  {string}          code Code to highlight
 * @return {Promise<string>}      Highlighted code
 */
const highlight = async function (code: string): Promise<string> {
	const highlighter = await createHighlighter({
		themes: [jameelTheme],
		langs: ['vue'],
		engine: createOnigurumaEngine(import('shiki/wasm')),
	});

	return highlighter.codeToHtml(code, {
		lang: 'vue',
		theme: jameelTheme,
	});
};

export {
	highlight
};