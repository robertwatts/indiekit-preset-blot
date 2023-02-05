# Indiekit Preset Blot
Blot.im preset for Indiekit

## Installation
`npm i indiekit-preset-blot`
## Usage

Add `indiekit-preset-blot` to your list of plug-ins, specifying options as required:

```json
{
  "plugins": ["indiekit-preset-blot"],
}
```
## Post types
Each post type (eg article, note, photo) is mapped to a different tag in Blot.

This plugin creates each post in the `Posts` directory with a sub-directory for each post type, [according to the Blot.im guide to set tags using a folder](https://blot.im/how/metadata#tags-path), as a post can only have one post type.
