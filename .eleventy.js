module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "njk",
    "html",
    "css",
    "png",
    "svg"
  ]);
  eleventyConfig.addPassthroughCopy("posts/**/*{.js,.wasm}");
  eleventyConfig.addPassthroughCopy("posts/suppalist/model/*");
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
}
