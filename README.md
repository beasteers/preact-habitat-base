# Preact Widgets Boilerplate

Boilerplate code for getting a modern Preact widget running using Preact Habitat.

### Explanation

I flipping love React - it makes writing frontend code so much more fun and makes me never want to touch d3 or jQuery for app dev again! But in the real world, we're often needing to use other platforms such as Wordpress to manage page content and it's not easy to integrate react into that workflow. 

Preact is an amazing library that works as basically a drop in replacement for React at a fraction of the size. It's great for building small and fast modular components. But Preact still has a similar issue as React in that most of the default configurations are set up to just include it as a Single Page App and doesn't easily provide modularization.

So to help with that, someone built `preact-habitat` (god I love open-source communities), that makes it really easy to drop in preact widgets anywhere, just by including a script tag!

The only problem now was that, the only example project was a login form that was a few years old, with a bunch of out-of-date packages and configuration formats, extra dependencies, and example code that wasn't exactly a bare minimum "Hello World". 

So this repo took that `login-form` example, updated all of the packages and configurations to use webpack 5 and babel 7, and removed all of the bloat that isn't needed for boilerplate code. I left in things like `sass` preprocessing because I feel like those are essentials.

### Usage Walkthrough

```bash
# download the boilerplate
git clone https://github.com/beasteers/preact-habitat-base
cd preact-habitat-base

# TODO - add cookiecutter

# edit package.json package meta if you want (name, description, author, homepage, repository)

# install all packages
npm install


### This is your development cycle

# run development server
npm run watch
# this will open a browser window at localhost:9009
# it will automatically refresh when you make changes

# create/edit your component in `src/components/index.js`
# to change how the demo page looks, edit `index.html`


### Production

# build an optimized bundle
npm run build
```

#### Docker
if you want the demo to run in docker, you can do:
```bash
# move the docker files to the right place
mv docker/* .

# build your package and start it
docker-compose up -d --build
```
Otherwise you can just delete the `docker/` folder.

I included this because it was a bit of a trick getting the npm/nginx setup process working and required overriding the nginx config to redirect all urls to `index.html` instead of just `/` and throwing a `404` for any nested pages if you're using something like `react-router`.

## Basic Widget Structure

```javascript
// src/index.js
import { h } from 'preact';  // need this to render preact components
import habitat from 'preact-habitat';

const HelloWorld = ({ name='World', color='black' }) => {
  return <h1 style={{ color }}>{`Hello, ${name}!`}</h1>
}

const { render } = habitat(HelloWorld);
render({
  ...
});
```

## Method 1: inline - single use
This is the most straight forward method:

It uses the parent DOM node as a host for your widget without specifing any selectors.

In `src/index.js`:
```javascript
render({ inline: true });
```

Then when you go to use it:
```html
<div>
    <script type="application/json">
        { "name": "Universe", "color": "red" }
    </script>
    <script async src="/build/bundle.js" type="text/javascript"></script>
</div>
```

Or equivalently, you can use data attributes for your parameters:
```html
<div data-prop-name="Universe" data-prop-color="red">
    <script async src="/build/bundle.js" type="text/javascript"></script>
</div>
```

Or if you don't need to set any parameters, you can cut it down to:
```html
<div>
    <script async src="/build/bundle.js" type="text/javascript"></script>
</div>
```
The `<script type="application/json">{...}</script>` tag is optional for all of these.


## Method 2: statically defined selector
You can also use a static html selector to point to the widget you want to put it in.

In `src/index.js`:
```javascript
render({ selector: '#my-container' });
```

Then when you go to use it:
```html
<div class="super-cool-widget" data-prop-name="Universe" data-prop-color="red"></div>

<script async src="/build/bundle.js" type="text/javascript"></script>
```


## Method 3: dynamically specified selector
Finally, you can specify a selector using `data-mount-in=".my-container"` when you load the script.

In `src/index.js`:
```javascript
render({ clientSpecified: true });
```

Then when you go to use it:
```html
<div class="super-cool-widget" data-prop-name="Universe" data-prop-color="red"></div>
<div class="super-cool-widget" data-prop-name="Parallel Universe" data-prop-color="blue"></div>
<div class="super-cool-widget" data-prop-name="Perpendicular Universe" data-prop-color="green"></div>
<div class="super-cool-widget" data-prop-name="Bisecting Universe" data-prop-color="purple"></div>

<script async src="/build/bundle.js" data-mount-in=".super-cool-widget" type="text/javascript"></script>
```

## Other Info

### Loading Content
You can display content that will be shown while your element is loading.
```javascript
render({ selector: '#my-container', clean: true });
```

In `src/index.js`:
```html
<div id='my-container'>
    <h1>Loading...</h1>
    <script type="application/json">
        { "name": "Universe", "color": "red" }
    </script>
</div>

<script async src="/build/bundle.js" type="text/javascript"></script>
```

### Default Properties
You can set parameters that will be used if none are passed in the `<script type="application/json">` tag.

```javascript
render({ defaultParams: { "name": "Woooorld", "color": "blue" } });
```