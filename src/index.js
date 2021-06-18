import habitat from 'preact-habitat';
import Widget from './components';

// habitat render docs: https://github.com/zouhir/preact-habitat#api-docs
const { render } = habitat(Widget);
/**
 * option 1: render inline - just add it to the parent element. 
*/
// render({ inline: true });

/**
 * option 2: render in selector
 * 
 * Use this if the selector you use to refer to the html container (id or class or a combination) 
 * is consistent and predictable.
*/
// render({ selector: "#my-widget-container", clean: true });

/**
 * option 3: specify the html selector later when you embed it
 * 
 * this gives you the most flexibility. You need to add `data-mount-in=".my-container"`
 * as an attribute to the script tag when you include the bundle.js
 * e.g. `<script async src="dist/bundle.js" data-mount-in=".my-container"></script>`
*/
render({ clientSpecified: true });


